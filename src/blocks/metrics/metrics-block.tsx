import { Heading } from "@/components/ui/typography";
import { headingVariants } from "@/components/ui/typography/heading";
import { cn } from "@/lib/utils";
import type { MetricsBlock as MetricsProps } from "@/payload-types";

type Props = MetricsProps;

export const MetricsBlock = ({ title, metrics }: Props) => {
  return (
    <div className="layout pt-xhuge">
      <div className="col-span-full">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <Heading level={3}>{title}</Heading>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {Array.isArray(metrics) &&
              metrics.map((metric) => (
                <div
                  key={`${metric.id}`}
                  className="flex flex-col bg-primary/5 p-8 space-y-2"
                >
                  <dt className="text-lg/6 text-accent-foreground">
                    {metric.label}
                  </dt>
                  <dd
                    className={cn(
                      headingVariants({ level: 4 }),
                      "order-first text-foreground"
                    )}
                  >
                    {metric.value}
                  </dd>
                </div>
              ))}
          </dl>
        </div>
      </div>
    </div>
  );
};
