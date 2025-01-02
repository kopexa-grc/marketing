"use client";

import { useScrollHeader } from "@/hooks/use-scroll-header";
import { MainNav } from "./desktop";
import { cn } from "@/lib/utils";
import type { MainMenu, ThemeField } from "@/payload-types";
import { NavbarMobile } from "./mobile";

type Props = {
  mainMenu: MainMenu;
  theme: ThemeField;
};

export const Header = ({ mainMenu }: Props) => {
  const isScrolled = useScrollHeader(50);

  return (
    <>
      {/* Sticky container - wraps everything */}
      <header className="fixed top-0 w-full z-50 bg-primary text-primary-foreground">
        <div className="relative h-20">
          {/* Subtle line decoration */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex h-full">
            <div className="layout">
              <div className="col-span-full flex items-center justify-between h-full">
                <MainNav mainMenu={mainMenu} isScrolled={isScrolled} />
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden h-full">
            <NavbarMobile mainMenu={mainMenu} />
          </div>

          {/* Bottom border with gradient */}
          <div
            className={cn(
              "absolute bottom-0 left-0 right-0 h-px",
              "bg-gradient-to-r from-transparent via-border to-transparent",
              "transition-opacity duration-300",
              isScrolled ? "opacity-100" : "opacity-0"
            )}
          />
        </div>
      </header>
    </>
  );
};
