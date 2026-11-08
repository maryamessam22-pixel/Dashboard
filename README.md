# Mariam Farid Dashboard

The dashboard and the portfolio are separate React apps that share the same Supabase project. Dashboard content is saved to Supabase; the portfolio reads published content from those tables.

## Run locally

1. Copy `.env.example` to `.env.local`.
2. Set `REACT_APP_SUPABASE_URL` and `REACT_APP_SUPABASE_ANON_KEY` from the Supabase project's API settings. The publishable/anon key is intended for browser apps; never use a service-role key here.
3. Install dependencies with `npm install`, then run `npm start`.

## Supabase setup

1. In Supabase Authentication, enable email/password sign-in and create the dashboard administrator account.
2. Disable public sign-ups. The dashboard has no sign-up flow; users should be provisioned by the project owner. In Authentication → URL Configuration, allow `http://localhost:3000/reset-password` for local work and the deployed dashboard's `/reset-password` URL for production.
3. Ensure Storage has a public `portfolio-assets` bucket for the public image URLs used by both apps.
4. Keep Row Level Security enabled. In `supabase/policies.sql`, replace `YOUR_ADMIN_USER_UUID` with the administrator's `auth.users.id`, review the policies against any existing policies, and run it in the Supabase SQL Editor. Do not leave any permissive anonymous write policies in place. Never use the service-role key in either frontend.
5. To manage the portfolio Projects landing page, replace `YOUR_ADMIN_USER_UUID` in `supabase/project_page.sql` with the same administrator UUID and run that SQL in the Supabase SQL Editor. It creates the page settings and category tables, seeds the three initial cards, and grants public read access only to visible cards.
6. To enable live dashboard analytics, replace `YOUR_ADMIN_USER_UUID` in `supabase/dashboard_analytics.sql` with the same administrator UUID and run it in the SQL Editor. It enables CV-download and project-detail view tracking and adds `read_at` so opening a contact message marks it read. This migration does not modify existing project records.
7. In Authentication URL Configuration, add the deployed dashboard URL to the allowed site URLs.

The administrator's credentials are managed in Supabase; no dashboard password is stored in source code.

The Projects Page link in the dashboard lets the administrator edit the landing-page heading and cards, upload card images to `portfolio-assets`, change order and visibility, and add or delete categories. The portfolio reads that content from the same Supabase project.

## Deploy the apps to Vercel

Deploy each repository as its own Vercel project:

1. In Vercel, import the `Dashboard` GitHub repository and name the project `mariam-farid-dashboard`. Use the repository root as the project root, Create React App as the framework, `npm run build` as the build command, and `build` as the output directory.
2. Add `REACT_APP_SUPABASE_URL` and `REACT_APP_SUPABASE_ANON_KEY` under Project Settings → Environment Variables for Preview and Production.
3. Deploy. The included `vercel.json` sends app routes to `index.html`, so refreshing dashboard routes continues to work.
4. Import the `portfolio` GitHub repository into a separate Vercel project and set the same two Supabase environment variables there. Configure its build command and output directory the same way.
5. Add both deployed URLs to the Supabase Authentication allowed site URLs. Pushes to the connected GitHub branches will trigger Vercel deployments.

The dashboard saves drafts and published records. Only records marked `published` should be visible on the public portfolio.
