import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SERVICES } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services · Elite Barbers",
  description: "Cuts, fades, beard work, and the full straight-razor ritual.",
};

export default function ServicesPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Menu</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Services</h1>
        <p className="max-w-2xl text-muted-foreground">
          Straightforward pricing, no surprises. Pick a service and lock your time — your barber
          will be ready.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {SERVICES.map((service) => (
          <Card
            key={service.id}
            className="flex flex-col border-border/90 bg-card/70 backdrop-blur transition-shadow hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
          >
            <CardHeader className="space-y-1">
              <div className="flex items-start justify-between gap-3">
                <CardTitle className="text-xl font-semibold leading-tight">{service.name}</CardTitle>
                <span className="shrink-0 rounded-md border border-primary/40 bg-primary/10 px-2.5 py-1 text-sm font-semibold tabular-nums text-primary">
                  ${service.price}
                </span>
              </div>
              <CardDescription className="text-base leading-relaxed">
                {service.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1" />
            <CardFooter>
              <Button asChild className="w-full sm:w-auto">
                <Link href={`/book?service=${encodeURIComponent(service.id)}`}>Book this</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
