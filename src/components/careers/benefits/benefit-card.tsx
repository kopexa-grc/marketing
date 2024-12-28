import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface BenefitCardProps {
  icon: LucideIcon;
  title: string;
  items: string[];
}

export function BenefitCard({ icon: Icon, title, items }: BenefitCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-3">{title}</h3>
          <ul className="space-y-2">
            {items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <Check className="h-4 w-4 text-primary mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}
