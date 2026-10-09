# AI Appointment Booking Agent

A skincare clinic website and appointment-request system by **SK DEV TEAM**, built with Next.js, TypeScript, Tailwind CSS, Supabase, and ElevenLabs Conversational AI.

## Current features
- Responsive skincare clinic landing page and service cards
- Appointment request form with server-side validation
- Supabase-backed pending appointment records and schedule checks
- Database exclusion constraint to prevent overlapping active appointments for the same practitioner
- Optional ElevenLabs voice widget
- Health endpoint at `/api/health`

## Required environment variables
- `SUPABASE_URL` — Supabase project URL
- `SUPABASE_SECRET_KEY` — server-only Supabase secret key; never use a `NEXT_PUBLIC_` prefix
- `NEXT_PUBLIC_ELEVENLABS_AGENT_ID` — public ElevenLabs Agent ID for the embedded widget

Optional private-agent fallback:
- `ELEVENLABS_AGENT_ID`
- `ELEVENLABS_API_KEY` — server-side only

## Local development
1. Install Node.js 20 or later.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and set the required variables.
4. Run `npm run dev` and open http://localhost:3000.

## Important production setup
- Update the placeholder clinic name, practitioner details, and opening hours before public launch.
- The form creates **pending requests**, not confirmed appointments. Staff must confirm them in the separate Clinic-Admin dashboard.
- The ElevenLabs agent currently provides conversational assistance only. It is **not connected to the booking database** until a secure tool/webhook integration is implemented and tested.
- Create a Supabase Auth user for the administrator and add that user's UUID to `public.admin_users`.
- Never commit `.env.local`, expose secret keys in `NEXT_PUBLIC_*`, or use real patient information for tests.

## Checks
The GitHub Actions workflow runs TypeScript checks and a production build on pushes and pull requests to `main`.

## Maintainer
**SK DEV TEAM** · AI Agents · Web Development · Business Automation
