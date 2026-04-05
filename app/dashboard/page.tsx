import Link from "next/link";
import { redirect } from "next/navigation";

import { signOut } from "@/app/dashboard/actions";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: appointments, error } = await supabase
    .from("appointments")
    .select(
      "id, created_at, user_name, user_email, appointment_date, time_slot, service_type, barber_name"
    )
    .order("appointment_date", { ascending: true })
    .order("time_slot", { ascending: true });

  const rows = appointments ?? [];

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Upcoming appointments</h1>
          <p className="text-sm text-muted-foreground">
            Signed in as <span className="text-foreground">{user.email}</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" asChild className="border-border/90">
            <Link href="/">View site</Link>
          </Button>
          <form action={signOut}>
            <Button type="submit" variant="secondary">
              Sign out
            </Button>
          </form>
        </div>
      </div>

      {error ? (
        <p className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error.message}
        </p>
      ) : rows.length === 0 ? (
        <p className="rounded-xl border border-border/90 bg-card/50 px-6 py-10 text-center text-muted-foreground">
          No appointments yet. Share your booking link with clients.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border/90">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Barber</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="hidden lg:table-cell">Booked at</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((a) => (
                <TableRow key={a.id}>
                  <TableCell className="whitespace-nowrap font-medium">
                    {a.appointment_date}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{a.time_slot}</TableCell>
                  <TableCell className="max-w-[140px]">{a.service_type}</TableCell>
                  <TableCell className="max-w-[120px]">{a.barber_name}</TableCell>
                  <TableCell>{a.user_name}</TableCell>
                  <TableCell className="max-w-[180px] truncate">{a.user_email}</TableCell>
                  <TableCell className="hidden whitespace-nowrap text-muted-foreground lg:table-cell">
                    {a.created_at
                      ? new Date(a.created_at).toLocaleString(undefined, {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })
                      : "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
