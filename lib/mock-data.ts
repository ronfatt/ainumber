import type { RecordItem } from "./types";

export const categories = ["感情", "事业", "财运", "人际", "方向"] as const;

export const todayReading = {
  number: 5,
  keywords: "变化 · 自由 · 机会",
  text: "今天适合打破常规，尝试新方法。变动中藏着转机，保持灵活与好奇，好运正在路上。"
};

export const playModes = [
  {
    title: "一数问事",
    desc: "抽 1 个数字，快速聚焦问题"
  },
  {
    title: "三数问卦",
    desc: "抽 3 个数字，多维解析指引"
  },
  {
    title: "号码分析",
    desc: "分析任意号码，洞察数字能量"
  }
];

export const initialRecords: RecordItem[] = [
  {
    id: "r1",
    category: "事业",
    question: "这份合作值得继续吗？",
    numbers: [7, 8, 4],
    summary: "合作有推进空间，关键在于明确分工与沟通节奏...",
    time: "今天 09:32",
    favorite: true
  },
  {
    id: "r2",
    category: "感情",
    question: "他对我的真实想法是什么？",
    numbers: [2, 9, 5],
    summary: "对方有好感但仍在观望，需要时间和信任累积...",
    time: "昨天 22:15"
  },
  {
    id: "r3",
    category: "财运",
    question: "下个月的财运如何？",
    numbers: [3, 1, 7],
    summary: "正财平稳，偏财有机会，注意风险控制...",
    time: "05-18 16:47",
    favorite: true
  },
  {
    id: "r4",
    category: "事业",
    question: "适合换一份新工作吗？",
    numbers: [6, 2, 3],
    summary: "时机未到，建议继续积累，等待更佳机会...",
    time: "05-17 11:03"
  },
  {
    id: "r5",
    category: "感情",
    question: "我们有未来吗？",
    numbers: [8, 4, 6],
    summary: "缘分深厚，但需共同成长，耐心经营...",
    time: "05-16 20:41"
  }
];

export const resultKeywords = ["表达", "压力", "新开始"];

export const insightSections = [
  {
    title: "当下局势",
    body: "你当前处于表达与突破的能量中，有机会展示能力、争取资源，但也伴随较大压力与比较心。环境在变化，你已感受到新的可能正在出现。"
  },
  {
    title: "隐藏提醒",
    body: "压力容易让你焦虑决策，或因冲动而错过更好选择。注意职场人际与沟通方式，避免情绪化表达，以免好事多磨。"
  }
];

export const actionAdvice = [
  "先梳理目标与底线，明确你真正想要的方向。",
  "主动提升可迁移能力，拓展人脉与机会渠道。",
  "观察市场与岗位变化，择机而动，不急于决定。"
];

export const oneLineAnswer = "可以动，但不要乱动。先布局，再离开。";
