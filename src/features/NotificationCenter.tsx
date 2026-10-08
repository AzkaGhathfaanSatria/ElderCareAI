"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import Footer from "../components/layout/Footer";
import TopNav from "../components/layout/TopNav";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { getNotifications } from "../services/backendApi";
import type { AlertLevel } from "../types/elderCare";

function normalizeLevel(level: string | undefined): AlertLevel { const value=(level??"Rendah").toLowerCase(); return value.includes("tinggi")?"Tinggi":value.includes("sedang")?"Sedang":"Rendah"; }
function badgeVariant(level: AlertLevel) { return level==="Tinggi"?"danger" as const:level==="Sedang"?"warning" as const:"success" as const; }
function NotificationCenter() {
  const query=useQuery({queryKey:["notifications"],queryFn:getNotifications,refetchInterval:30000});
  const [readIds,setReadIds]=useState<Set<string>>(new Set());
  const [filter,setFilter]=useState<"semua"|"belum_dibaca">("semua");
  const notifications=useMemo(()=>query.data??[],[query.data]);
  const unreadCount=notifications.filter((item)=>!item.readAt&&!readIds.has(item.id)).length;
  const visible=filter==="belum_dibaca"?notifications.filter((item)=>!item.readAt&&!readIds.has(item.id)):notifications;
  const markAll=()=>setReadIds(new Set(notifications.map((item)=>item.id)));
  return <div className="min-h-screen bg-paper"><TopNav hasNotification={unreadCount>0}/><main className="min-w-0"><div className="p-4 sm:p-6 lg:p-8"><header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><h1 className="font-serif text-2xl text-ink sm:text-3xl">Notifikasi Peringatan Dini</h1><p className="mt-2 max-w-xl text-sm leading-6 text-muted">Notifikasi diambil langsung dari GET /notifications pada backend.</p></div><Button variant="secondary" size="sm" onClick={markAll} disabled={unreadCount===0}>Tandai semua sudah dibaca</Button></header><div className="mb-5 flex items-center gap-1 border-b border-border"><button type="button" onClick={()=>setFilter("semua")} className="relative px-3 py-2.5 text-sm font-medium">Semua</button><button type="button" onClick={()=>setFilter("belum_dibaca")} className="relative flex items-center gap-2 px-3 py-2.5 text-sm font-medium">Belum Dibaca{unreadCount>0&&<span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1 text-[11px] font-bold text-white">{unreadCount}</span>}</button></div>{query.isPending&&<Card className="p-8 text-center"><p className="text-sm text-muted">Memuat notifikasi...</p></Card>}{query.isError&&<Card className="border-danger/25 p-8 text-center"><p className="text-sm text-danger">{query.error instanceof Error?query.error.message:"Gagal memuat notifikasi."}</p></Card>}{query.data&&<Card className="p-6">{visible.length?<ol className="divide-y divide-border">{visible.map((item)=>{const level=normalizeLevel(item.level as string|undefined);const unread=!item.readAt&&!readIds.has(item.id);return <li key={item.id} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0"><span className={`mt-2 h-2 w-2 shrink-0 rounded-full ${unread?"bg-accent":"border border-border bg-transparent"}`} /><span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-danger text-xs font-bold text-white">!</span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-start justify-between gap-2"><p className={`text-sm ${unread?"font-semibold text-ink":"font-medium text-ink-soft"}`}>{item.title??item.type??"Peringatan"}{unread&&<span className="ml-2 rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-semibold text-accent-dark">Baru</span>}</p><Badge variant={badgeVariant(level)}>Risiko {level}</Badge></div><p className="mt-1 text-sm leading-6 text-muted">{item.description??item.message??""}</p><div className="mt-2 flex flex-wrap items-center gap-3"><p className="text-xs text-muted">{item.elderName??"Lansia"} · {item.timestamp??item.createdAt??""}</p>{unread&&<button type="button" onClick={()=>setReadIds((current)=>new Set(current).add(item.id))} className="text-xs font-semibold text-accent-dark underline">Tandai sudah dibaca</button>}</div></div></li>})}</ol>:<div className="py-6 text-center"><p className="text-sm font-medium text-ink-soft">{filter==="belum_dibaca"?"Semua notifikasi sudah dibaca.":"Belum ada notifikasi."}</p></div>}</Card>}</div><Footer/></main></div>;
}
export default NotificationCenter;
