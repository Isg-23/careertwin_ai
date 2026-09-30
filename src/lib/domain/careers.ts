import type { Career, StudentProfile } from "./types";

/**
 * Prerequisite graph for the single career supported by this prototype.
 * Edges run child -> prerequisite parent.
 */
export const dataAnalyst: Career = {
  id: "data-analyst",
  title: "Data Analyst",
  summary:
    "Turns business questions into queries, analysis and dashboards. Prototype covers four skill areas with an explicit prerequisite chain.",
  coreAreas: ["SQL", "Python", "Statistics", "Power BI"],
  nodes: [
    // SQL chain
    { id: "sql-fundamentals", label: "SQL Fundamentals", area: "SQL", prerequisites: [] },
    { id: "sql-filtering", label: "Filtering", area: "SQL", prerequisites: ["sql-fundamentals"] },
    { id: "sql-aggregation", label: "Aggregation", area: "SQL", prerequisites: ["sql-filtering"] },
    {
      id: "db-keys",
      label: "Primary & Foreign Keys",
      area: "SQL",
      prerequisites: ["sql-fundamentals"],
    },
    {
      id: "db-relationships",
      label: "Database Relationships",
      area: "SQL",
      prerequisites: ["db-keys", "sql-aggregation"],
    },
    { id: "sql-joins", label: "JOINs", area: "SQL", prerequisites: ["db-relationships"] },

    // Python chain
    { id: "py-fundamentals", label: "Python Fundamentals", area: "Python", prerequisites: [] },
    {
      id: "py-data-structures",
      label: "Data Structures",
      area: "Python",
      prerequisites: ["py-fundamentals"],
    },
    { id: "py-pandas", label: "Pandas", area: "Python", prerequisites: ["py-data-structures"] },
    { id: "py-analysis", label: "Data Analysis", area: "Python", prerequisites: ["py-pandas"] },

    // Statistics chain
    {
      id: "stat-fundamentals",
      label: "Statistics Fundamentals",
      area: "Statistics",
      prerequisites: [],
    },
    {
      id: "stat-descriptive",
      label: "Descriptive Statistics",
      area: "Statistics",
      prerequisites: ["stat-fundamentals"],
    },
    {
      id: "stat-probability",
      label: "Probability",
      area: "Statistics",
      prerequisites: ["stat-descriptive"],
    },
    {
      id: "stat-correlation",
      label: "Correlation",
      area: "Statistics",
      prerequisites: ["stat-probability"],
    },

    // Power BI chain
    { id: "bi-fundamentals", label: "Power BI Fundamentals", area: "Power BI", prerequisites: [] },
    { id: "bi-import", label: "Data Import", area: "Power BI", prerequisites: ["bi-fundamentals"] },
    {
      id: "bi-transform",
      label: "Data Transformation",
      area: "Power BI",
      prerequisites: ["bi-import"],
    },
    {
      id: "bi-dashboard",
      label: "Dashboard Design",
      area: "Power BI",
      prerequisites: ["bi-transform"],
    },
  ],
};

export const careers: Career[] = [dataAnalyst];

export function getCareer(id: string): Career {
  return careers.find((c) => c.id === id) ?? dataAnalyst;
}

export function getNode(career: Career, nodeId: string) {
  return career.nodes.find((n) => n.id === nodeId);
}

/** Demo student — seeded data, not a real person. */
export const demoStudent: StudentProfile = {
  name: "Aarav Sharma",
  education: "B.Tech Computer Science (final year)",
  targetCareerId: "data-analyst",
  selfReportedSkills: [
    { name: "Python", level: 3 },
    { name: "SQL", level: 2 },
    { name: "Excel", level: 4 },
    { name: "Statistics", level: 2 },
    { name: "Power BI", level: 2 },
  ],
  evidence: [
    {
      title: "Sales dashboard (course project)",
      kind: "Project",
      note: "Power BI report built from a sample retail dataset.",
      recorded: true,
    },
    {
      title: "Python data cleaning notebook",
      kind: "Project",
      note: "Pandas notebook cleaning a public CSV dataset.",
      recorded: true,
    },
    {
      title: "Internship / work sample",
      kind: "Placeholder",
      note: "No evidence recorded yet.",
      recorded: false,
    },
  ],
};
