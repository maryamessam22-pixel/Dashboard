-- Replace every occurrence of YOUR_ADMIN_USER_UUID with the administrator's
-- auth.users.id before running this in the Supabase SQL Editor.

alter table public."Projects" enable row level security;
alter table public."Blogs" enable row level security;
alter table public.page_sections enable row level security;
alter table public."Skills" enable row level security;
alter table public.work_experience enable row level security;
alter table public.about_sections enable row level security;
alter table public.contact_messages enable row level security;

drop policy if exists "portfolio_read_published_projects" on public."Projects";
create policy "portfolio_read_published_projects"
  on public."Projects" for select to anon, authenticated
  using (status = 'published');
drop policy if exists "dashboard_admin_projects" on public."Projects";
create policy "dashboard_admin_projects"
  on public."Projects" for all to authenticated
  using (auth.uid() = 'YOUR_ADMIN_USER_UUID'::uuid)
  with check (auth.uid() = 'YOUR_ADMIN_USER_UUID'::uuid);

drop policy if exists "portfolio_read_published_blogs" on public."Blogs";
create policy "portfolio_read_published_blogs"
  on public."Blogs" for select to anon, authenticated
  using (status = 'published');
drop policy if exists "dashboard_admin_blogs" on public."Blogs";
create policy "dashboard_admin_blogs"
  on public."Blogs" for all to authenticated
  using (auth.uid() = 'YOUR_ADMIN_USER_UUID'::uuid)
  with check (auth.uid() = 'YOUR_ADMIN_USER_UUID'::uuid);

drop policy if exists "portfolio_read_page_sections" on public.page_sections;
create policy "portfolio_read_page_sections"
  on public.page_sections for select to anon, authenticated
  using (true);
drop policy if exists "dashboard_admin_page_sections" on public.page_sections;
create policy "dashboard_admin_page_sections"
  on public.page_sections for all to authenticated
  using (auth.uid() = 'YOUR_ADMIN_USER_UUID'::uuid)
  with check (auth.uid() = 'YOUR_ADMIN_USER_UUID'::uuid);

drop policy if exists "portfolio_read_skills" on public."Skills";
create policy "portfolio_read_skills"
  on public."Skills" for select to anon, authenticated
  using (true);
drop policy if exists "dashboard_admin_skills" on public."Skills";
create policy "dashboard_admin_skills"
  on public."Skills" for all to authenticated
  using (auth.uid() = 'YOUR_ADMIN_USER_UUID'::uuid)
  with check (auth.uid() = 'YOUR_ADMIN_USER_UUID'::uuid);

drop policy if exists "portfolio_read_work_experience" on public.work_experience;
create policy "portfolio_read_work_experience"
  on public.work_experience for select to anon, authenticated
  using (true);
drop policy if exists "dashboard_admin_work_experience" on public.work_experience;
create policy "dashboard_admin_work_experience"
  on public.work_experience for all to authenticated
  using (auth.uid() = 'YOUR_ADMIN_USER_UUID'::uuid)
  with check (auth.uid() = 'YOUR_ADMIN_USER_UUID'::uuid);

drop policy if exists "portfolio_read_about_sections" on public.about_sections;
create policy "portfolio_read_about_sections"
  on public.about_sections for select to anon, authenticated
  using (true);
drop policy if exists "dashboard_admin_about_sections" on public.about_sections;
create policy "dashboard_admin_about_sections"
  on public.about_sections for all to authenticated
  using (auth.uid() = 'YOUR_ADMIN_USER_UUID'::uuid)
  with check (auth.uid() = 'YOUR_ADMIN_USER_UUID'::uuid);

drop policy if exists "portfolio_submit_contact_messages" on public.contact_messages;
create policy "portfolio_submit_contact_messages"
  on public.contact_messages for insert to anon, authenticated
  with check (true);
drop policy if exists "dashboard_admin_contact_messages" on public.contact_messages;
create policy "dashboard_admin_contact_messages"
  on public.contact_messages for all to authenticated
  using (auth.uid() = 'YOUR_ADMIN_USER_UUID'::uuid)
  with check (auth.uid() = 'YOUR_ADMIN_USER_UUID'::uuid);

drop policy if exists "portfolio_read_assets" on storage.objects;
create policy "portfolio_read_assets"
  on storage.objects for select to public
  using (bucket_id = 'portfolio-assets');
drop policy if exists "dashboard_admin_upload_assets" on storage.objects;
create policy "dashboard_admin_upload_assets"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'portfolio-assets'
    and auth.uid() = 'YOUR_ADMIN_USER_UUID'::uuid
  );
drop policy if exists "dashboard_admin_update_assets" on storage.objects;
create policy "dashboard_admin_update_assets"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'portfolio-assets'
    and auth.uid() = 'YOUR_ADMIN_USER_UUID'::uuid
  )
  with check (
    bucket_id = 'portfolio-assets'
    and auth.uid() = 'YOUR_ADMIN_USER_UUID'::uuid
  );
drop policy if exists "dashboard_admin_delete_assets" on storage.objects;
create policy "dashboard_admin_delete_assets"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'portfolio-assets'
    and auth.uid() = 'YOUR_ADMIN_USER_UUID'::uuid
  );
