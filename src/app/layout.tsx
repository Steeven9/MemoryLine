import { LanguageSwitcher } from "@/components/language-switcher";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const t = await getTranslations("language");

  return (
    <html lang={locale} className={`${font.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <div className="flex justify-end px-4 pt-4 sm:px-6 lg:px-8">
            <LanguageSwitcher
              locale={locale}
              label={t("label")}
              english={t("english")}
              italian={t("italian")}
            />
          </div>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
