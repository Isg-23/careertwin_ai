import { matchJob } from "../engines/jobMatch";
import type { JobMatchResult, NodeMastery, RootGap } from "../domain/types";

/**
 * AI abstraction layer.
 *
 * The prototype ships a deterministic provider so every demo runs identically
 * with no API key configured. A hosted LLM provider can be added behind the
 * same interface (server-side only) without touching UI code.
 */
export interface CareerAiProvider {
  id: "deterministic" | "llm";
  label: string;
  /** Parse a job description into structured requirements and a match report. */
  analyzeJobDescription(text: string, mastery: NodeMastery[]): Promise<JobMatchResult>;
  /** Short natural-language narrative for a detected root gap. */
  explainRootGap(gap: RootGap): Promise<string>;
}

const deterministicProvider: CareerAiProvider = {
  id: "deterministic",
  label: "Deterministic demo engine",
  async analyzeJobDescription(text, mastery) {
    return matchJob(text, mastery);
  },
  async explainRootGap(gap) {
    const affects = gap.affects.length ? gap.affects.join(", ") : "later topics in this track";
    return `${gap.label} is the earliest concept in the chain where performance drops. Because ${affects} build on it, starting the curriculum here is expected to unblock more than drilling the failed topic directly.`;
  },
};

/**
 * Returns the deterministic provider unless an LLM provider is registered.
 * Registration happens server-side; the UI never sees credentials.
 */
let registered: CareerAiProvider | null = null;

export function registerAiProvider(provider: CareerAiProvider) {
  registered = provider;
}

export function getAiProvider(): CareerAiProvider {
  return registered ?? deterministicProvider;
}
