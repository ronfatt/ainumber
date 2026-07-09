import { Settings, Sparkles } from "lucide-react";

type HeaderProps = {
  title?: string;
  subtitle?: string;
  showSettings?: boolean;
};

export function Header({ title = "数问 AI", subtitle, showSettings = true }: HeaderProps) {
  return (
    <header className="flex items-start justify-between gap-4">
      <div>
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-full border border-gold/40 bg-gold/10 shadow-[0_0_18px_rgba(245,210,138,0.18)]">
            <Sparkles className="h-4 w-4 text-gold" />
          </span>
          <p className="text-lg font-semibold tracking-normal text-ivory">{title}</p>
        </div>
        {subtitle ? <p className="ml-10 mt-0.5 text-[11px] text-mist">{subtitle}</p> : null}
      </div>
      {showSettings ? (
        <button
          aria-label="设置"
          className="grid h-8 w-8 place-items-center rounded-full border border-gold/20 bg-[#101735] text-gold transition active:scale-95"
        >
          <Settings className="h-4 w-4" />
        </button>
      ) : null}
    </header>
  );
}
