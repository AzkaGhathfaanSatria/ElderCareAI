import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ink " +
    "disabled:cursor-not-allowed disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "bg-ink text-paper hover:bg-ink-soft",
        accent: "bg-accent text-white hover:bg-accent-dark",
        secondary: "bg-ink/[0.06] text-ink hover:bg-ink/[0.1]",
        ghost: "bg-transparent text-ink hover:bg-ink/[0.06]",
        danger: "bg-danger text-white hover:bg-danger/90",
      },
      size: {
        sm: "px-3.5 py-1.5 text-xs",
        md: "px-5 py-2.5 text-sm",
        lg: "px-6 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    children: ReactNode;
  };

function Button({ children, variant, size, className = "", ...props }: ButtonProps) {
  return (
    <button className={`${buttonVariants({ variant, size })} ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
