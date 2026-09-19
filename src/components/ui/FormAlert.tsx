interface FormAlertProps {
  message: string;
  /** "simple": tanda seru polos (halaman manajemen). "icon": lingkaran ikon (form autentikasi/registrasi). */
  variant?: "simple" | "icon";
  /** Class tambahan pada wrapper, dipakai untuk margin (mb-5/mb-6) yang beda tiap pemanggil. */
  className?: string;
}

/**
 * Kotak pesan error standar untuk form. Markup ini sebelumnya disalin
 * persis di banyak file form terpisah (Login, Register, ElderlyRegistration,
 * dan halaman-halaman manajemen).
 */
function FormAlert({ message, variant = "simple", className = "" }: FormAlertProps) {
  if (variant === "icon") {
    return (
      <div
        role="alert"
        aria-live="polite"
        className={`flex items-start gap-3 rounded-xl border border-danger/25 bg-danger/6 px-4 py-3 text-sm text-danger ${className}`}
      >
        <span
          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-danger/15 text-xs font-bold"
          aria-hidden="true"
        >
          !
        </span>
        <p>{message}</p>
      </div>
    );
  }

  return (
    <div
      className={`flex items-start gap-3 rounded-lg border border-danger/25 bg-danger/6 px-4 py-3 text-sm text-danger ${className}`}
      role="alert"
    >
      <span aria-hidden="true">!</span>
      <p>{message}</p>
    </div>
  );
}

export default FormAlert;
