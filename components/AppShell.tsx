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
      <div className="relative mx-auto min-h-dvh w-full max-w-[430px] px-4 pb-24 pt-6">
        <div className="animate-fade-in mx-auto w-full max-w-[390px]">{children}</div>
      </div>
      <BottomNav active={active} onNavigate={onNavigate} />
    </main>
  );
}
