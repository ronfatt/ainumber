import { Sparkle } from "lucide-react";
import { cn } from "@/lib/utils";

type NumberCardProps = {
  revealed?: boolean;
  value?: number;
  className?: string;
};

export function NumberCard({ revealed, value, className }: NumberCardProps) {
  return (
    <div
      className={cn(
        "animate-floaty grid aspect-[3/4] min-h-24 place-items-center rounded-[10px] border border-gold/35 bg-[radial-gradient(circle_at_50%_38%,rgba(245,210,138,0.2),transparent_26%),linear-gradient(145deg,rgba(245,210,138,0.12),rgba(72,42,132,0.24)_45%,rgba(7,10,31,0.92))] shadow-[0_10px_24px_rgba(0,0,0,0.28),0_0_18px_rgba(245,210,138,0.12)]",
        className
      )}
    >
      {revealed && value ? (
        <span className="text-4xl font-semibold text-gold">{value}</span>
      ) : (
        <div className="grid h-10 w-10 place-items-center rounded-full border border-gold/35 bg-[#0B102A]/70">
          <Sparkle className="h-5 w-5 text-gold" />
        </div>
      )}
    </div>
  );
}
