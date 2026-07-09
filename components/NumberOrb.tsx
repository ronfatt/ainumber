import { cn } from "@/lib/utils";

type NumberOrbProps = {
  value: number;
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function NumberOrb({ value, size = "md", className }: NumberOrbProps) {
  return (
    <div
      className={cn(
        "animate-breathe grid place-items-center rounded-full border border-gold/60 bg-[radial-gradient(circle_at_45%_42%,rgba(255,237,183,0.95)_0%,rgba(245,210,138,0.82)_10%,rgba(139,92,246,0.45)_43%,rgba(9,13,34,0.92)_72%)] font-serif font-semibold text-gold shadow-[0_0_24px_rgba(245,210,138,0.32),inset_0_0_24px_rgba(245,210,138,0.16)] ring-1 ring-white/10",
        size === "lg" && "h-28 w-28 text-6xl",
        size === "md" && "h-[72px] w-[72px] text-4xl",
        size === "sm" && "h-12 w-12 text-2xl",
        className
      )}
    >
      {value}
    </div>
  );
}
