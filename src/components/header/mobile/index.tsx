"use client";

import { Logo } from "../../ui/logo";
import { ArrowRight, ChevronRight, MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";
import { Button } from "../../ui/button";
import type { MainMenu } from "@/payload-types";
import { CMSLink } from "../../cms/cms-link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";

interface NavProps {
  mainMenu: MainMenu;
}

export const NavbarMobile = ({ mainMenu }: NavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const pathname = usePathname();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setIsOpen(false);
    setActiveTab(null);
  }, [pathname]);

  const toggleTab = (tabId: string) => {
    setActiveTab(activeTab === tabId ? null : tabId);
  };

  return (
    <div className="h-full">
      <div className="flex h-full items-center justify-between md:px-8 px-5">
        <Link href="/">
          <Logo />
        </Link>
        <div className="flex items-center">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                aria-label="Open menu"
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                className="w-12 h-12 text-white"
              >
                <MenuIcon className="!size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full p-0"
              id="mobile-menu"
              // biome-ignore lint/a11y/useSemanticElements: <explanation>
              role="dialog"
              aria-label="Main menu"
              aria-describedby={undefined}
            >
              <SheetHeader className="h-16 px-6 pt-6">
                <Logo />
                <SheetTitle className="sr-only">Menu</SheetTitle>
              </SheetHeader>
              <nav
                // biome-ignore lint/a11y/noRedundantRoles: <explanation>
                // biome-ignore lint/a11y/useSemanticElements: <explanation>
                role="navigation"
                aria-label="Main navigation"
                className="space-y-2 py-6"
              >
                {Array.isArray(mainMenu.tabs) &&
                  mainMenu.tabs.map((tab, index) => {
                    if (tab.enableDirectLink && tab.link) {
                      return (
                        <div
                          key={tab.id}
                          className="animate-in slide-in-from-right-4 duration-300"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <CMSLink
                            {...tab.link}
                            appearance="none"
                            className="flex items-center justify-between rounded-2xl px-6 py-3 text-lg font-medium transition-colors hover:bg-primary/5"
                          >
                            {tab.label}
                            <ArrowRight className="h-5 w-5 text-muted-foreground" />
                          </CMSLink>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={`${tab.id}`}
                        className="relative animate-in fade-in duration-300"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <button
                          type="button"
                          onClick={() => toggleTab(`${tab.id}`)}
                          className={cn(
                            "flex w-full items-center justify-between px-6 py-3 text-lg font-medium transition-colors hover:bg-primary/5",
                            activeTab === tab.id && "bg-primary/5"
                          )}
                        >
                          {tab.label}
                          <ChevronRight
                            className={cn(
                              "h-5 w-5 text-muted-foreground transition-transform duration-200",
                              activeTab === tab.id && "rotate-90"
                            )}
                            aria-hidden="true"
                          />
                        </button>

                        {activeTab === tab.id && (
                          <div
                            id={`panel-${tab.id}`}
                            className={cn(
                              "overflow-hidden transition-all duration-300",
                              activeTab === tab.id ? "max-h-[500px]" : "max-h-0"
                            )}
                          >
                            {/* <div className="my-2 space-y-1 rounded-2xl bg-muted/50 py-3">
                              {tab.navItems?.map((item) => (
                                <CMSLink
                                  key={item.id}
                                  {...item.link}
                                  appearance="none"
                                  className="block px-6 py-3 transition-colors hover:bg-primary/5"
                                >
                                  <span className="font-medium">
                                    {item.label}
                                  </span>
                                  {item.description && (
                                    <p className="mt-1 text-sm text-muted-foreground">
                                      {item.description}
                                    </p>
                                  )}
                                </CMSLink>
                              ))}
                            </div> */}
                          </div>
                        )}
                      </div>
                    );
                  })}
              </nav>

              {mainMenu.ctas && (
                <div className="absolute bottom-0 left-0 right-0 border-t bg-background p-6 animate-in slide-in-from-bottom duration-300">
                  <div className="flex flex-col gap-2">
                    {mainMenu.ctas.map((cta) => (
                      <CMSLink key={cta.id} {...cta.link} />
                    ))}
                  </div>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};
