-- Insert the HUX Smart Ring product
INSERT INTO products (id, name, price_inr, description)
VALUES (
  'hux-silver-frost',
  'HUX Smart Ring',
  12999,
  'A masterclass in miniaturization. The HUX Smart Ring combines Titanium Alloy durability with Liquid Glass elegance.'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price_inr = EXCLUDED.price_inr,
  description = EXCLUDED.description;
