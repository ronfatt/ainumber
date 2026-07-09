"use client";

import {
  ArrowLeft,
  CalendarCheck,
  ChevronRight,
  Coins,
  Crown,
  Flame,
  Gem,
  Gift,
  Heart,
  Search,
  Send,
  Share2,
  Sparkles,
  WalletCards,
  X
} from "lucide-react";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { CategoryChip } from "@/components/CategoryChip";
import { GlassCard } from "@/components/GlassCard";
import { Header } from "@/components/Header";
import { InsightCard } from "@/components/InsightCard";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { NumberCard } from "@/components/NumberCard";
import { NumberOrb } from "@/components/NumberOrb";
import { PrimaryButton } from "@/components/PrimaryButton";
import { RecordCard } from "@/components/RecordCard";
import { ResultCard } from "@/components/ResultCard";
import { ShareModal } from "@/components/ShareModal";
import { Toast } from "@/components/Toast";
import { ToggleOption } from "@/components/ToggleOption";
import { useLocalHistory } from "@/hooks/useLocalHistory";
import { useToast } from "@/hooks/useToast";
import { buildFallbackResult, categoryLabels, categoryValues, disclaimer, generateNumbers } from "@/lib/numerology";
import { playModes, todayReading } from "@/lib/mock-data";
import type { AskRequest, AskResult, Category, DrawMode, UserWallet, ViewName } from "@/types";
import { cn } from "@/lib/utils";

const CHECK_IN_POINTS = Number(process.env.NEXT_PUBLIC_POINTS_DAILY_CHECKIN ?? 6);
const SHARE_REWARD_POINTS = Number(process.env.NEXT_PUBLIC_POINTS_SHARE_REWARD ?? 3);
const REGISTER_GIFT_POINTS = Number(process.env.NEXT_PUBLIC_POINTS_REGISTER_GIFT ?? 30);

function getAskCost(mode: DrawMode, deepAi: boolean) {
  return (mode === "one" ? 3 : 6) + (deepAi ? 6 : 0);
}

export default function Page() {
  const [view, setView] = useState<ViewName>("home");
  const [wallet, setWallet] = useState<UserWallet>({
    points: REGISTER_GIFT_POINTS,
    checkedInToday: false,
    streak: 2,
    registerGift: REGISTER_GIFT_POINTS,
    todayEarned: REGISTER_GIFT_POINTS,
    todaySpent: 0
  });
  const { toast, showToast } = useToast();
  const {
    history,
    currentResult,
    setCurrentResult,
    addResult,
    saveResult,
    toggleSaved,
    markSharedRewarded
  } = useLocalHistory();

  function navigate(next: ViewName) {
    setView(next);
  }

  function handleCheckIn() {
    if (wallet.checkedInToday) return;
    const nextStreak = wallet.streak + 1;
    const bonus = nextStreak % 3 === 0 ? 3 : 0;
    const earned = CHECK_IN_POINTS + bonus;
    setWallet((current) => ({
      ...current,
      points: current.points + earned,
      checkedInToday: true,
      streak: nextStreak,
      todayEarned: current.todayEarned + earned
    }));
    showToast(`已领取 ${earned} 灵感点`);
  }

  function spendPoints(cost: number) {
    setWallet((current) => ({
      ...current,
      points: current.points - cost,
      todaySpent: current.todaySpent + cost
    }));
  }

  function mockRecharge() {
    setWallet((current) => ({
      ...current,
      points: current.points + 30,
      todayEarned: current.todayEarned + 30
    }));
    showToast("充值功能将在正式版开放，已模拟增加 30 点");
  }

  function handleShareReward(result: AskResult) {
    if (result.sharedRewarded) return;
    setWallet((current) => ({
      ...current,
      points: current.points + SHARE_REWARD_POINTS,
      todayEarned: current.todayEarned + SHARE_REWARD_POINTS
    }));
    markSharedRewarded(result);
    showToast(`分享成功，获得 ${SHARE_REWARD_POINTS} 灵感点`);
  }

  return (
    <AppShell active={view} onNavigate={navigate}>
      {view === "home" ? (
        <HomePage wallet={wallet} onAsk={() => navigate("ask")} onCheckIn={handleCheckIn} />
      ) : null}
      {view === "ask" ? (
        <AskPage
          wallet={wallet}
          onSpend={spendPoints}
          onRecharge={mockRecharge}
          onResult={(result) => {
            addResult(result);
            setView("result");
          }}
          showToast={showToast}
        />
      ) : null}
      {view === "result" ? (
        <ResultPage
          result={currentResult}
          onBack={() => navigate("ask")}
          onAgain={() => navigate("ask")}
          onGoAsk={() => navigate("ask")}
          onSave={(result) => {
            const next = result.isSaved ? toggleSaved(result) : saveResult(result);
            showToast(next.isSaved ? "已收藏" : "已取消收藏");
          }}
          onShareReward={handleShareReward}
          showToast={showToast}
        />
      ) : null}
      {view === "history" ? (
        <HistoryPage
          records={history}
          onOpen={(result) => {
            setCurrentResult(result);
            setView("result");
          }}
          onToggleSaved={(result) => {
            const next = toggleSaved(result);
            showToast(next.isSaved ? "已收藏" : "已取消收藏");
          }}
          onAsk={() => navigate("ask")}
        />
      ) : null}
      {view === "profile" ? (
        <ProfilePage wallet={wallet} onCheckIn={handleCheckIn} onRecharge={mockRecharge} showToast={showToast} />
      ) : null}
      <Toast toast={toast} />
    </AppShell>
  );
}

