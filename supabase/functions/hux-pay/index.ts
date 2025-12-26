import { serve } from "https://deno.land/std@0.224.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { Buffer } from "node:buffer"

const RAZORPAY_KEY_ID = Deno.env.get("RAZORPAY_KEY_ID")!
const RAZORPAY_KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET")!
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!

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
    const body = await req.json()
    const { action, cart, address, email, razorpay_order_id, razorpay_payment_id, razorpay_signature } = body

    console.log("Action:", action)
    console.log("Has RAZORPAY_KEY_SECRET:", !!RAZORPAY_KEY_SECRET)

    if (action === "create_order") {
      let total = 0
      const orderItems: any[] = []

      for (const item of cart) {
        let product
        
        if (item.product.id === 'prelaunch-hux-ring') {
          product = { id: 'prelaunch-hux-ring', price_inr: item.product.price }
        } else {
          const { data: dbProduct, error } = await supabase.from("products").select("*").eq("id", item.product.id).single()
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

      const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString("base64")
      const razorpayRes = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: { "Authorization": `Basic ${auth}`, "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total * 100, currency: "INR", receipt: `rcpt_${Date.now()}` })
      })

      const razorpayData = await razorpayRes.json()
      console.log("Razorpay Response Status:", razorpayRes.status)
      console.log("Razorpay Response Data:", JSON.stringify(razorpayData))
      
      if (!razorpayData.id) {
        throw new Error(`Razorpay order creation failed: ${JSON.stringify(razorpayData)}`)
      }

      const { data: trackingNum } = await supabase.rpc('generate_tracking_number')
      const { data: orderData, error: orderError } = await supabase.from("orders").insert({
        total_amount: total,
        status: "Pending",
        shipping_address: address,
        guest_email: email,
        razorpay_order_id: razorpayData.id,
        tracking_number: trackingNum
      }).select().single()

      if (orderError) throw orderError

      await supabase.from("order_items").insert(orderItems.map(i => ({ ...i, order_id: orderData.id })))

      return new Response(JSON.stringify({
        orderId: orderData.id,
        razorpayOrderId: razorpayData.id,
        amount: total * 100,
        currency: "INR",
        key: RAZORPAY_KEY_ID
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } })
    }

    if (action === "verify_payment") {
      const payload = razorpay_order_id + "|" + razorpay_payment_id
      const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(RAZORPAY_KEY_SECRET), { name: "HMAC", hash: "SHA-256" }, false, ["sign"])
      const signatureBuffer = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload))
      const generated_signature = Array.from(new Uint8Array(signatureBuffer)).map(b => b.toString(16).padStart(2, "0")).join("")

      if (generated_signature !== razorpay_signature) {
        return new Response(JSON.stringify({ status: "failure", message: "Signature mismatch" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } })
      }

      const { data: order } = await supabase.from("orders").update({ status: "Processing" }).eq("razorpay_order_id", razorpay_order_id).select().single()

      if (order) {
        await supabase.from("payments").insert({
          order_id: order.id,
          razorpay_payment_id,
          razorpay_signature,
          amount: order.total_amount,
          status: "success"
        })

        const { data: items } = await supabase.from("order_items").select("*").eq("order_id", order.id)
        const itemsHtml = items?.map(i => `<li>${i.quantity}x ${i.product_id} (${i.color}, Size ${i.size}) - ₹${i.price_at_purchase}</li>`).join("") || ""
        
        const html = `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto"><h2 style="color:#02b3d9">Order Confirmed!</h2><p><strong>Order ID:</strong> ${order.id}</p><p><strong>Tracking:</strong> ${order.tracking_number}</p><p><strong>Total:</strong> ₹${order.total_amount}</p><h3>Items:</h3><ul>${itemsHtml}</ul><p style="color:#666;margin-top:30px">Thank you for choosing HUX.</p></div>`
        
        fetch(`${SUPABASE_URL}/functions/v1/send-email`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}` },
          body: JSON.stringify({ to: order.guest_email, from: "orders@hux.co.in", subject: "Order Confirmed - HUX Smart Ring", html })
        }).catch(e => console.error("Email trigger error:", e))
      }

      return new Response(JSON.stringify({ status: "success", orderId: order?.tracking_number || order?.id }), { headers: { ...corsHeaders, "Content-Type": "application/json" } })
    }

    if (action === "vip_signup") {
      const { email: vipEmail } = body
      const html = `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto"><h2 style="color:#02b3d9">Welcome to HUX VIP!</h2><p>Thank you for joining our exclusive pre-launch program.</p><p>You'll be the first to know when HUX Smart Ring launches.</p><p style="color:#666;margin-top:30px">Stay tuned!</p></div>`
      
      fetch(`${SUPABASE_URL}/functions/v1/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}` },
        body: JSON.stringify({ to: vipEmail, from: "vip@hux.co.in", subject: "Welcome to HUX VIP Pre-Launch", html })
      }).catch(e => console.error("Email trigger error:", e))
      
      return new Response(JSON.stringify({ status: "email_sent" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } })
    }

    throw new Error("Invalid Action")

  } catch (error) {
    console.error("Error:", error)
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } })
  }
})
