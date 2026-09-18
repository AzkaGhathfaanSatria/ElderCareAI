"use client";

import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useEffect, useRef, useState } from "react";

interface TopNavProps {
  hasNotification?: boolean;
}

function TopNav({ hasNotification = false }: TopNavProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isProfileOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isProfileOpen]);

  const menuItems: Array<{
    label: string;
    path: string | null;
    icon: ReactNode;
  }> = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <rect x="4" y="4" width="6" height="6" rx="1" />
          <rect x="14" y="4" width="6" height="6" rx="1" />
          <rect x="4" y="14" width="6" height="6" rx="1" />
          <rect x="14" y="14" width="6" height="6" rx="1" />
        </svg>
      ),
    },
    {
      label: "Data Lansia",
      path: "/elderly",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <circle cx="12" cy="8" r="3" />
          <path d="M5 20c.8-3.2 3.1-5 7-5s6.2 1.8 7 5" />
        </svg>
      ),
    },
    {
      label: "Notifikasi",
      path: "/notifications",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
          <path d="M10 21h4" />
        </svg>
      ),
    },
    {
      label: "Izin Akses",
      path: "/access",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <rect x="4" y="10" width="16" height="10" rx="1.5" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>
      ),
    },
    {
      label: "Riwayat",
      path: null,
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v4l3 2" />
        </svg>
      ),
    },
  ];

  return (
    <div className="sticky top-0 z-40 bg-surface">
      {/* Baris 1 — identitas & profil */}
      <div className="flex h-16 items-center justify-between border-b border-border/60 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink font-serif text-sm text-paper"
            aria-hidden="true"
          >
            E
          </div>

          <div>
            <p className="font-serif text-base leading-none text-ink">ElderCare AI</p>
            <p className="mt-1 text-[11px] text-muted">Monitoring System</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Buka notifikasi"
            className="relative rounded-lg p-2 text-muted transition hover:bg-paper hover:text-ink-soft"
          >
            <span className="text-lg" aria-hidden="true">
              ♢
            </span>

            {hasNotification && (
              <span
                className="absolute right-1 top-1 h-2 w-2 rounded-full bg-danger"
                role="status"
                aria-label="Ada notifikasi baru"
              />
            )}
          </button>

          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => setIsProfileOpen((open) => !open)}
              aria-haspopup="menu"
              aria-expanded={isProfileOpen}
              className="flex items-center gap-3 rounded-lg py-1 pl-1 pr-2 transition hover:bg-paper"
            >
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/15 text-sm font-bold text-accent-dark"
                aria-hidden="true"
              >
                DK
              </div>

              <div className="hidden text-left sm:block">
                <p className="text-sm font-semibold leading-tight text-ink-soft">Dian Kusuma</p>
                <p className="text-xs text-muted">Keluarga/Caregiver</p>
              </div>

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`hidden h-3.5 w-3.5 shrink-0 text-muted transition-transform sm:block ${
                  isProfileOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {isProfileOpen && (
              <div
                role="menu"
                aria-label="Menu profil"
                className="absolute right-0 top-[calc(100%+8px)] w-60 overflow-hidden rounded-xl border border-border bg-surface shadow-[var(--shadow-card-lg)]"
              >
                <div className="border-b border-border px-4 py-3">
                  <p className="text-sm font-semibold text-ink-soft">Dian Kusuma</p>
                  <p className="mt-0.5 text-xs text-muted">Keluarga/Caregiver · Budi Santoso</p>
                </div>

                <div className="py-1.5">
                  <button
                    type="button"
                    role="menuitem"
                    disabled
                    title="Segera hadir"
                    className="flex w-full cursor-default items-center gap-2.5 px-4 py-2.5 text-left text-sm text-muted/50"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-4 w-4 shrink-0"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="8" r="3.2" />
                      <path d="M5 20c.8-3.2 3.1-5 7-5s6.2 1.8 7 5" />
                    </svg>
                    Profil Saya
                  </button>

                  <button
                    type="button"
                    role="menuitem"
                    disabled
                    title="Segera hadir"
                    className="flex w-full cursor-default items-center gap-2.5 px-4 py-2.5 text-left text-sm text-muted/50"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-4 w-4 shrink-0"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.4 13a7.97 7.97 0 0 0 0-2l2.1-1.6-2-3.4-2.5 1a8 8 0 0 0-1.7-1L14.9 3h-4l-.4 2.9a8 8 0 0 0-1.7 1l-2.5-1-2 3.4L6.4 11a7.97 7.97 0 0 0 0 2l-2.1 1.6 2 3.4 2.5-1a8 8 0 0 0 1.7 1l.4 2.9h4l.4-2.9a8 8 0 0 0 1.7-1l2.5 1 2-3.4z" />
                    </svg>
                    Pengaturan
                  </button>
                </div>

                <div className="border-t border-border py-1.5">
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setIsProfileOpen(false);
                      router.push("/login");
                    }}
                    className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm font-medium text-danger transition hover:bg-danger/8"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-4 w-4 shrink-0"
                      aria-hidden="true"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <path d="M16 17l5-5-5-5" />
                      <path d="M21 12H9" />
                    </svg>
                    Keluar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Baris 2 — strip tab navigasi ala editorial */}
      <nav
        className="flex items-center gap-1 overflow-x-auto border-b border-border px-2 sm:px-4 lg:px-6"
        aria-label="Navigasi utama"
      >
        {menuItems.map((item) => {
          const isActive = item.path !== null && pathname === item.path;

          return (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                if (item.path) {
                  router.push(item.path);
                }
              }}
              disabled={!item.path}
              aria-current={isActive ? "page" : undefined}
              className={`relative flex items-center gap-2 whitespace-nowrap px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "text-accent-dark"
                  : item.path
                    ? "text-muted hover:text-ink-soft"
                    : "cursor-default text-muted/45"
              }`}
            >
              {item.icon}
              {item.label}

              {isActive && (
                <span
                  className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-accent"
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default TopNav;
