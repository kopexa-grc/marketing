import Link from "next/link";
import { Separator } from "../ui/separator";
import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { cn } from "@/lib/utils";
import type { Footer as FooterType } from "@/payload-types";

const legal = [
  {
    label: "Imprint/Legal",
    href: "#",
  },
  {
    label: "Privacy",
    href: "#",
  },
];

const items = [
  {
    label: "Product",
    links: [
      {
        label: "What is kopexa?",
        href: "#",
      },
      {
        label: "Features",
        href: "#",
      },
      {
        label: "Pricing",
        href: "#",
      },
    ],
  },
  {
    label: "Docs & Support",
    links: [
      {
        label: "Documentation",
        href: "#",
      },
      {
        label: "Support",
        href: "#",
      },
    ],
  },
  {
    label: "About us",
    links: [
      {
        label: "Company",
        href: "/about-us",
      },
      {
        label: "Careers",
        href: "/careers",
      },
    ],
  },
  {
    label: "Get in touch",
    links: [
      {
        label: "Contact",
        href: "/contact",
      },
      {
        label: "Newsletter",
        href: "/newsletter",
      },
      {
        label: "Partners",
        href: "/partners",
      },
    ],
  },
];

export type FooterProps = {
  footer: FooterType;
};

export const Footer = ({ footer }: FooterProps) => {
  const { columns = [] } = footer;

  return (
    <footer className="layout mt-40">
      <div className="col-span-full">
        <div>{/** mobile */}</div>
        <div className="hidden lg:flex flex:justify-between lg:mb-24">
          {/** desktop */}
          {columns?.map((column) => (
            <div
              key={`${column.id}`}
              className="text-start border-b lg:w-1/4 lg:shrink-0 lg:border-none hidden"
            >
              <span className="block text-sm leading-none font-semibold lg:mb-6">
                {column.label}
              </span>
            </div>
          ))}
          {items.map((item) => (
            <FooterSection key={item.label} section={item} />
          ))}
        </div>
        <ul className="flex flex-col mb-16 lg:flex-row lg:flex-wrap lg:justify-center lg:mb-6">
          {/** bottom */}
          {legal.map((item, index) => (
            <li
              key={item.label}
              className="mb-6 lg:mb-0 lg:flex lg:items-center"
            >
              <Link
                className="flex items-center transition-colors duration-300 text-sm hover:text-primary"
                href={item.href}
              >
                {item.label}
              </Link>
              {index < legal.length - 1 && (
                <Separator
                  orientation="vertical"
                  className="hidden lg:block mx-2"
                />
              )}
            </li>
          ))}
        </ul>
        <p className="text-sm lg:text-center md:mb-16 lg:mb-24">
          &copy; {new Date().getFullYear()} kopexa. All rights reserved.{" "}
        </p>
      </div>
    </footer>
  );
};

type NavLink = {
  label: string;
  href: string;
};

type Section = {
  label: string;
  links: NavLink[];
};

const FooterSection = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div"> & {
    section: Section;
  }
>((props, ref) => {
  const { className, section, ...rest } = props;

  return (
    <div
      className={cn(
        "text-start border-b lg:w-1/4 lg:shrink-0 lg:border-none",
        className
      )}
      {...rest}
      ref={ref}
    >
      <span className="block text-sm leading-none font-semibold lg:mb-6">
        {section.label}
      </span>
      <ul className="space-y-1.5">
        {section.links.map((link) => (
          <li key={link.label}>
            <Link
              className="transition-colors duration-300 hover:text-primary text-sm"
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
});

FooterSection.displayName = "FooterSection";
