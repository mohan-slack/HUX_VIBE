
  create table "public"."addresses" (
    "id" bigint generated always as identity not null,
    "user_email" text not null,
    "line1" text not null,
    "line2" text,
    "city" text not null,
    "state" text not null,
    "pincode" text not null,
    "country" text not null default 'India'::text,
    "phone" text,
    "created_at" timestamp with time zone default now()
      );



  create table "public"."order_items" (
    "id" bigint generated always as identity not null,
    "order_id" bigint default 0,
    "product_id" bigint default 0,
    "product_name_snapshot" text,
    "unit_price_inr" integer default 0,
    "quantity" integer default 1,
    "created_at" timestamp with time zone default now(),
    "color" text,
    "size" text,
    "price_at_purchase" numeric default 0
      );



  create table "public"."orders" (
    "id" bigint generated always as identity not null,
    "order_public_id" text default gen_random_uuid(),
    "user_email" text,
    "address_id" bigint,
    "status" text default 'pending'::text,
    "payment_status" text default 'pending'::text,
    "subtotal_inr" integer default 0,
    "shipping_inr" integer default 0,
    "total_inr" integer default 0,
    "created_at" timestamp with time zone default now(),
    "guest_email" text,
    "razorpay_order_id" text,
    "order_status" text default 'created'::text,
    "shipping_address" jsonb,
    "total_amount" numeric default 0,
    "primary_color" text,
    "primary_size" integer,
    "tracking_number" text
      );



  create table "public"."payments" (
    "id" bigint generated always as identity not null,
    "order_id" bigint default 0,
    "razorpay_order_id" text,
    "razorpay_payment_id" text,
    "razorpay_signature" text,
    "status" text default 'created'::text,
    "amount_inr" integer default 0,
    "method" text,
    "created_at" timestamp with time zone default now(),
    "amount" numeric default 0
      );



  create table "public"."products" (
    "id" bigint generated always as identity not null,
    "name" text not null,
    "slug" text,
    "description" text,
    "price_inr" integer not null,
    "is_active" boolean not null default true,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );



  create table "public"."support_tickets" (
    "id" bigint generated always as identity not null,
    "ticket_public_id" text,
    "user_email" text,
    "subject" text,
    "message" text,
    "status" text default 'open'::text,
    "created_at" timestamp with time zone default now(),
    "guest_email" text
      );


alter table "public"."support_tickets" enable row level security;


  create table "public"."users" (
    "id" uuid not null default gen_random_uuid(),
    "auth_user_id" uuid,
    "email" text,
    "created_at" timestamp with time zone default now()
      );


CREATE UNIQUE INDEX addresses_pkey ON public.addresses USING btree (id);

CREATE INDEX idx_orders_user_email ON public.orders USING btree (user_email);

CREATE INDEX idx_payments_order_id ON public.payments USING btree (order_id);

CREATE INDEX idx_support_tickets_email ON public.support_tickets USING btree (user_email);

CREATE UNIQUE INDEX order_items_pkey ON public.order_items USING btree (id);

CREATE UNIQUE INDEX orders_order_public_id_key ON public.orders USING btree (order_public_id);

CREATE UNIQUE INDEX orders_pkey ON public.orders USING btree (id);

CREATE UNIQUE INDEX orders_tracking_number_key ON public.orders USING btree (tracking_number);

CREATE UNIQUE INDEX payments_pkey ON public.payments USING btree (id);

CREATE UNIQUE INDEX products_pkey ON public.products USING btree (id);

CREATE UNIQUE INDEX products_slug_key ON public.products USING btree (slug);

CREATE UNIQUE INDEX support_tickets_pkey ON public.support_tickets USING btree (id);

CREATE UNIQUE INDEX support_tickets_ticket_public_id_key ON public.support_tickets USING btree (ticket_public_id);

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

alter table "public"."addresses" add constraint "addresses_pkey" PRIMARY KEY using index "addresses_pkey";

