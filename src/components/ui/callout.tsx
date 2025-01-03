// components/ui/callout.tsx
import { tv, type VariantProps } from "tailwind-variants";
import { CheckCircle2, AlertCircle, AlertTriangle, Info } from "lucide-react";

const callout = tv({
  base: "rounded-lg p-4 my-4 flex gap-3 text-sm",
  variants: {
    variant: {
      default: "bg-muted text-muted-foreground",
      info: "bg-blue-50 text-blue-800 border border-blue-100",
      success: "bg-green-50 text-green-800 border border-green-100",
      warning: "bg-yellow-50 text-yellow-800 border border-yellow-100",
      error: "bg-red-50 text-red-800 border border-red-100",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const icons = {
  default: Info,
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle,
};

interface CalloutProps extends VariantProps<typeof callout> {
  children: React.ReactNode;
  className?: string;
}

export function Callout({
  children,
  variant = "default",
  className,
}: CalloutProps) {
  const Icon = icons[variant ?? "default"];

  return (
    <div className={callout({ variant, className })}>
      <Icon className="h-5 w-5 shrink-0" />
      <div>{children}</div>
    </div>
  );
}
