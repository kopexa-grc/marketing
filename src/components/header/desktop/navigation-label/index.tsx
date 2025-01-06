import { generateHref } from "@/components/cms/cms-link";
import { Box } from "@/components/ui/box";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import type { CMSLinkField } from "@/payload-types";
import { ChevronDown } from "lucide-react";
import { forwardRef, type ComponentProps, type ReactNode } from "react";

export type NavigationLabelProps = ComponentProps<"li"> & {
  className?: string;
  link?: CMSLinkField;
  text: string;
  children?: ReactNode;
  dark?: boolean;
  withPanel?: boolean;
};

export const NavigationLabel = forwardRef<HTMLLIElement, NavigationLabelProps>(
  (
    { link, children, className, text, dark: _, withPanel, ...restProps },
    ref
  ) => {
    const href = generateHref({
      type: link?.type,
      reference: link?.reference,
      url: link?.url,
    });

    const content = link?.label ?? text;

    const wrapperProps = href ? { href } : {};

    return (
      <li
        className={cn("flex items-center", className)}
        {...restProps}
        ref={ref}
      >
        <Box
          as={href ? Link : "button"}
          {...wrapperProps}
          className={cn(
            "flex items-center text-start no-underline cursor-default group",
            "px-4 py-2",
            "rounded-md transition-colors duration-100",
            // @TODO dark variants
            "text-primary-foreground/80",
            "hover:bg-primary/80 hover:text-primary-foreground",
            "focus:bg-accent focus:text-primary-foreground focus:outline-none",
            "disabled:pointer-events-none disabled:opacity-50"
          )}
        >
          <span className="block relative transition-colors duration-200">
            <span className="font-semibold text-sm transition-colors duration-100 leading-none">
              {content}
            </span>
            {withPanel && (
              <ChevronDown
                className="inline-block relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
                aria-hidden="true"
              />
            )}
          </span>
        </Box>
        {children}
      </li>
    );
  }
);

NavigationLabel.displayName = "NavigationLabel";
