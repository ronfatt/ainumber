import { GlassCard } from "./GlassCard";

type InsightCardProps = {
  title: string;
  children: React.ReactNode;
};

export function InsightCard({ title, children }: InsightCardProps) {
  return (
    <GlassCard>
      <h3 className="text-sm font-semibold text-gold">{title}</h3>
      <div className="mt-2 text-xs leading-6 text-[#DCD5EA]">{children}</div>
    </GlassCard>
  );
}
