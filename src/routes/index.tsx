import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "CareerTwin AI — Diagnose, Develop, Prove" },
      {
        name: "description",
        content:
          "A hackathon prototype that finds the prerequisite concept where a student's learning chain breaks, then builds a curriculum from that point.",
      },
      { property: "og:title", content: "CareerTwin AI — Diagnose, Develop, Prove" },
      {
        property: "og:description",
        content:
          "Prerequisite gap diagnosis and adaptive curriculum generation for career readiness.",
      },
    ],
  }),
});

const LOOP = [
  {
    step: "Diagnose",
    text: "An adaptive diagnostic drops to prerequisite concepts whenever an answer is wrong, instead of only recording a low score.",
  },
  {
    step: "Develop",
    text: "The curriculum starts at the root gap in the prerequisite chain, not at a fixed course sequence.",
  },
  {
    step: "Prove",
    text: "Completed modules and recorded evidence feed a Skill Passport aligned to a real job description.",
  },
  {
    step: "Update",
    text: "Readiness recomputes as modules complete, so the profile stays a living picture.",
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-primary font-display text-sm font-bold text-primary-foreground">
              CT
            </span>
            <span className="font-display text-base font-semibold">CareerTwin AI</span>
          </div>
          <Link
            to="/dashboard"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Open demo
          </Link>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div>
            <h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">
              Find where the learning chain breaks, not just what the student got wrong.
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground">
              CareerTwin AI builds a dynamic employability profile for a student targeting a
              specific role. It diagnoses prerequisite gaps, generates a curriculum from the root
              gap upward, matches the profile against a job description, and records evidence in a
              Skill Passport.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/dashboard"
                className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Start the demo flow
              </Link>
              <Link
                to="/assessment"
                className="rounded-md border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
              >
                Go straight to the diagnostic
              </Link>
            </div>
          </div>

          <div className="panel p-6">
            <p className="label-caps">The prerequisite idea</p>
            <p className="mt-2 text-sm text-muted-foreground">
              A student failing SQL JOINs is usually not failing JOIN syntax.
            </p>
            <ol className="mt-5 space-y-2">
              {[
                { label: "Data Analyst", tone: "role" },
                { label: "SQL", tone: "area" },
                { label: "JOINs", tone: "fail" },
                { label: "Database Relationships", tone: "root" },
                { label: "Primary / Foreign Keys", tone: "area" },
              ].map((n, i) => (
                <li key={n.label} className="flex items-center gap-3">
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={
                      "flex-1 rounded-md border px-3 py-2 text-sm " +
                      (n.tone === "fail"
                        ? "border-weak/40 bg-weak-soft text-weak font-medium"
                        : n.tone === "root"
                          ? "border-accent/50 bg-accent/15 font-medium"
                          : "border-border bg-muted/50")
                    }
                  >
                    {n.label}
                    {n.tone === "fail"
                      ? " — observed failure"
                      : n.tone === "root"
                        ? " — likely root gap"
                        : ""}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-y border-border bg-surface">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h2 className="text-2xl font-semibold">Diagnose → Develop → Prove → Update</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {LOOP.map((item) => (
                <div key={item.step} className="rounded-lg border border-border p-5">
                  <p className="font-display text-sm font-semibold text-primary">{item.step}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="panel p-6">
              <p className="label-caps">Working in this prototype</p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {[
                  "Adaptive diagnostic with prerequisite probing (14 questions)",
                  "Prerequisite knowledge map across four skill areas",
                  "Root-gap detection with rationale and confidence",
                  "Curriculum generation ordered by prerequisite depth",
                  "Job description parsing and gap comparison",
                  "Transparent readiness indicator and Skill Passport",
                ].map((t) => (
                  <li key={t} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-strong" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="panel p-6">
              <p className="label-caps">Future production scope (not built)</p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {[
                  "Real authentication and multi-tenant student accounts",
                  "Validated psychometric item bank and calibration",
                  "Employer-side workflows and verified credentials",
                  "Many career tracks and a course marketplace",
                  "University / LMS integrations",
                  "LLM provider behind the existing AI abstraction layer",
                ].map((t) => (
                  <li key={t} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8">
        <p className="mx-auto max-w-6xl px-4 text-xs text-muted-foreground">
          CareerTwin AI
        </p>
      </footer>
    </div>
  );
}
