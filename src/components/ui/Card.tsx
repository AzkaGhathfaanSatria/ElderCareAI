import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes, ReactNode } from "react";

const cardVariants = cva("rounded-2xl bg-surface transition-shadow", {
  variants: {
    variant: {
      default: "border border-border shadow-[var(--shadow-card)]",
      bordered: "border border-border shadow-[var(--shadow-card)]",
      elevated: "border border-border shadow-[var(--shadow-card-lg)]",
      alert: "border border-danger/25 ring-1 ring-danger/10 shadow-[var(--shadow-card)]",
    },
    padding: {
      none: "p-0",
      sm: "p-4",
      md: "p-5",
      lg: "p-6",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "none",
  },
});

type CardProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof cardVariants> & {
    children: ReactNode;
  };

function Card({ children, variant, padding, className = "", ...props }: CardProps) {
  return (
    <section className={`${cardVariants({ variant, padding })} ${className}`} {...props}>
      {children}
    </section>
  );
}

export default Card;
