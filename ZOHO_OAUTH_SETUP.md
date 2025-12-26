# ZOHO OAUTH SETUP GUIDE

## Problem
Email sending fails with: `invalid_client_secret`

## Solution: Get New Zoho OAuth Credentials

### Step 1: Go to Zoho API Console
https://api-console.zoho.in/

### Step 2: Create Self Client
1. Click "Add Client" → "Self Client"
2. Name: "HUX Email Service"
3. Click "Create"
4. You'll get:
   - **Client ID** (starts with 1000.xxx)
   - **Client Secret** (long string)

### Step 3: Generate Refresh Token
1. Open this URL in browser (replace CLIENT_ID):
```
https://accounts.zoho.in/oauth/v2/auth?scope=ZohoMail.messages.CREATE,ZohoMail.accounts.READ&client_id=YOUR_CLIENT_ID&response_type=code&access_type=offline&redirect_uri=https://www.zoho.com/
```

2. Authorize the app
3. You'll be redirected to a URL like: `https://www.zoho.com/?code=1000.xxx`
4. Copy the **code** from URL

### Step 4: Exchange Code for Refresh Token
Run this curl command (replace CLIENT_ID, CLIENT_SECRET, CODE):
```bash
curl -X POST https://accounts.zoho.in/oauth/v2/token \
  -d "code=YOUR_CODE" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "client_secret=YOUR_CLIENT_SECRET" \
  -d "redirect_uri=https://www.zoho.com/" \
  -d "grant_type=authorization_code"
```

Response will contain:
```json
{
  "access_token": "...",
  "refresh_token": "1000.xxx",  // ← YOU NEED THIS
  "expires_in": 3600
}
```

### Step 5: Get Account ID
Run this curl (replace ACCESS_TOKEN from above):
```bash
curl -X GET https://mail.zohoapis.in/api/accounts \
  -H "Authorization: Zoho-oauthtoken YOUR_ACCESS_TOKEN"
```

Response:
```json
{
  "data": [
    {
      "accountId": "4709356000000002002",  // ← YOU NEED THIS
      "accountName": "orders@hux.co.in"
    }
  ]
}
```

### Step 6: Set Supabase Secrets
```bash
cd /Users/mohanreddy/viveon/MainApp/HUX_VIBE

supabase secrets set ZOHO_CLIENT_ID=<your_client_id>
supabase secrets set ZOHO_CLIENT_SECRET=<your_client_secret>
supabase secrets set ZOHO_REFRESH_TOKEN=<your_refresh_token>
supabase secrets set ZOHO_ACCOUNT_ID=<your_account_id>
```

### Step 7: Redeploy
```bash
supabase functions deploy send-email --no-verify-jwt
```

### Step 8: Test
Make a test payment and check logs.

---

## Quick Fix (If you already have credentials)
Just update the CLIENT_SECRET:
```bash
supabase secrets set ZOHO_CLIENT_SECRET=<paste_actual_secret_here>
supabase functions deploy send-email --no-verify-jwt
```
