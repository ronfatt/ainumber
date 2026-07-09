export function CosmicBackground() {
  const stars = [
    ["12%", "9%", "0s"],
    ["82%", "12%", "0.7s"],
    ["68%", "25%", "1.4s"],
    ["18%", "36%", "0.4s"],
    ["88%", "48%", "1.1s"],
    ["28%", "64%", "1.8s"],
    ["76%", "78%", "0.9s"]
  ];

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(139,92,246,0.28),transparent_34%),radial-gradient(circle_at_20%_70%,rgba(96,165,250,0.13),transparent_30%)]" />
      <div className="absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full border border-gold/10 opacity-40" />
      <div className="absolute left-1/2 top-24 h-52 w-52 -translate-x-1/2 rotate-45 border border-aura/10 opacity-50" />
      <svg className="absolute left-0 top-0 h-full w-full opacity-30" viewBox="0 0 390 844">
        <path
          d="M45 126 L118 88 L205 144 L288 96 L340 175"
          stroke="rgba(245,210,138,0.32)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M38 520 L116 478 L202 544 L326 496"
          stroke="rgba(96,165,250,0.22)"
          strokeWidth="1"
          fill="none"
        />
      </svg>
      {stars.map(([left, top, delay]) => (
        <span
          key={`${left}-${top}`}
          className="star absolute h-1 w-1 rounded-full bg-gold shadow-[0_0_12px_rgba(245,210,138,0.8)]"
          style={{ left, top, animationDelay: delay }}
        />
      ))}
    </div>
  );
}
