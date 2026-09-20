"use client";

import { useMemo, useState } from "react";

import Footer from "../components/layout/Footer";
import TopNav from "../components/layout/TopNav";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { useElderCareQuery } from "../hooks/useElderCareQuery";
import type { AlertLevel } from "../types/elderCare";

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  elderlyName: string;
  timestamp: string;
  level: AlertLevel;
  isLive: boolean;
}

function badgeVariant(level: AlertLevel) {
  if (level === "Tinggi") return "danger" as const;
  if (level === "Sedang") return "warning" as const;
  return "success" as const;
}

function dotColor(level: AlertLevel) {
  if (level === "Tinggi") return "bg-danger";
  if (level === "Sedang") return "bg-warn";
  return "bg-safe";
}

function NotificationCenter() {
  const monitoringQuery = useElderCareQuery();

  const [readIds, setReadIds] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<"semua" | "belum_dibaca">("semua");

  const notifications = useMemo<NotificationItem[]>(() => {
    if (!monitoringQuery.data) return [];

    const { elderly, alert, anomalyHistory } = monitoringQuery.data;

    const items: NotificationItem[] = [];

    if (alert.hasAlert) {
      items.push({
        id: "current-alert",
        title: alert.type,
        description: alert.description,
        elderlyName: elderly.name,
        timestamp: alert.detected,
        level: alert.level,
        isLive: true,
      });
    }

    const seen = new Set<string>();

    for (const item of anomalyHistory) {
      const id = `${item.date}-${item.time}-${item.type}`;

      if (seen.has(id)) continue;
      seen.add(id);

      items.push({
        id,
        title: item.type,
        description: item.description,
        elderlyName: elderly.name,
        timestamp: `${item.date} · ${item.time} WIB`,
        level: item.level,
        isLive: false,
      });
    }

    return items;
  }, [monitoringQuery.data]);

  const isUnread = (item: NotificationItem) => item.isLive && !readIds.has(item.id);

  const unreadCount = notifications.filter((item) => isUnread(item)).length;

  const visibleNotifications =
    filter === "belum_dibaca" ? notifications.filter((item) => isUnread(item)) : notifications;

  const markAsRead = (id: string) => {
    setReadIds((current) => new Set(current).add(id));
  };

  const markAllAsRead = () => {
    setReadIds(new Set(notifications.map((item) => item.id)));
  };

  return (
    <div className="min-h-screen bg-paper">
      <TopNav hasNotification={unreadCount > 0} />

      <main className="min-w-0">
        <div className="p-4 sm:p-6 lg:p-8">
          <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="font-serif text-2xl text-ink sm:text-3xl">
                Notifikasi Peringatan Dini
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
                Pemberitahuan saat sistem mendeteksi anomali perilaku pada lansia yang kamu pantau.
              </p>
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              Tandai semua sudah dibaca
            </Button>
          </header>

          <div className="mb-5 flex items-center gap-1 border-b border-border">
            <button
              type="button"
              onClick={() => setFilter("semua")}
              className={`relative px-3 py-2.5 text-sm font-medium transition ${
                filter === "semua" ? "text-accent-dark" : "text-muted hover:text-ink-soft"
              }`}
            >
              Semua
              {filter === "semua" && (
                <span
                  className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-accent"
                  aria-hidden="true"
                />
              )}
            </button>

            <button
              type="button"
              onClick={() => setFilter("belum_dibaca")}
              className={`relative flex items-center gap-2 px-3 py-2.5 text-sm font-medium transition ${
                filter === "belum_dibaca" ? "text-accent-dark" : "text-muted hover:text-ink-soft"
              }`}
            >
              Belum Dibaca
              {unreadCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1 text-[11px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
              {filter === "belum_dibaca" && (
                <span
                  className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-accent"
                  aria-hidden="true"
                />
              )}
            </button>
          </div>

          {monitoringQuery.isPending && (
            <Card className="p-8 text-center" role="status" aria-live="polite">
              <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-border border-t-accent" />
              <p className="text-sm font-medium text-ink-soft">Memuat notifikasi...</p>
            </Card>
          )}

          {monitoringQuery.isError && (
            <Card className="border-danger/25 p-8 text-center" role="alert" aria-live="assertive">
              <p className="text-sm text-danger">
                {monitoringQuery.error?.message ?? "Gagal memuat notifikasi."}
              </p>
            </Card>
          )}

          {monitoringQuery.data && (
            <Card className="p-6">
              {visibleNotifications.length > 0 ? (
                <ol className="divide-y divide-border">
                  {visibleNotifications.map((item) => {
                    const unread = isUnread(item);

                    return (
                      <li
                        key={item.id}
                        className="flex items-start gap-4 py-4 first:pt-0 last:pb-0"
                      >
                        <span
                          className={`mt-2 h-2 w-2 shrink-0 rounded-full ${
                            unread ? "bg-accent" : "border border-border bg-transparent"
                          }`}
                          aria-hidden="true"
                        />

                        <span
                          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${dotColor(item.level)}`}
                          aria-hidden="true"
                        >
                          !
                        </span>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <p
                              className={`text-sm ${unread ? "font-semibold text-ink" : "font-medium text-ink-soft"}`}
                            >
                              {item.title}
                              {unread && (
                                <span className="ml-2 rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-semibold text-accent-dark">
                                  Baru
                                </span>
                              )}
                            </p>

                            <Badge variant={badgeVariant(item.level)}>Risiko {item.level}</Badge>
                          </div>

                          <p className="mt-1 text-sm leading-6 text-muted">{item.description}</p>

                          <div className="mt-2 flex flex-wrap items-center gap-3">
                            <p className="text-xs text-muted">
                              {item.elderlyName} · {item.timestamp}
                            </p>

                            {unread && (
                              <button
                                type="button"
                                onClick={() => markAsRead(item.id)}
                                className="text-xs font-semibold text-accent-dark underline decoration-accent underline-offset-2 transition hover:text-ink"
                              >
                                Tandai sudah dibaca
                              </button>
                            )}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              ) : (
                <div className="py-6 text-center" aria-live="polite">
                  <p className="text-sm font-medium text-ink-soft">
                    {filter === "belum_dibaca"
                      ? "Semua notifikasi sudah dibaca."
                      : "Belum ada notifikasi."}
                  </p>
                </div>
              )}
            </Card>
          )}
        </div>

        <Footer />
      </main>
    </div>
  );
}

export default NotificationCenter;
