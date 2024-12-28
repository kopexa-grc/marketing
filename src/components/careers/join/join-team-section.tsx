import { JoinCTA } from "./join-cta";
import { StatsGrid } from "./stats-grid";

export function JoinTeamSection() {
  return (
    <section className="w-full">
      <div className="layout rounded-2xl bg-primary text-primary-foreground px-6 lg:px-12 py-16">
        <div className="col-span-full">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <JoinCTA />
            <StatsGrid />
          </div>
        </div>
      </div>
    </section>
  );
}
