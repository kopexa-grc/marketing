interface StatsCardProps {
  value: string;
  label: string;
  description?: string;
}

export function StatsCard({ value, label, description }: StatsCardProps) {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-primary mb-2">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
      {description && (
        <div className="text-xs text-muted-foreground/80 mt-1">
          {description}
        </div>
      )}
    </div>
  );
}
