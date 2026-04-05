import Link from "next/link";

import { MeetTheBarbers } from "@/components/meet-the-barbers";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="space-y-20">
      <section className="relative overflow-hidden rounded-2xl border border-border/90 bg-gradient-to-br from-secondary/80 via-background to-background px-8 py-16 sm:px-12 sm:py-20">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="relative max-w-2xl space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Downtown · By appointment
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Precision cuts for people who notice the details.
          </h1>
          <p className="text-lg text-muted-foreground">
            Hot towels, sharp fades, and a calm chair. Reserve your slot online — each stylist runs
            their own calendar so you always know who you are with.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Button asChild size="lg" className="rounded-md px-8">
              <Link href="/book">Book now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-md border-primary/25">
              <Link href="/services">View services</Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="text-muted-foreground">
              <Link href="/login">Admin login</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-3">
        {[
          {
            title: "Skilled barbers",
            body: "Consistent quality from people who treat hair like craft, not volume.",
          },
          {
            title: "On-time promise",
            body: "Per-barber scheduling with conflict checks — your slot is held for you.",
          },
          {
            title: "Industrial calm",
            body: "Charcoal, brass, and white type — a shop that feels intentional, not loud.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-border/90 bg-card/50 p-6 backdrop-blur"
          >
            <h2 className="text-lg font-semibold text-foreground">{item.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
          </div>
        ))}
      </section>

      <MeetTheBarbers />

      <section className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-primary/20 bg-primary/5 px-6 py-8">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Ready when you are</h2>
          <p className="text-sm text-muted-foreground">Browse the menu, then grab your time.</p>
        </div>
        <Button asChild>
          <Link href="/services">Explore services</Link>
        </Button>
      </section>
    </div>
  );
}
