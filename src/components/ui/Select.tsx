import * as SelectPrimitive from "@radix-ui/react-select";

interface SelectProps<T extends string> {
  value: T;
  onValueChange: (value: T) => void;
  options: readonly T[];
  label?: string;
}

function Select<T extends string>({
  value,
  onValueChange,
  options,
  label = "Pilih periode",
}: SelectProps<T>) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted">{label}</span>

      <SelectPrimitive.Root
        value={value}
        onValueChange={(nextValue) => onValueChange(nextValue as T)}
      >
        <SelectPrimitive.Trigger
          aria-label={label}
          className="inline-flex min-w-28 items-center justify-between gap-3 rounded-full border border-border bg-surface px-3.5 py-2 text-sm text-ink-soft outline-none transition hover:border-ink/30 focus:border-ink focus:ring-2 focus:ring-ink/10"
        >
          <SelectPrimitive.Value />
          <SelectPrimitive.Icon aria-hidden="true">▾</SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            position="popper"
            sideOffset={6}
            className="z-50 min-w-28 overflow-hidden rounded-xl border border-border bg-surface p-1 shadow-[var(--shadow-card-lg)]"
          >
            <SelectPrimitive.Viewport>
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option}
                  value={option}
                  className="relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2 text-sm text-ink-soft outline-none hover:bg-ink/[0.06] focus:bg-accent/10 focus:text-accent-dark"
                >
                  <SelectPrimitive.ItemText>{option}</SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator className="absolute right-2 text-accent">
                    ✓
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    </div>
  );
}

export default Select;
