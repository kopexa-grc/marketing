import type { CMSLinkField, Page } from "@/payload-types";
import { buttonVariants, type ButtonProps } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export type CMSLinkType = CMSLinkField & {
  appearance?: ButtonProps["variant"] | "none";
  size?: ButtonProps["size"];
  label?: string | null;
  children?: ReactNode;
  className?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
};

type LinkType = CMSLinkField["type"];
type Reference = CMSLinkField["reference"];

type GenerateSlugType = {
  reference?: Reference;
  type?: LinkType;
  url?: null | string;
};

const generateHref = (args: GenerateSlugType) => {
  const { type, reference, url } = args;

  if ((type === "custom" || type === undefined) && url) {
    return url;
  }

  if (
    type === "reference" &&
    reference?.value &&
    typeof reference.value !== "string"
  ) {
    if (reference.relationTo === "pages") {
      const value = reference.value as Page;
      const breadcrumbs = value?.breadcrumbs;
      const hasBreadcrumbs =
        breadcrumbs && Array.isArray(breadcrumbs) && breadcrumbs.length > 0;
      if (hasBreadcrumbs) {
        return breadcrumbs[breadcrumbs.length - 1]?.url as string;
      }
    }

    return "";
  }

  return "";
};

/**
 * Renders a Link based on the Link Field.
 */
export const CMSLink = ({
  type,
  reference,
  url,
  newTab,
  label,
  className,
  appearance,
  size,
  children,
  "aria-label": ariaLabel,
  "aria-describedby": ariadescribedby,
}: CMSLinkType) => {
  const href = generateHref({ type, reference, url });

  if (!href) return null;

  const newTabProps = newTab
    ? { rel: "noopener noreferrer", target: "_blank" }
    : {};

  return (
    <Link
      className={cn(
        appearance !== "none" &&
          buttonVariants({
            variant: appearance,
            size,
          }),
        className
      )}
      href={href || url || ""}
      {...newTabProps}
      aria-label={ariaLabel}
      aria-describedby={ariadescribedby}
    >
      {children ? children : label}
    </Link>
  );
};
