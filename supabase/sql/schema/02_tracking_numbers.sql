-- Add tracking_number column to orders table
ALTER TABLE orders ADD COLUMN IF NOT EXISTS tracking_number TEXT UNIQUE;

-- Create function to generate tracking numbers
CREATE OR REPLACE FUNCTION generate_tracking_number()
RETURNS TEXT AS $$
DECLARE
    tracking_num TEXT;
    exists_check INTEGER;
BEGIN
    LOOP
        -- Generate HUX + 5 random digits
        tracking_num := 'HUX' || LPAD(FLOOR(RANDOM() * 100000)::TEXT, 5, '0');
        
        -- Check if this tracking number already exists
        SELECT COUNT(*) INTO exists_check 
        FROM orders 
        WHERE tracking_number = tracking_num;
        
        -- If unique, exit loop
        IF exists_check = 0 THEN
            EXIT;
        END IF;
    END LOOP;
    
    RETURN tracking_num;
END;
$$ LANGUAGE plpgsql;

-- Update existing orders to have tracking numbers
UPDATE orders 
SET tracking_number = generate_tracking_number() 
WHERE tracking_number IS NULL;