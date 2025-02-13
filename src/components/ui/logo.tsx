import { cn } from "@/lib/utils";
import Image from "next/image";
import { type ComponentProps, forwardRef } from "react";

export const Logo = forwardRef<HTMLSpanElement, ComponentProps<"span">>(
  (props, ref) => {
    const { className, ...restProps } = props;

    return (
      <span
        className={cn("relative flex items-center gap-2", className)}
        {...restProps}
        ref={ref}
      >
        <Image src="/logo.svg" alt="logo" width={32} height={32} />
        <span className="font-bold">Kopexa</span>
      </span>
    );
  }
);

Logo.displayName = "Logo";