function HomePage({
  wallet,
  onAsk,
  onCheckIn
}: {
  wallet: UserWallet;
  onAsk: () => void;
  onCheckIn: () => void;
}) {
  const checkInReward = wallet.streak + 1 === 3 ? CHECK_IN_POINTS + 3 : CHECK_IN_POINTS;

  return (
    <div className="space-y-4">
      <Header subtitle="抽一个数字，看清一个问题" />
      <div className="grid grid-cols-[1fr_auto] gap-3">
        <div className="rounded-[14px] border border-gold/20 bg-[#0E1430]/80 px-4 py-3">
          <p className="text-xs text-mist">灵感点数</p>
          <p className="mt-1 flex items-center gap-1 text-xl font-semibold text-gold">
            <Coins className="h-4 w-4" />
            {wallet.points}
          </p>
        </div>
        <div className="rounded-[14px] border border-white/10 bg-[#0E1430]/80 px-4 py-3 text-right">
          <p className="text-xs text-mist">连续打卡</p>
          <p className="mt-1 flex items-center justify-end gap-1 text-xl font-semibold text-ivory">
            <Flame className="h-4 w-4 text-aura" />
            {wallet.streak} 天
          </p>
        </div>
      </div>

      <GlassCard>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-base font-semibold text-ivory">
              <CalendarCheck className="h-5 w-5 text-gold" />
              今日灵感打卡
            </p>
            <p className="mt-2 text-sm leading-6 text-mist">
              {wallet.checkedInToday ? "已领取今日点数，明天再来。" : `领取 +${checkInReward} 点，刚好开启一次今日问事`}
            </p>
          </div>
          <button
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition active:scale-95",
              wallet.checkedInToday ? "border border-white/10 bg-white/5 text-mist" : "bg-gold text-[#140F2F]"
            )}
            onClick={onCheckIn}
          >
            {wallet.checkedInToday ? "已领取" : "领取"}
          </button>
        </div>
      </GlassCard>

      <GlassCard className="overflow-hidden p-4">
        <div className="relative flex flex-col items-center text-center">
          <div className="absolute top-2 h-36 w-36 rounded-full border border-gold/20" />
          <div className="absolute top-7 h-24 w-24 rotate-45 border border-gold/10" />
          <NumberOrb value={7} size="lg" className="mt-2" />
          <PrimaryButton className="mt-6 w-[72%]" onClick={onAsk}>
            <Sparkles className="h-4 w-4" />
            开始抽数字
          </PrimaryButton>
          <p className="mt-3 max-w-[280px] text-sm leading-6 text-mist">
            输入你的疑问，随机抽 1 个或 3 个数字，AI 即时解答
          </p>
        </div>
      </GlassCard>

      <div className="grid grid-cols-3 gap-3">
        {(["love", "career", "wealth"] as Category[]).map((item) => (
          <button
            key={item}
            className="rounded-[13px] border border-white/10 bg-[#111936]/85 px-4 py-2.5 text-xs text-ivory transition active:scale-95"
            onClick={onAsk}
          >
            {categoryLabels[item]}
          </button>
        ))}
      </div>

      <GlassCard>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-ivory">今日数字签</h2>
          <span className="font-serif text-5xl font-semibold text-gold">{todayReading.number}</span>
        </div>
        <p className="mt-2 text-sm font-medium text-gold">{todayReading.keywords}</p>
        <p className="mt-3 text-sm leading-7 text-mist">{todayReading.text}</p>
        <button className="mt-4 flex items-center gap-1 text-sm text-gold" onClick={onAsk}>
          查看完整解读 <ChevronRight className="h-4 w-4" />
        </button>
      </GlassCard>

      <section>
        <h2 className="mb-3 text-base font-semibold text-ivory">热门玩法</h2>
        <div className="space-y-3">
          {playModes.map((mode) => (
            <GlassCard key={mode.title} className="flex items-center justify-between p-4" onClick={onAsk}>
              <div>
                <h3 className="text-sm font-semibold text-ivory">{mode.title}</h3>
                <p className="mt-1 text-xs text-mist">{mode.desc}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-gold" />
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
}

function AskPage({
  wallet,
  onSpend,
  onRecharge,
  onResult,
  showToast
}: {
  wallet: UserWallet;
  onSpend: (cost: number) => void;
  onRecharge: () => void;
  onResult: (result: AskResult) => void;
  showToast: (message: string) => void;
}) {
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState<Category>("career");
  const [drawMode, setDrawMode] = useState<DrawMode>("three");
  const [useMeihua, setUseMeihua] = useState(true);
  const [useDeepAI, setUseDeepAI] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const cost = getAskCost(drawMode, useDeepAI);
  const shortBy = Math.max(cost - wallet.points, 0);

  async function submit() {
    const trimmed = question.trim();
    if (trimmed.length < 3) {
      setError("请先输入更具体的问题。");
      return;
    }
    if (wallet.points < cost) {
      setError(`灵感点数不足，还差 ${shortBy} 点。明日打卡可继续，或先充值点数。`);
      return;
    }
    const request: AskRequest = {
      question: trimmed,
      category,
      drawMode,
      numbers: generateNumbers(drawMode),
      useMeihua,
      useDeepAI,
      locale: "zh-CN"
    };
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request)
      });
      if (!response.ok) throw new Error("request failed");
      const result = (await response.json()) as AskResult;
      onSpend(cost);
      onResult(result);
    } catch {
      const fallback = buildFallbackResult(request);
      onSpend(cost);
      onResult(fallback);
      showToast("暂时无法连接 AI，已为你生成基础解读。");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      {loading ? <LoadingOverlay /> : null}
      <Header title="数问 AI" subtitle="把问题说清楚，答案会更接近你" />
      <div>
        <h1 className="text-xl font-semibold text-ivory">问事</h1>
        <p className="mt-0.5 text-xs text-mist">选择分类，抽取数字，让答案慢慢浮现。</p>
      </div>
      <GlassCard className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs text-mist">当前灵感点数</p>
          <p className="mt-1 flex items-center gap-2 text-xl font-semibold text-gold">
            <Coins className="h-5 w-5" />
            {wallet.points}
          </p>
        </div>
        <div className="rounded-[12px] border border-gold/20 bg-gold/10 px-3 py-2 text-right">
          <p className="text-xs text-mist">本次消耗</p>
          <p className={cn("mt-1 text-lg font-semibold", wallet.points >= cost ? "text-gold" : "text-aura")}>{cost} 点</p>
        </div>
      </GlassCard>

      <GlassCard>
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-ivory" htmlFor="question">
            你的问题
          </label>
          <span className="text-xs text-mist">{question.length}/200</span>
        </div>
        <textarea
          id="question"
          maxLength={200}
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="例如：我该不该换工作？这段关系还值得继续吗？"
          className="mt-3 min-h-24 w-full resize-none rounded-[12px] border border-white/10 bg-[#080D22]/75 p-3 text-sm leading-6 text-ivory outline-none placeholder:text-mist/60 focus:border-gold/40"
        />
        {error ? <p className="mt-2 text-sm text-aura">{error}</p> : null}
      </GlassCard>

      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categoryValues.map((item) => (
          <CategoryChip key={item} active={category === item} onClick={() => setCategory(item)}>
            {categoryLabels[item]}
          </CategoryChip>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          ["one", "抽 1 个数字", "快速聚焦问题"],
          ["three", "抽 3 个数字", "多维解析指引"]
        ].map(([key, title, desc]) => (
          <button
            key={key}
            className={cn(
              "rounded-[13px] border p-3 text-left transition active:scale-95",
              drawMode === key ? "border-gold/60 bg-gold/15 text-ivory" : "border-white/10 bg-white/[0.04] text-mist"
            )}
            onClick={() => setDrawMode(key as DrawMode)}
          >
            <span className="block text-sm font-semibold">{title}</span>
            <span className="mt-1 block text-xs">{desc}</span>
          </button>
        ))}
      </div>

      <GlassCard>
        <p className="text-center text-sm font-medium text-gold">数字已准备就绪</p>
        <div className="mt-4 grid grid-cols-3 gap-3 px-2">
          {Array.from({ length: drawMode === "one" ? 1 : 3 }).map((_, index) => (
            <NumberCard key={index} className={drawMode === "one" ? "col-start-2" : ""} />
          ))}
        </div>
      </GlassCard>

      <div className="space-y-3">
        <ToggleOption title="结合梅花易数" desc="传统智慧辅助解读" checked={useMeihua} onChange={() => setUseMeihua((value) => !value)} />
        <ToggleOption title="AI 深度解读" desc="多角度智能分析" checked={useDeepAI} onChange={() => setUseDeepAI((value) => !value)} />
      </div>

      <PrimaryButton className="w-full" onClick={submit} disabled={loading}>
        <Send className="h-4 w-4" />
        {wallet.points >= cost ? `立即抽数字 · 消耗 ${cost} 点` : "点数不足，去充值"}
      </PrimaryButton>
      {wallet.points < cost ? (
        <GlassCard className="border-aura/30 bg-aura/10 p-4">
          <p className="text-sm font-semibold text-ivory">今天的数字能量快用完了</p>
          <p className="mt-1 text-xs leading-5 text-mist">还差 {shortBy} 点。明日登录可领 {CHECK_IN_POINTS} 点，也可以先模拟充值继续问事。</p>
          <button className="mt-3 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-[#140F2F] transition active:scale-95" onClick={onRecharge}>
            充值 30 点
          </button>
        </GlassCard>
      ) : null}
    </div>
  );
}

