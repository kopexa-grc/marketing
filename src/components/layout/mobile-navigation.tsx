"use client";

import { ChevronDown, MenuIcon, XIcon } from "lucide-react";
import type { LayoutDocument } from "../../../prismicio-types";
import * as Dialog from "@radix-ui/react-dialog";
import * as Accordion from "@radix-ui/react-accordion";
import { PrismicNextLink } from "@prismicio/next";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import { useState } from "react";
import { tv } from "tailwind-variants";

const menuSlotRecipe = tv({
  slots: {
    content: [
      "max-h-screen overflow-y-auto",
      "fixed inset-0 h-auto z-50 border-t bg-background w-full shadow-lg",
    ],
  },
});

type MobileNavigationProps = {
  layout: LayoutDocument;
  offset?: number;
};

const MotionContent = motion.create(Accordion.Content);

export const MobileNavigation = ({
  layout,
  offset = 0,
}: MobileNavigationProps) => {
  const [isOpen, setOpen] = useState(false);

  const recipe = menuSlotRecipe();

  return (
    <Dialog.Root open={isOpen} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="block lg:hidden"
          aria-label="Toggle menu"
        >
          <motion.span
            initial={false}
            animate={isOpen ? "open" : "closed"}
            variants={{
              open: { rotate: 180, scale: 1.2 },
              closed: { rotate: 0, scale: 1 },
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="size-12 -mr-2 z-20 relative grid place-content-center"
          >
            {isOpen ? (
              <XIcon className="size-8" />
            ) : (
              <MenuIcon className="size-8" />
            )}
          </motion.span>
        </button>
      </Dialog.Trigger>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Content forceMount aria-describedby={undefined} asChild>
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={recipe.content()}
                style={{
                  top: `${offset}px`,
                }}
              >
                <span className="sr-only">
                  <Dialog.Title>Mobile Navigation</Dialog.Title>
                </span>
                <nav
                  aria-label="Main Navigation"
                  className="flex flex-col overflow-auto"
                >
                  <div className="lg:grow order-2 lg:order-1">
                    <Accordion.Root
                      type="single"
                      orientation="vertical"
                      className="container"
                      collapsible
                    >
                      {layout.data.slices.map((item) => {
                        if (item.variation === "default") {
                          return (
                            <PrismicNextLink
                              key={item.id}
                              field={item.primary.link}
                            />
                          );
                        }

                        return (
                          <Accordion.Item
                            className="border-b"
                            value={item.id}
                            key={item.id}
                          >
                            <Accordion.Header className="flex">
                              <Accordion.Trigger className="flex flex-1 items-center justify-between py-4 transition-all hover:underline [&[data-state=open]>svg]:rotate-180">
                                {item.primary.label}
                                <ChevronDown className="ml-1 size-6 relative transition-transform duration-300" />
                              </Accordion.Trigger>
                            </Accordion.Header>
                            <MotionContent
                              className={cn("overflow-hidden text-sm")}
                            >
                              <div className="py-4">
                                <div className="flex flex-col gap-3">
                                  <SliceZone
                                    // @ts-expect-error prismic typing
                                    slices={item.primary.subMenu.data?.slices}
                                    components={components}
                                  />
                                  <SliceZone
                                    // @ts-expect-error prismic typing
                                    slices={item.primary.subMenu.data?.slices1}
                                    components={components}
                                  />
                                </div>
                              </div>
                            </MotionContent>
                          </Accordion.Item>
                        );
                      })}
                    </Accordion.Root>
                  </div>
                  <div className="container lg:mx-0 lg:w-auto lg:max-w-none justify-end order-1 lg:order-2 flex flex-col sm:flex-row sm:items-center sm:gap-x-4 p-6 lg:p-0 relative z-10 bg-background">
                    <div className="flex items-center gap-1">
                      {layout.data.cta && (
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <PrismicNextLink
                            field={layout.data.cta}
                            className={buttonVariants({ variant: "default" })}
                          />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </nav>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};
