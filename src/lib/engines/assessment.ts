import { questionBank } from "../domain/questions";
import { getCareer, getNode } from "../domain/careers";
import type { Career, Difficulty, Question, Response } from "../domain/types";

export const TOTAL_QUESTIONS = 14;

/**
 * Lightweight adaptive selector (prototype, not an IRT engine).
 *
 * Rules:
 *  - Start at difficulty 1 in each area, rotate across areas for coverage.
 *  - Correct answer  -> raise difficulty within the same area.
 *  - Wrong answer    -> drop difficulty and probe the prerequisite node(s)
 *                       of the node that was just failed.
 */
export interface EngineState {
  careerId: string;
  asked: string[];
  responses: Response[];
  /** Queue of prerequisite node ids to probe next */
  probeQueue: string[];
  difficultyByArea: Record<string, Difficulty>;
  areaCursor: number;
}

export function createEngineState(careerId = "data-analyst"): EngineState {
  const career = getCareer(careerId);
  const difficultyByArea: Record<string, Difficulty> = {};
  for (const area of career.coreAreas) difficultyByArea[area] = 1;
  return { careerId, asked: [], responses: [], probeQueue: [], difficultyByArea, areaCursor: 0 };
}

function pick(candidates: Question[], asked: string[], difficulty: Difficulty): Question | null {
  const open = candidates.filter((q) => !asked.includes(q.id));
  if (open.length === 0) return null;
  const exact = open.filter((q) => q.difficulty === difficulty);
  if (exact.length) return exact[0]!;
  // nearest difficulty
  return open.sort(
    (a, b) => Math.abs(a.difficulty - difficulty) - Math.abs(b.difficulty - difficulty),
  )[0]!;
}

export function nextQuestion(state: EngineState): Question | null {
  if (state.asked.length >= TOTAL_QUESTIONS) return null;
  const career = getCareer(state.careerId);

  // 1. Prerequisite probes take priority — this is the root-cause hunt.
  while (state.probeQueue.length) {
    const nodeId = state.probeQueue[0]!;
    const q = pick(
      questionBank.filter((x) => x.nodeId === nodeId),
      state.asked,
      1,
    );
    if (q) return q;
    state.probeQueue.shift();
  }

  // 2. Otherwise rotate areas for balanced coverage at the current difficulty.
  const areas = career.coreAreas;
  for (let i = 0; i < areas.length; i++) {
    const area = areas[(state.areaCursor + i) % areas.length]!;
    const q = pick(
      questionBank.filter((x) => x.skill === area),
      state.asked,
      state.difficultyByArea[area] ?? 1,
    );
    if (q) return q;
  }

  // 3. Fallback: anything unasked.
  return questionBank.find((q) => !state.asked.includes(q.id)) ?? null;
}

export function applyAnswer(
  state: EngineState,
  question: Question,
  selectedIndex: number,
): EngineState {
  const career: Career = getCareer(state.careerId);
  const correct = selectedIndex === question.correctIndex;

  const response: Response = {
    questionId: question.id,
    nodeId: question.nodeId,
    skill: question.skill,
    difficulty: question.difficulty,
    selectedIndex,
    correct,
  };

  const difficultyByArea = { ...state.difficultyByArea };
  const current = difficultyByArea[question.skill] ?? 1;
  difficultyByArea[question.skill] = (
    correct ? Math.min(3, current + 1) : Math.max(1, current - 1)
  ) as Difficulty;

  let probeQueue = state.probeQueue.filter((id) => id !== question.nodeId);
  if (!correct) {
    const node = getNode(career, question.nodeId);
    const prereqs = node?.prerequisites ?? [];
    for (const p of prereqs) {
      const hasQuestions = questionBank.some((q) => q.nodeId === p && !state.asked.includes(q.id));
      if (hasQuestions && !probeQueue.includes(p)) probeQueue = [...probeQueue, p];
    }
  }

  return {
    ...state,
    asked: [...state.asked, question.id],
    responses: [...state.responses, response],
    probeQueue,
    difficultyByArea,
    areaCursor: state.areaCursor + 1,
  };
}
