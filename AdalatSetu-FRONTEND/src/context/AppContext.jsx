import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { filingsSeed, judgeCasesSeed } from "../data/mockData";

const AppContext = createContext(null);
const STORAGE_KEY = "adalatsetu-state-v1";

const defaultState = {
  selectedRole: null,
  notificationEnabled: true,
  filings: filingsSeed,
  citation: "",
  paymentStatus: "required",
  verificationStatus: "pending",
  judgeCases: judgeCasesSeed,
  judgeOverrides: {},
  overrideReasons: {},
  expandedAIInsights: {},
};

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...defaultState, ...JSON.parse(saved) } : defaultState;
  } catch {
    return defaultState;
  }
}

export function AppProvider({ children }) {
  const [state, setState] = useState(loadState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const actions = useMemo(() => ({
    setRole(role) {
      setState(s => ({ ...s, selectedRole: role }));
    },
    setNotification(enabled) {
      setState(s => ({ ...s, notificationEnabled: enabled }));
    },
    setCitation(citation) {
      setState(s => ({ ...s, citation }));
    },
    setPaymentStatus(paymentStatus) {
      setState(s => ({ ...s, paymentStatus }));
    },
    setVerificationStatus(verificationStatus) {
      setState(s => ({ ...s, verificationStatus }));
    },
    updateFilingStatus(id, status) {
      setState(s => ({
        ...s,
        filings: s.filings.map(f => f.id === id ? { ...f, status } : f)
      }));
    },
    toggleAI(id) {
      setState(s => ({
        ...s,
        expandedAIInsights: {
          ...s.expandedAIInsights,
          [id]: !s.expandedAIInsights[id]
        }
      }));
    },
    setJudgeOverride(id, reason) {
      setState(s => ({
        ...s,
        judgeOverrides: { ...s.judgeOverrides, [id]: true },
        overrideReasons: { ...s.overrideReasons, [id]: reason }
      }));
    },
    resetPayment() {
      setState(s => ({ ...s, paymentStatus: "required", verificationStatus: "pending" }));
    }
  }), []);

  const value = { ...state, ...actions };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}