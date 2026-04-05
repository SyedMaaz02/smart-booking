"use server";

import { revalidatePath } from "next/cache";

import type { BookAppointmentState } from "@/lib/book-appointment-state";
import { isValidBarberName } from "@/lib/barbers";
import { isValidServiceName } from "@/lib/services";
import { createAdminClient } from "@/lib/supabase/admin";

export async function bookAppointment(
  _prev: BookAppointmentState | undefined,
  formData: FormData
): Promise<BookAppointmentState> {
  const user_name = String(formData.get("user_name") ?? "").trim();
  const user_email = String(formData.get("user_email") ?? "").trim();
  const date = String(formData.get("date") ?? "").trim();
  const time_slot = String(formData.get("time_slot") ?? "").trim();
  const service_type = String(formData.get("service_type") ?? "").trim();
  const barber_name = String(formData.get("barber_name") ?? "").trim();

  if (!user_name || !user_email || !date || !time_slot || !service_type || !barber_name) {
    return { ok: false, message: "Please complete every field." };
  }

  if (!isValidServiceName(service_type)) {
    return { ok: false, message: "Please choose a valid service." };
  }

  if (!isValidBarberName(barber_name)) {
    return { ok: false, message: "Please choose a valid barber." };
  }

  const supabase = createAdminClient();

  const { data: taken, error: checkError } = await supabase
    .from("appointments")
    .select("id")
    .eq("appointment_date", date)
    .eq("time_slot", time_slot)
    .eq("barber_name", barber_name)
    .maybeSingle();

  if (checkError) {
    return { ok: false, message: checkError.message };
  }

  if (taken) {
    return {
      ok: false,
      message: "That barber is already booked at this date and time.",
    };
  }

  const { error: insertError } = await supabase.from("appointments").insert({
    user_name,
    user_email,
    appointment_date: date,
    time_slot,
    service_type,
    barber_name,
  });

  if (insertError) {
    if (insertError.code === "23505") {
      return {
        ok: false,
        message: "That slot was just taken. Please choose another time or barber.",
      };
    }
    return { ok: false, message: insertError.message };
  }

  revalidatePath("/dashboard");
  return { ok: true, message: "You are booked. See you soon!" };
}
