export type ViewName = "home" | "ask" | "result" | "history" | "profile";

export type Category = "感情" | "事业" | "财运" | "人际" | "方向";

export type AskMode = "single" | "triple";

export type ResultData = {
  question: string;
  category: Category;
  numbers: number[];
  saved?: boolean;
  sharedRewarded?: boolean;
  createdAt: string;
};

export type RecordItem = {
  id: string;
  category: Category;
  question: string;
  numbers: number[];
  summary: string;
  time: string;
  favorite?: boolean;
};

export type UserWallet = {
  points: number;
  checkedInToday: boolean;
  streak: number;
  registerGift: number;
  todayEarned: number;
  todaySpent: number;
};
