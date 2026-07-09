import { History, Home, MessageCircleQuestion, UserRound } from "lucide-react";
import type { ViewName } from "@/lib/types";
import { cn } from "@/lib/utils";

const navItems = [
  { key: "home" as const, label: "首页", icon: Home },
  { key: "ask" as const, label: "问事", icon: MessageCircleQuestion },
  { key: "history" as const, label: "记录", icon: History },
  { key: "profile" as const, label: "我的", icon: UserRound }
];

type BottomNavProps = {
  active: ViewName;
  onNavigate: (view: ViewName) => void;
};

export function BottomNav({ active, onNavigate }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 px-4 pb-3">
      <div className="grid grid-cols-4 rounded-[18px] border border-gold/15 bg-[#050A18]/95 p-1.5 shadow-[0_-10px_34px_rgba(0,0,0,0.42)] backdrop-blur-xl">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.key || (active === "result" && item.key === "ask");
          return (
            <button
              key={item.key}
              className={cn(
                "flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-[13px] text-[10px] transition active:scale-95",
                isActive
                  ? "bg-[radial-gradient(circle_at_50%_0%,rgba(232,121,249,0.28),rgba(245,210,138,0.1)_62%,transparent)] text-gold"
                  : "text-mist"
              )}
              onClick={() => onNavigate(item.key)}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
