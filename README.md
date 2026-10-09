# AI Appointment Booking Agent

A professional, Vercel-ready AI receptionist demo by **SK DEV TEAM**, built with Next.js, TypeScript, Tailwind CSS, and ElevenLabs Conversational AI.

## Features
- Responsive dark landing page
- Optional ElevenLabs voice widget
- Fictional sample appointment slots with clear DEMO MODE messaging
- Health endpoint at `/api/health`
- Next.js App Router and Vercel deployment configuration

## Local development
1. Install Node.js 20 or later.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local`.
4. Optionally set `NEXT_PUBLIC_ELEVENLABS_AGENT_ID` to your public ElevenLabs agent ID.
5. Run `npm run dev` and open http://localhost:3000.

## Deploy on Vercel
Import this repository into Vercel and select the Next.js framework. If your ElevenLabs agent is configured, add `NEXT_PUBLIC_ELEVENLABS_AGENT_ID` under Project Settings → Environment Variables, then deploy.

## Demo safety
The sample slots (Monday 10 AM, Tuesday 2 PM, Wednesday 4 PM) are fictional. This version does not save or create real appointments. Never place private API keys in `NEXT_PUBLIC_*` variables or commit `.env.local`. Real bookings require a verified backend, database, availability checks, and server-side validation.

## Maintainer
**SK DEV TEAM** · AI Agents · Web Development · Business Automation
