import type { Page } from "@/payload-types";
import { buttonVariants, type ButtonProps } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type CMSLinkType = {
  appearance?: ButtonProps["variant"] | "none";
  size?: ButtonProps["size"];
  newTab?: boolean | null;
  label?: string | null;
  children?: ReactNode;
  reference?: {
    relationTo: "pages";
    value: number | Page;
  } | null;
  url?: string | null;
  type?: ("reference" | "custom") | null;
  className?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
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
  const href =
    type === "reference" &&
    typeof reference?.value === "object" &&
    reference.value.slug
      ? `${reference?.relationTo !== "pages" ? `/${reference?.relationTo}` : ""}/${
          reference.value.slug
        }`
      : url;

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
