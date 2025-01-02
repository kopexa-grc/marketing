import { cn } from "@/lib/utils";
import { type ComponentProps, forwardRef } from "react";

export const Logo = forwardRef<HTMLSpanElement, ComponentProps<"span">>(
  (props, ref) => {
    const { className, ...restProps } = props;

    return (
      <span
        className={cn(
          "relative font-sans text-2xl tracking-tighter",
          "after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:origin-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100",
          className
        )}
        {...restProps}
        ref={ref}
      >
        <span className="font-black">Kopexa</span>
      </span>
    );
  }
);

Logo.displayName = "Logo";
