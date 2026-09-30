import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Panel, Pill, PrototypeNote, ScoreBar, SectionHeading } from "@/components/kit";
import {
  applyAnswer,
  createEngineState,
  nextQuestion,
  TOTAL_QUESTIONS,
  type EngineState,
} from "@/lib/engines/assessment";
import { buildResult } from "@/lib/engines/analysis";
import { generateCurriculum } from "@/lib/engines/curriculum";
import { getNode } from "@/lib/domain/careers";
import { useStore } from "@/lib/state/store";

export const Route = createFileRoute("/assessment")({
  component: AssessmentPage,
  head: () => ({
    meta: [
      { title: "Prerequisite Diagnostic — CareerTwin AI" },
      {
        name: "description",
        content:
          "Adaptive prototype diagnostic that probes prerequisite concepts whenever an answer is wrong.",
      },
      { property: "og:title", content: "Prerequisite Diagnostic — CareerTwin AI" },
      {
        property: "og:description",
        content: "Adaptive difficulty and prerequisite probing across 14 questions.",
      },
    ],
  }),
});

const DIFFICULTY_LABEL = { 1: "Beginner", 2: "Intermediate", 3: "Advanced" } as const;

function AssessmentPage() {
  const navigate = useNavigate();
  const { career, saveAssessment } = useStore();
  const [started, setStarted] = useState(false);
  const [state, setState] = useState<EngineState>(() => createEngineState(career.id));
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [finishing, setFinishing] = useState(false);

  const question = useMemo(() => nextQuestion(state), [state]);
  const [submittedQuestion, setSubmittedQuestion] = useState<typeof question>(null);
  const answered = state.responses.length;
  const progress = Math.round((answered / TOTAL_QUESTIONS) * 100);
  const lastResponse = state.responses[state.responses.length - 1];
  const probing = state.probeQueue.length > 0;
  const displayedQuestion = revealed ? submittedQuestion : question;

  function submit() {
    if (selected === null || !question) return;
    setSubmittedQuestion(question);
    setState((s) => applyAnswer(s, question, selected));
    setRevealed(true);
  }

  function advance() {
    setSelected(null);
    setSubmittedQuestion(null);
    setRevealed(false);
  }

  function finish() {
    setFinishing(true);
    const result = buildResult(career.id, state.responses);
    const curriculum = generateCurriculum(career.id, result);
    saveAssessment(result, curriculum);
    navigate({ to: "/results" });
  }

  const done = !revealed && (!question || answered >= TOTAL_QUESTIONS);

  if (!started) {
    return (
      <AppShell>
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="Step 1 · Diagnose"
            title="Data Analyst readiness assessment"
            description="A focused diagnostic of the prerequisite skills behind SQL, Python, Statistics, and Power BI."
          />
          <Panel>
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="mt-4 font-display text-2xl font-semibold">
                  Find your best starting point
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                  Answer 14 questions across the Data Analyst track. The prototype adjusts
                  difficulty after each answer and may check a related prerequisite when a concept
                  needs more context.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-4">
                {career.coreAreas.map((area) => (
                  <div key={area} className="rounded-md border border-border p-3">
                    <p className="text-sm font-medium">{area}</p>
                    <p className="mt-1 text-xs text-muted-foreground">Prerequisite coverage</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setStarted(true)}
                className="w-fit rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Start assessment
              </button>
            </div>
          </Panel>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <SectionHeading
        eyebrow="Step 1 · Diagnose"
        title="Prerequisite diagnostic"
        description={`${career.title} track. Difficulty adapts to each answer, and a wrong answer queues the prerequisite concepts behind it.`}
      />

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="min-w-[200px] flex-1">
          <div className="mb-1.5 flex justify-between text-xs text-muted-foreground">
            <span>
              Question {Math.min(answered + (revealed ? 0 : 1), TOTAL_QUESTIONS)} of{" "}
              {TOTAL_QUESTIONS}
            </span>
            <span className="font-mono">{progress}%</span>
          </div>
          <ScoreBar value={progress} />
        </div>
        {probing ? <Pill tone="accent">Probing prerequisites</Pill> : null}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Panel>
          {done ? (
            <div>
              <h3 className="text-lg font-semibold">Diagnostic complete</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {state.responses.filter((r) => r.correct).length} of {state.responses.length}{" "}
                correct. Next: the knowledge map and root-gap analysis.
              </p>
              <button
                onClick={finish}
                disabled={finishing}
                className="mt-5 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
              >
                {finishing ? "Analysing responses…" : "See results"}
              </button>
            </div>
          ) : displayedQuestion ? (
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Pill tone="primary">{displayedQuestion.skill}</Pill>
                <Pill>
                  {getNode(career, displayedQuestion.nodeId)?.label ?? displayedQuestion.nodeId}
                </Pill>
                <Pill
                  tone={
                    displayedQuestion.difficulty === 3
                      ? "weak"
                      : displayedQuestion.difficulty === 2
                        ? "partial"
                        : "muted"
                  }
                >
                  {DIFFICULTY_LABEL[displayedQuestion.difficulty]}
                </Pill>
              </div>
              <h3 className="text-lg font-medium leading-snug">{displayedQuestion.prompt}</h3>
              <div className="mt-5 space-y-2">
                {displayedQuestion.options.map((opt, i) => {
                  const isCorrect = i === displayedQuestion.correctIndex;
                  const isPicked = i === selected;
                  const cls = revealed
                    ? isCorrect
                      ? "border-strong bg-strong-soft"
                      : isPicked
                        ? "border-weak bg-weak-soft"
                        : "border-border opacity-70"
                    : isPicked
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-muted";
                  return (
                    <button
                      key={opt}
                      disabled={revealed}
                      onClick={() => setSelected(i)}
                      className={`w-full rounded-md border px-4 py-3 text-left text-sm transition-colors ${cls}`}
                    >
                      <span className="mr-2 font-mono text-xs text-muted-foreground">
                        {String.fromCharCode(65 + i)}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {revealed ? (
                <div className="mt-5 rounded-md border border-border bg-muted/50 p-4">
                  <p className="text-sm font-medium">
                    {lastResponse?.correct ? "Correct" : "Not quite"} —{" "}
                    {displayedQuestion.explanation}
                  </p>
                  {!lastResponse?.correct && state.probeQueue.length ? (
                    <p className="mt-2 text-xs text-muted-foreground">
                      Queued prerequisite probe:{" "}
                      {state.probeQueue
                        .map((id) => getNode(career, id)?.label)
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  ) : null}
                  <button
                    onClick={advance}
                    className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Continue
                  </button>
                </div>
              ) : (
                <button
                  onClick={submit}
                  disabled={selected === null}
                  className="mt-5 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
                >
                  Submit answer
                </button>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No further questions available in the prototype bank.
            </p>
          )}
        </Panel>

        <div className="space-y-6">
          <Panel>
            <SectionHeading title="Adaptive state" />
            <ul className="space-y-3 text-sm">
              {career.coreAreas.map((area) => (
                <li key={area} className="flex items-center justify-between">
                  <span>{area}</span>
                  <span className="font-mono text-xs text-muted-foreground">
                    difficulty {state.difficultyByArea[area] ?? 1}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <PrototypeNote>
                Rule-based engine: correct → difficulty up, incorrect → difficulty down plus
                prerequisite probe. Not a validated psychometric instrument.
              </PrototypeNote>
            </div>
          </Panel>

          <Panel>
            <SectionHeading title="Answer log" />
            {state.responses.length === 0 ? (
              <p className="text-sm text-muted-foreground">Answers appear here as you go.</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {state.responses.map((r, i) => (
                  <li key={r.questionId} className="flex items-center justify-between gap-2">
                    <span className="truncate">
                      <span className="mr-2 font-mono text-xs text-muted-foreground">{i + 1}</span>
                      {getNode(career, r.nodeId)?.label ?? r.nodeId}
                    </span>
                    <Pill tone={r.correct ? "strong" : "weak"}>
                      {r.correct ? "correct" : "missed"}
                    </Pill>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}
