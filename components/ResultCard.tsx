import type { AskResult } from "@/types";
import { categoryLabels } from "@/lib/numerology";
import { formatNumbers } from "@/lib/utils";
import { GlassCard } from "./GlassCard";
import { NumberOrb } from "./NumberOrb";

export function ResultCard({ result }: { result: AskResult }) {
  return (
    <GlassCard className="text-center">
      <p className="text-xs text-mist">本次抽出的数字 · {categoryLabels[result.category]}</p>
      <p className="mt-2 font-serif text-3xl font-semibold text-gold">{formatNumbers(result.numbers)}</p>
      <div className="mt-5 flex justify-center gap-4">
        {result.numbers.map((number, index) => (
          <NumberOrb key={`${number}-${index}`} value={number} size="sm" />
        ))}
      </div>
      <p className="mt-4 text-sm leading-6 text-ivory">{result.summary}</p>
    </GlassCard>
  );
}
