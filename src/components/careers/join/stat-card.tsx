interface StatCardProps {
  value: string;
  label: string;
}

export function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="bg-primary-foreground/5 p-4 md:p-6 rounded-lg backdrop-blur-sm">
      <div className="text-2xl md:text-3xl font-bold mb-1">{value}</div>
      <div className="text-sm text-primary-foreground/80">{label}</div>
    </div>
  );
}
