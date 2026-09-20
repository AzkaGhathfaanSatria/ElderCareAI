import type { ReactNode } from "react";

interface PageHeaderBarProps {
  eyebrow: string;
  title: string;
  action?: ReactNode;
}

function PageHeaderBar({ eyebrow, title, action }: PageHeaderBarProps) {
  return (
    <header className="flex min-h-16 items-center justify-between gap-4 border-b border-border bg-surface px-4 py-3 sm:px-6 lg:px-8">
      <div>
        <p className="text-sm text-muted">{eyebrow}</p>
        <h1 className="mt-0.5 font-serif text-lg text-ink">{title}</h1>
      </div>

      {action}
    </header>
  );
}

export default PageHeaderBar;
