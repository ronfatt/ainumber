"use client";

import { useCallback, useState } from "react";
import { CURRENT_RESULT_KEY, HISTORY_KEY, readJson, upsertHistory, writeJson } from "@/lib/storage";
import type { AskResult } from "@/types";

export function useLocalHistory() {
  const [history, setHistory] = useState<AskResult[]>(() => readJson<AskResult[]>(HISTORY_KEY, []));
  const [currentResult, setCurrentResultState] = useState<AskResult | null>(() =>
    readJson<AskResult | null>(CURRENT_RESULT_KEY, null)
  );

  const setCurrentResult = useCallback((result: AskResult | null) => {
    setCurrentResultState(result);
    writeJson(CURRENT_RESULT_KEY, result);
  }, []);

  const saveResult = useCallback(
    (result: AskResult) => {
      const saved = { ...result, isSaved: true };
      const next = upsertHistory(saved);
      setHistory(next);
      setCurrentResult(saved);
      return saved;
    },
    [setCurrentResult]
  );

  const addResult = useCallback(
    (result: AskResult) => {
      const next = upsertHistory(result);
      setHistory(next);
      setCurrentResult(result);
      return result;
    },
    [setCurrentResult]
  );

  const toggleSaved = useCallback(
    (result: AskResult) => {
      const nextResult = { ...result, isSaved: !result.isSaved };
      const next = upsertHistory(nextResult);
      setHistory(next);
      setCurrentResult(nextResult);
      return nextResult;
    },
    [setCurrentResult]
  );

  const markSharedRewarded = useCallback(
    (result: AskResult) => {
      const nextResult = { ...result, sharedRewarded: true };
      const next = upsertHistory(nextResult);
      setHistory(next);
      setCurrentResult(nextResult);
      return nextResult;
    },
    [setCurrentResult]
  );

  return {
    history,
    currentResult,
    setCurrentResult,
    addResult,
    saveResult,
    toggleSaved,
    markSharedRewarded
  };
}
