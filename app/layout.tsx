import type { Metadata } from "next";
import "./globals.css";
import {
  SiteHeader,
  SiteFooter,
  WhatsAppFloat,
} from "@/app/components/site-shell";

export const metadata: Metadata = {
  metadataBase: new URL("https://lessence.ng"),

  title: {
    default: "L'Essence | Luxury Perfumes",
    template: "%s | L'Essence",
  },

  description:
    "Discover premium perfumes and order directly through WhatsApp. Luxury fragrances for every occasion.",

  keywords: [
    "Perfume",
    "Luxury Perfume",
    "Fragrance",
    "Oud",
    "Perfume Nigeria",
    "Perfume Abuja",
    "WhatsApp Store",
    "Online Perfume Shop",
    "Gift Perfume",
  ],

  authors: [
    {
      name: "Chukwuma Emmanuel",
    },
  ],

  creator: "Chukwuma Emmanuel",

  publisher: "L'Essence",

  alternates: {
    canonical: "https://lessence.ng",
  },

  openGraph: {
    title: "L'Essence | Luxury Perfumes",

    description:
      "Premium perfumes available through WhatsApp ordering.",

    url: "https://lessence.ng",

    siteName: "L'Essence",

    locale: "en_US",

    type: "website",

    images: [
      {
        url: "/images/favicon.png",
        width: 2000,
        height: 630,
        alt: "L'Essence Perfumes",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "L'Essence | Luxury Perfumes",

    description:
      "Premium perfumes available through WhatsApp ordering.",

    images: ["favicon.png"],
  },

  icons: {
    icon: "/images/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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