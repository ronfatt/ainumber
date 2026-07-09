export type Category = "love" | "career" | "wealth" | "relationship" | "direction";

export type DrawMode = "one" | "three";

export type AskRequest = {
  question: string;
  category: Category;
  drawMode: DrawMode;
  numbers: number[];
  useMeihua: boolean;
  useDeepAI: boolean;
  locale: "zh-CN";
};

export type MeihuaNote = {
  upperGua?: string;
  lowerGua?: string;
  movingLine?: string;
  interpretation?: string;
};

export type AskResult = {
  id: string;
  question: string;
  category: Category;
  drawMode: DrawMode;
  numbers: number[];
  keywords: string[];
  summary: string;
  currentSituation: string;
  hiddenReminder: string;
  actionSteps: string[];
  oneLineAnswer: string;
  meihuaNote?: MeihuaNote;
  disclaimer: string;
  createdAt: string;
  isSaved: boolean;
  sharedRewarded?: boolean;
};

export type ViewName = "home" | "ask" | "result" | "history" | "profile";

export type UserWallet = {
  points: number;
  checkedInToday: boolean;
  streak: number;
  registerGift: number;
  todayEarned: number;
  todaySpent: number;
};
