"use client";

import * as React from "react";
import {
  Accordion as AccordionPrimitive,
  useAccordionItemContext,
} from "@ark-ui/react/accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { headingVariants } from "./typography/heading";
import { useAccessibilityContext } from "@/providers/accessibility";
import { AnimatePresence, motion } from "motion/react";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

type AccordionTriggerProps = AccordionPrimitive.ItemTriggerProps;

const AccordionTrigger = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.ItemTrigger>,
  AccordionTriggerProps
>(({ className, children, ...props }, ref) => {
  const { prefersReducedMotion } = useAccessibilityContext();
  const { expanded } = useAccordionItemContext();

  const springConfig = {
    stiffness: 300,
    damping: 30,
    mass: 0.5,
  };

  return (
    <AccordionPrimitive.ItemTrigger
      ref={ref}
      className={cn(
        headingVariants({ level: 4 }),
        "w-full group",
        "flex items-center justify-between",
        "py-6 lg:py-8",
        "cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
      {...props}
    >
      {children}
      <motion.div
        className={cn(
          "rounded-full p-2",
          "bg-accent text-accent-foreground",
          "group-hover:bg-primary group-hover:text-primary-foreground",
          "transition-colors duration-200"
        )}
        initial={false}
        animate={{ rotate: expanded ? 180 : 0 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { type: "spring", ...springConfig }
        }
      >
        <ChevronDown
          aria-hidden
          className="h-4 w-4 shrink-0"
          strokeWidth={2.5}
        />
      </motion.div>
    </AccordionPrimitive.ItemTrigger>
  );
});
AccordionTrigger.displayName = "AccordionTrigger";

type AccordionContentProps = AccordionPrimitive.ItemContentProps;

const AccordionContent = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.ItemContent>,
  AccordionContentProps
>(({ className, children, ...props }, ref) => {
  const { prefersReducedMotion } = useAccessibilityContext();
  const { expanded } = useAccordionItemContext();

  const contentSpringConfig = {
    type: "spring",
    stiffness: 400,
    damping: 40,
    mass: 0.8,
  };

  return (
    <AccordionPrimitive.ItemContent
      ref={ref}
      className="overflow-hidden"
      {...props}
    >
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            className={cn(
              "origin-top will-change-[transform,opacity]",
              className
            )}
            initial={{
              height: 0,
              opacity: 0,
              scale: 0.98,
              y: -8,
            }}
            animate={{
              height: "auto",
              opacity: 1,
              scale: 1,
              y: 0,
              transition: prefersReducedMotion
                ? { duration: 0 }
                : {
                    height: contentSpringConfig,
                    opacity: { type: "spring", stiffness: 300, damping: 30 },
                    scale: contentSpringConfig,
                    y: contentSpringConfig,
                  },
            }}
            exit={{
              height: 0,
              opacity: 0,
              scale: 0.98,
              y: -8,
              transition: prefersReducedMotion
                ? { duration: 0 }
                : {
                    height: { ...contentSpringConfig, stiffness: 500 },
                    opacity: { type: "spring", stiffness: 400, damping: 40 },
                    scale: { type: "spring", stiffness: 500, damping: 40 },
                    y: { type: "spring", stiffness: 500, damping: 40 },
                  },
            }}
          >
            <div className={cn("pb-4 lg:pb-8", className)}>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: prefersReducedMotion
                    ? { duration: 0 }
                    : {
                        type: "spring",
                        stiffness: 400,
                        damping: 40,
                        mass: 0.8,
                        delay: 0.1, // Slight delay for staggered effect
                      },
                }}
              >
                {children}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AccordionPrimitive.ItemContent>
  );
});
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
