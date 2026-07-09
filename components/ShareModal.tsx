"use client";

import { Check, Copy, X } from "lucide-react";
import { useState } from "react";
import type { AskResult } from "@/types";
import { formatNumbers } from "@/lib/utils";
import { GlassCard } from "./GlassCard";
import { PrimaryButton } from "./PrimaryButton";

type ShareModalProps = {
  result: AskResult;
  rewardAmount: number;
  rewarded: boolean;
  onReward: () => void;
  onCopied?: () => void;
  onClose: () => void;
};

export function ShareModal({
  result,
  rewardAmount,
  rewarded,
  onReward,
  onCopied,
  onClose
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const text = `数问 AI\n问题：${result.question}\n数字：${formatNumbers(result.numbers)}\n关键词：${result.keywords.join(" · ")}\n${result.oneLineAnswer}\n抽一个数字，看清一个问题`;

  async function copyText() {
    await navigator.clipboard.writeText(text);
    if (!rewarded) {
      onReward();
    }
    onCopied?.();
    setCopied(true);
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-end bg-black/60 px-4 pb-6 backdrop-blur-sm">
      <GlassCard className="w-full max-w-[390px] animate-fade-in">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ivory">分享结果</h2>
          <button
            aria-label="关闭"
            className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-[#101735] text-mist"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-4 rounded-[12px] border border-gold/20 bg-[#080D22]/80 p-4">
          <p className="text-xs text-mist">我的问题</p>
          <p className="mt-1 text-sm font-medium text-ivory">{result.question}</p>
          <p className="mt-4 text-xs text-mist">抽出数字</p>
          <p className="mt-1 font-serif text-3xl font-semibold text-gold">{formatNumbers(result.numbers)}</p>
          <p className="mt-4 text-xs text-mist">关键词</p>
          <p className="mt-1 text-sm text-ivory">{result.keywords.join(" · ")}</p>
          <p className="mt-4 text-sm font-semibold text-gold">{result.oneLineAnswer}</p>
          <p className="mt-4 text-xs text-mist">抽一个数字，看清一个问题</p>
        </div>
        <div className="mt-4 rounded-[12px] border border-gold/20 bg-gold/10 px-4 py-3">
          <p className="text-sm font-semibold text-gold">
            {rewarded || copied ? "分享奖励已领取" : `复制成功奖励 +${rewardAmount} 灵感点`}
          </p>
          <p className="mt-1 text-xs text-mist">鼓励分享洞察，不强制发布到任何平台。</p>
        </div>
        <PrimaryButton className="mt-5 w-full" onClick={copyText}>
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "已复制" : "复制分享文案"}
        </PrimaryButton>
      </GlassCard>
    </div>
  );
}
