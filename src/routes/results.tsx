import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import {
  EmptyState,
  Panel,
  Pill,
  PrototypeNote,
  ScoreBar,
  SectionHeading,
  Stat,
  statusTone,
} from "@/components/kit";
import { areaScores } from "@/lib/engines/analysis";
import { getAiProvider } from "@/lib/ai/provider";
import { useStore } from "@/lib/state/store";

export const Route = createFileRoute("/results")({
  component: ResultsPage,
  head: () => ({
    meta: [
      { title: "Knowledge & Skill Map — CareerTwin AI" },
      {
        name: "description",
        content:
          "Prerequisite knowledge map with per-node mastery and detected root prerequisite gaps.",
      },
      { property: "og:title", content: "Knowledge & Skill Map — CareerTwin AI" },
      {
        property: "og:description",
        content: "Where the prerequisite chain breaks for the demo student.",
      },
    ],
  }),
});

function ResultsPage() {
  const { assessment, career, hydrated } = useStore();
  const [explanations, setExplanations] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!assessment) return;
    let cancelled = false;
    const provider = getAiProvider();
    Promise.all(
      assessment.rootGaps.map(async (g) => [g.nodeId, await provider.explainRootGap(g)] as const),
    ).then((pairs) => {
      if (!cancelled) setExplanations(Object.fromEntries(pairs));
    });
    return () => {
      cancelled = true;
    };
  }, [assessment]);

  if (!hydrated) {
    return (
      <AppShell>
        <p className="text-sm text-muted-foreground">Loading demo state…</p>
      </AppShell>
    );
  }

  if (!assessment) {
    return (
      <AppShell>
        <EmptyState
          title="No diagnostic results yet"
          description="Run the prerequisite diagnostic first — the knowledge map is built from those responses."
          action={
            <Link
              to="/assessment"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Start diagnostic
            </Link>
          }
        />
      </AppShell>
    );
  }

  const areas = areaScores(assessment.mastery);
  const measured = assessment.mastery.filter((m) => m.score !== null);

  return (
    <AppShell>
      <SectionHeading
        eyebrow="Step 2 · Diagnose"
        title="Knowledge & skill map"
        description={`${career.title} prerequisite graph with measured mastery per node. Unmeasured nodes were not reached by this run.`}
        action={
          <Link
            to="/curriculum"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            View My Personalized Curriculum
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat
          label="Overall score"
          value={`${assessment.overallScore}%`}
          hint={`${assessment.responses.length} questions`}
        />
        <Stat
          label="Nodes measured"
          value={`${measured.length}/${assessment.mastery.length}`}
          hint="prerequisite graph coverage"
        />
        <Stat
          label="Root gaps"
          value={String(assessment.rootGaps.length)}
          hint={assessment.rootGaps[0]?.label ?? "none detected"}
          tone={assessment.rootGaps.length ? "primary" : "muted"}
        />
      </div>

      {assessment.rootGaps.length ? (
        <Panel className="mt-6 overflow-hidden border-accent/40 bg-gradient-to-br from-accent/10 via-card to-card">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <SectionHeading
              eyebrow="Diagnostic Insight"
              title="Your assessment found a prerequisite gap."
              description="The system did not stop at your score — it traced a possible reason the gap appeared."
            />
            <Pill tone="accent">Deterministic logic</Pill>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-stretch">
            {assessment.rootGaps.map((gap) => (
              <div
                key={gap.nodeId}
                className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center"
              >
                <div className="flex flex-1 flex-col justify-center rounded-lg border border-accent/40 bg-background/60 p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    Potential root prerequisite
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold">{gap.label}</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Pill tone="primary">{gap.area}</Pill>
                    <Pill
                      tone={
                        gap.confidence === "high"
                          ? "weak"
                          : gap.confidence === "medium"
                            ? "partial"
                            : "muted"
                      }
                    >
                      {gap.confidence} confidence
                    </Pill>
                  </div>
                </div>
                <div
                  className="flex items-center justify-center text-xl text-accent sm:px-1"
                  aria-hidden="true"
                >
                  ↓
                </div>
                <div className="flex flex-1 flex-col justify-center rounded-lg border border-border bg-background/60 p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    Affected skill
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold">
                    {gap.affects[0] ?? "Downstream concept"}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{gap.rationale}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border bg-background/40 p-4">
            <div className="max-w-2xl">
              <p className="text-sm font-medium">
                Strengthening the prerequisite may improve your performance in JOIN-based problems.
              </p>
              {explanations[assessment.rootGaps[0].nodeId] ? (
                <p className="mt-1 text-sm text-muted-foreground">
                  {explanations[assessment.rootGaps[0].nodeId]}
                </p>
              ) : null}
            </div>
            <Link
              to="/curriculum"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Build My Curriculum
            </Link>
          </div>
          <div className="mt-4">
          </div>
        </Panel>
      ) : (
        <Panel className="mt-6">
          <SectionHeading
            title="No prerequisite gap detected"
            description="Measured nodes were either strong or isolated in this run."
          />
        </Panel>
      )}

      <Panel className="mt-6">
        <SectionHeading
          title="Skill breakdown"
          description="A directional view of current readiness by assessment area."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map((a) => {
            const status =
              a.score >= 75 ? "Strong" : a.score >= 45 ? "Developing" : "Needs Attention";
            return (
              <div key={a.area} className="rounded-md border border-border p-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium">{a.area}</p>
                  <Pill tone={a.score >= 75 ? "strong" : a.score >= 45 ? "partial" : "weak"}>
                    {status}
                  </Pill>
                </div>
                <p className="mb-2 mt-3 font-mono text-xs text-muted-foreground">
                  {a.score}% measured
                </p>
                <ScoreBar
                  value={a.score}
                  tone={a.score >= 75 ? "strong" : a.score >= 45 ? "partial" : "weak"}
                />
              </div>
            );
          })}
        </div>
      </Panel>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {career.coreAreas.map((area) => {
          const nodes = career.nodes.filter((n) => n.area === area);
          return (
            <Panel key={area}>
              <SectionHeading title={area} description="Ordered along the prerequisite chain." />
              <ul className="space-y-3">
                {nodes.map((node) => {
                  const m = assessment.mastery.find((x) => x.nodeId === node.id)!;
                  return (
                    <li key={node.id} className="rounded-md border border-border p-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-sm font-medium">{node.label}</span>
                        <div className="flex items-center gap-2">
                          {assessment.rootGaps.some((g) => g.nodeId === node.id) ? (
                            <Pill tone="accent">root gap</Pill>
                          ) : null}
                          <Pill tone={statusTone(m.status)}>
                            {m.score === null ? "not measured" : `${m.score}% · ${m.status}`}
                          </Pill>
                        </div>
                      </div>
                      <div className="mt-2">
                        <ScoreBar value={m.score} tone={statusTone(m.status)} />
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {node.prerequisites.length
                          ? `Requires: ${node.prerequisites
                              .map((p) => career.nodes.find((n) => n.id === p)?.label)
                              .filter(Boolean)
                              .join(", ")}`
                          : "Entry-level concept"}
                        {m.asked ? ` · ${m.correct}/${m.asked} correct` : ""}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </Panel>
          );
        })}
      </div>
    </AppShell>
  );
}
