/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import "../../globals.css";
import { PrivacyProvider } from "@/providers/privacy";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { GoogleTagManager } from "@/components/analytics/google-tag-manager";
import { Providers } from "@/providers";
import { PrivacyBanner } from "@/components/privacy-banner";
import { Manrope } from "next/font/google";
import { mergeOpenGraph } from "@/lib/seo/mergeOpenGraph";
import { NextIntlClientProvider } from "next-intl";
import { APP_URL } from "@/lib/config";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";

export const dynamic = "force-static";

const ManropeFont = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL || "https://kopexa.com"),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: "summary_large_image",
    creator: "@kopexa",
  },
};

export default async function RootLayout({
  children,
  params: promiseParams,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const params = await promiseParams;

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  if (!routing.locales.includes(params.locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={params.locale}>
      <PrivacyProvider>
        <head>
          <link href="https://www.googletagmanager.com" rel="preconnect" />
          <link href="https://www.google-analytics.com" rel="preconnect" />
          <GoogleAnalytics />
        </head>
        <body
          className={`antialiased bg-background text-foreground ${ManropeFont.variable}`}
        >
          <NextIntlClientProvider messages={messages}>
            <GoogleTagManager />
            <Providers>
              {children}
              <PrivacyBanner />
            </Providers>
          </NextIntlClientProvider>
        </body>
      </PrivacyProvider>
    </html>
  );
}
