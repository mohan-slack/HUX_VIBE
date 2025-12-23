create extension if not exists "pgcrypto";

alter table public.orders
  add column if not exists user_email text,
  add column if not exists guest_email text,
  add column if not exists shipping_address jsonb,
  add column if not exists total_amount numeric,
  add column if not exists subtotal_inr numeric default 0,
  add column if not exists total_inr numeric default 0,
  add column if not exists status text default 'created',
  add column if not exists razorpay_order_id text,
  add column if not exists payment_status text default 'pending',
  add column if not exists order_status text default 'created',
  add column if not exists created_at timestamptz default now();

alter table public.orders
  alter column total_amount set default 0,
  alter column subtotal_inr set default 0,
  alter column total_inr set default 0;

alter table public.order_items
  add column if not exists order_id uuid,
  add column if not exists product_id uuid,
  add column if not exists color text,
  add column if not exists size text,
  add column if not exists quantity integer default 1,
  add column if not exists price_at_purchase numeric default 0,
  add column if not exists created_at timestamptz default now();

alter table public.order_items
  alter column quantity set default 1,
  alter column price_at_purchase set default 0;

alter table public.payments
  add column if not exists order_id uuid,
  add column if not exists razorpay_payment_id text,
  add column if not exists razorpay_signature text,
  add column if not exists amount numeric default 0,
  add column if not exists status text default 'pending',
  add column if not exists created_at timestamptz default now();

alter table public.payments
  alter column amount set default 0;

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'orders'
      and column_name = 'order_public_id'
  ) and not exists (
    select 1
    from pg_attrdef def
    join pg_class c on c.oid = def.adrelid
    join pg_namespace n on n.oid = c.relnamespace
    join pg_attribute a on a.attrelid = c.oid and a.attnum = def.adnum
    where n.nspname = 'public'
      and c.relname = 'orders'
      and a.attname = 'order_public_id'
  ) then
    execute 'alter table public.orders alter column order_public_id set default gen_random_uuid()';
  end if;
end $$;

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'orders'
      and column_name = 'user_email'
      and is_nullable = 'NO'
  ) then
    execute 'alter table public.orders alter column user_email drop not null';
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'orders'
      and column_name = 'guest_email'
      and is_nullable = 'NO'
  ) then
    execute 'alter table public.orders alter column guest_email drop not null';
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'orders'
      and column_name = 'shipping_address'
      and is_nullable = 'NO'
  ) then
    execute 'alter table public.orders alter column shipping_address drop not null';
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'orders'
      and column_name = 'total_amount'
      and is_nullable = 'NO'
  ) then
    execute 'alter table public.orders alter column total_amount drop not null';
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'orders'
      and column_name = 'total_inr'
      and is_nullable = 'NO'
  ) then
    execute 'alter table public.orders alter column total_inr drop not null';
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'orders'
      and column_name = 'subtotal_inr'
      and is_nullable = 'NO'
  ) then
    execute 'alter table public.orders alter column subtotal_inr drop not null';
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'orders'
      and column_name = 'status'
      and is_nullable = 'NO'
  ) then
    execute 'alter table public.orders alter column status drop not null';
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'orders'
      and column_name = 'razorpay_order_id'
      and is_nullable = 'NO'
  ) then
    execute 'alter table public.orders alter column razorpay_order_id drop not null';
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'orders'
      and column_name = 'payment_status'
      and is_nullable = 'NO'
  ) then
    execute 'alter table public.orders alter column payment_status drop not null';
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'orders'
      and column_name = 'order_status'
      and is_nullable = 'NO'
  ) then
    execute 'alter table public.orders alter column order_status drop not null';
  end if;
end $$;

do $$
declare
  col record;
begin
  for col in
    select c.column_name, c.data_type
    from information_schema.columns c
    where c.table_schema = 'public'
      and c.table_name = 'orders'
      and c.is_nullable = 'NO'
      and c.column_name not in (
        select kcu.column_name
        from information_schema.table_constraints tc
        join information_schema.key_column_usage kcu
          on tc.constraint_name = kcu.constraint_name
         and tc.table_schema = kcu.table_schema
        where tc.table_schema = 'public'
          and tc.table_name = 'orders'
          and tc.constraint_type = 'PRIMARY KEY'
      )
  loop
    execute format('alter table public.orders alter column %I drop not null', col.column_name);
    if col.data_type in ('numeric','integer','bigint','smallint','decimal','real','double precision') then
      execute format('alter table public.orders alter column %I set default 0', col.column_name);
    end if;
  end loop;
end $$;

do $$
declare
  col record;
begin
  for col in
    select c.column_name, c.data_type
    from information_schema.columns c
    where c.table_schema = 'public'
      and c.table_name = 'order_items'
      and c.is_nullable = 'NO'
      and c.column_name not in (
        select kcu.column_name
        from information_schema.table_constraints tc
        join information_schema.key_column_usage kcu
          on tc.constraint_name = kcu.constraint_name
         and tc.table_schema = kcu.table_schema
        where tc.table_schema = 'public'
          and tc.table_name = 'order_items'
          and tc.constraint_type = 'PRIMARY KEY'
      )
  loop
    execute format('alter table public.order_items alter column %I drop not null', col.column_name);
    if col.data_type in ('numeric','integer','bigint','smallint','decimal','real','double precision') then
      execute format('alter table public.order_items alter column %I set default 0', col.column_name);
    end if;
  end loop;
end $$;

do $$
declare
  col record;
