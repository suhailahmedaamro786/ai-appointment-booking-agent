-- SK DEV TEAM · Clinic appointment booking schema
-- Run in Supabase SQL Editor. Keep the service-role key server-side only.
create extension if not exists pgcrypto;
create extension if not exists btree_gist;

create type public.appointment_status as enum
  ('pending', 'confirmed', 'reschedule_requested', 'cancelled', 'completed', 'no_show');
create type public.notification_channel as enum ('email', 'whatsapp');
create type public.notification_status as enum ('queued', 'processing', 'sent', 'failed');

create table public.clinic_settings (
  id uuid primary key default gen_random_uuid(),
  clinic_name text not null default 'Clinic',
  timezone text not null default 'Asia/Karachi',
  owner_email text,
  owner_whatsapp text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.doctors (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  specialty text not null default 'General Consultation',
  active boolean not null default true,
  slot_minutes integer not null default 30 check (slot_minutes between 5 and 240),
  created_at timestamptz not null default now()
);

create table public.doctor_availability (
  id uuid primary key default gen_random_uuid(),
  doctor_id uuid not null references public.doctors(id) on delete cascade,
  weekday smallint not null check (weekday between 0 and 6),
  start_time time not null,
  end_time time not null,
  active boolean not null default true,
  check (end_time > start_time),
  unique (doctor_id, weekday, start_time, end_time)
);

create table public.appointments (
  id uuid primary key default gen_random_uuid(),
  confirmation_code text not null unique default (
    'CL-' || upper(substr(encode(gen_random_bytes(8), 'hex'), 1, 8))
  ),
  patient_name text not null check (char_length(trim(patient_name)) between 2 and 120),
  patient_phone text not null check (char_length(trim(patient_phone)) between 7 and 30),
  patient_email text,
  doctor_id uuid not null references public.doctors(id),
  service_name text not null default 'General Consultation',
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status public.appointment_status not null default 'pending',
  patient_timezone text not null default 'Asia/Karachi',
  source text not null default 'website' check (source in ('website', 'elevenlabs', 'admin')),
  elevenlabs_conversation_id text,
  patient_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_at > starts_at),
  check (patient_email is null or char_length(patient_email) <= 254),
  -- Prevent overlapping live bookings for the same doctor.
  exclude using gist (
    doctor_id with =,
    tstzrange(starts_at, ends_at, '[)') with &&
  ) where (status in ('pending', 'confirmed', 'reschedule_requested'))
);

create index appointments_start_idx on public.appointments (starts_at);
create index appointments_status_idx on public.appointments (status, starts_at);
create index appointments_phone_idx on public.appointments (patient_phone);

create table public.notification_outbox (
  id uuid primary key default gen_random_uuid(),
  appointment_id uuid not null references public.appointments(id) on delete cascade,
  channel public.notification_channel not null,
  recipient text not null,
  template_key text not null,
  status public.notification_status not null default 'queued',
  attempts integer not null default 0,
  last_error text,
  provider_message_id text,
  created_at timestamptz not null default now(),
  sent_at timestamptz,
  unique (appointment_id, channel, template_key)
);

create table public.admin_users (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid not null unique references auth.users(id) on delete cascade,
  role text not null default 'clinic_admin' check (role in ('clinic_admin', 'receptionist')),
  created_at timestamptz not null default now()
);

-- Browser clients get no direct access to patient records. Access data only
-- through authenticated admin APIs or server-side service-role operations.
alter table public.clinic_settings enable row level security;
alter table public.doctors enable row level security;
alter table public.doctor_availability enable row level security;
alter table public.appointments enable row level security;
alter table public.notification_outbox enable row level security;
alter table public.admin_users enable row level security;

-- No public policies are intentionally created. Supabase service-role calls
-- from trusted server code bypass RLS; admin APIs must verify the signed-in user
-- against admin_users before returning or modifying patient records.
