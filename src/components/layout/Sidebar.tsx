"use client";

import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";

import { useUIStore } from "../../store/useUIStore";

function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const collapsed = useUIStore((state) => state.collapsed);
  const setCollapsed = useUIStore((state) => state.setCollapsed);

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
          className="h-5 w-5"
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
          className="h-5 w-5"
          aria-hidden="true"
        >
          <circle cx="12" cy="8" r="3" />
          <path d="M5 20c.8-3.2 3.1-5 7-5s6.2 1.8 7 5" />
        </svg>
      ),
    },
    {
      label: "Notifikasi",
      path: null,
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
          <path d="M10 21h4" />
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
          className="h-5 w-5"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v4l3 2" />
        </svg>
      ),
    },
  ];

  return (
    <aside
      className={`sticky top-0 z-40 hidden h-screen shrink-0 bg-sidebar text-white shadow-xl transition-all duration-300 lg:flex lg:flex-col ${
        collapsed ? "w-[72px]" : "w-64"
      }`}
      aria-label="Navigasi utama"
    >
      <header
        className={`shrink-0 border-b border-sidebar-soft ${collapsed ? "px-3 py-4" : "px-5 py-4"}`}
      >
        <div
          className={`flex ${
            collapsed ? "flex-col items-center gap-4" : "items-center justify-between"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent font-serif text-lg shadow-sm"
              aria-hidden="true"
            >
              E
            </div>

            {!collapsed && (
              <div>
                <h1 className="font-serif text-base">ElderCare AI</h1>

                <p className="text-[11px] text-paper/45">Monitoring System</p>
              </div>
            )}
          </div>

          {!collapsed && (
            <button
              type="button"
              onClick={() => setCollapsed(true)}
              aria-label="Perkecil sidebar"
              title="Perkecil sidebar"
              className="ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-paper/45 transition hover:bg-sidebar-soft hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
          )}

          {collapsed && (
            <button
              type="button"
              onClick={() => setCollapsed(false)}
              aria-label="Perbesar sidebar"
              title="Perbesar sidebar"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-soft text-paper/45 transition hover:bg-accent hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          )}
        </div>
      </header>

      <nav
        className={`flex-1 overflow-y-auto ${collapsed ? "px-3 py-6" : "p-4"}`}
        aria-label="Menu utama"
      >
        {!collapsed && (
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-paper/40">
            Menu Utama
          </p>
        )}

        <div className={collapsed ? "space-y-3" : "space-y-1"}>
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
                aria-label={`Menu ${item.label}`}
                aria-current={isActive ? "page" : undefined}
                title={collapsed ? item.label : undefined}
                className={`flex w-full items-center rounded-xl transition ${
                  collapsed ? "h-11 justify-center" : "gap-3 px-3 py-3"
                } ${
                  isActive
                    ? "bg-accent text-white shadow-sm"
                    : item.path
                      ? "text-paper/70 hover:bg-sidebar-soft hover:text-white"
                      : "cursor-default text-paper/40"
                }`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                    isActive ? "bg-accent/70" : "bg-sidebar-soft"
                  }`}
                >
                  {item.icon}
                </span>

                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </div>
      </nav>

      <footer className={`shrink-0 border-t border-sidebar-soft ${collapsed ? "p-3" : "p-4"}`}>
        <div
          className={`flex items-center rounded-xl bg-sidebar-soft ${
            collapsed ? "h-11 justify-center" : "gap-3 p-3"
          }`}
          title={collapsed ? "Administrator - admin@eldercare.ai" : undefined}
        >
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/20 text-sm font-bold text-accent"
            aria-hidden="true"
          >
            A
          </div>

          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">Administrator</p>

              <p className="truncate text-xs text-paper/45">admin@eldercare.ai</p>
            </div>
          )}
        </div>
      </footer>
    </aside>
  );
}

export default Sidebar;
