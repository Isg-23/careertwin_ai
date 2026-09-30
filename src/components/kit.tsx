import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Panel({ className, children }: { className?: string; children: ReactNode }) {
  return <section className={cn("panel p-5 sm:p-6", className)}>{children}</section>;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        {eyebrow ? <p className="mb-1">{eyebrow}</p> : null}
        <h2 className="text-xl font-semibold sm:text-2xl">{title}</h2>
        {description ? (
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

type Tone = "strong" | "partial" | "weak" | "muted" | "primary" | "accent";

const toneClasses: Record<Tone, string> = {
  strong: "bg-strong-soft text-strong",
  partial: "bg-partial-soft text-partial",
  weak: "bg-weak-soft text-weak",
  muted: "bg-neutral-soft text-muted-foreground",
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent/15 text-accent-foreground",
};

export function Pill({ tone = "muted", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        toneClasses[tone],
      )}
    >
      {children}
    </span>
  );
}

export function ScoreBar({ value, tone = "primary" }: { value: number | null; tone?: Tone }) {
  const barTone: Record<Tone, string> = {
    strong: "bg-strong",
    partial: "bg-partial",
    weak: "bg-weak",
    muted: "bg-muted-foreground/40",
    primary: "bg-primary",
    accent: "bg-accent",
  };
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-soft">
      <div
        className={cn("h-full rounded-full transition-[width] duration-500", barTone[tone])}
        style={{ width: `${value ?? 0}%` }}
      />
    </div>
  );
}

export function Stat({
  label,
  value,
  hint,
  tone = "primary",
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: Tone;
}) {
  return (
    <div className="panel p-4">
      <p className="label-caps">{label}</p>
      <p
        className={cn(
          "mt-1 font-display text-2xl font-semibold",
          tone === "muted" ? "text-muted-foreground" : "",
        )}
      >
        {value}
      </p>
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

export function PrototypeNote({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-md border border-dashed border-border bg-muted/60 px-3 py-2 text-xs text-muted-foreground">
      {children}
    </p>
  );
}

export function statusTone(status: "strong" | "partial" | "weak" | "unmeasured" | "gap"): Tone {
  if (status === "strong") return "strong";
  if (status === "partial") return "partial";
  if (status === "weak" || status === "gap") return "weak";
  return "muted";
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="panel flex flex-col items-start gap-3 p-8">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="max-w-lg text-sm text-muted-foreground">{description}</p>
      {action}
    </div>
  );
}
