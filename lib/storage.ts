import type { AskResult } from "@/types";

export const CURRENT_RESULT_KEY = "shu-wen-ai-current-result";
export const HISTORY_KEY = "shu-wen-ai-history";

export function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJson<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function upsertHistory(result: AskResult) {
  const history = readJson<AskResult[]>(HISTORY_KEY, []);
  const next = [result, ...history.filter((item) => item.id !== result.id)];
  writeJson(HISTORY_KEY, next);
  return next;
}
