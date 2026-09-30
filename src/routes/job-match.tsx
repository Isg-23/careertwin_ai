import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import {
  EmptyState,
  Panel,
  Pill,
  PrototypeNote,
  SectionHeading,
  Stat,
  statusTone,
} from "@/components/kit";
import { matchJob, SAMPLE_JOB_DESCRIPTION } from "@/lib/engines/jobMatch";
import { useStore } from "@/lib/state/store";

export const Route = createFileRoute("/job-match")({ component: JobMatchPage });

function JobMatchPage() {
  const { assessment, jobMatch, saveJobMatch } = useStore();
  const [text, setText] = useState(SAMPLE_JOB_DESCRIPTION);

  if (!assessment) {
    return (
      <AppShell>
        <EmptyState
          title="Job matching unlocks after diagnosis"
          description="Complete the prerequisite diagnostic so the posting can be compared against measured skills."
        />
      </AppShell>
    );
  }

  const result = jobMatch ?? matchJob(SAMPLE_JOB_DESCRIPTION, assessment.mastery);
  const gaps = result.lines.filter((line) => line.verdict === "gap");
  const nextActions = gaps.slice(0, 3).map((line) => line.action);
  const role = text.match(/(?:junior|senior|lead)?\s*data analyst/i)?.[0]?.trim() || "Data Analyst";

  return (
    <AppShell>
      <SectionHeading
        eyebrow="Step 4 · Prove"
        title="How well does your current profile align with this role?"
        description="Connect the job to the skills it requires, then to the curriculum actions that can close each gap."
      />

      <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
        <Panel>
          <SectionHeading
            title="Target job description"
            description="Paste a sample posting or load the guided demo role."
          />
          <textarea
            aria-label="Job description"
            value={text}
            onChange={(event) => setText(event.target.value)}
            rows={15}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setText(SAMPLE_JOB_DESCRIPTION)}
              className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              Use Demo Job Description
            </button>
            <button
              type="button"
              onClick={() => saveJobMatch(matchJob(text, assessment.mastery))}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Analyze role
            </button>
          </div>
          <div className="mt-6 rounded-md border border-border bg-muted/30 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Job → skills → gap → curriculum
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Requirements are extracted from the posting and matched to assessment evidence and
              completed learning modules.
            </p>
          </div>
        </Panel>

        <div className="flex flex-col gap-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <Stat label="Target role" value={role} hint="from this posting" />
            <Stat
              label="Current profile"
              value={`${result.coverage}% aligned`}
              hint="skill alignment prototype"
            />
            <Stat
              label="Priority gaps"
              value={`${gaps.length}`}
              hint="identified from required skills"
            />
          </div>

          <Panel>
            <SectionHeading
              title="Prototype Job Skill Alignment"
              description="A transparent comparison of the role requirements and your current evidence."
            />
            <div className="flex flex-col gap-3">
              {result.lines.map((line) => (
                <div
                  key={line.skill}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-border p-4"
                >
                  <div>
                    <h3 className="font-medium">{line.skill}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{line.kind} requirement</p>
                  </div>
                  <Pill tone={statusTone(line.verdict)}>
                    {line.verdict === "strong"
                      ? "Strong Match"
                      : line.verdict === "partial"
                        ? "Developing"
                        : line.verdict === "gap"
                          ? "Skill Gap"
                          : "Unmeasured"}
                  </Pill>
                </div>
              ))}
            </div>
          </Panel>

          <Panel>
            <SectionHeading
              title="Recommended next actions"
              description="The shortest path from a detected gap to a concrete curriculum step."
            />
            {nextActions.length ? (
              <ol className="flex flex-col gap-3">
                {nextActions.map((action, index) => (
                  <li key={action} className="flex gap-3 text-sm">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                      {index + 1}
                    </span>
                    <span>{action}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-sm text-muted-foreground">
                Keep building evidence for each strong match and reassess as your curriculum
                changes.
              </p>
            )}
            <div className="mt-5">
              
            </div>
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}
