"use client";

import { Toaster } from "@/components/ui/sonner";
import { CookiesProvider } from "react-cookie";
import { HeaderObverser } from "./header-observer";
import { AccessibilityProvider } from "./accessibility";

export const Providers: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <CookiesProvider>
      <AccessibilityProvider>
        <HeaderObverser>{children}</HeaderObverser>

        <Toaster />
      </AccessibilityProvider>
    </CookiesProvider>
  );
};
