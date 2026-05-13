import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Achievement Tracker",
    template: "%s | Achievement Tracker",
  },
  description:
    "A personal year-by-year achievement tracker. Log your wins, gallery moments, and reflections — one year at a time.",
  keywords: ["achievement tracker", "personal growth", "year review", "goals", "milestones"],
  authors: [{ name: "Achievement Tracker" }],
  creator: "Achievement Tracker",
  metadataBase: new URL("https://achievement-tracker.vercel.app"),
  openGraph: {
    title: "Achievement Tracker",
    description:
      "A personal year-by-year achievement tracker. Log your wins, gallery moments, and reflections — one year at a time.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Achievement Tracker",
    description:
      "A personal year-by-year achievement tracker. Log your wins, gallery moments, and reflections — one year at a time.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
