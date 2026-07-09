import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type CategoryChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
};

export function CategoryChip({ active, className, children, ...props }: CategoryChipProps) {
  return (
    <button
      className={cn(
        "min-h-8 rounded-full border px-3 text-xs transition active:scale-95",
        active
          ? "border-gold/70 bg-gold/15 text-gold shadow-[0_0_16px_rgba(245,210,138,0.18)]"
          : "border-white/10 bg-[#121A3A]/80 text-mist",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
