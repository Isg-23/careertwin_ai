import type {
  AssessmentResult,
  CurriculumModule,
  JobMatchResult,
  ReadinessBreakdown,
  StudentProfile,
} from "../domain/types";

/**
 * Prototype Career Readiness Indicator.
 * Transparent weighted average of four visible components. Not a validated
 * employability prediction.
 */
export const READINESS_WEIGHTS = {
  technicalSkills: 0.3,
  assessmentPerformance: 0.3,
  practicalEvidence: 0.2,
  jobAlignment: 0.2,
} as const;

export function computeReadiness(input: {
  profile: StudentProfile;
  assessment: AssessmentResult | null;
  curriculum: CurriculumModule[];
  jobMatch: JobMatchResult | null;
}): ReadinessBreakdown {
  const { profile, assessment, curriculum, jobMatch } = input;

  const measured = assessment ? assessment.mastery.filter((m) => m.score !== null) : [];
  const baseTechnical = measured.length
    ? measured.reduce((s, m) => s + (m.score ?? 0), 0) / measured.length
    : 0;
  const completed = curriculum.filter((m) => m.status === "completed").length;
  const inProgress = curriculum.filter((m) => m.status === "in_progress").length;
  const progressBoost = curriculum.length
    ? ((completed + inProgress * 0.4) / curriculum.length) * 25
    : 0;
  const technicalSkills = Math.round(Math.min(100, baseTechnical + progressBoost));

  const assessmentPerformance = assessment ? assessment.overallScore : 0;

  const recorded = profile.evidence.filter((e) => e.recorded).length;
  const practicalEvidence = Math.round(
    Math.min(100, (recorded / Math.max(1, profile.evidence.length)) * 80 + completed * 5),
  );

  const jobAlignment = jobMatch ? jobMatch.coverage : 0;

  const total = Math.round(
    technicalSkills * READINESS_WEIGHTS.technicalSkills +
      assessmentPerformance * READINESS_WEIGHTS.assessmentPerformance +
      practicalEvidence * READINESS_WEIGHTS.practicalEvidence +
      jobAlignment * READINESS_WEIGHTS.jobAlignment,
  );

  return { technicalSkills, assessmentPerformance, practicalEvidence, jobAlignment, total };
}

export function readinessBand(score: number) {
  if (score >= 75) return { label: "Interview-ready (demo band)", tone: "strong" as const };
  if (score >= 50) return { label: "Developing", tone: "partial" as const };
  if (score > 0) return { label: "Early stage", tone: "weak" as const };
  return { label: "Not yet measured", tone: "muted" as const };
}
