import { Star } from "lucide-react";
import type { AskResult } from "@/types";
import { categoryLabels } from "@/lib/numerology";
import { formatNumbers } from "@/lib/utils";
import { GlassCard } from "./GlassCard";

type RecordCardProps = {
  record: AskResult;
  onClick?: () => void;
  onToggleSaved?: () => void;
};

export function RecordCard({ record, onClick, onToggleSaved }: RecordCardProps) {
  return (
    <GlassCard className="p-3" onClick={onClick}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-gold/20 bg-gold/10 px-2.5 py-0.5 text-[10px] text-gold">
              {categoryLabels[record.category]}
            </span>
            <span className="text-[10px] text-mist">
              {new Date(record.createdAt).toLocaleString("zh-CN", {
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit"
              })}
            </span>
          </div>
          <h3 className="mt-2 text-sm font-semibold text-ivory">{record.question}</h3>
        </div>
        <button
          aria-label="收藏"
          onClick={(event) => {
            event.stopPropagation();
            onToggleSaved?.();
          }}
        >
          <Star className={record.isSaved ? "h-4 w-4 fill-gold text-gold" : "h-4 w-4 text-white/25"} />
        </button>
      </div>
      <p className="mt-2 font-serif text-xl font-semibold text-gold">{formatNumbers(record.numbers)}</p>
      <p className="mt-1 text-xs leading-5 text-mist">{record.oneLineAnswer}</p>
    </GlassCard>
  );
}
