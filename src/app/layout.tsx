import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const baseTitle = "MemoryLine";
const baseDesc = "Visualize and share your most important dates";
const baseUrl = new URL("https://line.soulsbros.ch");

export const metadata: Metadata = {
  title: {
    template: `%s - ${baseTitle}`,
    default: baseTitle,
  },
  description: baseDesc,
  authors: [{ name: "Soulsbros", url: "https://soulsbros.ch" }],
  metadataBase: baseUrl,
  openGraph: {
    type: "website",
    url: baseUrl,
    title: {
      template: `%s - ${baseTitle}`,
      default: baseTitle,
    },
    description: baseDesc,
    siteName: baseTitle,
    images: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