alter table "public"."order_items" add constraint "order_items_pkey" PRIMARY KEY using index "order_items_pkey";

alter table "public"."orders" add constraint "orders_pkey" PRIMARY KEY using index "orders_pkey";

alter table "public"."payments" add constraint "payments_pkey" PRIMARY KEY using index "payments_pkey";

alter table "public"."products" add constraint "products_pkey" PRIMARY KEY using index "products_pkey";

alter table "public"."support_tickets" add constraint "support_tickets_pkey" PRIMARY KEY using index "support_tickets_pkey";

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."order_items" add constraint "order_items_order_id_fkey" FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE not valid;

alter table "public"."order_items" validate constraint "order_items_order_id_fkey";

alter table "public"."order_items" add constraint "order_items_product_id_fkey" FOREIGN KEY (product_id) REFERENCES public.products(id) not valid;

alter table "public"."order_items" validate constraint "order_items_product_id_fkey";

alter table "public"."orders" add constraint "orders_address_id_fkey" FOREIGN KEY (address_id) REFERENCES public.addresses(id) ON DELETE SET NULL not valid;

alter table "public"."orders" validate constraint "orders_address_id_fkey";

alter table "public"."orders" add constraint "orders_order_public_id_key" UNIQUE using index "orders_order_public_id_key";

alter table "public"."orders" add constraint "orders_tracking_number_key" UNIQUE using index "orders_tracking_number_key";

alter table "public"."payments" add constraint "payments_order_id_fkey" FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE not valid;

alter table "public"."payments" validate constraint "payments_order_id_fkey";

alter table "public"."products" add constraint "products_slug_key" UNIQUE using index "products_slug_key";

alter table "public"."support_tickets" add constraint "support_tickets_ticket_public_id_key" UNIQUE using index "support_tickets_ticket_public_id_key";

alter table "public"."users" add constraint "users_auth_user_id_fkey" FOREIGN KEY (auth_user_id) REFERENCES auth.users(id) ON DELETE SET NULL not valid;

alter table "public"."users" validate constraint "users_auth_user_id_fkey";

alter table "public"."users" add constraint "users_email_key" UNIQUE using index "users_email_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.generate_tracking_number()
 RETURNS text
 LANGUAGE plpgsql
AS $function$
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
$function$
;

grant delete on table "public"."addresses" to "anon";

grant insert on table "public"."addresses" to "anon";

grant references on table "public"."addresses" to "anon";

grant select on table "public"."addresses" to "anon";

grant trigger on table "public"."addresses" to "anon";

grant truncate on table "public"."addresses" to "anon";

grant update on table "public"."addresses" to "anon";

grant delete on table "public"."addresses" to "authenticated";

grant insert on table "public"."addresses" to "authenticated";

grant references on table "public"."addresses" to "authenticated";

grant select on table "public"."addresses" to "authenticated";

grant trigger on table "public"."addresses" to "authenticated";

grant truncate on table "public"."addresses" to "authenticated";

grant update on table "public"."addresses" to "authenticated";

grant delete on table "public"."addresses" to "service_role";

grant insert on table "public"."addresses" to "service_role";

grant references on table "public"."addresses" to "service_role";

grant select on table "public"."addresses" to "service_role";

grant trigger on table "public"."addresses" to "service_role";

grant truncate on table "public"."addresses" to "service_role";

grant update on table "public"."addresses" to "service_role";

grant delete on table "public"."order_items" to "anon";

grant insert on table "public"."order_items" to "anon";

grant references on table "public"."order_items" to "anon";

grant select on table "public"."order_items" to "anon";

grant trigger on table "public"."order_items" to "anon";

grant truncate on table "public"."order_items" to "anon";

grant update on table "public"."order_items" to "anon";

grant delete on table "public"."order_items" to "authenticated";

grant insert on table "public"."order_items" to "authenticated";

grant references on table "public"."order_items" to "authenticated";

