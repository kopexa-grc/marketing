import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import type { Footer as FooterType } from "@/payload-types";
import { CMSLink } from "../cms/cms-link";
import {
  ArrowRight,
  ArrowUpRight,
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "@/i18n/routing";

export type FooterProps = {
  footer: FooterType;
};

export const Footer = ({ footer }: FooterProps) => {
  const { columns = [], social, legal } = footer;

  return (
    <footer
      data-theme="dark"
      className="py-20 relative isolate pb-12 bg-primary text-primary-foreground mt-xhuge"
    >
      <div className="layout relative">
        <div className="col-span-full">
          <div
            className={cn(
              "grid gap-12",
              "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
              "mb-16 lg:mb-24"
            )}
          >
            {columns?.map((column) => (
              <div
                className={cn("group", "text-start border-b lg:border-none")}
                key={`${column.id}`}
              >
                <h4 className="text-base font-semibold mb-6">{column.label}</h4>
                <ul className="space-y-3">
                  {Array.isArray(column.navItems) &&
                    column.navItems.map((link) => (
                      <li key={`${link.id}`}>
                        <CMSLink
                          {...link.link}
                          className={cn(
                            "text-sm text-white/80",
                            "hover:text-white transition-colors",
                            "flex items-center gap-1 group/link"
                          )}
                          appearance="none"
                        >
                          {link.link.label}
                          <ArrowRight className="h-3 w-3 opacity-0 -translate-y-1 group-hover/link:opacity-100 group-hover/link:translate-y-0 transition-all" />
                        </CMSLink>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Social Links */}
          {social?.links && social.links.length > 0 && (
            <div className="flex items-center justify-center gap-4 mb-12">
              {social.links.map((socialLink) => (
                <Button
                  key={socialLink.platform}
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:scale-110 transition-transform"
                  asChild
                >
                  <Link href={socialLink.link?.url ?? "#"}>
                    {socialLink.platform === "twitter" && (
                      <TwitterIcon className="h-4 w-4" />
                    )}
                    {socialLink.platform === "linkedin" && (
                      <LinkedinIcon className="h-4 w-4" />
                    )}
                    {socialLink.platform === "github" && (
                      <GithubIcon className="h-4 w-4" />
                    )}
                  </Link>
                </Button>
              ))}
            </div>
          )}

          {/* Bottom Section */}
          <div
            className={cn(
              "pt-8 border-t border-white/30",
              "flex flex-col lg:flex-row items-center justify-between",
              "gap-8"
            )}
          >
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-4">
              {legal?.links?.map((item, index) => (
                <div key={item.link?.label} className="flex items-center">
                  <Link
                    className={cn(
                      "text-sm text-white/80",
                      "hover:text-white transition-colors",
                      "flex items-center gap-1 group"
                    )}
                    href={item.link?.url ?? "#"}
                  >
                    {item.link?.label}
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  {index < (legal.links?.length ?? 0) - 1 && (
                    <Separator
                      orientation="vertical"
                      className="mx-2 h-4 bg-white/30"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Copyright */}
            <p className={cn("text-sm text-foreground/80", "lg:text-right")}>
              {legal?.copyrightText ??
                `© ${new Date().getFullYear()} All rights reserved.`}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
