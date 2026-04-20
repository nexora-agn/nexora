-- =====================================================================
-- Webready admin dashboard — Supabase schema
-- Run this ONCE in Supabase → SQL Editor → New query → paste → Run.
-- =====================================================================

-- Required extensions ------------------------------------------------------
create extension if not exists "pgcrypto";

-- profiles: one row per authenticated user -------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users on delete cascade,
  full_name   text,
  role        text not null default 'sales' check (role in ('admin', 'sales')),
  created_at  timestamptz not null default now()
);

-- auto-create a profile for every new auth user
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
    'sales'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- clients: each sales client (end customer) the rep is selling to --------
create table if not exists public.clients (
  id             uuid primary key default gen_random_uuid(),
  owner_id       uuid not null references public.profiles(id) on delete cascade,
  name           text not null,
  contact_email  text,
  contact_phone  text,
  notes          text,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index if not exists clients_owner_idx on public.clients(owner_id, updated_at desc);

-- drafts: current working copy of the client's website customizations ---
create table if not exists public.drafts (
  id          uuid primary key default gen_random_uuid(),
  client_id   uuid not null unique references public.clients(id) on delete cascade,
  theme       jsonb not null default '{}'::jsonb,
  content     jsonb not null default '{}'::jsonb,
  -- Free-form notes from the sales agent for the dev team (extra features
  -- a client asked for, edge cases, follow-ups, etc.). Visible on the admin
  -- panel so devs see it when preparing the final delivery.
  notes       text  not null default '',
  version     int   not null default 1,
  updated_at  timestamptz not null default now()
);

-- Safe to re-run on an existing deployment: add the column if it's missing.
alter table public.drafts
  add column if not exists notes text not null default '';

-- bump updated_at on row changes
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

drop trigger if exists clients_touch on public.clients;
create trigger clients_touch before update on public.clients
  for each row execute function public.touch_updated_at();

drop trigger if exists drafts_touch on public.drafts;
create trigger drafts_touch before update on public.drafts
  for each row execute function public.touch_updated_at();

-- Row Level Security -----------------------------------------------------
alter table public.profiles enable row level security;
alter table public.clients  enable row level security;
alter table public.drafts   enable row level security;

-- SECURITY DEFINER helper so admin checks don't re-trigger RLS on profiles
-- (which would cause "infinite recursion detected in policy"). Runs as the
-- function owner (postgres) and bypasses RLS inside its own query.
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  );
$$;

grant execute on function public.is_admin() to authenticated, anon;

-- profiles: a user can read/update only their own row; admins can read all
drop policy if exists "profiles_self_read"   on public.profiles;
drop policy if exists "profiles_self_update" on public.profiles;
drop policy if exists "profiles_admin_read"  on public.profiles;

create policy "profiles_self_read"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_self_update"
  on public.profiles for update
  using (auth.uid() = id);

create policy "profiles_admin_read"
  on public.profiles for select
  using (public.is_admin());

-- clients: sales sees only their own; admins see all
drop policy if exists "clients_owner_all" on public.clients;
drop policy if exists "clients_admin_all" on public.clients;

create policy "clients_owner_all"
  on public.clients for all
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

create policy "clients_admin_all"
  on public.clients for all
  using (public.is_admin())
  with check (public.is_admin());

-- drafts: accessible if you own the parent client (or are admin)
drop policy if exists "drafts_owner_all" on public.drafts;
drop policy if exists "drafts_admin_all" on public.drafts;

create policy "drafts_owner_all"
  on public.drafts for all
  using (exists (select 1 from public.clients c where c.id = client_id and c.owner_id = auth.uid()))
  with check (exists (select 1 from public.clients c where c.id = client_id and c.owner_id = auth.uid()));

create policy "drafts_admin_all"
  on public.drafts for all
  using (public.is_admin())
  with check (public.is_admin());

-- Storage bucket for client assets (logos, uploaded images) --------------
-- The bucket is public (read-only URLs) so the preview iframe and ZIP export can load images.
-- Uploads are gated by RLS on storage.objects below.
insert into storage.buckets (id, name, public)
values ('client-assets', 'client-assets', true)
on conflict (id) do nothing;

-- Allow any authenticated user to upload into client-assets/<clientId>/
-- AND only if they own the client.
drop policy if exists "assets_read_public"   on storage.objects;
drop policy if exists "assets_owner_write"   on storage.objects;
drop policy if exists "assets_owner_update"  on storage.objects;
drop policy if exists "assets_owner_delete"  on storage.objects;

create policy "assets_read_public"
  on storage.objects for select
  using (bucket_id = 'client-assets');

create policy "assets_owner_write"
  on storage.objects for insert
  with check (
    bucket_id = 'client-assets'
    and auth.role() = 'authenticated'
    and exists (
      select 1 from public.clients c
      where c.id::text = split_part(name, '/', 1)
        and (c.owner_id = auth.uid() or public.is_admin())
    )
  );

create policy "assets_owner_update"
  on storage.objects for update
  using (
    bucket_id = 'client-assets'
    and exists (
      select 1 from public.clients c
      where c.id::text = split_part(name, '/', 1)
        and (c.owner_id = auth.uid() or public.is_admin())
    )
  );

create policy "assets_owner_delete"
  on storage.objects for delete
  using (
    bucket_id = 'client-assets'
    and exists (
      select 1 from public.clients c
      where c.id::text = split_part(name, '/', 1)
        and (c.owner_id = auth.uid() or public.is_admin())
    )
  );
