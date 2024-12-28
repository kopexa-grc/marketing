import { StatCard } from "./stat-card";

const stats = [
  { value: "50+", label: "Team Members" },
  { value: "15+", label: "Countries" },
  { value: "4.8", label: "Rating" },
  { value: "100%", label: "Remote" },
] as const;

export function StatsGrid() {
  const half = Math.ceil(stats.length / 2);
  const firstColumn = stats.slice(0, half);
  const secondColumn = stats.slice(half);

  return (
    <div className="grid grid-cols-2 gap-4 md:gap-6">
      <div className="space-y-4 md:space-y-6">
        {firstColumn.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
      <div className="space-y-4 md:space-y-6 mt-8">
        {secondColumn.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
    </div>
  );
}
