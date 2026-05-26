import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./timeline.css";

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
    default: "Rubenius — Twenty Years of Interior Wellbeing",
    template: "%s | Rubenius",
  },
  description:
    "A year-by-year record of Rubenius Interiors — awards, milestones and the projects that shaped twenty years of experience-led design.",
  keywords: ["Rubenius", "Rubenius Interiors", "experience design", "REDS", "interior design", "Bangalore", "FOAID"],
  authors: [{ name: "Rubenius Interiors" }],
  creator: "Rubenius Interiors",
  metadataBase: new URL("https://achievement-tracker.vercel.app"),
  openGraph: {
    title: "Rubenius — Twenty Years of Interior Wellbeing",
    description:
      "A year-by-year record of Rubenius Interiors — awards, milestones and the projects that shaped twenty years of experience-led design.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rubenius — Twenty Years of Interior Wellbeing",
    description:
      "A year-by-year record of Rubenius Interiors — awards, milestones and the projects that shaped twenty years of experience-led design.",
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
