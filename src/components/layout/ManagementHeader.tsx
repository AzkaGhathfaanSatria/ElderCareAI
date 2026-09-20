import type { ReactNode } from "react";

import Button from "../ui/Button";

interface ManagementHeaderProps {
  title: string;
  description: ReactNode;
  isFormOpen: boolean;
  onToggleForm: () => void;
  openLabel: string;
}

function ManagementHeader({
  title,
  description,
  isFormOpen,
  onToggleForm,
  openLabel,
}: ManagementHeaderProps) {
  return (
    <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="font-serif text-2xl text-ink sm:text-3xl">{title}</h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-muted">{description}</p>
      </div>

      <Button variant="accent" size="sm" onClick={onToggleForm}>
        {isFormOpen ? "Batal" : openLabel}
      </Button>
    </header>
  );
}

export default ManagementHeader;
