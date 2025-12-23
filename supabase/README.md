# Supabase Database Guide

## Layout
- `schema.sql` – canonical dump from `supabase db pull` (currently a placeholder; export from live once linked).
- `migrations/` – Supabase CLI migrations (empty in repo).
- `sql/schema/` – hand-written schema changes (`01_base_tables.sql`, `02_tracking_numbers.sql`).
- `sql/seeds/` – data seeds (`01_insert_primary_product.sql`, `02_insert_prelaunch_product.sql`).
- `sql/maintenance/` – one-off fixes/resets (RLS resets, policy fixes, tracking policies, etc.).
- `sql/diagnostics/` – read-only sanity queries (`01_check_core_tables.sql`).
- `functions/` – edge functions (e.g., `hux-pay`).

## Current known objects (from scripts/code)
- Tables: `products`, `orders`, `order_items`, `payments`, `support_tickets` (referenced in policy reset).
- Function: `generate_tracking_number()` (used by the `hux-pay` edge function).
- Policies: multiple RLS resets/allow-all variants live under `sql/maintenance/10_*`–`15_*`.

## How to inspect the live database
1) Install CLI: `npm i -g supabase`
2) Login: `supabase login` (needs SUPABASE_ACCESS_TOKEN)  
3) Link project: `supabase link --project-ref <project-ref>`  
4) Pull current schema: `supabase db pull --project-ref <project-ref> --schema public --debug --output supabase/schema.sql`  
5) (Optional) See table list quickly: `supabase db remote list`  

## Keeping local scripts in sync
- To diff live vs local: `supabase db diff --use-migra --linked --schema public --file supabase/migrations/$(date +"%Y%m%d%H%M%S")_sync.sql`
- To apply local SQL manually (useful before creating migrations):
  - Schema: run `sql/schema/01_base_tables.sql` then `02_tracking_numbers.sql`
  - Seeds: run `sql/seeds/*.sql`
  - Maintenance: run only when fixing RLS/permissions; they are not part of normal deploys.
  - Diagnostics: read-only checks; safe to run anytime.

## Notes
- No credentials/project-ref were available here, so the live tables were not queried. Once provided, run the pull command above to populate `schema.sql` and confirm alignment with the reorganized scripts.
- Prefer recording changes as Supabase migrations after verifying against the live project. The manual scripts remain for targeted fixes and seeds.

