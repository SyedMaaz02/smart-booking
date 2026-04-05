-- Smart Booking System — run in Supabase SQL Editor
-- Replace 'admin@yourdomain.com' with the email you use for Supabase Auth (your admin account).

create extension if not exists "pgcrypto";

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  user_name text not null,
  user_email text not null,
  appointment_date date not null,
  time_slot text not null,
  service_type text not null,
  barber_name text not null,
  constraint appointments_date_time_barber_unique unique (appointment_date, time_slot, barber_name)
);

create index if not exists appointments_appointment_date_idx
  on public.appointments (appointment_date);

alter table public.appointments enable row level security;

-- Bookings are inserted from Next.js Server Actions using the service role key (bypasses RLS).
-- Do not grant broad SELECT/INSERT to anon — keeps appointment data private.

-- Only your admin email can read rows (dashboard). Change the email string below.
create policy "Admin email can read appointments"
  on public.appointments
  for select
  to authenticated
  using (
    lower((auth.jwt() ->> 'email')) = lower('admin@yourdomain.com')
  );

-- Optional: allow admin to delete/cancel (same email check)
create policy "Admin email can delete appointments"
  on public.appointments
  for delete
  to authenticated
  using (
    lower((auth.jwt() ->> 'email')) = lower('admin@yourdomain.com')
  );
