import { BenefitCard } from "./benefit-card";
import { benefitsData } from "./benefits-data";

export function BenefitsGrid() {
  return (
    <div className="col-span-full grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {benefitsData.map((benefit) => (
        <BenefitCard
          key={benefit.title}
          icon={benefit.icon}
          title={benefit.title}
          items={benefit.items}
        />
      ))}
    </div>
  );
}
