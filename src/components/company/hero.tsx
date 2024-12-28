import { StatsCard } from "./stats-card";

export function CompanyHero() {
  return (
    <section className="">
      <div className="layout">
        <div className="col-span-full lg:col-span-8 lg:col-start-3 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            <StatsCard value="50+" label="Team Members" />
            <StatsCard value="15+" label="Countries" />
            <StatsCard value="4.8/5" label="Employee Rating" />
            <StatsCard value="100%" label="Remote Friendly" />
          </div>
        </div>
      </div>
    </section>
  );
}
