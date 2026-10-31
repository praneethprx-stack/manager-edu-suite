import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  LayoutDashboard, Megaphone, UserPlus, Wallet, GraduationCap, Users, Briefcase, Settings,
  Search, Bell, Menu, GraduationCap as Logo, Plus,
} from "lucide-react";

export const menu = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Marketing", url: "/marketing", icon: Megaphone },
  { title: "Admission", url: "/admission", icon: UserPlus },
  { title: "Finance", url: "/finance", icon: Wallet },
  { title: "Academic", url: "/academic", icon: GraduationCap },
  { title: "HR", url: "/hr", icon: Users },
  { title: "Workspace", url: "/workspace", icon: Briefcase },
  { title: "Settings", url: "/settings", icon: Settings },
] as const;

export function AppShell({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(true);
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="flex min-h-screen w-full bg-background font-sans">
      <aside className={`${open ? "w-60" : "w-16"} shrink-0 bg-sidebar text-sidebar-foreground transition-all flex flex-col`}>
        <div className="flex h-14 items-center gap-2 px-4 border-b border-sidebar-border/20">
          <div className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground"><Logo className="size-4" /></div>
          {open && <span className="font-extrabold tracking-tight text-sidebar-accent-foreground">Manager Edu</span>}
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {menu.map((m) => {
            const active = path === m.url;
            return (
              <Link key={m.url} to={m.url}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/50"}`}>
                <m.icon className="size-4 shrink-0" />
                {open && m.title}
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className="flex flex-1 flex-col min-w-0">
        <header className="flex h-14 items-center gap-3 border-b bg-card px-4">
          <button onClick={() => setOpen(!open)} className="rounded-md p-2 hover:bg-accent" aria-label="Toggle menu"><Menu className="size-4" /></button>
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input placeholder="Search students, staff, invoices..." className="w-full rounded-md border bg-background py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button className="flex items-center gap-1 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"><Plus className="size-4" />New</button>
            <button className="rounded-md p-2 hover:bg-accent" aria-label="Notifications"><Bell className="size-4" /></button>
            <div className="grid size-8 place-items-center rounded-full bg-accent text-xs font-bold text-accent-foreground">PR</div>
          </div>
        </header>
        <main className="flex-1 p-6">
          <h1 className="mb-6 text-2xl font-bold tracking-tight">{title}</h1>
          {children}
        </main>
      </div>
    </div>
  );
}

export function Stat({ label, value, note }: { label: string; value: string; note?: string | undefined }) {
  return (
    <div className="rounded-lg border bg-card p-5">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
      {note && <p className="mt-1 text-xs font-medium text-accent-foreground">{note}</p>}
    </div>
  );
}

export function Panel({ title, rows }: { title: string; rows: [string, string][] }) {
  return (
    <div className="rounded-lg border bg-card">
      <div className="border-b px-5 py-3 font-semibold">{title}</div>
      <ul className="divide-y">
        {rows.map(([a, b]) => (
          <li key={a} className="flex justify-between px-5 py-3 text-sm"><span>{a}</span><span className="text-muted-foreground">{b}</span></li>
        ))}
      </ul>
    </div>
  );
}

export function ModulePage({ title, stats, panels }: { title: string; stats: [string, string, string?][]; panels: { title: string; rows: [string, string][] }[] }) {
  return (
    <AppShell title={title}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(([l, v, n]) => <Stat key={l} label={l} value={v} note={n} />)}
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {panels.map((p) => <Panel key={p.title} {...p} />)}
      </div>
    </AppShell>
  );
}
