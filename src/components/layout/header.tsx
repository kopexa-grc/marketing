"use client";

import { useScrollHeader } from "@/hooks/use-scroll-header";
import { MainNav } from "../navigation";
import { cn } from "@/lib/utils";
import type { MainMenu } from "@/payload-types";
import { CMSLink } from "../cms/cms-link";
import { NavbarMobile } from "../navigation/navbar-mobile";
import { Logo } from "../ui/logo";
import Link from "next/link";

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
};

export const Header = ({ mainMenu }: Props) => {
  const isScrolled = useScrollHeader(50);

  return (
    <>
      {/* Sticky container - wraps everything */}
      <div className="fixed top-0 left-0 right-0 z-50">
        {/* Enterprise-grade backdrop with subtle patterns */}
        <div
          className={cn(
            "absolute inset-0",
            "bg-background/95 backdrop-blur-2xl",
            "transition-all duration-500",
            isScrolled
              ? "border-b border-border/40 shadow-sm"
              : "border-b-transparent",
            // Subtle grid pattern
            "before:absolute before:inset-0 before:opacity-[0.015]",
            "before:bg-[linear-gradient(to_right,rgb(var(--foreground)/10)_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--foreground)/10)_1px,transparent_1px)]",
            "before:bg-[size:24px_24px]"
          )}
        />

        {/* Premium announcement bar */}
        {/* {!isScrolled && (
          <div className="relative bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-b border-primary/10">
            <div className="layout py-2">
              <div className="col-span-full flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full font-medium">
                    Enterprise
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Trusted by Fortune 500 companies worldwide
                  </span>
                </div>
                <div className="text-sm">
                  <Link
                    href="/enterprise"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Learn more about Enterprise →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )} */}

        <header className="relative h-20">
          {/* Subtle line decoration */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex h-full">
            <div className="layout">
              <div className="col-span-full flex items-center justify-between h-full">
                {/* Left side: Logo & Nav */}
                <div className="flex items-center space-x-12">
                  <Link href="/" className="relative group">
                    <Logo />
                  </Link>
                  <MainNav mainMenu={mainMenu} />
                </div>
                {/* Right side: CTAs */}
                <div className="flex items-center space-x-6">
                  {Array.isArray(mainMenu.ctas) &&
                    mainMenu.ctas.map((cta) => (
                      <CMSLink
                        key={`${cta.id}`}
                        {...cta.link}
                        className={cn("transition-colors duration-200")}
                      />
                    ))}
                </div>
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
        </header>
      </div>
      {/* Spacer to prevent content jump */}
      <div className="h-20" />
    </>
  );
};
