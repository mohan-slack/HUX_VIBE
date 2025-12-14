-- Add UPDATE policies for orders
CREATE POLICY "Enable update access for all users" ON orders FOR UPDATE USING (true);

-- Also add INSERT policies if missing
CREATE POLICY "Enable insert access for all users" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert access for all users" ON order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert access for all users" ON payments FOR INSERT WITH CHECK (true);