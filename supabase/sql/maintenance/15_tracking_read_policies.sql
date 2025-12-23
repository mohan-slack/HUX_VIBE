-- Add RLS policies for order tracking
CREATE POLICY "Allow public read access to orders" ON orders FOR SELECT USING (true);
CREATE POLICY "Allow public read access to order_items" ON order_items FOR SELECT USING (true);
CREATE POLICY "Allow public read access to payments" ON payments FOR SELECT USING (true);