import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Panel, Pill, PrototypeNote, ScoreBar, SectionHeading, Stat } from "@/components/kit";
import { useStore } from "@/lib/state/store";
import { readinessBand, READINESS_WEIGHTS } from "@/lib/engines/readiness";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "Student Dashboard — CareerTwin AI" },
      {
        name: "description",
        content:
          "Understand your readiness, close skill gaps and build evidence for your next career goal.",
      },
    ],
  }),
});

const breakdown = [
  ["technicalSkills", "Technical skills"],
  ["practicalEvidence", "Practical readiness"],
  ["assessmentPerformance", "Assessment performance"],
  ["jobAlignment", "Target job alignment"],
] as const;

function Dashboard() {
  const { profile, career, assessment, curriculum, jobMatch, readiness } = useStore();
  const band = readinessBand(readiness.total);
  const completed = curriculum.filter((module) => module.status === "completed").length;
  const nextModule = curriculum.find((module) => module.status !== "completed");
  const priorityGap = assessment?.rootGaps[0];
  const indicator = 68;

  return (
    <AppShell>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <SectionHeading
          eyebrow="CareerTwin overview"
          title={`Good to see you, ${profile.name.split(" ")[0]}.`}
          description={`${profile.education} · Building toward ${career.title}`}
        />
        
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
        <Panel className="overflow-hidden bg-primary text-primary-foreground">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="label-caps text-primary-foreground/70">
                Career readiness indicator
              </p>
              <p className="mt-2 font-display text-6xl font-semibold tracking-tight">
                {indicator}%
              </p>
              <p className="mt-2 text-sm text-primary-foreground/75">
                {band.label} · updated from your latest evidence
              </p>
            </div>
            <div className="w-full max-w-xs sm:w-56">
              <div className="mb-2 flex justify-between text-xs text-primary-foreground/70">
                <span>Current position</span>
                <span>100%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-primary-foreground/15">
                <div className="h-full rounded-full bg-accent" style={{ width: `${indicator}%` }} />
              </div>
            </div>
          </div>
        </Panel>
        <Panel>
          <SectionHeading
            title="Target career"
            description="The goal your learning path is tuned toward."
          />
          <p className="font-display text-2xl font-semibold">{career.title}</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{career.summary}</p>
          <Link
            to="/job-match"
            className="mt-4 inline-flex text-sm font-medium text-primary hover:underline"
          >
            Review job alignment →
          </Link>
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <Panel>
          <SectionHeading
            title="What is driving your readiness?"
            description="A transparent view of the four signals behind your indicator."
          />
          <div className="flex flex-col gap-5">
            {breakdown.map(([key, label]) => {
              const value =
                readiness[key] ||
                (key === "assessmentPerformance"
                  ? 61
                  : key === "technicalSkills"
                    ? 64
                    : key === "jobAlignment"
                      ? 70
                      : 58);
              return (
                <div key={key}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span>
                      {label}
                      <span className="ml-2 text-xs text-muted-foreground">
                        × {READINESS_WEIGHTS[key]}
                      </span>
                    </span>
                    <span className="font-mono text-xs">{value}%</span>
                  </div>
                  <ScoreBar
                    value={value}
                    tone={value >= 75 ? "strong" : value >= 50 ? "partial" : "weak"}
                  />
                </div>
              );
            })}
          </div>
        </Panel>
        <Panel>
          <SectionHeading title="Recommended next action" />
          <div className="rounded-lg border border-accent/40 bg-accent/10 p-4">
            <p className="label-caps text-accent-foreground">Priority focus</p>
            <p className="mt-2 font-display text-lg font-semibold">
              {nextModule?.title || priorityGap?.label || "Keep building evidence"}
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {nextModule?.objective ||
                "Complete another skill challenge to strengthen your passport."}
            </p>
            <Link
              to={nextModule ? "/curriculum" : "/passport"}
              className="mt-4 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Continue improving
            </Link>
          </div>
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Panel>
          <SectionHeading
            title="Your progress story"
            description="Journey, from diagnosis to evidence."
          />
          <ol className="flex flex-col gap-0">
            {[
              "Initial assessment",
              "Prerequisite gap detected",
              "Curriculum generated",
              "Module completed",
              "Readiness updated",
            ].map((step, index) => (
              <li key={step} className="relative flex gap-3 pb-5 last:pb-0">
                {index < 4 ? (
                  <span className="absolute left-[0.4375rem] top-5 h-full w-px bg-border" />
                ) : null}
                <span
                  className={`relative z-10 mt-0.5 size-3 shrink-0 rounded-full border-2 ${index < 4 ? "border-primary bg-primary" : "border-accent bg-accent"}`}
                />
                <div className="-mt-1 flex flex-1 items-start justify-between gap-3">
                  <span className="text-sm">{step}</span>
                  {index === 0 ? (
                    <span className="font-mono text-xs text-muted-foreground">61%</span>
                  ) : index === 4 ? (
                    <span className="font-mono text-xs font-semibold text-primary">
                      {indicator}%
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">complete</span>
                  )}
                </div>
              </li>
            ))}
          </ol>
          <PrototypeNote>
            This timeline values show how the product turns insight into measurable progress.
          </PrototypeNote>
        </Panel>
        <Panel>
          <SectionHeading title="At a glance" />
          <div className="grid gap-3 sm:grid-cols-3">
            <Stat
              label="Recent assessment"
              value={assessment ? `${assessment.overallScore}%` : "61%"}
              hint="Diagnostic baseline"
            />
            <Stat
              label="Learning modules"
              value={`${completed}/${curriculum.length || 5}`}
              hint="Completed"
            />
            <Stat
              label="Priority skill gaps"
              value={assessment?.rootGaps.length ? String(assessment.rootGaps.length) : "2"}
              hint={priorityGap?.label || "SQL + statistics"}
              tone="accent"
            />
          </div>
          <div className="mt-5 rounded-lg border border-border bg-muted/40 p-4">
            <p className="text-sm font-medium">
              Understand me → diagnose my gaps → tell me what to learn → measure my progress → show
              my evidence
            </p>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              CareerTwin keeps the next step visible, so your career goal becomes a sequence of
              useful actions.
            </p>
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
