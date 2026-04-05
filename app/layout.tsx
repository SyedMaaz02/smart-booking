import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Elite Barbers — Smart Booking",
  description: "Premium cuts, zero wait-time drama. Book online in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} min-h-screen bg-background font-sans antialiased`}>
        <header className="sticky top-0 z-40 border-b border-border/90 bg-background/90 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight text-foreground transition-colors hover:text-primary"
            >
              Elite Barbers
            </Link>
            <nav className="flex flex-wrap items-center justify-end gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <Link href="/services" className="transition-colors hover:text-primary">
                Services
              </Link>
              <Link href="/about" className="transition-colors hover:text-primary">
                About
              </Link>
              <Link href="/book" className="transition-colors hover:text-primary">
                Book
              </Link>
              <Link href="/login" className="transition-colors hover:text-primary">
                Admin
              </Link>
            </nav>
          </div>
        </header>
        <div className="mx-auto max-w-6xl px-6 py-10">{children}</div>
      </body>
    </html>
  );
}
