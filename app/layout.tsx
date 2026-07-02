import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader, SiteFooter, WhatsAppFloat } from "@/app/components/site-shell";

export const metadata: Metadata = {
  title: "L'Essence — Fine Fragrance",
  description:
    "Warm oud, soft florals, clean musks, and gift-ready scents selected for lasting impressions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        <WhatsAppFloat />
      </body>
    </html>
  );
}