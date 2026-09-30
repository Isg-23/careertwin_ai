import { getCareer, getNode } from "../domain/careers";
import type { AssessmentResult, CurriculumModule, Difficulty } from "../domain/types";

const objectives: Record<string, { objective: string; hours: number }> = {
  "sql-fundamentals": {
    objective: "Write and read basic SELECT queries with confidence.",
    hours: 3,
  },
  "sql-filtering": {
    objective: "Filter rows precisely with WHERE, IN, BETWEEN and NULL handling.",
    hours: 2,
  },
  "sql-aggregation": {
    objective: "Summarise data with GROUP BY and filter groups with HAVING.",
    hours: 4,
  },
  "db-keys": {
    objective: "Identify primary and foreign keys in a schema and explain their constraints.",
    hours: 2,
  },
  "db-relationships": {
    objective:
      "Model one-to-many and many-to-many relationships and predict row cardinality before querying.",
    hours: 5,
  },
  "sql-joins": {
    objective: "Choose the right join type and verify result cardinality against expectations.",
    hours: 5,
  },
  "py-fundamentals": {
    objective: "Use Python types, control flow and functions fluently.",
    hours: 4,
  },
  "py-data-structures": {
    objective: "Select the right structure (list, dict, set) for a data task.",
    hours: 3,
  },
  "py-pandas": { objective: "Load, filter, group and join data with pandas.", hours: 6 },
  "py-analysis": {
    objective: "Run an end-to-end analysis with documented cleaning decisions.",
    hours: 6,
  },
  "stat-fundamentals": { objective: "Explain variables, distributions and sampling.", hours: 3 },
  "stat-descriptive": { objective: "Choose and justify centre and spread measures.", hours: 3 },
  "stat-probability": {
    objective: "Reason about independence and conditional probability.",
    hours: 4,
  },
  "stat-correlation": {
    objective: "Interpret correlation without overclaiming causation.",
    hours: 3,
  },
  "bi-fundamentals": { objective: "Navigate Power BI and publish a basic report.", hours: 2 },
  "bi-import": { objective: "Import and refresh data sources through Power Query.", hours: 3 },
  "bi-transform": {
    objective: "Shape data and build a correct model with relationships.",
    hours: 4,
  },
  "bi-dashboard": {
    objective: "Design a decision-focused dashboard with clear hierarchy.",
    hours: 4,
  },
};

const difficultyByDepth = (depth: number): Difficulty => (depth <= 1 ? 1 : depth === 2 ? 2 : 3);

function depthOf(careerId: string, nodeId: string, seen = new Set<string>()): number {
  const career = getCareer(careerId);
  const node = getNode(career, nodeId);
  if (!node || node.prerequisites.length === 0 || seen.has(nodeId)) return 1;
  seen.add(nodeId);
  return 1 + Math.max(...node.prerequisites.map((p) => depthOf(careerId, p, seen)));
}

/**
 * Curriculum generation: start at root gaps, then the weak nodes they unblock,
 * then remaining weak/partial nodes ordered by prerequisite depth.
 */
export function generateCurriculum(careerId: string, result: AssessmentResult): CurriculumModule[] {
  const career = getCareer(careerId);
  const byId = new Map(result.mastery.map((m) => [m.nodeId, m]));
  const rootIds = result.rootGaps.map((g) => g.nodeId);

  const needsWork = result.mastery
    .filter((m) => m.score !== null && m.status !== "strong")
    .map((m) => m.nodeId);

  const ordered = [...new Set([...rootIds, ...needsWork])].sort((a, b) => {
    const rootDelta = Number(rootIds.includes(b)) - Number(rootIds.includes(a));
    if (rootDelta !== 0) return rootDelta;
    return depthOf(careerId, a) - depthOf(careerId, b);
  });

  return ordered.map((nodeId, index) => {
    const node = getNode(career, nodeId)!;
    const mastery = byId.get(nodeId);
    const isRoot = rootIds.includes(nodeId);
    const gap = result.rootGaps.find((g) => g.nodeId === nodeId);
    const prereqLabel = node.prerequisites.length
      ? node.prerequisites
          .map((p) => getNode(career, p)?.label)
          .filter(Boolean)
          .join(", ")
      : null;
    const meta = objectives[nodeId] ?? {
      objective: `Build working competence in ${node.label}.`,
      hours: 3,
    };

    const reason = isRoot
      ? `Detected prerequisite gap${gap?.affects.length ? ` affecting ${gap.affects.join(", ")}` : ""}.`
      : `Assessment score ${mastery?.score}% in ${node.label} — below the ${node.area} target for ${career.title}.`;

    return {
      id: `mod-${nodeId}`,
      order: index + 1,
      title: node.label,
      nodeId,
      area: node.area,
      reason,
      prerequisiteLabel: prereqLabel,
      estimatedHours: meta.hours,
      objective: meta.objective,
      difficulty: difficultyByDepth(depthOf(careerId, nodeId)),
      status: "not_started",
      rootGap: isRoot,
      prerequisiteVerified: mastery?.status === "strong",
    };
  });
}
