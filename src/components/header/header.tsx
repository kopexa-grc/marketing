"use client";

import { useScrollHeader } from "@/hooks/use-scroll-header";
import { MainNav } from "./desktop";
import { cn } from "@/lib/utils";
import type { MainMenu, ThemeField } from "@/payload-types";
import { NavbarMobile } from "./mobile";

// export const mainNavigation: NavItem[] = [
//   {
//     id: "product",
//     type: "dropdown",
//     title: "Product",
//     items: [
//       {
//         id: "security",
//         type: "feature",
//         title: "Security & Compliance",
//         description: "Assessment Templates für ISO 27001, DSGVO und mehr",
//         icon: "Shield",
//         badge: {
//           text: "Neu",
//           type: "yellow",
//         },
//       },
//       {
//         id: "risk",
//         type: "feature",
//         title: "Risk Management",
//         description: "OWASP und CVSS 4.0 Risk Assessment",
//         icon: "ActivitySquare",
//       },
//       {
//         id: "ma",
//         type: "feature",
//         title: "M&A Due Diligence",
//         description: "Security & IT Due Diligence Templates",
//         icon: "Building2",
//       },
//       {
//         id: "platform",
//         type: "feature",
//         title: "Flexible Platform",
//         description: "Dynamische Assessments & Custom Workflows",
//         icon: "Settings2",
//       },
//     ],
//   },
//   {
//     id: "solutions",
//     type: "group",
//     title: "Solutions",
//     items: [
//       {
//         id: "enterprise",
//         type: "link",
//         title: "Enterprise Security",
//         href: "/solutions/enterprise",
//         icon: "Building2",
//       },
//       {
//         id: "vendor",
//         type: "link",
//         title: "Vendor Assessment",
//         href: "/solutions/vendor",
//         icon: "Users",
//       },
//       {
//         id: "compliance",
//         type: "link",
//         title: "Compliance Management",
//         href: "/solutions/compliance",
//         icon: "FileCheck",
//       },
//     ],
//   },
//   {
//     id: "resources",
//     type: "dropdown",
//     title: "Resources",
//     items: [
//       {
//         id: "docs",
//         type: "link",
//         title: "Documentation",
//         href: "/docs",
//         icon: "BookOpen",
//       },
//       {
//         id: "support",
//         type: "link",
//         title: "Support",
//         href: "/support",
//         icon: "HelpCircle",
//       },
//     ],
//   },
// ];

type Props = {
  mainMenu: MainMenu;
  theme: ThemeField;
};

export const Header = ({ mainMenu, theme }: Props) => {
  const isScrolled = useScrollHeader(50);

  return (
    <>
      {/* Sticky container - wraps everything */}
      <header
        className="fixed top-0 w-full z-50"
        data-theme={isScrolled ? "light" : (theme.colorMode ?? "light")}
      >
        <div
          className={cn(
            "absolute w-full min-h-20 h-full top-0 left-0",
            "bg-background border-b shadow transition-opacity duration-200",
            isScrolled ? "opacity-100" : "opacity-0"
          )}
        />

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
