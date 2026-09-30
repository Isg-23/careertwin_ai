import type { JobMatchLine, JobMatchResult, JobRequirement, NodeMastery } from "../domain/types";

/** Keyword -> prerequisite nodes it maps to in the career graph. */
const SKILL_MAP: { skill: string; keywords: string[]; nodeIds: string[] }[] = [
  {
    skill: "SQL querying",
    keywords: ["sql", "queries", "querying"],
    nodeIds: ["sql-fundamentals", "sql-filtering", "sql-aggregation"],
  },
  {
    skill: "SQL joins & data modelling",
    keywords: ["join", "joins", "data model", "relational", "schema"],
    nodeIds: ["db-keys", "db-relationships", "sql-joins"],
  },
  {
    skill: "Python",
    keywords: ["python", "pandas", "numpy", "scripting"],
    nodeIds: ["py-fundamentals", "py-data-structures", "py-pandas", "py-analysis"],
  },
  {
    skill: "Statistics",
    keywords: ["statistic", "statistics", "a/b test", "hypothesis", "probability", "correlation"],
    nodeIds: ["stat-descriptive", "stat-probability", "stat-correlation"],
  },
  {
    skill: "Power BI / dashboards",
    keywords: ["power bi", "dashboard", "tableau", "visualisation", "visualization", "reporting"],
    nodeIds: ["bi-import", "bi-transform", "bi-dashboard"],
  },
  { skill: "Excel", keywords: ["excel", "spreadsheet", "pivot"], nodeIds: [] },
];

const TOOL_KEYWORDS = [
  "sql",
  "python",
  "power bi",
  "tableau",
  "excel",
  "pandas",
  "snowflake",
  "bigquery",
  "looker",
  "dbt",
  "git",
];

const PREFERRED_MARKERS = [
  "preferred",
  "nice to have",
  "bonus",
  "plus",
  "good to have",
  "desirable",
];

function sectionKind(
  line: string,
  currentKind: "required" | "preferred",
): "required" | "preferred" {
  const l = line.toLowerCase();
  if (PREFERRED_MARKERS.some((m) => l.includes(m))) return "preferred";
  if (l.includes("required") || l.includes("must have") || l.includes("responsibilit"))
    return "required";
  return currentKind;
}

export function extractRequirements(text: string): JobRequirement[] {
  const lines = text.split(/\r?\n/);
  const found = new Map<string, JobRequirement>();
  let kind: "required" | "preferred" = "required";

  for (const rawLine of lines) {
    kind = sectionKind(rawLine, kind);
    const l = rawLine.toLowerCase();
    for (const entry of SKILL_MAP) {
      const matched = entry.keywords.find((k) => l.includes(k));
      if (!matched) continue;
      const existing = found.get(entry.skill);
      if (existing && existing.kind === "required") continue;
      found.set(entry.skill, {
        skill: entry.skill,
        nodeIds: entry.nodeIds,
        kind,
        matchedKeyword: matched,
      });
    }
  }
  return [...found.values()];
}

export function extractTools(text: string): string[] {
  const l = text.toLowerCase();
  return TOOL_KEYWORDS.filter((t) => l.includes(t)).map((t) =>
    t === "power bi" ? "Power BI" : t.toUpperCase() === t ? t : t[0]!.toUpperCase() + t.slice(1),
  );
}

export function extractExperience(text: string): string | null {
  const m = text.match(/(\d+)\s*(?:\+|\s*-\s*\d+)?\s*(?:years?|yrs?)/i);
  return m ? `${m[0]} (as stated in the posting)` : null;
}

export function matchJob(text: string, mastery: NodeMastery[]): JobMatchResult {
  const requirements = extractRequirements(text);
  const byId = new Map(mastery.map((m) => [m.nodeId, m]));

  const lines: JobMatchLine[] = requirements.map((req) => {
    const scored = req.nodeIds
      .map((id) => byId.get(id))
      .filter((m) => m && m.score !== null) as NodeMastery[];
    if (!scored.length) {
      return {
        skill: req.skill,
        kind: req.kind,
        score: null,
        verdict: "unmeasured",
        action: "Not covered by the prototype diagnostic — add evidence or extend the assessment.",
      };
    }
    const score = Math.round(scored.reduce((s, m) => s + (m.score ?? 0), 0) / scored.length);
    const verdict: JobMatchLine["verdict"] =
      score >= 75 ? "strong" : score >= 45 ? "partial" : "gap";
    const weakest = [...scored].sort((a, b) => (a.score ?? 0) - (b.score ?? 0))[0]!;
    const action =
      verdict === "strong"
        ? `Record evidence (project or work sample) demonstrating ${req.skill}.`
        : verdict === "partial"
          ? `Complete the ${weakest.label} module, then reassess.`
          : `Start with ${weakest.label} — it is the lowest measured node behind this requirement.`;
    return { skill: req.skill, kind: req.kind, score, verdict, action };
  });

  const measured = lines.filter((l) => l.score !== null);
  const coverage = measured.length
    ? Math.round(measured.reduce((s, l) => s + (l.score ?? 0), 0) / measured.length)
    : 0;

  return {
    analyzedAt: new Date().toISOString(),
    source: "heuristic",
    requirements,
    lines,
    coverage,
    tools: extractTools(text),
    experience: extractExperience(text),
  };
}

export const SAMPLE_JOB_DESCRIPTION = `Data Analyst — Retail Analytics Team

About the role
You will partner with merchandising and operations to answer business questions with data.

Requirements
- 0-2 years experience in an analytics or reporting role
- Strong SQL, including joins across relational tables and aggregation
- Comfortable with Excel for ad-hoc analysis
- Ability to build and maintain Power BI dashboards for business stakeholders
- Working knowledge of statistics (descriptive measures, correlation)

Preferred
- Python (pandas) for data cleaning and analysis
- Exposure to experimentation / A/B testing
`;
