import { serve } from "https://deno.land/std@0.224.0/http/server.ts"

const ZOHO_CLIENT_ID = Deno.env.get("ZOHO_CLIENT_ID")!
const ZOHO_CLIENT_SECRET = Deno.env.get("ZOHO_CLIENT_SECRET")!
const ZOHO_REFRESH_TOKEN = Deno.env.get("ZOHO_REFRESH_TOKEN")!
const ZOHO_ACCOUNT_ID = Deno.env.get("ZOHO_ACCOUNT_ID")!

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
}

async function getAccessToken() {
  const response = await fetch("https://accounts.zoho.in/oauth/v2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      refresh_token: ZOHO_REFRESH_TOKEN,
      client_id: ZOHO_CLIENT_ID,
      client_secret: ZOHO_CLIENT_SECRET,
      grant_type: "refresh_token"
    })
  })
  const data = await response.json()
  console.log("Zoho OAuth Response:", JSON.stringify(data))
  if (!data.access_token) {
    throw new Error(`Failed to get access token: ${JSON.stringify(data)}`)
  }
  return data.access_token
}

async function sendZohoEmail(to: string, from: string, subject: string, html: string) {
  const accessToken = await getAccessToken()
  
  const response = await fetch(`https://mail.zoho.in/api/accounts/${ZOHO_ACCOUNT_ID}/messages`, {
    method: "POST",
    headers: {
      "Authorization": `Zoho-oauthtoken ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      fromAddress: from,
      toAddress: to,
      subject: subject,
      mailFormat: "html",
      content: html
    })
  })
  
  const result = await response.json()
  console.log("Zoho Mail API Response:", response.status, JSON.stringify(result))
  return result
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const { to, from, subject, html } = await req.json()
    console.log("Sending email:", { to, from, subject })
    
    const result = await sendZohoEmail(to, from, subject, html)
    console.log("Email sent successfully")
    
    return new Response(JSON.stringify({ success: true, result }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    })
  } catch (error) {
    console.error("Email error:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    })
  }
})
