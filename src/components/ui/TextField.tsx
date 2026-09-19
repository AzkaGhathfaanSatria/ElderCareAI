import type { InputHTMLAttributes } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  containerClassName?: string;
}

/**
 * Input teks berlabel dengan styling standar dipakai di seluruh form
 * (Login, Register, Profil, Pengaturan, halaman-halaman manajemen, dsb).
 * Diekstrak jadi satu komponen supaya markup & class-nya tidak diulang-ulang
 * persis sama di banyak file (sumber duplikasi kode terbesar sebelumnya).
 */
function TextField({ id, label, containerClassName, className, ...inputProps }: TextFieldProps) {
  return (
    <div className={containerClassName}>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-ink-soft">
        {label}
      </label>

      <input
        id={id}
        className={
          className ??
          "w-full rounded-xl border border-border bg-paper px-4 py-3 text-sm text-ink-soft outline-none transition placeholder:text-muted/70 hover:border-ink/25 focus:border-ink focus:bg-surface focus:ring-4 focus:ring-ink/8"
        }
        {...inputProps}
      />
    </div>
  );
}

export default TextField;
