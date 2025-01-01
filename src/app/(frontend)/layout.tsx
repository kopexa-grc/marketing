import type { Metadata } from "next";
import "../globals.css";
import { PrivacyProvider } from "@/providers/privacy";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { GoogleTagManager } from "@/components/analytics/google-tag-manager";
import { Providers } from "@/providers";
import { PrivacyBanner } from "@/components/privacy-banner";
import { Header } from "@/components/header/header";
import { Manrope } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { mergeOpenGraph } from "@/lib/seo/mergeOpenGraph";
import { draftMode } from "next/headers";
import { fetchGlobals } from "@/lib/data";
import { unstable_cache } from "next/cache";
import { APP_URL } from "@/lib/config";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <PrivacyProvider>
        <head>
          <link href="https://www.googletagmanager.com" rel="preconnect" />
          <link href="https://www.google-analytics.com" rel="preconnect" />
          <GoogleAnalytics />
        </head>
        <body
          className={`antialiased bg-background text-foreground ${ManropeFont.variable}`}
        >
          <GoogleTagManager />
          <Providers>
            {children}
            <PrivacyBanner />
          </Providers>
        </body>
      </PrivacyProvider>
    </html>
  );
}
