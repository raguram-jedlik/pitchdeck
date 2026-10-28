import type { Metadata } from "next";
import { Space_Grotesk, Inter, Antonio, Roboto_Mono } from "next/font/google";
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

// Headline faces for the "INTRODUCING / E-POD" lockup on the reveal video.
// Antonio is a condensed grotesque that, when slanted, matches the
// E-POD artwork; Roboto Mono matches the tracked-out INTRODUCING label.
const headlineFont = Antonio({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-headline",
  display: "swap",
});

const labelFont = Roboto_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-label",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pitch.jedlik.in"),
  title: brand.name,
  description: `${brand.name} is redefining the way the world commutes in cities. Introducing the E-POD — a fully enclosed, two-wheeled electric vehicle with car-grade safety.`,
  openGraph: {
    title: brand.name,
    description: "The investor pitch for the E-POD.",
    images: [
      {
        url: "/assets/jedlik-thumbnail.jpg",
        width: 1042,
        height: 852,
        alt: brand.name,
        type: "image/jpeg",
      },
    ],
  },
  icons: {
    icon: "/assets/jedlik-thumbnail.jpg",
    shortcut: "/assets/jedlik-thumbnail.jpg",
    apple: "/assets/jedlik-thumbnail.jpg",
  },
  other: {
    image: "https://pitch.jedlik.in/assets/jedlik-thumbnail.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${headlineFont.variable} ${labelFont.variable}`}
    >
      <body className="font-body bg-paper text-ink antialiased">
        {children}
      </body>
    </html>
  );
}