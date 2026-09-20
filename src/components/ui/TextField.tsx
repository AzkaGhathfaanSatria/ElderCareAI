import type { ChangeEvent, InputHTMLAttributes } from "react";

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "className"> {
  id: string;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  wrapperClassName?: string;
}

export const textInputClassName =
  "w-full rounded-xl border border-border bg-paper px-4 py-3 text-sm text-ink-soft outline-none transition placeholder:text-muted/70 hover:border-ink/25 focus:border-ink focus:bg-surface focus:ring-4 focus:ring-ink/8";

function TextField({ id, label, onChange, wrapperClassName, ...inputProps }: TextFieldProps) {
  return (
    <div className={wrapperClassName}>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-ink-soft">
        {label}
      </label>

      <input id={id} onChange={onChange} className={textInputClassName} {...inputProps} />
    </div>
  );
}

export default TextField;
