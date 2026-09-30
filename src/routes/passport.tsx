import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Panel, Pill, PrototypeNote, ScoreBar, SectionHeading, Stat } from "@/components/kit";
import { readinessBand } from "@/lib/engines/readiness";
import { useStore } from "@/lib/state/store";

export const Route = createFileRoute("/passport")({
  component: PassportPage,
  head: () => ({
    meta: [
      { title: "Skill Passport — CareerTwin AI" },
      {
        name: "description",
        content:
          "A transparent record of skills and evidence recorded through the CareerTwin prototype.",
      },
    ],
  }),
});

const passportSkills = [
  { name: "SQL", fallback: 52, status: "Developing", tone: "partial" as const },
  { name: "Python", fallback: 82, status: "Strong", tone: "strong" as const },
  { name: "Excel", fallback: 88, status: "Strong", tone: "strong" as const },
  { name: "Statistics", fallback: 48, status: "Developing", tone: "partial" as const },
  { name: "Power BI", fallback: 28, status: "Needs Attention", tone: "weak" as const },
];

function PassportPage() {
  const { profile, career, assessment, curriculum, readiness } = useStore();
  const indicator = 68;
  const band = readinessBand(indicator);
  const completed = curriculum.filter((module) => module.status === "completed").length;
  const assessmentScore = assessment?.overallScore ?? 61;

  return (
    <AppShell>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <SectionHeading
          eyebrow="Step 5 · Show my evidence"
          title="Skill Passport"
          description="A clear, portable snapshot of what you have learned and the evidence recorded along the way."
        />
        
      </div>

      <Panel className="overflow-hidden bg-primary text-primary-foreground">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label-caps text-primary-foreground/70">Student</p>
            <p className="mt-1 font-display text-2xl font-semibold">{profile.name}</p>
            <p className="mt-1 text-sm text-primary-foreground/70">{profile.education}</p>
          </div>
          <div>
            <p className="label-caps text-primary-foreground/70">Target career</p>
            <p className="mt-1 font-display text-2xl font-semibold">{career.title}</p>
          </div>
          <div className="sm:text-right">
            <p className="label-caps text-primary-foreground/70">Readiness</p>
            <p className="mt-1 font-display text-4xl font-semibold">{indicator}%</p>
            <p className="text-sm text-primary-foreground/70">{band.label}</p>
          </div>
        </div>
      </Panel>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Panel>
          <SectionHeading
            title="Skill snapshot"
            description="Current levels are based on assessment and learning evidence."
          />
          <div className="flex flex-col gap-5">
            {passportSkills.map((skill) => {
              const measured = (assessment?.mastery ?? []).filter(
                (item) => item.area.toLowerCase() === skill.name.toLowerCase(),
              );
              const value = measured.length
                ? Math.round(
                    measured.reduce((sum, item) => sum + (item.score || 0), 0) / measured.length,
                  )
                : skill.fallback;
              return (
                <div key={skill.name}>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <Pill tone={skill.tone}>{skill.status}</Pill>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">{value}%</span>
                  </div>
                  <ScoreBar value={value} tone={skill.tone} />
                </div>
              );
            })}
          </div>
        </Panel>
        <Panel>
          <SectionHeading
            title="Evidence recorded"
          />
          <div className="flex flex-col gap-3">
            {[
              "Diagnostic Assessment",
              "Curriculum Progress",
              "Skill Challenge / Demo Evidence",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-3"
              >
                <span className="flex size-6 items-center justify-center rounded-full bg-strong-soft text-sm font-semibold text-strong">
                  ✓
                </span>
                <div>
                  <p className="text-sm font-medium">{item}</p>
                  <p className="text-xs text-muted-foreground">Evidence recorded</p>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Stat label="Readiness" value={`${indicator}%`} hint="" />
        <Stat
          label="Learning progress"
          value={`${completed}/${curriculum.length || 5}`}
          hint=""
        />
        <Stat label="Assessment" value={`${assessmentScore}%`} hint="" />
      </div>

      <Panel className="mt-6">
        <SectionHeading
          title="Keep your momentum"
          description="Your next career goal is always one useful step away."
        />
        <div className="flex flex-wrap gap-3">
          <Link
            to="/curriculum"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Continue Improving
          </Link>
          <Link
            to="/dashboard"
            className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            Explore Next Career Goal
          </Link>
        </div>
      </Panel>
    </AppShell>
  );
}
