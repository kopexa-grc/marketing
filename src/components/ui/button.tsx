import * as React from "react";
import { ark } from "@ark-ui/react/factory";
import { cn } from "@/lib/utils";
import { tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background",
    "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    "duration-300",
  ],
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline: [
        "border-2 border-foreground bg-transparent text-foreground",
        "hover:border-primary hover:text-primary hover:bg-transparent",
      ],
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "text-foreground hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    },
    size: {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      xl: "rounded-md py-3.5 px-6 text-base leading-none font-semibold",
      icon: "h-10 w-10",
    },
    onPrimary: {
      true: "ring-offset-primary",
      false: "",
    },
  },
  compoundVariants: [
    {
      variant: "default",
      onPrimary: true,
      class: "bg-background text-foreground hover:bg-background/90",
    },
    {
      variant: "outline",
      onPrimary: true,
      class: [
        "border-primary-foreground text-primary-foreground",
        "hover:border-secondary hover:text-secondary",
      ],
    },
  ],
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <ark.button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
