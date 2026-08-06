import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { brand } from "@/data/jedlikData";
import "./globals.css";

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jedlik.in"),
  title: `${brand.name} — ${brand.tagline}`,
  description: `${brand.name} is redefining the way the world commutes in cities. Introducing the E-POD — a fully enclosed, two-wheeled electric vehicle with car-grade safety.`,
  openGraph: {
    title: `${brand.name} — ${brand.tagline}`,
    description: "The investor pitch for the E-POD.",
    images: ["/assets/epod-reveal.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="font-body bg-paper text-ink antialiased">
        {children}
      </body>
    </html>
  );
}