grant select on table "public"."order_items" to "authenticated";

grant trigger on table "public"."order_items" to "authenticated";

grant truncate on table "public"."order_items" to "authenticated";

grant update on table "public"."order_items" to "authenticated";

grant delete on table "public"."order_items" to "service_role";

grant insert on table "public"."order_items" to "service_role";

grant references on table "public"."order_items" to "service_role";

grant select on table "public"."order_items" to "service_role";

grant trigger on table "public"."order_items" to "service_role";

grant truncate on table "public"."order_items" to "service_role";

grant update on table "public"."order_items" to "service_role";

grant delete on table "public"."orders" to "anon";

grant insert on table "public"."orders" to "anon";

grant references on table "public"."orders" to "anon";

grant select on table "public"."orders" to "anon";

grant trigger on table "public"."orders" to "anon";

grant truncate on table "public"."orders" to "anon";

grant update on table "public"."orders" to "anon";

grant delete on table "public"."orders" to "authenticated";

grant insert on table "public"."orders" to "authenticated";

grant references on table "public"."orders" to "authenticated";

grant select on table "public"."orders" to "authenticated";

grant trigger on table "public"."orders" to "authenticated";

grant truncate on table "public"."orders" to "authenticated";

grant update on table "public"."orders" to "authenticated";

grant delete on table "public"."orders" to "service_role";

grant insert on table "public"."orders" to "service_role";

grant references on table "public"."orders" to "service_role";

grant select on table "public"."orders" to "service_role";

grant trigger on table "public"."orders" to "service_role";

grant truncate on table "public"."orders" to "service_role";

grant update on table "public"."orders" to "service_role";

grant delete on table "public"."payments" to "anon";

grant insert on table "public"."payments" to "anon";

grant references on table "public"."payments" to "anon";

grant select on table "public"."payments" to "anon";

grant trigger on table "public"."payments" to "anon";

grant truncate on table "public"."payments" to "anon";

grant update on table "public"."payments" to "anon";

grant delete on table "public"."payments" to "authenticated";

grant insert on table "public"."payments" to "authenticated";

grant references on table "public"."payments" to "authenticated";

grant select on table "public"."payments" to "authenticated";

grant trigger on table "public"."payments" to "authenticated";

grant truncate on table "public"."payments" to "authenticated";

grant update on table "public"."payments" to "authenticated";

grant delete on table "public"."payments" to "service_role";

grant insert on table "public"."payments" to "service_role";

grant references on table "public"."payments" to "service_role";

grant select on table "public"."payments" to "service_role";

grant trigger on table "public"."payments" to "service_role";

grant truncate on table "public"."payments" to "service_role";

grant update on table "public"."payments" to "service_role";

grant delete on table "public"."products" to "anon";

grant insert on table "public"."products" to "anon";

grant references on table "public"."products" to "anon";

grant select on table "public"."products" to "anon";

grant trigger on table "public"."products" to "anon";

grant truncate on table "public"."products" to "anon";

grant update on table "public"."products" to "anon";

grant delete on table "public"."products" to "authenticated";

grant insert on table "public"."products" to "authenticated";

grant references on table "public"."products" to "authenticated";

grant select on table "public"."products" to "authenticated";

grant trigger on table "public"."products" to "authenticated";

grant truncate on table "public"."products" to "authenticated";

grant update on table "public"."products" to "authenticated";

grant delete on table "public"."products" to "service_role";

grant insert on table "public"."products" to "service_role";

grant references on table "public"."products" to "service_role";

grant select on table "public"."products" to "service_role";

grant trigger on table "public"."products" to "service_role";

grant truncate on table "public"."products" to "service_role";

grant update on table "public"."products" to "service_role";

grant delete on table "public"."support_tickets" to "anon";

grant insert on table "public"."support_tickets" to "anon";

grant references on table "public"."support_tickets" to "anon";

