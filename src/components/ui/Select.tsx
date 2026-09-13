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
      <label className="text-xs text-slate-500">{label}</label>

      <SelectPrimitive.Root
        value={value}
        onValueChange={(nextValue) => onValueChange(nextValue as T)}
      >
        <SelectPrimitive.Trigger
          aria-label={label}
          className="inline-flex min-w-28 items-center justify-between gap-3 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-600 outline-none transition hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <SelectPrimitive.Value />
          <SelectPrimitive.Icon aria-hidden="true">▼</SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            position="popper"
            sideOffset={5}
            className="z-50 min-w-28 overflow-hidden rounded-lg border border-slate-200 bg-white p-1 shadow-lg"
          >
            <SelectPrimitive.Viewport>
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option}
                  value={option}
                  className="relative flex cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm text-slate-600 outline-none hover:bg-slate-100 focus:bg-blue-50 focus:text-blue-600"
                >
                  <SelectPrimitive.ItemText>{option}</SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator className="absolute right-2">
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
