"use client";

import { useScrollHeader } from "@/hooks/use-scroll-header";
import { MainNav } from "../navigation";
import type { NavItem } from "../navigation/types";
import { cn } from "@/lib/utils";

export const mainNavigation: NavItem[] = [
  {
    id: "product",
    type: "dropdown",
    title: "Product",
    items: [
      {
        id: "security",
        type: "feature",
        title: "Security & Compliance",
        description: "Assessment Templates für ISO 27001, DSGVO und mehr",
        icon: "Shield",
        badge: {
          text: "Neu",
          type: "yellow",
        },
      },
      {
        id: "risk",
        type: "feature",
        title: "Risk Management",
        description: "OWASP und CVSS 4.0 Risk Assessment",
        icon: "ActivitySquare",
      },
      {
        id: "ma",
        type: "feature",
        title: "M&A Due Diligence",
        description: "Security & IT Due Diligence Templates",
        icon: "Building2",
      },
      {
        id: "platform",
        type: "feature",
        title: "Flexible Platform",
        description: "Dynamische Assessments & Custom Workflows",
        icon: "Settings2",
      },
    ],
  },
  {
    id: "solutions",
    type: "group",
    title: "Solutions",
    items: [
      {
        id: "enterprise",
        type: "link",
        title: "Enterprise Security",
        href: "/solutions/enterprise",
        icon: "Building2",
      },
      {
        id: "vendor",
        type: "link",
        title: "Vendor Assessment",
        href: "/solutions/vendor",
        icon: "Users",
      },
      {
        id: "compliance",
        type: "link",
        title: "Compliance Management",
        href: "/solutions/compliance",
        icon: "FileCheck",
      },
    ],
  },
  {
    id: "resources",
    type: "dropdown",
    title: "Resources",
    items: [
      {
        id: "docs",
        type: "link",
        title: "Documentation",
        href: "/docs",
        icon: "BookOpen",
      },
      {
        id: "support",
        type: "link",
        title: "Support",
        href: "/support",
        icon: "HelpCircle",
      },
    ],
  },
  {
    id: "pricing",
    type: "link",
    title: "Pricing",
    href: "/pricing",
  },
];

export const Header = () => {
  const isScrolled = useScrollHeader(50);

  return (
    <header
      className={cn(
        "flex w-full sticky z-nav h-20 items-center justify-center bg-background top-0",
        "transition-colors duration-300",
        isScrolled ? "border-b" : "border-b-transparent"
      )}
    >
      <div className="hidden lg:flex lg:w-full lg:h-full justify-center px-8">
        <div className="layout h-full text-foreground xl:w-full">
          <div className="flex w-full items-center justify-between col-span-full">
            <div className="flex h-full items-center justify-center">
              <div className="mr-12">
                <span className="font-sans font-semibold text-2xl">KPX</span>
              </div>
              <MainNav items={mainNavigation} />
            </div>
            <div className="flex h-full items-center justify-center">cta</div>
          </div>
        </div>
      </div>
    </header>
  );
};