grant select on table "public"."support_tickets" to "anon";

grant trigger on table "public"."support_tickets" to "anon";

grant truncate on table "public"."support_tickets" to "anon";

grant update on table "public"."support_tickets" to "anon";

grant delete on table "public"."support_tickets" to "authenticated";

grant insert on table "public"."support_tickets" to "authenticated";

grant references on table "public"."support_tickets" to "authenticated";

grant select on table "public"."support_tickets" to "authenticated";

grant trigger on table "public"."support_tickets" to "authenticated";

grant truncate on table "public"."support_tickets" to "authenticated";

grant update on table "public"."support_tickets" to "authenticated";

grant delete on table "public"."support_tickets" to "service_role";

grant insert on table "public"."support_tickets" to "service_role";

grant references on table "public"."support_tickets" to "service_role";

grant select on table "public"."support_tickets" to "service_role";

grant trigger on table "public"."support_tickets" to "service_role";

grant truncate on table "public"."support_tickets" to "service_role";

grant update on table "public"."support_tickets" to "service_role";

grant delete on table "public"."users" to "anon";

grant insert on table "public"."users" to "anon";

grant references on table "public"."users" to "anon";

grant select on table "public"."users" to "anon";

grant trigger on table "public"."users" to "anon";

grant truncate on table "public"."users" to "anon";

grant update on table "public"."users" to "anon";

grant delete on table "public"."users" to "authenticated";

grant insert on table "public"."users" to "authenticated";

grant references on table "public"."users" to "authenticated";

grant select on table "public"."users" to "authenticated";

grant trigger on table "public"."users" to "authenticated";

grant truncate on table "public"."users" to "authenticated";

grant update on table "public"."users" to "authenticated";

grant delete on table "public"."users" to "service_role";

grant insert on table "public"."users" to "service_role";

grant references on table "public"."users" to "service_role";

grant select on table "public"."users" to "service_role";

grant trigger on table "public"."users" to "service_role";

grant truncate on table "public"."users" to "service_role";

grant update on table "public"."users" to "service_role";


  create policy "Allow all for anon"
  on "public"."order_items"
  as permissive
  for all
  to anon
using (true)
with check (true);



  create policy "guest_insert_order_items"
  on "public"."order_items"
  as permissive
  for insert
  to public
with check (true);



  create policy "order_items_insert_all"
  on "public"."order_items"
  as permissive
  for insert
  to public
with check (true);



  create policy "order_items_insert_any_user"
  on "public"."order_items"
  as permissive
  for insert
  to public
with check (true);



  create policy "order_items_select_by_email"
  on "public"."order_items"
  as permissive
  for select
  to public
using ((EXISTS ( SELECT 1
   FROM public.orders o
  WHERE ((o.id = order_items.order_id) AND (o.user_email = (auth.jwt() ->> 'email'::text))))));



  create policy "order_items_select_own"
  on "public"."order_items"
  as permissive
  for select
  to public
using (((auth.role() = 'service_role'::text) OR (EXISTS ( SELECT 1
   FROM public.orders o
  WHERE ((o.id = order_items.order_id) AND (o.user_email = (auth.jwt() ->> 'email'::text)))))));



  create policy "order_items_service_role_all"
  on "public"."order_items"
  as permissive
  for all
  to public
using ((auth.role() = 'service_role'::text))
with check ((auth.role() = 'service_role'::text));



  create policy "Allow all for anon"
  on "public"."orders"
  as permissive
  for all
  to anon
using (true)
with check (true);



  create policy "guest_insert_orders"
  on "public"."orders"
  as permissive
  for insert
  to public
with check (true);



  create policy "guest_read_own_orders"
  on "public"."orders"
  as permissive
  for select
  to public
using (((guest_email = ((current_setting('request.jwt.claims'::text, true))::json ->> 'email'::text)) OR (guest_email IS NOT NULL)));



  create policy "orders_insert_all"
  on "public"."orders"
  as permissive
  for insert
  to public
