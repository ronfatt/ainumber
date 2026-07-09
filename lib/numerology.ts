import type { AskRequest, AskResult, Category, DrawMode } from "@/types";

export const disclaimer =
  "本系统提供数字象征与自我反思参考，不构成医疗、法律、投资或重大人生决策建议。";

export const categoryLabels: Record<Category, string> = {
  love: "感情",
  career: "事业",
  wealth: "财运",
  relationship: "人际",
  direction: "方向"
};

export const categoryValues = Object.keys(categoryLabels) as Category[];

const numberMeanings: Record<number, string[]> = {
  1: ["开始", "独立", "行动", "领导", "新局"],
  2: ["关系", "配合", "感受", "等待", "信任"],
  3: ["表达", "创意", "传播", "人气", "展示"],
  4: ["结构", "规则", "稳定", "压力", "打底"],
  5: ["变化", "流动", "突破", "自由", "转机"],
  6: ["责任", "照顾", "承诺", "财富", "家庭"],
  7: ["观察", "隐藏", "思考", "修正", "风险"],
  8: ["资源", "权力", "金钱", "现实", "管理"],
  9: ["完成", "释放", "格局", "结束", "智慧"]
};

const baguaMap: Record<number, string> = {
  1: "乾",
  2: "兑",
  3: "离",
  4: "震",
  5: "巽",
  6: "坎",
  7: "艮",
  8: "坤",
  9: "乾"
};

export function generateNumbers(drawMode: DrawMode) {
  return Array.from({ length: drawMode === "one" ? 1 : 3 }, () => Math.floor(Math.random() * 9) + 1);
}

export function getNumberMeaning(number: number) {
  return numberMeanings[number] ?? numberMeanings[9];
}

export function mapToBagua(number: number) {
  return baguaMap[number] ?? "乾";
}

export function buildFallbackResult(request: AskRequest): AskResult {
  const meanings = request.numbers.flatMap(getNumberMeaning);
  const keywords = Array.from(new Set(meanings)).slice(0, 3);
  while (keywords.length < 3) keywords.push("观察");
  const categoryLabel = categoryLabels[request.category];
  const primary = keywords[0];
  const secondary = keywords[1];
  const third = keywords[2];
  const meihuaNote = request.useMeihua
    ? {
        upperGua: mapToBagua(request.numbers[0]),
        lowerGua: mapToBagua(request.numbers[request.numbers.length - 1]),
        movingLine: `动爻取 ${request.numbers.reduce((sum, item) => sum + item, 0) % 6 || 6}`,
        interpretation: `卦象提示先稳住节奏，再观察外部变化。${primary} 是入口，${secondary} 是过程，${third} 是需要落地的方向。`
      }
    : undefined;

  return {
    id: `result-${Date.now()}`,
    question: request.question,
    category: request.category,
    drawMode: request.drawMode,
    numbers: request.numbers,
    keywords,
    summary: `${categoryLabel}问题的核心在于${primary}与${secondary}之间的平衡。`,
    currentSituation: `从数字组合看，你的问题正在进入一个需要重新校准的位置。${primary}代表当前最明显的能量，说明你已经感受到变化或压力；${secondary}提醒你不要只看表面反应，而要回到真实需求与可执行资源。现在适合先看清局面，再做选择。`,
    hiddenReminder: `隐藏风险在于过快下结论，或把一时情绪当成长期答案。${third}提示你保留余地，尤其在沟通、承诺和资源投入上，要避免因为焦虑而做出过重决定。`,
    actionSteps: [
      "先写下真正想解决的问题。",
      "把可控与不可控因素分开。",
      "给自己一个观察窗口再行动。"
    ],
    oneLineAnswer: `可以推进，但要先稳住节奏，别急着一次定局。`,
    meihuaNote,
    disclaimer,
    createdAt: new Date().toISOString(),
    isSaved: false
  };
}
