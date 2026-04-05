import type { Metadata } from "next";
import { Suspense } from "react";

import { BookingForm } from "@/components/booking-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Book an appointment · Elite Barbers",
  description: "Choose a service, barber, date, and time for your visit.",
};

function BookingFormFallback() {
  return (
    <Card className="animate-pulse border-border/90 bg-card/60">
      <CardHeader>
        <div className="h-6 w-48 rounded-md bg-muted" />
        <div className="h-4 w-full max-w-md rounded-md bg-muted" />
      </CardHeader>
      <CardContent className="min-h-[28rem]" />
    </Card>
  );
}

export default function BookPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Book your appointment</h1>
        <p className="text-muted-foreground">
          Select your service and stylist, then choose an open day and time.
        </p>
      </div>
      <Suspense fallback={<BookingFormFallback />}>
        <BookingForm />
      </Suspense>
    </div>
  );
}