with check (true);



  create policy "orders_insert_any_user"
  on "public"."orders"
  as permissive
  for insert
  to public
with check (true);



  create policy "orders_select_by_email"
  on "public"."orders"
  as permissive
  for select
  to public
using ((user_email = (auth.jwt() ->> 'email'::text)));



  create policy "orders_select_own"
  on "public"."orders"
  as permissive
  for select
  to public
using (((auth.role() = 'service_role'::text) OR (user_email = (auth.jwt() ->> 'email'::text))));



  create policy "orders_service_role_all"
  on "public"."orders"
  as permissive
  for all
  to public
using ((auth.role() = 'service_role'::text))
with check ((auth.role() = 'service_role'::text));



  create policy "Allow all for anon"
  on "public"."payments"
  as permissive
  for all
  to anon
using (true)
with check (true);



  create policy "guest_insert_payments"
  on "public"."payments"
  as permissive
  for insert
  to public
with check (true);



  create policy "payments_insert_all"
  on "public"."payments"
  as permissive
  for insert
  to public
with check (true);



  create policy "payments_insert_any_user"
  on "public"."payments"
  as permissive
  for insert
  to public
with check (true);



  create policy "payments_select_by_email"
  on "public"."payments"
  as permissive
  for select
  to public
using ((EXISTS ( SELECT 1
   FROM public.orders o
  WHERE ((o.id = payments.order_id) AND (o.user_email = (auth.jwt() ->> 'email'::text))))));



  create policy "payments_select_own"
  on "public"."payments"
  as permissive
  for select
  to public
using (((auth.role() = 'service_role'::text) OR (EXISTS ( SELECT 1
   FROM public.orders o
  WHERE ((o.id = payments.order_id) AND (o.user_email = (auth.jwt() ->> 'email'::text)))))));



  create policy "payments_service_role_all"
  on "public"."payments"
  as permissive
  for all
  to public
using ((auth.role() = 'service_role'::text))
with check ((auth.role() = 'service_role'::text));



  create policy "Allow all for anon"
  on "public"."products"
  as permissive
  for all
  to anon
using (true)
with check (true);



  create policy "products_public_read"
  on "public"."products"
  as permissive
  for select
  to public
using (true);



  create policy "products_public_select"
  on "public"."products"
  as permissive
  for select
  to public
using (true);



  create policy "products_service_role_all"
  on "public"."products"
  as permissive
  for all
  to public
using ((auth.role() = 'service_role'::text))
with check ((auth.role() = 'service_role'::text));



  create policy "public_read_products"
  on "public"."products"
  as permissive
  for select
  to public
using (true);



  create policy "guest_insert_support"
  on "public"."support_tickets"
  as permissive
  for insert
  to public
with check (true);



  create policy "guest_read_own_support"
  on "public"."support_tickets"
  as permissive
  for select
  to public
using (((guest_email = ((current_setting('request.jwt.claims'::text, true))::json ->> 'email'::text)) OR (guest_email IS NOT NULL)));



  create policy "support_tickets_insert_all"
  on "public"."support_tickets"
  as permissive
  for insert
  to public
with check (true);



  create policy "support_tickets_select_by_email"
  on "public"."support_tickets"
  as permissive
  for select
  to public
using ((user_email = (auth.jwt() ->> 'email'::text)));



  create policy "support_tickets_service_role_all"
  on "public"."support_tickets"
  as permissive
  for all
  to public
using ((auth.role() = 'service_role'::text))
with check ((auth.role() = 'service_role'::text));



  create policy "tickets_insert_any_user"
  on "public"."support_tickets"
  as permissive
  for insert
  to public
with check (true);



  create policy "tickets_select_own"
  on "public"."support_tickets"
  as permissive
  for select
  to public
using (((auth.role() = 'service_role'::text) OR (user_email = (auth.jwt() ->> 'email'::text))));



