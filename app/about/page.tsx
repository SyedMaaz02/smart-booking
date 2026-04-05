import type { Metadata } from "next";

import { MeetTheBarbers } from "@/components/meet-the-barbers";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export const metadata: Metadata = {
  title: "About · Elite Barbers",
  description: "Our shop, our standards, and the people behind the chair.",
};

const galleryItems = [
  { label: "Stations", tone: "from-zinc-800 via-card to-background" },
  { label: "Tools", tone: "from-background via-card to-zinc-900" },
  { label: "The chair", tone: "from-card via-zinc-900 to-background" },
];

export default function AboutPage() {
  return (
    <div className="space-y-16">
      <section className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Our shop</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Built for focus</h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Concrete tones, warm brass hardware, and lighting that flatters the cut — not the hype.
          We built Elite Barbers as a calm pit stop in a loud city: on time, on standard, every
          visit.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold tracking-tight">Gallery</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {galleryItems.map((item) => (
            <Card
              key={item.label}
              className="overflow-hidden border-border/90 bg-card/50 p-0"
            >
              <AspectRatio ratio={4 / 3}>
                <div
                  className={`flex size-full items-end justify-start bg-gradient-to-br p-4 ${item.tone}`}
                >
                  <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    {item.label}
                  </span>
                </div>
              </AspectRatio>
            </Card>
          ))}
        </div>
      </section>

      <MeetTheBarbers />
    </div>
  );
}
