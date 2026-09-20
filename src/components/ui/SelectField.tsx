import type { ChangeEvent, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

import { textInputClassName } from "./TextField";

export interface SelectFieldProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange" | "className"> {
  id: string;
  label: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  wrapperClassName?: string;
  children: ReactNode;
}

export function SelectField({
  id,
  label,
  onChange,
  wrapperClassName,
  children,
  ...selectProps
}: SelectFieldProps) {
  return (
    <div className={wrapperClassName}>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-ink-soft">
        {label}
      </label>

      <select id={id} onChange={onChange} className={textInputClassName} {...selectProps}>
        {children}
      </select>
    </div>
  );
}

export interface TextAreaFieldProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange" | "className"> {
  id: string;
  label: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  wrapperClassName?: string;
}

export function TextAreaField({
  id,
  label,
  onChange,
  wrapperClassName,
  ...textareaProps
}: TextAreaFieldProps) {
  return (
    <div className={wrapperClassName}>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-ink-soft">
        {label}
      </label>

      <textarea
        id={id}
        onChange={onChange}
        className={`${textInputClassName} resize-none leading-6`}
        {...textareaProps}
      />
    </div>
  );
}
