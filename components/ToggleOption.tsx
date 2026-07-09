import { cn } from "@/lib/utils";

type ToggleOptionProps = {
  title: string;
  desc: string;
  checked: boolean;
  onChange: () => void;
};

export function ToggleOption({ title, desc, checked, onChange }: ToggleOptionProps) {
  return (
    <button
      className="flex w-full items-center justify-between gap-3 rounded-[20px] border border-white/10 bg-white/[0.04] p-3 text-left transition active:scale-[0.99]"
      onClick={onChange}
    >
      <span>
        <span className="block text-sm font-medium text-ivory">{title}</span>
        <span className="mt-0.5 block text-xs text-mist">{desc}</span>
      </span>
      <span
        className={cn(
          "relative h-7 w-12 rounded-full border transition",
          checked ? "border-gold/60 bg-gold/25" : "border-white/10 bg-white/10"
        )}
      >
        <span
          className={cn(
            "absolute top-1 h-5 w-5 rounded-full bg-ivory transition",
            checked ? "left-6 shadow-[0_0_12px_rgba(245,210,138,0.6)]" : "left-1"
          )}
        />
      </span>
    </button>
  );
}
