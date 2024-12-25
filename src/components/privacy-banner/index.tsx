"use client";

import { cn } from "@/lib/utils";
import { usePrivacy } from "@/providers/privacy";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export const PrivacyBanner: React.FC = () => {
  const [closeBanner, setCloseBanner] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  const { showConsent, updateCookieConsent } = usePrivacy();

  const handleCloseBanner = () => {
    setAnimateOut(true);
  };

  useEffect(() => {
    if (animateOut) {
      setTimeout(() => {
        setCloseBanner(true);
      }, 300);
    }
  }, [animateOut]);

  if (!showConsent || closeBanner) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 w-max max-w-xl z-nav transform duration-300 ease-out border rounded",
        animateOut ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
      )}
    >
      <div className="flex flex-col justify-between items-center relative bg-background p-6">
        <p className="m-0">
          We use cookies, subject to your consent, to analyze the use of our
          website and to ensure you get the best experience. Third parties with
          whom we collaborate can also install cookies in order to show you
          personalized advertisements on other websites. Read our{" "}
          <Link
            className={
              "hover:text-primary border-dotted border-b border-primary hover:opacity-80"
            }
            href="/cookie"
            prefetch={false}
          >
            cookie policy
          </Link>{" "}
          for more information.
        </p>
        <div className="flex gap-4 mt-6 w-full justify-end">
          <Button
            variant="secondary"
            onClick={() => {
              updateCookieConsent(false, true);
              handleCloseBanner();
            }}
          >
            Decline
          </Button>
          <Button
            onClick={() => {
              updateCookieConsent(true, false);
              handleCloseBanner();
            }}
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
};
