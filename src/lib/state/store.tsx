import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { demoStudent, getCareer } from "../domain/careers";
import type {
  AssessmentResult,
  CurriculumModule,
  JobMatchResult,
  ModuleStatus,
  StudentProfile,
} from "../domain/types";
import { computeReadiness } from "../engines/readiness";

const STORAGE_KEY = "careertwin.prototype.v1";

interface PersistedState {
  profile: StudentProfile;
  assessment: AssessmentResult | null;
  curriculum: CurriculumModule[];
  jobMatch: JobMatchResult | null;
}

const initialState: PersistedState = {
  profile: demoStudent,
  assessment: null,
  curriculum: [],
  jobMatch: null,
};

interface StoreValue extends PersistedState {
  hydrated: boolean;
  career: ReturnType<typeof getCareer>;
  readiness: ReturnType<typeof computeReadiness>;
  saveAssessment: (result: AssessmentResult, curriculum: CurriculumModule[]) => void;
  setModuleStatus: (id: string, status: ModuleStatus) => void;
  saveJobMatch: (match: JobMatchResult) => void;
  setTargetCareer: (careerId: string) => void;
  resetDemo: () => void;
}

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PersistedState>(initialState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setState({ ...initialState, ...(JSON.parse(raw) as PersistedState) });
    } catch {
      // Corrupt demo state is not fatal — fall back to seed data.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable: prototype continues in memory */
    }
  }, [state, hydrated]);

  const saveAssessment = useCallback(
    (assessment: AssessmentResult, curriculum: CurriculumModule[]) => {
      setState((s) => ({ ...s, assessment, curriculum }));
    },
    [],
  );

  const setModuleStatus = useCallback((id: string, status: ModuleStatus) => {
    setState((s) => ({
      ...s,
      curriculum: s.curriculum.map((m) => (m.id === id ? { ...m, status } : m)),
    }));
  }, []);

  const saveJobMatch = useCallback((jobMatch: JobMatchResult) => {
    setState((s) => ({ ...s, jobMatch }));
  }, []);

  const setTargetCareer = useCallback((careerId: string) => {
    setState((s) => ({ ...s, profile: { ...s.profile, targetCareerId: careerId } }));
  }, []);

  const resetDemo = useCallback(() => setState(initialState), []);

  const value = useMemo<StoreValue>(() => {
    const career = getCareer(state.profile.targetCareerId);
    const readiness = computeReadiness({
      profile: state.profile,
      assessment: state.assessment,
      curriculum: state.curriculum,
      jobMatch: state.jobMatch,
    });
    return {
      ...state,
      hydrated,
      career,
      readiness,
      saveAssessment,
      setModuleStatus,
      saveJobMatch,
      setTargetCareer,
      resetDemo,
    };
  }, [state, hydrated, saveAssessment, setModuleStatus, saveJobMatch, setTargetCareer, resetDemo]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