function ResultPage({
  result,
  onBack,
  onAgain,
  onGoAsk,
  onSave,
  onShareReward,
  showToast
}: {
  result: AskResult | null;
  onBack: () => void;
  onAgain: () => void;
  onGoAsk: () => void;
  onSave: (result: AskResult) => void;
  onShareReward: (result: AskResult) => void;
  showToast: (message: string) => void;
}) {
  const [shareOpen, setShareOpen] = useState(false);

  if (!result) {
    return (
      <div className="space-y-4">
        <Header title="解答结果" subtitle="还没有解答结果" />
        <GlassCard className="py-10 text-center">
          <p className="text-base font-semibold text-ivory">还没有解答结果</p>
          <p className="mt-2 text-sm text-mist">先问一个清楚的问题，数字才有方向。</p>
          <PrimaryButton className="mt-5" onClick={onGoAsk}>去问事</PrimaryButton>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between gap-3">
        <button aria-label="返回" className="grid h-9 w-9 place-items-center rounded-full border border-gold/20 bg-[#101735] text-gold" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="min-w-0 flex-1">
          <h1 className="text-lg font-semibold text-ivory">解答结果</h1>
          <p className="truncate text-xs text-mist">你的问题：{result.question}</p>
        </div>
        <button className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1.5 text-xs text-gold" onClick={() => onSave(result)}>
          {result.isSaved ? "已收藏" : "收藏"}
        </button>
      </header>

      <ResultCard result={result} />
      <div className="rounded-full border border-gold/20 bg-gold/10 px-4 py-3 text-sm text-gold">关键词：{result.keywords.join(" · ")}</div>
      <InsightCard title="当下局势">{result.currentSituation}</InsightCard>
      <InsightCard title="隐藏提醒">{result.hiddenReminder}</InsightCard>
      <InsightCard title="建议行动">
        <ul className="space-y-2">{result.actionSteps.map((item) => <li key={item}>- {item}</li>)}</ul>
      </InsightCard>
      {result.meihuaNote ? (
        <InsightCard title="梅花易数提示">
          <p>上卦：{result.meihuaNote.upperGua ?? "-"} · 下卦：{result.meihuaNote.lowerGua ?? "-"} · {result.meihuaNote.movingLine ?? ""}</p>
          <p className="mt-2">{result.meihuaNote.interpretation}</p>
        </InsightCard>
      ) : null}
      <InsightCard title="一句话答案"><p className="text-lg font-semibold leading-8 text-gold">{result.oneLineAnswer}</p></InsightCard>

      <div className="grid grid-cols-2 gap-3">
        <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-gold/30 bg-[#101735] text-sm text-gold transition active:scale-95" onClick={() => setShareOpen(true)}>
          <Share2 className="h-4 w-4" />
          分享结果
        </button>
        <PrimaryButton onClick={onAgain}>再次问事</PrimaryButton>
      </div>
      <p className="px-1 text-center text-[11px] leading-5 text-mist/80">{result.disclaimer}</p>
      {shareOpen ? (
        <ShareModal
          result={result}
          rewardAmount={SHARE_REWARD_POINTS}
          rewarded={Boolean(result.sharedRewarded)}
          onReward={() => onShareReward(result)}
          onCopied={() => showToast("已复制分享文案")}
          onClose={() => setShareOpen(false)}
        />
      ) : null}
    </div>
  );
}

function HistoryPage({
  records,
  onOpen,
  onToggleSaved,
  onAsk
}: {
  records: AskResult[];
  onOpen: (result: AskResult) => void;
  onToggleSaved: (result: AskResult) => void;
  onAsk: () => void;
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | Category | "saved">("all");
  const filtered = useMemo(() => {
    return records.filter((record) => {
      const matchesFilter = filter === "all" ? true : filter === "saved" ? record.isSaved : record.category === filter;
      const term = query.trim();
      const matchesQuery = !term || record.question.includes(term) || record.keywords.join("").includes(term) || record.oneLineAnswer.includes(term);
      return matchesFilter && matchesQuery;
    });
  }, [records, filter, query]);
  const topCategory = useMemo(() => {
    if (!records.length) return { label: "暂无", percent: 0 };
    const counts = records.reduce<Record<Category, number>>((acc, item) => ({ ...acc, [item.category]: (acc[item.category] ?? 0) + 1 }), {
      love: 0,
      career: 0,
      wealth: 0,
      relationship: 0,
      direction: 0
    });
    const top = categoryValues.reduce((best, item) => (counts[item] > counts[best] ? item : best), "love");
    return { label: categoryLabels[top], percent: Math.round((counts[top] / records.length) * 100) };
  }, [records]);

  return (
    <div className="space-y-4">
      <Header subtitle="回看你问过的问题与答案" />
      <div>
        <h1 className="text-xl font-semibold text-ivory">记录</h1>
        <p className="mt-0.5 text-xs text-mist">答案会变，回看时的你也会变。</p>
      </div>
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#101735] px-4 py-2.5">
        <Search className="h-4 w-4 text-gold" />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索问题或关键词" className="min-w-0 flex-1 bg-transparent text-sm text-ivory outline-none placeholder:text-mist/60" />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {(["all", "love", "career", "wealth", "saved"] as const).map((item) => (
          <CategoryChip key={item} active={filter === item} onClick={() => setFilter(item)}>
            {item === "all" ? "全部" : item === "saved" ? "收藏" : categoryLabels[item]}
          </CategoryChip>
        ))}
      </div>
      <div className="space-y-3">
        {filtered.map((record) => (
          <RecordCard key={record.id} record={record} onClick={() => onOpen(record)} onToggleSaved={() => onToggleSaved(record)} />
        ))}
        {!filtered.length ? (
          <GlassCard className="py-8 text-center">
            <p className="text-sm font-semibold text-ivory">还没有问事记录</p>
            <PrimaryButton className="mt-4" onClick={onAsk}>开始第一次问事</PrimaryButton>
          </GlassCard>
        ) : null}
      </div>
      <GlassCard>
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-ivory">本周回顾</h2>
            <p className="mt-2 text-sm text-mist">已问事 {records.length} 次</p>
            <p className="mt-1 text-sm text-mist">{topCategory.label}类占比最高 {topCategory.percent}%</p>
          </div>
          <div className="grid h-20 w-20 place-items-center rounded-full bg-[conic-gradient(#F5D28A_0_var(--p),#8B5CF6_var(--p)_100%)]" style={{ "--p": `${topCategory.percent}%` } as React.CSSProperties}>
            <div className="grid h-14 w-14 place-items-center rounded-full bg-[#101735] text-sm font-semibold text-gold">{topCategory.percent}%</div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

function ProfilePage({
  wallet,
  onCheckIn,
  onRecharge,
  showToast
}: {
  wallet: UserWallet;
  onCheckIn: () => void;
  onRecharge: () => void;
  showToast: (message: string) => void;
}) {
  const [modal, setModal] = useState<"member" | "disclaimer" | null>(null);
  const settings = ["我的收藏", "号码分析", "分享海报", "通知设置", "免责声明"];

  return (
    <div className="space-y-4">
      <Header title="我的" subtitle="你的数字灵感中心" />
      <GlassCard className="flex items-center gap-4">
        <div className="grid h-14 w-14 place-items-center rounded-full border border-gold/30 bg-[radial-gradient(circle,#F5D28A,#8B5CF6_55%,#18163A)] text-xl font-semibold text-ivory">R</div>
        <div>
          <h1 className="text-lg font-semibold text-ivory">Ronnie</h1>
          <p className="mt-1 text-sm text-mist">今日剩余免费次数 2 次</p>
        </div>
      </GlassCard>
      <GlassCard>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Gem className="h-6 w-6 text-gold" />
            <div>
              <p className="text-sm text-mist">灵感点数</p>
              <p className="font-serif text-3xl font-semibold text-gold">{wallet.points}</p>
            </div>
          </div>
          <div className="rounded-[12px] border border-white/10 bg-white/[0.04] px-3 py-2 text-right">
            <p className="text-xs text-mist">约可问事</p>
            <p className="mt-1 text-lg font-semibold text-gold">{Math.floor(wallet.points / 6)} 次</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <PrimaryButton className="min-h-11" onClick={onRecharge}>充值点数</PrimaryButton>
          <button className="min-h-11 rounded-full border border-gold/30 bg-gold/10 text-sm font-semibold text-gold transition active:scale-95" onClick={() => setModal("member")}>开通会员</button>
        </div>
      </GlassCard>
      <GlassCard>
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="flex items-center gap-2 text-base font-semibold text-ivory"><CalendarCheck className="h-5 w-5 text-gold" />每日打卡</h2>
            <p className="mt-2 text-sm text-mist">连续 {wallet.streak} 天 · 今日获得 {wallet.todayEarned} 点 · 已消耗 {wallet.todaySpent} 点</p>
          </div>
          <button className={cn("rounded-full px-4 py-2 text-sm font-semibold transition active:scale-95", wallet.checkedInToday ? "border border-white/10 bg-white/5 text-mist" : "bg-gold text-[#140F2F]")} onClick={onCheckIn}>
            {wallet.checkedInToday ? "已打卡" : `领 ${CHECK_IN_POINTS} 点`}
          </button>
        </div>
      </GlassCard>
      <GlassCard>
        <h2 className="flex items-center gap-2 text-base font-semibold text-ivory"><Crown className="h-5 w-5 text-gold" />会员权益</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-mist">
          {["每日更多问事次数", "深度 AI 解读", "号码分析", "专属报告下载"].map((item) => <div key={item} className="rounded-[12px] border border-white/10 bg-white/[0.04] p-3">{item}</div>)}
        </div>
      </GlassCard>
      <GlassCard className="space-y-1">
        {settings.map((item) => (
          <button key={item} className="flex min-h-11 w-full items-center justify-between rounded-[12px] px-2 text-left text-sm text-ivory transition active:bg-white/5" onClick={() => item === "免责声明" ? setModal("disclaimer") : showToast(`${item}将在正式版开放`)}>
            <span className="flex items-center gap-3"><Heart className="h-4 w-4 text-gold" />{item}</span>
            <ChevronRight className="h-4 w-4 text-mist" />
          </button>
        ))}
      </GlassCard>
      <GlassCard className="relative overflow-hidden">
        <WalletCards className="h-7 w-7 text-gold" />
        <h2 className="mt-3 text-lg font-semibold text-ivory">深度数字报告</h2>
        <p className="mt-1 text-sm text-mist">多维解读，洞察人生密码</p>
        <PrimaryButton className="mt-4 min-h-11 px-5" onClick={() => showToast("深度报告将在正式版开放")}>立即探索</PrimaryButton>
      </GlassCard>
      <p className="px-1 text-center text-[11px] leading-5 text-mist/80">{disclaimer}</p>
      {modal ? <InfoModal type={modal} onClose={() => setModal(null)} /> : null}
    </div>
  );
}

function InfoModal({ type, onClose }: { type: "member" | "disclaimer"; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-end bg-black/60 px-4 pb-6 backdrop-blur-sm">
      <GlassCard className="w-full max-w-[390px]">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ivory">{type === "member" ? "会员权益" : "免责声明"}</h2>
          <button aria-label="关闭" className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-[#101735] text-mist" onClick={onClose}><X className="h-4 w-4" /></button>
        </div>
        {type === "member" ? (
          <div className="mt-4 space-y-3 text-sm text-mist">
            {["每日更多问事次数", "深度 AI 解读", "号码分析", "专属报告下载"].map((item) => <p key={item}>- {item}</p>)}
          </div>
        ) : (
          <p className="mt-4 text-sm leading-7 text-mist">{disclaimer}</p>
        )}
        <PrimaryButton className="mt-5 w-full" onClick={onClose}>知道了</PrimaryButton>
      </GlassCard>
    </div>
  );
}
