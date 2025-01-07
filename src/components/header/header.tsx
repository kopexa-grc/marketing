"use client";

import { useScrollHeader } from "@/hooks/use-scroll-header";
import { MainNav } from "./desktop";
import { cn } from "@/lib/utils";
import type { MainMenu } from "@/payload-types";
import { NavbarMobile } from "./mobile";
import { tv, type VariantProps } from "tailwind-variants";

const header = tv({
  base: "sticky top-0 w-full z-50 transition-colors",
  variants: {
    colorScheme: {
      primary: ["bg-primary text-primary-foreground"],
    },
    isScrolled: {
      true: "bg-primary",
    },
  },
});

type Props = {
  mainMenu: MainMenu;
  className?: string;
} & VariantProps<typeof header>;

export const Header = ({ mainMenu, className, colorScheme }: Props) => {
  const isScrolled = useScrollHeader(50);

  const styles = header({ isScrolled, colorScheme });

  return (
    <>
      {/* Sticky container - wraps everything */}
      <header className={cn(styles, className)}>
        <div className="relative h-20">
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
              "bg-gradient-to-r from-transparent via-secondary to-transparent",
              "transition-opacity duration-300",
              isScrolled ? "opacity-100" : "opacity-0"
            )}
          />
        </div>
      </header>
    </>
  );
};