begin
  for col in
    select c.column_name, c.data_type
    from information_schema.columns c
    where c.table_schema = 'public'
      and c.table_name = 'payments'
      and c.is_nullable = 'NO'
      and c.column_name not in (
        select kcu.column_name
        from information_schema.table_constraints tc
        join information_schema.key_column_usage kcu
          on tc.constraint_name = kcu.constraint_name
         and tc.table_schema = kcu.table_schema
        where tc.table_schema = 'public'
          and tc.table_name = 'payments'
          and tc.constraint_type = 'PRIMARY KEY'
      )
  loop
    execute format('alter table public.payments alter column %I drop not null', col.column_name);
    if col.data_type in ('numeric','integer','bigint','smallint','decimal','real','double precision') then
      execute format('alter table public.payments alter column %I set default 0', col.column_name);
    end if;
  end loop;
end $$;

do $$
declare
  col record;
begin
  for col in
    select c.column_name, c.data_type
    from information_schema.columns c
    where c.table_schema = 'public'
      and c.table_name = 'support_tickets'
      and c.is_nullable = 'NO'
      and c.column_name not in (
        select kcu.column_name
        from information_schema.table_constraints tc
        join information_schema.key_column_usage kcu
          on tc.constraint_name = kcu.constraint_name
         and tc.table_schema = kcu.table_schema
        where tc.table_schema = 'public'
          and tc.table_name = 'support_tickets'
          and tc.constraint_type = 'PRIMARY KEY'
      )
  loop
    execute format('alter table public.support_tickets alter column %I drop not null', col.column_name);
    if col.data_type in ('numeric','integer','bigint','smallint','decimal','real','double precision') then
      execute format('alter table public.support_tickets alter column %I set default 0', col.column_name);
    end if;
  end loop;
end $$;

alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.payments enable row level security;
alter table public.support_tickets enable row level security;
alter table public.products enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'orders' and policyname = 'orders_insert_all'
  ) then
    create policy "orders_insert_all" on public.orders
      for insert
      with check (true);
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'orders' and policyname = 'orders_select_by_email'
  ) then
    create policy "orders_select_by_email" on public.orders
      for select
      using (user_email = auth.jwt()->>'email');
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'orders' and policyname = 'orders_service_role_all'
  ) then
    create policy "orders_service_role_all" on public.orders
      for all
      using (auth.role() = 'service_role')
      with check (auth.role() = 'service_role');
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'order_items' and policyname = 'order_items_insert_all'
  ) then
    create policy "order_items_insert_all" on public.order_items
      for insert
      with check (true);
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'order_items' and policyname = 'order_items_select_by_email'
  ) then
    create policy "order_items_select_by_email" on public.order_items
      for select
      using (
        exists (
          select 1
          from public.orders o
          where o.id = order_items.order_id
            and o.user_email = auth.jwt()->>'email'
        )
      );
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'order_items' and policyname = 'order_items_service_role_all'
  ) then
    create policy "order_items_service_role_all" on public.order_items
      for all
      using (auth.role() = 'service_role')
      with check (auth.role() = 'service_role');
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'payments' and policyname = 'payments_insert_all'
  ) then
    create policy "payments_insert_all" on public.payments
      for insert
      with check (true);
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'payments' and policyname = 'payments_select_by_email'
  ) then
    create policy "payments_select_by_email" on public.payments
      for select
      using (
        exists (
          select 1
          from public.orders o
          where o.id = payments.order_id
            and o.user_email = auth.jwt()->>'email'
        )
      );
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'payments' and policyname = 'payments_service_role_all'
  ) then
    create policy "payments_service_role_all" on public.payments
      for all
      using (auth.role() = 'service_role')
      with check (auth.role() = 'service_role');
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'support_tickets' and policyname = 'support_tickets_insert_all'
  ) then
    create policy "support_tickets_insert_all" on public.support_tickets
      for insert
      with check (true);
  end if;
end $$;

do $$
declare
  support_order_col text;
  has_user_email boolean;
begin
  select column_name into support_order_col
  from information_schema.columns
  where table_schema = 'public'
    and table_name = 'support_tickets'
    and column_name in ('order_id','orderid','orderId','orderID')
  order by case column_name when 'order_id' then 1 else 2 end
  limit 1;

  select exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'support_tickets'
      and column_name = 'user_email'
  ) into has_user_email;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'support_tickets' and policyname = 'support_tickets_select_by_email'
  ) then
    if support_order_col is not null then
      execute format(
        'create policy "support_tickets_select_by_email" on public.support_tickets
         for select
         using (
           exists (
             select 1
             from public.orders o
             where o.id = %I
               and o.user_email = auth.jwt()->>''email''
           )
         )', support_order_col);
    elsif has_user_email then
      execute '
        create policy "support_tickets_select_by_email" on public.support_tickets
          for select
          using (user_email = auth.jwt()->>''email'')';
    else
      execute '
        create policy "support_tickets_select_by_email" on public.support_tickets
          for select
          using (false)';
    end if;
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'support_tickets' and policyname = 'support_tickets_service_role_all'
  ) then
    create policy "support_tickets_service_role_all" on public.support_tickets
      for all
      using (auth.role() = 'service_role')
      with check (auth.role() = 'service_role');
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'products' and policyname = 'products_public_select'
  ) then
    create policy "products_public_select" on public.products
      for select
      using (true);
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'products' and policyname = 'products_service_role_all'
  ) then
    create policy "products_service_role_all" on public.products
      for all
      using (auth.role() = 'service_role')
      with check (auth.role() = 'service_role');
  end if;
end $$;

grant select, insert, update, delete on all tables in schema public to service_role;
alter default privileges in schema public grant select, insert, update, delete on tables to service_role;
