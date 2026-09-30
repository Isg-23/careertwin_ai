import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useStore } from "@/lib/state/store";

const NAV = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/assessment", label: "Diagnostic" },
  { to: "/results", label: "Skill Map" },
  { to: "/curriculum", label: "Curriculum" },
  { to: "/job-match", label: "Job Match" },
  { to: "/passport", label: "Skill Passport" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const { profile, resetDemo } = useStore();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b border-border bg-surface/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-primary font-display text-sm font-bold text-primary-foreground">
              CT
            </span>
            <span className="font-display text-base font-semibold">CareerTwin AI</span>
          </Link>

          <nav className="order-3 -mx-1 flex w-full gap-1 overflow-x-auto md:order-none md:mx-0 md:w-auto md:flex-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="whitespace-nowrap rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                activeProps={{ className: "bg-primary/10 text-primary font-medium" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium leading-tight">{profile.name}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>

      <footer className="border-t border-border py-6">
        
      </footer>
    </div>
  );
}
