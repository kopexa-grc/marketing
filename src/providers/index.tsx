"use client";

import { Toaster } from "@/components/ui/sonner";
import { CookiesProvider } from "react-cookie";

export const Providers: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <CookiesProvider>
      {children}
      <Toaster />
    </CookiesProvider>
  );
};
