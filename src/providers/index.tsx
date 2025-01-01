"use client";

import { Toaster } from "@/components/ui/sonner";
import { CookiesProvider } from "react-cookie";
import { HeaderObverser } from "./header-observer";

export const Providers: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <CookiesProvider>
      <HeaderObverser>{children}</HeaderObverser>
      <Toaster />
    </CookiesProvider>
  );
};
