import type { Metadata } from "next";
import "../../globals.css";
import { PrivacyProvider } from "@/providers/privacy";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { GoogleTagManager } from "@/components/analytics/google-tag-manager";
import { Providers } from "@/providers";
import { PrivacyBanner } from "@/components/privacy-banner";
import { Inter, Manrope } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { APP_URL } from "@/lib/config";
import { getMessages, setRequestLocale } from "next-intl/server";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import { cn } from "@/lib/utils";

export const dynamic = "force-static";

const ManropeFont = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

const InterFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL || "https://kopexa.com"),
  title: {
    default: "Kopexa",
    template: "%s - Kopexa",
  },
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
  params: Promise<{ lang: string }>;
}>) {
  const params = await promiseParams;

  setRequestLocale(params.lang);

  const messages = await getMessages({
    locale: params.lang,
  });

  return (
    <html lang={params.lang}>
      <PrivacyProvider>
        <head>
          <link href="https://www.googletagmanager.com" rel="preconnect" />
          <link href="https://www.google-analytics.com" rel="preconnect" />
          <GoogleAnalytics />
        </head>
        <body
          className={cn(
            "antialiased bg-background text-foreground flex flex-col min-h-screen",
            ManropeFont.variable,
            InterFont.variable
          )}
        >
          <NextIntlClientProvider messages={messages}>
            <GoogleTagManager />
            <Providers>
              {children}
              <PrivacyBanner />
            </Providers>
          </NextIntlClientProvider>
          <PrismicPreview repositoryName={repositoryName} />
        </body>
      </PrivacyProvider>
    </html>
  );
}
