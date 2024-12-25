"use client";

import { analyticsEvent } from "@/lib/analytics";
import { usePrivacy } from "@/providers/privacy";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";

const gaMeasurementID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const GoogleAnalytics: React.FC = () => {
  const pathname = usePathname();

  const { cookieConsent } = usePrivacy();

  useEffect(() => {
    if (!gaMeasurementID || !window?.location?.href) {
      return;
    }

    analyticsEvent("page_view", {
      page_location: window.location.href,
      page_path: pathname,
      page_title: document.title,
    });
  }, [pathname]);

  if (!cookieConsent || !gaMeasurementID) {
    return null;
  }

  return (
    <>
      <Script
        defer
        src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementID}`}
      />
      <Script
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${gaMeasurementID}', { send_page_view: false });`,
        }}
        defer
        id="google-analytics"
      />
    </>
  );
};
