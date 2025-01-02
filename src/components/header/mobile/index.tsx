"use client";

import { Logo } from "../../ui/logo";
import { ArrowRight, ChevronRight, MenuIcon, X } from "lucide-react";
import { Button } from "../../ui/button";
import type { MainMenu } from "@/payload-types";
import { CMSLink } from "../../cms/cms-link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";
import { AnimatePresence, type Variants, motion } from "motion/react";
import { RemoveScroll } from "react-remove-scroll";
import { FocusScope } from "@radix-ui/react-focus-scope";
import { useKeyboardFocus } from "@/hooks/use-keyboard-focus";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { Portal } from "@/components/ui/portal";

interface NavProps {
  mainMenu: MainMenu;
}

const menuVariants: Variants = {
  closed: {
    x: "100%",
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  open: {
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
};

const tabVariants = {
  closed: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.2 },
  },
  open: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

const itemVariants = {
  closed: { x: 20, opacity: 0 },
  open: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: i * 0.1, duration: 0.3 },
  }),
};

export const NavbarMobile = ({ mainMenu }: NavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navigationRef = useRef<HTMLElement>(null);

  const { shouldShowOutline } = useKeyboardFocus();
  const isDesktop = useBreakpoint("lg", "up");

  // Close menu and reset states when switching to desktop
  useEffect(() => {
    if (isDesktop && isOpen) {
      setIsOpen(false);
      setActiveTab(null);
    }
  }, [isDesktop, isOpen]);

  // Clean up when unmounting or closing
  useEffect(() => {
    return () => {
      if (!isOpen) {
        setActiveTab(null);
      }
    };
  }, [isOpen]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setIsOpen(false);
    setActiveTab(null);
  }, [pathname]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Escape":
          setIsOpen(false);
          menuButtonRef.current?.focus();
          break;
        case "Tab":
          // Let FocusScope handle tab navigation
          break;
        case "ArrowUp":
        case "ArrowDown": {
          const focusableElements = navigationRef.current?.querySelectorAll(
            'a[href], button:not([disabled]), [tabindex="0"]'
          );
          if (!focusableElements?.length) return;

          const currentIndex = Array.from(focusableElements).findIndex(
            (el) => el === document.activeElement
          );

          let nextIndex: number;
          if (event.key === "ArrowDown") {
            nextIndex =
              currentIndex + 1 >= focusableElements.length
                ? 0
                : currentIndex + 1;
          } else {
            nextIndex =
              currentIndex - 1 < 0
                ? focusableElements.length - 1
                : currentIndex - 1;
          }

          (focusableElements[nextIndex] as HTMLElement).focus();
          break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const toggleTab = (tabId: string) => {
    setActiveTab(activeTab === tabId ? null : tabId);
  };

  return (
    // biome-ignore lint/a11y/useSemanticElements: <explanation>
    <div className="h-full" role="navigation" aria-label="Mobile navigation">
      <div className="flex h-full items-center justify-between md:px-8 px-5">
        <Link href="/" aria-label="Home">
          <Logo />
        </Link>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-controls="mobile-menu"
          className={cn(
            "w-12 h-12 text-white",
            !shouldShowOutline && "focus:ring-0 focus-visible:ring-0"
          )}
        >
          <MenuIcon className="!size-6" />
        </Button>
        <AnimatePresence>
          {isOpen && (
            <Portal>
              <RemoveScroll enabled={isOpen}>
                <FocusScope trapped asChild>
                  <motion.div
                    id="mobile-menu"
                    // biome-ignore lint/a11y/useSemanticElements: <explanation>
                    role="dialog"
                    aria-label="Main menu"
                    aria-modal="true"
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={menuVariants}
                    className="fixed inset-0 z-50 w-full bg-primary text-primary-foreground flex flex-col"
                  >
                    <div className="flex h-16 items-center justify-between px-6 pt-6">
                      <Logo />
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setIsOpen(false)}
                        aria-label="Close menu"
                        className={cn(
                          "w-12 h-12 text-white",
                          !shouldShowOutline &&
                            "focus:ring-0 focus-visible:ring-0"
                        )}
                      >
                        <X className="!size-6" />
                      </Button>
                    </div>
                    <nav
                      ref={navigationRef}
                      className="flex-1 overflow-y-auto overflow-x-hidden pb-24"
                      role="menubar"
                    >
                      <div className="space-y-2 py-6">
                        {Array.isArray(mainMenu.tabs) &&
                          mainMenu.tabs.map((tab, index) => {
                            if (tab.enableDirectLink && tab.link) {
                              return (
                                <motion.div
                                  key={tab.id}
                                  custom={index}
                                  variants={itemVariants}
                                >
                                  <CMSLink
                                    {...tab.link}
                                    appearance="none"
                                    className={cn(
                                      "flex items-center justify-between rounded-2xl ps-6 pe-10 py-3 text-lg font-medium transition-colors hover:bg-primary/5",
                                      !shouldShowOutline &&
                                        "focus:ring-0 focus-visible:ring-0"
                                    )}
                                    role="menuitem"
                                  >
                                    {tab.label}
                                    <ArrowRight className="h-5 w-5 text-white" />
                                  </CMSLink>
                                </motion.div>
                              );
                            }

                            return (
                              <div key={tab.id} className="relative">
                                <motion.button
                                  custom={index}
                                  variants={itemVariants}
                                  onClick={() => toggleTab(tab.id || "")}
                                  className={cn(
                                    "flex w-full items-center justify-between ps-6 pe-10 py-3 text-lg font-medium transition-colors hover:bg-primary/5",
                                    activeTab === tab.id && "bg-primary/5",
                                    !shouldShowOutline &&
                                      "focus:ring-0 focus-visible:ring-0"
                                  )}
                                  aria-expanded={activeTab === tab.id}
                                  aria-controls={`panel-${tab.id}`}
                                  role="menuitem"
                                >
                                  {tab.label}
                                  <motion.div
                                    animate={{
                                      rotate: activeTab === tab.id ? 90 : 0,
                                    }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <ChevronRight className="h-5 w-5 text-white" />
                                  </motion.div>
                                </motion.button>
                                <AnimatePresence>
                                  {activeTab === tab.id && (
                                    <motion.div
                                      id={`panel-${tab.id}`}
                                      initial="closed"
                                      animate="open"
                                      exit="closed"
                                      variants={tabVariants}
                                      className="overflow-hidden bg-primary"
                                    >
                                      {tab.navItems?.map(
                                        (section, sectionIndex) => (
                                          <div
                                            key={section.id}
                                            className="py-3"
                                          >
                                            {section.title && (
                                              <h3 className="px-6 text-sm font-medium text-secondary">
                                                {section.title}
                                              </h3>
                                            )}
                                            <div className="mt-2 space-y-1">
                                              {section.links?.map(
                                                (item, itemIndex) => (
                                                  <motion.div
                                                    key={item.id}
                                                    custom={
                                                      sectionIndex + itemIndex
                                                    }
                                                    variants={itemVariants}
                                                  >
                                                    <CMSLink
                                                      {...item.link}
                                                      appearance="none"
                                                      className="block px-6 py-3 transition-colors hover:bg-white group"
                                                    >
                                                      <span className="font-medium group-hover:text-primary transition-colors">
                                                        {item.label}
                                                      </span>
                                                      {item.description && (
                                                        <p className="mt-1 text-sm text-white/80 group-hover:text-neutral-800 transition-colors">
                                                          {item.description}
                                                        </p>
                                                      )}
                                                    </CMSLink>
                                                  </motion.div>
                                                )
                                              )}
                                            </div>
                                          </div>
                                        )
                                      )}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                      </div>

                      {mainMenu.ctas && (
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="absolute bottom-0 left-0 right-0 border-t border-white/30 bg-primary p-6"
                        >
                          <div className="flex flex-col gap-2">
                            {mainMenu.ctas.map((cta) => (
                              <CMSLink
                                key={cta.id}
                                {...cta.link}
                                role="menuitem"
                              />
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </nav>
                  </motion.div>
                </FocusScope>
              </RemoveScroll>
            </Portal>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
