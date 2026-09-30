import { getCareer } from "../domain/careers";
import type { AssessmentResult, NodeMastery, Response, RootGap } from "../domain/types";

function statusFor(score: number | null): NodeMastery["status"] {
  if (score === null) return "unmeasured";
  if (score >= 75) return "strong";
  if (score >= 45) return "partial";
  return "weak";
}

export function buildMastery(careerId: string, responses: Response[]): NodeMastery[] {
  const career = getCareer(careerId);
  return career.nodes.map((node) => {
    const rs = responses.filter((r) => r.nodeId === node.id);
    // Weight harder questions slightly more.
    const totalWeight = rs.reduce((sum, r) => sum + r.difficulty, 0);
    const earned = rs.reduce((sum, r) => sum + (r.correct ? r.difficulty : 0), 0);
    const score = rs.length ? Math.round((earned / totalWeight) * 100) : null;
    return {
      nodeId: node.id,
      label: node.label,
      area: node.area,
      asked: rs.length,
      correct: rs.filter((r) => r.correct).length,
      score,
      status: statusFor(score),
    };
  });
}

/**
 * Root gap detection.
 *
 * A node is a candidate root gap when it is weak AND at least one node that
 * depends on it (directly or transitively) is also weak. The deepest weak node
 * in each broken chain is reported, because fixing it unblocks the rest.
 */
export function detectRootGaps(careerId: string, mastery: NodeMastery[]): RootGap[] {
  const career = getCareer(careerId);
  const byId = new Map(mastery.map((m) => [m.nodeId, m]));
  const weak = (id: string) => {
    const m = byId.get(id);
    return m?.status === "weak" || m?.status === "partial";
  };

  const dependentsOf = (id: string) =>
    career.nodes.filter((n) => n.prerequisites.includes(id)).map((n) => n.id);

  const gaps: RootGap[] = [];

  for (const node of career.nodes) {
    const m = byId.get(node.id);
    if (!m || m.score === null || m.status === "strong") continue;

    // Skip if a prerequisite of this node is itself weak — that one is deeper.
    const deeperWeak = node.prerequisites.some((p) => weak(p) && byId.get(p)?.score !== null);
    if (deeperWeak) continue;

    // Collect downstream weak nodes (BFS).
    const affected: string[] = [];
    const queue = [...dependentsOf(node.id)];
    const seen = new Set<string>();
    while (queue.length) {
      const id = queue.shift()!;
      if (seen.has(id)) continue;
      seen.add(id);
      const dm = byId.get(id);
      if (dm && dm.score !== null && dm.status !== "strong") {
        affected.push(dm.label);
        queue.push(...dependentsOf(id));
      }
    }

    if (affected.length === 0 && m.status !== "weak") continue;

    const confidence: RootGap["confidence"] =
      affected.length >= 2 && m.status === "weak"
        ? "high"
        : affected.length >= 1
          ? "medium"
          : "low";

    gaps.push({
      nodeId: node.id,
      label: m.label,
      area: m.area,
      affects: affected,
      confidence,
      rationale: affected.length
        ? `Measured weak (${m.score}%) and downstream ${affected.join(", ")} also underperformed, so this looks like the point where the prerequisite chain breaks.`
        : `Measured weak (${m.score}%) with no deeper prerequisite failing, so learning should start here.`,
    });
  }

  const rank = { high: 0, medium: 1, low: 2 } as const;
  return gaps.sort(
    (a, b) => rank[a.confidence] - rank[b.confidence] || b.affects.length - a.affects.length,
  );
}

export function buildResult(careerId: string, responses: Response[]): AssessmentResult {
  const mastery = buildMastery(careerId, responses);
  const rootGaps = detectRootGaps(careerId, mastery);
  const correct = responses.filter((r) => r.correct).length;
  return {
    completedAt: new Date().toISOString(),
    responses,
    overallScore: responses.length ? Math.round((correct / responses.length) * 100) : 0,
    mastery,
    rootGaps,
  };
}

export function areaScores(mastery: NodeMastery[]) {
  const areas = new Map<string, { sum: number; count: number }>();
  for (const m of mastery) {
    if (m.score === null) continue;
    const entry = areas.get(m.area) ?? { sum: 0, count: 0 };
    entry.sum += m.score;
    entry.count += 1;
    areas.set(m.area, entry);
  }
  return [...areas.entries()].map(([area, v]) => ({ area, score: Math.round(v.sum / v.count) }));
}
