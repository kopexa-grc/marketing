import { cn } from "@/lib/utils";
import { type ComponentProps, forwardRef } from "react";

export const Logo = forwardRef<HTMLSpanElement, ComponentProps<"span">>(
  (props, ref) => {
    const { className, ...restProps } = props;

    return (
      <span
        className={cn(
          "relative font-sans text-2xl tracking-tight",
          "after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:origin-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100",
          className
        )}
        {...restProps}
        ref={ref}
      >
        <span className="font-light text-foreground tracking-tighter">K</span>
        <span className="font-black bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">
          P
        </span>
        <span className="font-extrabold text-foreground">X</span>
      </span>
    );
  }
);

Logo.displayName = "Logo";
