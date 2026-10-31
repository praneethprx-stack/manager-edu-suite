import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  LayoutDashboard, Megaphone, UserPlus, Wallet, GraduationCap, Users, Briefcase, Settings,
  Search, Bell, PanelLeft, Plus, TrendingUp, ChevronRight, HelpCircle, Sparkles, MoreHorizontal,
  BarChart3, Activity, CircleDot,
} from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const menu = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard, group: "Overview" },
  { title: "Marketing", url: "/marketing", icon: Megaphone, group: "Growth" },
  { title: "Admission", url: "/admission", icon: UserPlus, group: "Growth" },
  { title: "Finance", url: "/finance", icon: Wallet, group: "Operations" },
  { title: "Academic", url: "/academic", icon: GraduationCap, group: "Operations" },
  { title: "HR", url: "/hr", icon: Users, group: "Operations" },
  { title: "Workspace", url: "/workspace", icon: Briefcase, group: "Collaborate" },
  { title: "Settings", url: "/settings", icon: Settings, group: "Collaborate" },
] as const;

const groups = ["Overview", "Growth", "Operations", "Collaborate"];

export function AppShell({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(true);
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="flex min-h-screen w-full bg-background font-sans">
      <aside className={`${open ? "w-64" : "w-[72px]"} sticky top-0 h-screen shrink-0 bg-sidebar-gradient text-sidebar-foreground transition-all duration-300 flex flex-col`}>
        <div className="flex h-16 items-center gap-3 px-4">
          <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary-gradient text-primary-foreground shadow-glow">
            <GraduationCap className="size-5" />
          </div>
          {open && (
            <div className="leading-tight">
              <p className="font-extrabold tracking-tight text-sidebar-accent-foreground">Manager Edu</p>
              <p className="text-[11px] opacity-60">School Suite</p>
            </div>
          )}
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-2">
          {groups.map((g) => (
            <div key={g} className="mb-4">
              {open && <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.14em] opacity-50">{g}</p>}
              <div className="space-y-1">
                {menu.filter((m) => m.group === g).map((m) => {
                  const active = path === m.url;
                  return (
                    <Link key={m.url} to={m.url} title={m.title}
                      className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${active ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-glow" : "hover:bg-sidebar-accent/40 hover:text-sidebar-accent-foreground"}`}>
                      <m.icon className="size-[18px] shrink-0" />
                      {open && <span className="flex-1">{m.title}</span>}
                      {open && active && <ChevronRight className="size-4 opacity-70" />}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
        {open && (
          <div className="m-3 rounded-xl bg-sidebar-accent/40 p-4">
            <Sparkles className="size-5 text-sidebar-accent-foreground" />
            <p className="mt-2 text-sm font-semibold text-sidebar-accent-foreground">Upgrade to Pro</p>
            <p className="mt-1 text-xs opacity-70">Unlock analytics & multi-branch.</p>
          </div>
        )}
      </aside>

      <div className="flex flex-1 flex-col min-w-0">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-3 border-b bg-card/80 px-6 backdrop-blur">
          <button onClick={() => setOpen(!open)} className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground" aria-label="Toggle menu">
            <PanelLeft className="size-[18px]" />
          </button>
          <div className="relative hidden max-w-md flex-1 md:block">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input placeholder="Search students, staff, invoices…" className="w-full rounded-lg border bg-background py-2 pl-9 pr-14 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10" />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded border bg-muted px-1.5 text-[10px] text-muted-foreground">⌘K</kbd>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <button className="rounded-lg p-2 text-muted-foreground hover:bg-accent" aria-label="Help"><HelpCircle className="size-[18px]" /></button>
            <button className="relative rounded-lg p-2 text-muted-foreground hover:bg-accent" aria-label="Notifications">
              <Bell className="size-[18px]" />
              <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-destructive ring-2 ring-card" />
            </button>
            <div className="mx-2 h-6 w-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="grid size-9 place-items-center rounded-full bg-primary-gradient text-xs font-bold text-primary-foreground">PR</div>
              <div className="hidden leading-tight lg:block">
                <p className="text-sm font-semibold">Praneeth</p>
                <p className="text-xs text-muted-foreground">Administrator</p>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 lg:p-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground">Home / {title}</p>
              <h1 className="mt-1 text-2xl font-extrabold tracking-tight">{title}</h1>
            </div>
            <div className="flex gap-2">
              <button className="rounded-lg border bg-card px-4 py-2 text-sm font-semibold hover:bg-accent">Export</button>
              <button className="flex items-center gap-1.5 rounded-lg bg-primary-gradient px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-95">
                <Plus className="size-4" />Create new
              </button>
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}

const statIcons = [Users, TrendingUp, BarChart3, Activity];

export function Stat({ label, value, note, i }: { label: string; value: string; note?: string | undefined; i: number }) {
  const Icon = statIcons[i % 4]!;
  return (
    <div className="fade-up rounded-2xl border bg-card p-5 shadow-card transition hover:-translate-y-0.5" style={{ animationDelay: `${i * 60}ms` }}>
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <div className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground"><Icon className="size-5" /></div>
      </div>
      <p className="mt-2 text-3xl font-extrabold tracking-tight">{value}</p>
      <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-xs font-semibold text-success">
        <TrendingUp className="size-3" />{note ?? "Stable"}
      </p>
    </div>
  );
}

function statusTone(v: string) {
  const s = v.toLowerCase();
  if (/(approved|running|enabled|paid)/.test(s)) return "bg-success/10 text-success";
  if (/(pending|scheduled|interview|draft)/.test(s)) return "bg-warning/15 text-warning";
  return "";
}

export function Panel({ title, rows }: { title: string; rows: [string, string][] }) {
  return (
    <div className="fade-up rounded-2xl border bg-card shadow-card">
      <div className="flex items-center justify-between px-5 py-4">
        <p className="font-bold">{title}</p>
        <button className="rounded-md p-1 text-muted-foreground hover:bg-accent" aria-label="More"><MoreHorizontal className="size-4" /></button>
      </div>
      <ul className="px-2 pb-2">
        {rows.map(([a, b]) => {
          const tone = statusTone(b);
          return (
            <li key={a} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition hover:bg-accent/60">
              <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent text-xs font-bold text-accent-foreground">{a.charAt(0)}</div>
              <span className="flex-1 font-medium">{a}</span>
              {tone ? (
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${tone}`}>{b}</span>
              ) : (
                <span className="text-muted-foreground">{b}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function chartData(seed: string) {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) % 997;
  return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"].map((m, i) => ({
    m, a: 40 + ((h * (i + 3)) % 50) + i * 4, b: 25 + ((h * (i + 7)) % 30) + i * 2,
  }));
}

export function ModulePage({ title, stats, panels }: { title: string; stats: [string, string, string?][]; panels: { title: string; rows: [string, string][] }[] }) {
  const data = chartData(title);
  return (
    <AppShell title={title}>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(([l, v, n], i) => <Stat key={l} label={l} value={v} note={n} i={i} />)}
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-3">
        <div className="fade-up rounded-2xl border bg-card p-5 shadow-card xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold">{title} performance</p>
              <p className="text-xs text-muted-foreground">Last 10 months</p>
            </div>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><CircleDot className="size-3 text-primary" />This year</span>
              <span className="flex items-center gap-1"><CircleDot className="size-3 text-chart-2" />Last year</span>
            </div>
          </div>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ left: -20, right: 8 }}>
                <defs>
                  <linearGradient id="ga" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="var(--border)" />
                <XAxis dataKey="m" tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--card)" }} />
                <Area type="monotone" dataKey="b" stroke="var(--chart-2)" strokeWidth={2} fill="transparent" strokeDasharray="4 4" />
                <Area type="monotone" dataKey="a" stroke="var(--primary)" strokeWidth={2.5} fill="url(#ga)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="fade-up relative overflow-hidden rounded-2xl bg-hero-gradient p-6 text-primary-foreground shadow-glow">
          <div className="absolute -right-10 -top-10 size-40 rounded-full bg-primary-foreground/10" />
          <div className="absolute -bottom-12 -left-6 size-32 rounded-full bg-primary-foreground/10" />
          <Sparkles className="relative size-6" />
          <p className="relative mt-4 text-lg font-bold">Smart insights</p>
          <p className="relative mt-2 text-sm opacity-85">
            {title} is trending up this term. Review the latest activity and plan next steps with your team.
          </p>
          <div className="relative mt-6">
            <div className="flex justify-between text-xs opacity-85"><span>Term goal</span><span>78%</span></div>
            <div className="mt-2 h-2 rounded-full bg-primary-foreground/20"><div className="h-2 w-[78%] rounded-full bg-primary-foreground" /></div>
          </div>
          <button className="relative mt-6 rounded-lg bg-primary-foreground px-4 py-2 text-sm font-semibold text-primary">View report</button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {panels.map((p) => <Panel key={p.title} {...p} />)}
      </div>
    </AppShell>
  );
}
