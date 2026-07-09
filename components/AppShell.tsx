import { CosmicBackground } from "./CosmicBackground";
import { BottomNav } from "./BottomNav";
import type { ViewName } from "@/lib/types";

type AppShellProps = {
  active: ViewName;
  onNavigate: (view: ViewName) => void;
  children: React.ReactNode;
};

export function AppShell({ active, onNavigate, children }: AppShellProps) {
  return (
    <main className="relative min-h-dvh overflow-hidden">
      <CosmicBackground />
      <div className="relative mx-auto min-h-dvh w-full max-w-[430px] px-4 pb-24 pt-3">
        <div className="mx-auto mb-3 flex h-7 w-full max-w-[390px] items-center justify-between px-3 text-[11px] font-semibold text-ivory/90">
          <span>9:41</span>
          <span className="h-5 w-20 rounded-full bg-black/70 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]" />
          <span className="text-[10px]">5G ▰</span>
        </div>
        <div className="animate-fade-in mx-auto w-full max-w-[390px]">{children}</div>
      </div>
      <BottomNav active={active} onNavigate={onNavigate} />
    </main>
  );
}
