import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { EmptyState, Panel, Pill, PrototypeNote, SectionHeading, Stat } from "@/components/kit";
import { useStore } from "@/lib/state/store";

export const Route = createFileRoute("/curriculum")({ component: CurriculumPage });

function CurriculumPage() {
  const { assessment, career, curriculum, readiness, setModuleStatus } = useStore();
  if (!assessment || !curriculum.length)
    return (
      <AppShell>
        <EmptyState
          title="Curriculum not generated yet"
          description="Complete the prerequisite diagnostic to generate a curriculum from the detected root gap."
          action={
            <Link
              to="/assessment"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              Start diagnostic
            </Link>
          }
        />
      </AppShell>
    );

  const completed = curriculum.filter((m) => m.status === "completed").length;
  const totalHours = curriculum.reduce((sum, m) => sum + m.estimatedHours, 0);

  return (
    <AppShell>
      <SectionHeading
        eyebrow="Step 3 · Develop"
        title="Your adaptive curriculum"
        description={`A prerequisite-first sequence for ${career.title}, built from your .`}
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat
          label="Module progress"
          value={`${completed}/${curriculum.length}`}
          hint="modules complete"
        />
        <Stat label="Estimated effort" value={`${totalHours}h`} hint="personalized demo estimate" />
        <Stat
          label="Prototype readiness"
          value={`${readiness.total}%`}
          hint="indicator, not an employment probability"
          tone="accent"
        />
      </div>
      <Panel className="mt-6">
        <SectionHeading
          title="Recommended sequence"
          description="The platform optimizes the learning path around your current capability."
        />
        <div className="flex flex-col gap-4">
          {curriculum.map((module) => {
            const isComplete = module.status === "completed";
            const isStarted = module.status === "in_progress";
            return (
              <article key={module.id} className="rounded-lg border border-border p-4 sm:p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex min-w-0 gap-3">
                    <span className="font-mono text-xs text-muted-foreground">
                      MODULE {String(module.order).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-semibold">{module.title}</h3>
                        <Pill tone={module.rootGap ? "accent" : "muted"}>
                          {module.rootGap ? "priority gap" : module.area}
                        </Pill>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {module.objective}
                      </p>
                    </div>
                  </div>
                  <Pill tone={isComplete ? "strong" : isStarted ? "partial" : "muted"}>
                    {isComplete ? "Completed" : isStarted ? "In progress" : "Not started"}
                  </Pill>
                </div>
                <div className="mt-4 grid gap-3 border-y border-border py-3 text-xs sm:grid-cols-3">
                  <div>
                    <p className="label-caps">Why recommended</p>
                    <p className="mt-1 text-muted-foreground">{module.reason}</p>
                  </div>
                  <div>
                    <p className="label-caps">Prerequisite</p>
                    <p className="mt-1 text-muted-foreground">
                      {module.prerequisiteLabel ?? "Entry concept"}
                    </p>
                  </div>
                  <div>
                    <p className="label-caps">Learning time · difficulty</p>
                    <p className="mt-1 text-muted-foreground">
                      {module.estimatedHours} hours ·{" "}
                      {module.difficulty === 1
                        ? "Foundational"
                        : module.difficulty === 2
                          ? "Developing"
                          : "Advanced"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">Objective:</span>{" "}
                    {module.objective}
                  </p>
                  {module.prerequisiteVerified ? (
                    <button
                      onClick={() =>
                        setModuleStatus(module.id, isComplete ? "not_started" : "completed")
                      }
                      className="rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted"
                    >
                      {isComplete ? "Review module" : "Skip / Review"}
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        setModuleStatus(module.id, isComplete ? "not_started" : "completed")
                      }
                      className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90"
                    >
                      {isComplete
                        ? "Mark incomplete"
                        : isStarted
                          ? "Mark complete"
                          : "Start module"}
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
        <div className="mt-5 flex flex-col gap-2">
        
          <PrototypeNote>
            Future versions can connect these modules to curated courses, projects and assessments.
          </PrototypeNote>
        </div>
      </Panel>
    </AppShell>
  );
}
