-- Check current orders in database
SELECT id, status, total_amount, razorpay_order_id, created_at 
FROM orders 
ORDER BY created_at DESC 
LIMIT 10;

-- Check products table
SELECT id, name, price_inr FROM products;

-- Check order_items
SELECT oi.*, o.status as order_status 
FROM order_items oi 
JOIN orders o ON oi.order_id = o.id 
ORDER BY oi.created_at DESC 
LIMIT 10;

-- Check payments
SELECT p.*, o.status as order_status 
FROM payments p 
JOIN orders o ON p.order_id = o.id 
ORDER BY p.created_at DESC 
LIMIT 10;