import { NextResponse } from "next/server";
import { zodTextFormat } from "openai/helpers/zod";
import { AIAskResultSchema, AskRequestSchema, AskResultSchema } from "@/lib/resultSchema";
import { buildFallbackResult, categoryLabels, getNumberMeaning, mapToBagua } from "@/lib/numerology";
import { getOpenAIClient } from "@/lib/openai";

const systemPrompt = `你是「数问 AI」的数字象征解读引擎。你的任务是根据用户的问题、分类、抽到的数字、数字含义、简化易数/梅花易数提示，生成一个清晰、克制、有洞察力的中文解读。

重要原则：
1. 这是数字象征与自我反思工具，不是绝对预测。
2. 不要声称一定会发生。
3. 不要做医疗、法律、投资、赌博、重大人生决定的确定性建议。
4. 对财务/投资/健康/法律类问题必须提醒用户寻求专业意见。
5. 语气要像一个冷静、有经验、会讲人话的顾问。
6. 不要太玄，不要恐吓，不要神神叨叨。
7. 要给用户清楚的方向、风险提醒和可执行行动。
8. 如果用户输入明显自伤内容，温和建议联系身边可信任的人或当地紧急援助。
9. 输出必须是 JSON，不要 markdown，不要多余解释。

输出字段必须包含：
keywords: 3 个关键词
summary: 1 句话总结
currentSituation: 当前局势，80-140字
hiddenReminder: 隐藏提醒，60-120字
actionSteps: 3 条行动建议，每条不超过 40 字
oneLineAnswer: 一句话答案，20-40字
meihuaNote: 如果 useMeihua=true，给出简化卦象说明；如果 false，可为空
disclaimer: 固定为「本系统提供数字象征与自我反思参考，不构成医疗、法律、投资或重大人生决策建议。」`;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "请求格式不正确。" }, { status: 400 });
  }

  const parsed = AskRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "请先输入更具体的问题。" }, { status: 400 });
  }

  const askRequest = parsed.data;
  const fallback = buildFallbackResult(askRequest);
  const client = getOpenAIClient();

  if (!client) {
    return NextResponse.json(fallback);
  }

  try {
    const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";
    const userPayload = {
      question: askRequest.question,
      categoryLabel: categoryLabels[askRequest.category],
      drawMode: askRequest.drawMode,
      numbers: askRequest.numbers,
      numberMeanings: askRequest.numbers.map((number) => ({
        number,
        meanings: getNumberMeaning(number)
      })),
      baguaMapping: askRequest.numbers.map((number) => ({
        number,
        gua: mapToBagua(number)
      })),
      useMeihua: askRequest.useMeihua,
      useDeepAI: askRequest.useDeepAI
    };

    const response = await client.responses.parse({
      model,
      text: {
        format: zodTextFormat(AIAskResultSchema, "ask_result")
      },
      input: [
        { role: "system", content: systemPrompt },
        { role: "user", content: JSON.stringify(userPayload) }
      ]
    });

    const candidate = response.output_parsed;
    if (!candidate) {
      console.error("OpenAI ask route returned no parsed output");
      return NextResponse.json(fallback);
    }

    const result = AskResultSchema.safeParse({
      ...candidate,
      meihuaNote: candidate.meihuaNote
        ? {
            upperGua: candidate.meihuaNote.upperGua ?? undefined,
            lowerGua: candidate.meihuaNote.lowerGua ?? undefined,
            movingLine: candidate.meihuaNote.movingLine ?? undefined,
            interpretation: candidate.meihuaNote.interpretation ?? undefined
          }
        : undefined,
      id: fallback.id,
      question: askRequest.question,
      category: askRequest.category,
      drawMode: askRequest.drawMode,
      numbers: askRequest.numbers,
      createdAt: fallback.createdAt,
      isSaved: false
    });

    if (!result.success) {
      return NextResponse.json(fallback);
    }

    return NextResponse.json(result.data);
  } catch (error) {
    console.error("OpenAI ask route failed", error);
    return NextResponse.json(fallback);
  }
}
