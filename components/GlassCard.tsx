import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function GlassCard({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "cosmic-card rounded-[14px] border border-gold/20 bg-[#0E1430]/88 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_12px_34px_rgba(0,0,0,0.26)] backdrop-blur-xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
