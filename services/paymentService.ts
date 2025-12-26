// Example: Call from React component (Checkout.tsx or similar)

import { supabase } from '../lib/supabaseClient'

// 1. CREATE ORDER
async function createOrder(cart: any[], address: string, email: string) {
  const { data, error } = await supabase.functions.invoke('hux-pay', {
    body: {
      action: 'create_order',
      cart,
      address,
      email
    }
  })

  if (error) throw error
  return data // { orderId, razorpayOrderId, amount, currency, key }
}

// 2. VERIFY PAYMENT (after Razorpay success)
async function verifyPayment(razorpay_order_id: string, razorpay_payment_id: string, razorpay_signature: string) {
  const { data, error } = await supabase.functions.invoke('hux-pay', {
    body: {
      action: 'verify_payment',
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    }
  })

  if (error) throw error
  return data // { status: 'success', orderId }
}

// 3. PAYMENT FAILED
async function notifyPaymentFailed(orderId: string, amount: number, email: string) {
  await supabase.functions.invoke('hux-pay', {
    body: {
      action: 'payment_failed',
      orderId,
      amount,
      email
    }
  })
}

// 4. VIP SIGNUP
async function sendVIPEmail(email: string) {
  await supabase.functions.invoke('hux-pay', {
    body: {
      action: 'vip_signup',
      email
    }
  })
}

export { createOrder, verifyPayment, notifyPaymentFailed, sendVIPEmail }
