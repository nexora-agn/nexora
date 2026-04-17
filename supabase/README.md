# Supabase setup

This folder contains the database schema for the Webready admin dashboard.

## One-time setup

1. Create a new Supabase project at [supabase.com](https://supabase.com).
2. Copy the project URL and anon key into `.env.local` (see `.env.example` in the repo root). Keep `service_role` key private.
3. Open **SQL Editor → New query**, paste the contents of [`schema.sql`](./schema.sql), and run it. This creates the `profiles`, `clients`, and `drafts` tables, the `client-assets` storage bucket, and all Row Level Security policies.
4. Create your first sales-team user:
   - **Authentication → Users → Add user** (email + password, confirm email automatically).
   - The `profiles` row is created automatically by a trigger, with role `sales`.
5. (Optional) Promote a user to admin so they can see every rep's clients:
   ```sql
   update public.profiles set role = 'admin' where id = (
     select id from auth.users where email = 'you@yourcompany.com'
   );
   ```

## What the schema does

- `profiles`: one row per Supabase-auth user, with `role` = `sales` or `admin`.
- `clients`: the end customers that a sales rep is selling to. Each is owned by the rep that created it.
- `drafts`: one-to-one with `clients` — holds the current theme + content JSON that drives the live preview and ZIP export.
- `client-assets` storage bucket: uploaded logos and images, publicly readable (so the live preview and exported ZIP can load them), but only writable by the client's owner.
- Row Level Security is enforced on every table: sales reps only see their own clients and drafts; admins see everything.
