-- Wipe all data from public tables (retain schema).
truncate table
  public.order_items,
  public.payments,
  public.orders,
  public.support_tickets,
  public.addresses,
  public.products,
  public.users
restart identity cascade;

