import { BARBERS } from "@/lib/barbers";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export function MeetTheBarbers() {
  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          The crew
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Meet the barbers
        </h2>
        <p className="max-w-2xl text-muted-foreground">
          Three chairs, one standard: deliberate cuts, honest consults, and respect for your
          time.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {BARBERS.map((barber) => (
          <Card
            key={barber.name}
            className="overflow-hidden border-border/80 bg-card/60 backdrop-blur"
          >
            <AspectRatio ratio={4 / 5}>
              <div className="flex size-full items-center justify-center bg-gradient-to-br from-secondary via-card to-background">
                <span className="text-5xl font-bold tracking-tight text-primary/90">
                  {barber.initials}
                </span>
              </div>
            </AspectRatio>
            <CardContent className="space-y-1 p-5">
              <h3 className="text-lg font-semibold text-foreground">{barber.name}</h3>
              <p className="text-sm text-muted-foreground">{barber.specialty}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
