"use client";

import { format, startOfDay } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

import { bookAppointment } from "@/app/actions/book-appointment";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bookAppointmentInitialState } from "@/lib/book-appointment-state";
import { BARBERS } from "@/lib/barbers";
import { getServiceById, SERVICES } from "@/lib/services";
import { TIME_SLOTS } from "@/lib/time-slots";

export function BookingForm() {
  const searchParams = useSearchParams();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<string>("");
  const [serviceName, setServiceName] = useState(SERVICES[0]!.name);
  const [barberName, setBarberName] = useState(BARBERS[0]!.name);
  const [state, formAction, pending] = useActionState(
    bookAppointment,
    bookAppointmentInitialState
  );

  const serviceParam = searchParams.get("service");
  useEffect(() => {
    const fromUrl = getServiceById(serviceParam);
    if (fromUrl) {
      setServiceName(fromUrl.name);
    }
  }, [serviceParam]);

  const selectedService = SERVICES.find((s) => s.name === serviceName) ?? SERVICES[0]!;

  useEffect(() => {
    if (state.ok) {
      setDate(undefined);
      setTimeSlot("");
    }
  }, [state.ok]);

  const canSubmit = Boolean(date && timeSlot && serviceName && barberName);

  return (
    <Card className="border-border/90 bg-card/60 backdrop-blur">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl">Schedule your visit</CardTitle>
        <CardDescription>
          Choose your service and barber, then pick a day and time. We will confirm by email.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-8">
          <input type="hidden" name="date" value={date ? format(date, "yyyy-MM-dd") : ""} />
          <input type="hidden" name="time_slot" value={timeSlot} />
          <input type="hidden" name="service_type" value={serviceName} />
          <input type="hidden" name="barber_name" value={barberName} />

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="service_select" className="text-muted-foreground">
                Service
              </Label>
              <Select value={serviceName} onValueChange={setServiceName}>
                <SelectTrigger id="service_select" className="w-full">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {SERVICES.map((s) => (
                    <SelectItem key={s.id} value={s.name}>
                      {s.name} — ${s.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="barber_select" className="text-muted-foreground">
                Barber
              </Label>
              <Select value={barberName} onValueChange={setBarberName}>
                <SelectTrigger id="barber_select" className="w-full">
                  <SelectValue placeholder="Select a barber" />
                </SelectTrigger>
                <SelectContent>
                  {BARBERS.map((b) => (
                    <SelectItem key={b.name} value={b.name}>
                      {b.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-wrap items-baseline justify-between gap-2 rounded-lg border border-primary/25 bg-primary/5 px-4 py-3">
            <span className="text-sm font-medium text-muted-foreground">Service total</span>
            <span className="text-2xl font-semibold tabular-nums text-primary">
              ${selectedService.price}
            </span>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,280px)]">
            <div className="space-y-3">
              <Label className="text-muted-foreground">Date</Label>
              <div className="flex justify-center rounded-xl border border-border/90 bg-background/40 p-2 sm:justify-start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(d) => d < startOfDay(new Date())}
                  className="rounded-lg"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="time_slot_ui" className="text-muted-foreground">
                  Time
                </Label>
                <Select value={timeSlot || undefined} onValueChange={setTimeSlot}>
                  <SelectTrigger id="time_slot_ui" className="w-full">
                    <SelectValue placeholder="Select a time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_SLOTS.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Times shown in your local timezone. Each barber has their own schedule.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="user_name">Name</Label>
                <Input
                  id="user_name"
                  name="user_name"
                  autoComplete="name"
                  placeholder="Jordan Lee"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="user_email">Email</Label>
                <Input
                  id="user_email"
                  name="user_email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>
          </div>

          {state.message ? (
            <p
              className={
                state.ok ? "text-sm text-emerald-400" : "text-sm text-destructive"
              }
              role="status"
            >
              {state.message}
            </p>
          ) : null}

          <Button type="submit" className="w-full sm:w-auto" disabled={pending || !canSubmit}>
            {pending ? "Booking…" : `Confirm booking · $${selectedService.price}`}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
