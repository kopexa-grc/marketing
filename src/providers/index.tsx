"use client";

import { Toaster } from "@/components/ui/sonner";
import { CookiesProvider } from "react-cookie";
import { AccessibilityProvider } from "./accessibility";

export const Providers: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <CookiesProvider>
      <AccessibilityProvider>
        {children}

        <Toaster />
      </AccessibilityProvider>
    </CookiesProvider>
  );
};
