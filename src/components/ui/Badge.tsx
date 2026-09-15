import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes, ReactNode } from "react";

const badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium", {
  variants: {
    variant: {
      success: "bg-green-100 text-green-700",
      info: "bg-blue-100 text-blue-700",
      warning: "bg-yellow-100 text-yellow-700",
      danger: "bg-red-100 text-red-700",
      neutral: "bg-slate-100 text-slate-600",
    },
  },
  defaultVariants: {
    variant: "neutral",
  },
});

type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants> & {
    children: ReactNode;
  };

function Badge({ children, variant, className = "", ...props }: BadgeProps) {
  return (
    <span className={`${badgeVariants({ variant })} ${className}`} {...props}>
      {children}
    </span>
  );
}

export default Badge;
