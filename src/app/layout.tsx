import type { Metadata } from "next";
import { Bodoni_Moda } from "next/font/google";
import "./globals.css";

const font = Bodoni_Moda({
  variable: "--font-regular",
  subsets: ["latin"],
});

const baseTitle = "MemoryLine";
const baseDesc = "Visualize and share your most important dates";
const baseUrl = new URL("https://dates.soulsbros.ch");

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
    <html lang="en" className={`${font.variable} h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
