-- =====================================================================
-- Patch (run in Supabase SQL Editor if you already applied an older
-- `schema.sql` that used `using (true)` for project_requests SELECT/UPDATE)
-- Safe to re-run: policies are dropped and recreated.
-- =====================================================================

create or replace function public.is_staff()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'sales')
  );
$$;

grant execute on function public.is_staff() to authenticated, anon;

drop policy if exists "project_requests_staff_select" on public.project_requests;
drop policy if exists "project_requests_staff_update" on public.project_requests;

create policy "project_requests_staff_select"
  on public.project_requests for select
  to authenticated
  using (public.is_staff());

create policy "project_requests_staff_update"
  on public.project_requests for update
  to authenticated
  using (public.is_staff())
  with check (public.is_staff() and status in ('new', 'in_progress', 'completed'));

comment on table public.project_requests is
  'Inbound start-project form submissions. payload jsonb must store the full wizard payload.';
