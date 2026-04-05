-- Run in Supabase SQL Editor if you already have the old appointments table
-- (single unique constraint on date + time only). Safe to run once.

alter table public.appointments
  add column if not exists service_type text,
  add column if not exists barber_name text;

update public.appointments
set service_type = coalesce(service_type, 'Legacy booking')
where service_type is null;

update public.appointments
set barber_name = coalesce(barber_name, 'Unassigned')
where barber_name is null;

alter table public.appointments alter column service_type set not null;
alter table public.appointments alter column barber_name set not null;

alter table public.appointments drop constraint if exists appointments_date_time_unique;
alter table public.appointments drop constraint if exists appointments_date_time_barber_unique;

alter table public.appointments
  add constraint appointments_date_time_barber_unique
  unique (appointment_date, time_slot, barber_name);
