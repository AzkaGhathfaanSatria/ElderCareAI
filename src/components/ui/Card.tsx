import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes, ReactNode } from "react";

const cardVariants = cva("rounded-xl bg-white transition", {
  variants: {
    variant: {
      default: "shadow-sm",
      bordered: "border border-slate-200 shadow-sm",
      elevated: "shadow-md",
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
