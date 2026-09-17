import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes, ReactNode } from "react";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
  {
    variants: {
      variant: {
        success: "bg-safe/12 text-safe",
        info: "bg-ink/8 text-ink-soft",
        warning: "bg-warn/15 text-accent-dark",
        danger: "bg-danger/10 text-danger",
        neutral: "bg-muted/12 text-muted",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  },
);

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
