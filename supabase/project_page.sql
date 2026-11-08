-- Run this migration in the Supabase SQL Editor.
-- Replace YOUR_ADMIN_USER_UUID with the dashboard administrator's auth.users.id.

create table if not exists public.project_page_settings (
  id boolean primary key default true check (id),
  eyebrow text not null default 'Selected work',
  title text not null default 'Explore My Projects',
  description text not null default 'Choose a category to discover the work, process, and ideas behind each project.',
  updated_at timestamptz not null default now()
);

insert into public.project_page_settings (id)
values (true)
on conflict (id) do nothing;

create table if not exists public.project_page_categories (
  id uuid primary key default gen_random_uuid(),
  card_number text not null default '',
  title text not null,
  description text not null default '',
  image_url text not null default '',
  href text not null,
  image_alt text not null default '',
  sort_order integer not null default 0,
  visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint project_page_categories_href_unique unique (href)
);

insert into public.project_page_categories
  (card_number, title, description, image_url, href, image_alt, sort_order)
values
  ('01', 'UI/UX Design', 'Digital products and interfaces designed around real people.', '', '/uiux', 'UI/UX design project preview', 1),
  ('02', 'Graphic Design', 'Visual identities, campaigns, and creative design work.', '', '/graphicdesign', 'Graphic design project preview', 2),
  ('03', '3D Modeling', 'Detailed 3D concepts, environments, and product visuals.', '', '/3dmodeling', '3D modeling project preview', 3)
on conflict (href) do nothing;

grant select on public.project_page_settings, public.project_page_categories to anon, authenticated;
grant insert, update, delete on public.project_page_settings, public.project_page_categories to authenticated;

alter table public.project_page_settings enable row level security;
alter table public.project_page_categories enable row level security;

drop policy if exists "portfolio_read_project_page_settings" on public.project_page_settings;
create policy "portfolio_read_project_page_settings"
  on public.project_page_settings for select to anon, authenticated
  using (true);

drop policy if exists "dashboard_admin_project_page_settings" on public.project_page_settings;
create policy "dashboard_admin_project_page_settings"
  on public.project_page_settings for all to authenticated
  using (auth.uid() = 'ad4b8c0c-ac26-4103-aecc-60a0b2da0498'::uuid)
  with check (auth.uid() = 'ad4b8c0c-ac26-4103-aecc-60a0b2da0498'::uuid);

drop policy if exists "portfolio_read_visible_project_page_categories" on public.project_page_categories;
create policy "portfolio_read_visible_project_page_categories"
  on public.project_page_categories for select to anon, authenticated
  using (visible = true);

drop policy if exists "dashboard_admin_project_page_categories" on public.project_page_categories;
create policy "dashboard_admin_project_page_categories"
  on public.project_page_categories for all to authenticated
  using (auth.uid() = 'ad4b8c0c-ac26-4103-aecc-60a0b2da0498'::uuid)
  with check (auth.uid() = 'ad4b8c0c-ac26-4103-aecc-60a0b2da0498'::uuid);
