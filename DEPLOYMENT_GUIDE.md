# DEPLOYMENT & TESTING GUIDE

## 1. SET SUPABASE SECRETS

```bash
cd /Users/mohanreddy/viveon/MainApp/HUX_VIBE

# Razorpay credentials
supabase secrets set RAZORPAY_KEY_ID=<>
supabase secrets set RAZORPAY_KEY_SECRET=<>

# Zoho OAuth credentials (for email via Zoho Mail API)
supabase secrets set ZOHO_CLIENT_ID=<>
supabase secrets set ZOHO_CLIENT_SECRET=<>
supabase secrets set ZOHO_REFRESH_TOKEN=<>
supabase secrets set ZOHO_ACCOUNT_ID=<>
```

**Note:** SMTP credentials are no longer used. Emails are sent via Zoho Mail API using OAuth2.

## 2. DEPLOY EDGE FUNCTIONS

```bash
# Deploy payment processing function
supabase functions deploy hux-pay --no-verify-jwt

# Deploy email sending function
supabase functions deploy send-email --no-verify-jwt
```

**IMPORTANT:** The `--no-verify-jwt` flag is required to allow requests from frontend without JWT validation.

## 3. TEST LOCALLY

### Start Dev Server
```bash
npm run dev
```

### Test Flow 1: Regular Order
1. Go to http://localhost:5173
2. Add product to cart
3. Go to checkout
4. Fill shipping details
5. Select payment method
6. Complete payment
7. Check email: orders@hux.co.in should send confirmation

### Test Flow 2: Pre-Launch Booking
1. Go to http://localhost:5173/pre-launch
2. Click "Book Now for ₹2,000"
3. Fill booking form
4. Check email: vip@hux.co.in should send VIP confirmation
5. Complete checkout
6. Check email: orders@hux.co.in should send order confirmation

### Test Flow 3: Payment Failure
1. Start checkout
2. Use Razorpay test card that fails
3. Check email: payments@hux.co.in should send failure notification

## 4. VERIFY EMAILS

Check these inboxes:
- orders@hux.co.in → Order confirmations
- vip@hux.co.in → VIP signups
- payments@hux.co.in → Payment failures

All reply to: support@hux.co.in

## 5. PRODUCTION DEPLOYMENT

### Vercel
```bash
# Set environment variables in Vercel Dashboard
VITE_SUPABASE_URL=https://igbkbvxfuuyvrvlufljg.supabase.co
VITE_SUPABASE_ANON_KEY=<>
VITE_RAZORPAY_KEY_ID=<>
VITE_GEMINI_API_KEY=<>
VITE_OPENAI_API_KEY=sk-proj-...
VITE_OPENAI_MODEL=gpt-4o-mini

# Deploy
npm run build
vercel --prod
```

### Supabase (already done in step 1-2)
- Secrets set via CLI
- Edge function deployed

## 6. TROUBLESHOOTING

### Edge function not working
```bash
# Redeploy both functions with no JWT verification
supabase functions deploy hux-pay --no-verify-jwt
supabase functions deploy send-email --no-verify-jwt

# Check function URLs in Supabase Dashboard
# hux-pay: https://igbkbvxfuuyvrvlufljg.supabase.co/functions/v1/hux-pay
# send-email: https://igbkbvxfuuyvrvlufljg.supabase.co/functions/v1/send-email
```

**401 Error Fix:** Always deploy with `--no-verify-jwt` flag

### Email not sending
**Check Supabase Logs:**
1. Go to https://supabase.com/dashboard/project/igbkbvxfuuyvrvlufljg/functions
2. Click on `send-email` function → Logs tab
3. Look for errors:
   - `invalid_client_secret` → Wrong ZOHO_CLIENT_SECRET
   - `DNS error` → Wrong API domain (should be mail.zoho.in)
   - `EXTRA_KEY_FOUND_IN_JSON` → Wrong API payload format

**Common Issues:**
- Zoho OAuth credentials expired → Regenerate refresh token (see ZOHO_OAUTH_SETUP.md)
- Wrong API endpoint → Must use `https://mail.zoho.in/api/accounts/...`
- Wrong payload format → Use `mailFormat: "html"` not `contentType`

### Payment failing
- Verify Razorpay keys (test vs live)
- Check Razorpay dashboard for webhook logs
- Verify signature generation in edge function
- Check hux-pay function logs for Razorpay API errors

## 7. TEST RAZORPAY PAYMENTS

**Test Mode:** Use PhonePe/UPI with test phone number
- Phone: Any 10-digit number
- OTP: 123456 (test mode)

**Card Testing (may not work in test mode):**
- Card: 4111 1111 1111 1111
- CVV: 123
- Expiry: Any future date

**Note:** Razorpay test mode works best with UPI/PhonePe simulation.
