import { z } from "zod";

export const CategorySchema = z.enum(["love", "career", "wealth", "relationship", "direction"]);
export const DrawModeSchema = z.enum(["one", "three"]);

export const AskRequestSchema = z.object({
  question: z.string().trim().min(3, "请先输入更具体的问题。").max(200),
  category: CategorySchema,
  drawMode: DrawModeSchema,
  numbers: z.array(z.number().int().min(1).max(9)).min(1).max(3),
  useMeihua: z.boolean(),
  useDeepAI: z.boolean(),
  locale: z.literal("zh-CN")
});

export const AskResultSchema = z.object({
  id: z.string(),
  question: z.string(),
  category: CategorySchema,
  drawMode: DrawModeSchema,
  numbers: z.array(z.number().int().min(1).max(9)).min(1).max(3),
  keywords: z.array(z.string()).length(3),
  summary: z.string(),
  currentSituation: z.string(),
  hiddenReminder: z.string(),
  actionSteps: z.array(z.string()).length(3),
  oneLineAnswer: z.string(),
  meihuaNote: z
    .object({
      upperGua: z.string().optional(),
      lowerGua: z.string().optional(),
      movingLine: z.string().optional(),
      interpretation: z.string().optional()
    })
    .optional(),
  disclaimer: z.string(),
  createdAt: z.string(),
  isSaved: z.boolean(),
  sharedRewarded: z.boolean().optional()
});

export const AIAskResultSchema = z.object({
  keywords: z.array(z.string()).length(3),
  summary: z.string(),
  currentSituation: z.string(),
  hiddenReminder: z.string(),
  actionSteps: z.array(z.string()).length(3),
  oneLineAnswer: z.string(),
  meihuaNote: z
    .object({
      upperGua: z.string().nullable(),
      lowerGua: z.string().nullable(),
      movingLine: z.string().nullable(),
      interpretation: z.string().nullable()
    })
    .nullable(),
  disclaimer: z.string()
});

export type AskRequestInput = z.infer<typeof AskRequestSchema>;
