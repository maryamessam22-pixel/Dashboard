-- Run this migration in the shared Supabase project.
-- Replace YOUR_ADMIN_USER_UUID with the dashboard administrator's auth.users.id.

alter table public.contact_messages
  add column if not exists read_at timestamptz;

create table if not exists public.portfolio_analytics (
  id bigint generated always as identity primary key,
  event_type text not null check (event_type in ('cv_download', 'project_view')),
  project_id bigint references public."Projects"(id) on delete set null,
  created_at timestamptz not null default now(),
  constraint portfolio_analytics_event_project_check check (
    (event_type = 'cv_download' and project_id is null)
    or (event_type = 'project_view' and project_id is not null)
  )
);

create index if not exists portfolio_analytics_event_created_at_idx
  on public.portfolio_analytics (event_type, created_at desc);
create index if not exists portfolio_analytics_project_created_at_idx
  on public.portfolio_analytics (project_id, created_at desc)
  where event_type = 'project_view';

alter table public.portfolio_analytics enable row level security;
grant select on public.portfolio_analytics to authenticated;

drop policy if exists "dashboard_admin_read_portfolio_analytics" on public.portfolio_analytics;
create policy "dashboard_admin_read_portfolio_analytics"
  on public.portfolio_analytics for select to authenticated
  using (auth.uid() = 'ad4b8c0c-ac26-4103-aecc-60a0b2da0498'::uuid);

create or replace function public.record_portfolio_event(
  p_event_type text,
  p_project_id bigint default null
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if p_event_type = 'cv_download' and p_project_id is null then
    insert into public.portfolio_analytics (event_type)
    values ('cv_download');
  elsif p_event_type = 'project_view' and p_project_id is not null then
    if not exists (
      select 1
      from public."Projects"
      where id = p_project_id and status = 'published'
    ) then
      raise exception 'Published project not found';
    end if;

    insert into public.portfolio_analytics (event_type, project_id)
    values ('project_view', p_project_id);
  else
    raise exception 'Unsupported portfolio event';
  end if;
end;
$$;

revoke all on function public.record_portfolio_event(text, bigint) from public;
grant execute on function public.record_portfolio_event(text, bigint) to anon, authenticated;
