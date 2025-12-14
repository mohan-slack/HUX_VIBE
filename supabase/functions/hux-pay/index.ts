// ✅ PRODUCTION-SAFE RAZORPAY EDGE FUNCTION (Deno Compatible)
// Deploy with: supabase functions deploy hux-pay

import { serve } from "https://deno.land/std@0.224.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import Razorpay from "https://esm.sh/razorpay@2.8.6?target=deno"
import { Buffer } from "node:buffer"

// ENV
const RAZORPAY_KEY_ID = Deno.env.get("RAZORPAY_KEY_ID")!
const RAZORPAY_KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET")!
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!

const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET
})

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const {
      action,
      cart,
      address,
      email,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = await req.json()

    // ---------------------------------------------------------
    // ✅ ACTION: CREATE ORDER
    // ---------------------------------------------------------
    if (action === "create_order") {
      if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
        throw new Error("Razorpay keys missing in Supabase secrets");
      }
      let total = 0
      const orderItems: any[] = []

      for (const item of cart) {
        let product
        
        // Handle pre-launch products
        if (item.product.id === 'prelaunch-hux-ring') {
          product = {
            id: 'prelaunch-hux-ring',
            price_inr: item.product.price
          }
        } else {
          const { data: dbProduct, error } = await supabase
            .from("products")
            .select("*")
            .eq("id", item.product.id)
            .single()

          if (error || !dbProduct) throw new Error("Product not found")
          product = dbProduct
        }

        total += product.price_inr * item.quantity

        orderItems.push({
          product_id: product.id,
          color: item.color,
          size: item.size,
          quantity: item.quantity,
          price_at_purchase: product.price_inr
        })
      }

      // ✅ Razorpay REST API ORDER CREATE (NO SDK)
      const auth = Buffer
        .from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`)
        .toString("base64")

      const razorpayRes = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          "Authorization": `Basic ${auth}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          amount: total * 100,
          currency: "INR",
          receipt: `rcpt_${Date.now()}`
        })
      })

      const rawText = await razorpayRes.text()

      console.log("🔴 RAZORPAY STATUS:", razorpayRes.status)
      console.log("🔴 RAZORPAY RAW:", rawText)

      let razorpayData
      try {
        razorpayData = JSON.parse(rawText)
      } catch {
        throw new Error("Razorpay returned non-JSON response")
      }

      if (!razorpayData.id) {
        throw new Error("Razorpay order creation failed → " + rawText)
      }

      // ✅ Generate tracking number first
      const { data: trackingNum } = await supabase.rpc('generate_tracking_number')
      
      // ✅ INSERT ORDER with tracking number
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert({
          total_amount: total,
          status: "Pending",
          shipping_address: address,
          guest_email: email,
          razorpay_order_id: razorpayData.id,
          tracking_number: trackingNum
        })
        .select()
        .single()

      if (orderError) throw orderError

      // ✅ INSERT ORDER ITEMS
      const itemsToInsert = orderItems.map((i) => ({
        ...i,
        order_id: orderData.id
      }))

      await supabase.from("order_items").insert(itemsToInsert)

      return new Response(
        JSON.stringify({
          orderId: orderData.id,
          razorpayOrderId: razorpayData.id,
          amount: total * 100,
          currency: "INR",
          key: RAZORPAY_KEY_ID
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    // ---------------------------------------------------------
    // ✅ ACTION: VERIFY PAYMENT (WebCrypto)
    // ---------------------------------------------------------
    if (action === "verify_payment") {
      const payload = razorpay_order_id + "|" + razorpay_payment_id

      const key = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(RAZORPAY_KEY_SECRET),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
      )

      const signatureBuffer = await crypto.subtle.sign(
        "HMAC",
        key,
        new TextEncoder().encode(payload)
      )

      const generated_signature = Array.from(
        new Uint8Array(signatureBuffer)
      )
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")

      if (generated_signature !== razorpay_signature) {
        return new Response(
          JSON.stringify({ status: "failure", message: "Signature mismatch" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        )
      }

      // ✅ UPDATE ORDER STATUS
      const { data: order } = await supabase
        .from("orders")
        .update({ status: "Processing" })
        .eq("razorpay_order_id", razorpay_order_id)
        .select()
        .single()

      if (order) {
        await supabase.from("payments").insert({
          order_id: order.id,
          razorpay_payment_id,
          razorpay_signature,
          amount: order.total_amount,
          status: "success"
        })
      }

      return new Response(
        JSON.stringify({ status: "success", orderId: order?.id }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    throw new Error("Invalid Action")

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  }
})
