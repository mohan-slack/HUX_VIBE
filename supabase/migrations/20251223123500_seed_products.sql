-- products.id is GENERATED ALWAYS; override to restore the expected ID used by frontend
insert into public.products (id, name, slug, description, price_inr, is_active)
overriding system value
values
  (3, 'HUX Smart Ring', 'hux-smart-ring', 'Intelligence. Worn.', 12999, true)
on conflict (id) do update set
  name = excluded.name,
  slug = excluded.slug,
  description = excluded.description,
  price_inr = excluded.price_inr,
  is_active = excluded.is_active;

