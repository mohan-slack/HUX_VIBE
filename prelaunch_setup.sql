-- Insert pre-launch product
INSERT INTO products (name, price_inr, description)
SELECT 'HUX Smart Ring - Pre-Launch', 2000, 'Pre-launch booking for HUX Smart Ring. Pay ₹2,000 now, ₹8,000 at shipping.'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'HUX Smart Ring - Pre-Launch');