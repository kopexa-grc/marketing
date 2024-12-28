import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { buttonVariants } from "./button";
import { cn } from "@/lib/utils";
import Link, { type LinkProps } from "next/link";

export type PromoCardRootProps = ComponentPropsWithoutRef<"div">;

export const PromoCardRoot = forwardRef<HTMLDivElement, PromoCardRootProps>(
  (props, ref) => {
    const { className, children, ...rest } = props;

    return (
      <div
        className={cn(
          "w-full h-full p-10 lg:p-12 rounded-2xl text-foreground bg-accent md:flex md:justify-between lg:items-center",
          className
        )}
        {...rest}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);

PromoCardRoot.displayName = "PromoCardRoot";

export const PromoCardContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <div
      className={cn(
        "flex flex-col lg:flex-row lg:w-full lg:items-center lg:justify-between lg:order-2 gap-12",
        className
      )}
      {...rest}
      ref={ref}
    >
      {props.children}
    </div>
  );
});

PromoCardContent.displayName = "PromoCardContent";

export const PromoCardText = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <div className={cn("max-w-2xl", className)} {...rest} ref={ref}>
      {props.children}
    </div>
  );
});

PromoCardText.displayName = "PromoCardText";

export const PromoCardLink = forwardRef<
  HTMLAnchorElement,
  ComponentPropsWithoutRef<"a"> & LinkProps
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <Link
      className={cn(
        buttonVariants({
          variant: "outline",
          size: "xl",
        }),
        className
      )}
      {...rest}
      ref={ref}
    />
  );
});

PromoCardLink.displayName = "PromoCardLink";

export const PromoCardImage = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>((props, ref) => {
  const { className, ...restProps } = props;

  return (
    <div
      className={cn(
        "w-44 h-28 rounded-2xl mb-6",
        "lg:shrink-0 lg:order-2 lg:mb-0 lg:mr-6",
        "xl:order-1 xl:mr-6 xl:ml-0 xl:h-20 xl:w-20",
        className
      )}
      {...restProps}
      ref={ref}
    />
  );
});

PromoCardImage.displayName = "PromoCardImage";

export const PromoCard = {
  Root: PromoCardRoot,
  Image: PromoCardImage,
  Content: PromoCardContent,
  Text: PromoCardText,
  Link: PromoCardLink,
};
