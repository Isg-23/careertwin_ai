// Core domain types for the CareerTwin AI prototype.
// Prototype scope: no production persistence, no real employer data.

export type Difficulty = 1 | 2 | 3;

export type ModuleStatus = "not_started" | "in_progress" | "completed";

export interface SkillNode {
  /** Stable slug id */
  id: string;
  label: string;
  /** Top-level skill area this node belongs to (e.g. "SQL") */
  area: string;
  /** Direct prerequisite node ids (edges point child -> parent prerequisite) */
  prerequisites: string[];
}

export interface Career {
  id: string;
  title: string;
  summary: string;
  coreAreas: string[];
  /** Prerequisite graph nodes for this career */
  nodes: SkillNode[];
}

export interface Question {
  id: string;
  /** Skill area, e.g. "SQL" */
  skill: string;
  /** Prerequisite node id this question measures */
  nodeId: string;
  difficulty: Difficulty;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Response {
  questionId: string;
  nodeId: string;
  skill: string;
  difficulty: Difficulty;
  selectedIndex: number;
  correct: boolean;
}

export interface NodeMastery {
  nodeId: string;
  label: string;
  area: string;
  asked: number;
  correct: number;
  /** 0-100, null when not measured */
  score: number | null;
  status: "strong" | "partial" | "weak" | "unmeasured";
}

export interface RootGap {
  nodeId: string;
  label: string;
  area: string;
  /** Downstream nodes whose failures are explained by this root gap */
  affects: string[];
  confidence: "high" | "medium" | "low";
  rationale: string;
}

export interface AssessmentResult {
  completedAt: string;
  responses: Response[];
  overallScore: number;
  mastery: NodeMastery[];
  rootGaps: RootGap[];
}

export interface CurriculumModule {
  id: string;
  order: number;
  title: string;
  nodeId: string;
  area: string;
  reason: string;
  prerequisiteLabel: string | null;
  estimatedHours: number;
  objective: string;
  difficulty: Difficulty;
  status: ModuleStatus;
  /** Is this module addressing a detected root gap? */
  rootGap: boolean;
  /** Strong assessment evidence verifies the prerequisite. */
  prerequisiteVerified: boolean;
}

export interface JobRequirement {
  skill: string;
  nodeIds: string[];
  kind: "required" | "preferred";
  matchedKeyword: string;
}

export interface JobMatchLine {
  skill: string;
  kind: "required" | "preferred";
  score: number | null;
  verdict: "strong" | "partial" | "gap" | "unmeasured";
  action: string;
}

export interface JobMatchResult {
  analyzedAt: string;
  source: "heuristic" | "ai";
  requirements: JobRequirement[];
  lines: JobMatchLine[];
  coverage: number;
  tools: string[];
  experience: string | null;
}

export interface ReadinessBreakdown {
  technicalSkills: number;
  assessmentPerformance: number;
  practicalEvidence: number;
  jobAlignment: number;
  total: number;
}

export interface StudentProfile {
  name: string;
  education: string;
  targetCareerId: string;
  selfReportedSkills: { name: string; level: number }[];
  evidence: { title: string; kind: string; note: string; recorded: boolean }[];
}
