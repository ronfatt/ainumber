import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function PrimaryButton({
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#FFE6A8]/70 bg-[linear-gradient(180deg,#FFE9B4_0%,#F4C76E_48%,#B7792F_100%)] px-5 text-sm font-semibold text-[#120B21] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_10px_28px_rgba(245,210,138,0.2)] transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-60",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
