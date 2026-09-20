import type { ReactNode } from "react";

type NoticeVariant = "success" | "error" | "warning";

interface InlineNoticeProps {
  variant: NoticeVariant;
  children: ReactNode;
  className?: string;
}

const styles: Record<NoticeVariant, { role: "status" | "alert"; classes: string; icon: string }> = {
  success: {
    role: "status",
    classes: "border-safe/25 bg-safe/8 text-safe",
    icon: "✓",
  },
  error: {
    role: "alert",
    classes: "border-danger/25 bg-danger/6 text-danger",
    icon: "!",
  },
  warning: {
    role: "status",
    classes: "border-warn/30 bg-warn/10 text-accent-dark",
    icon: "!",
  },
};

function InlineNotice({ variant, children, className = "" }: InlineNoticeProps) {
  const style = styles[variant];

  return (
    <div
      role={style.role}
      aria-live="polite"
      className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${style.classes} ${className}`}
    >
      <span aria-hidden="true">{style.icon}</span>
      <p>{children}</p>
    </div>
  );
}

export default InlineNotice;
