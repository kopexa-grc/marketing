import { tv } from "tailwind-variants";
import { Icon } from "../ui/icon";
import { PromoCard } from "../ui/promo-card";
import { Card, CardContent, CardHeader } from "../ui/card";

const styles = tv({
  slots: {
    cardWrapper: "col-span-full md:col-span-2 lg:col-span-4 h-full",
    card: ["hover:border-primary hover:cursor-pointer h-full"],
  },
});

export const ProblemStatement = () => {
  const css = styles();

  return (
    <section className="bg-background py-16 space-y-8 lg:space-y-12">
      {/* Headline Section */}
      <div className="layout text-center lg:text-left">
        <div className="mb-12 col-span-4 lg:col-span-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Compliance Without Complexity
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            Kopexa makes compliance processes simple, accessible, and effective.
            With AI-driven tools, we empower businesses to reduce costs, save
            time, and focus on what truly matters.
          </p>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="layout">
        {/* Card 1: Accessible Compliance */}
        <div className={css.cardWrapper()}>
          <Card className={css.card({})}>
            <CardHeader>
              <div className="p-2 bg-primary grid place-content-center size-12 rounded-lg text-primary-foreground">
                <Icon name="Brain" />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 pb-3">
                Accessible for Everyone
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                From small teams to large enterprises, our pricing and platform
                ensure compliance is affordable and achievable for all.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Card 2: AI-Driven Risk Assessment */}
        <div className={css.cardWrapper()}>
          <Card className={css.card()}>
            <CardHeader>
              <div className="p-2 bg-primary grid place-content-center size-12 rounded-lg text-primary-foreground">
                <Icon name="Brain" />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 pb-3">
                Smarter Risk Assessment
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Use AI to identify, evaluate, and prioritize risks faster,
                ensuring your business stays ahead in a complex regulatory
                environment.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Card 3: AI-Powered Budget Planning */}
        <div className={css.cardWrapper()}>
          <Card className={css.card()}>
            <CardHeader>
              <div className="p-2 bg-primary grid place-content-center size-12 rounded-lg text-primary-foreground">
                <Icon name="Brain" />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 pb-3">
                Optimized Budget Planning
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Leverage AI insights to allocate your compliance budgets
                efficiently, saving resources while maximizing impact.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="layout">
        <div className="col-span-full">
          {/** Promo card */}
          <PromoCard.Root>
            <PromoCard.Content>
              <PromoCard.Text>
                <p className="text-2xl font-semibold mb-3">
                  Endless possibilities with Kopexa. Get started today.
                </p>
                <p>
                  Enable teams (human + AI) to intelligently automate the
                  assessment process to focus on your daily business.
                </p>
              </PromoCard.Text>
              {/* <PromoCard.Link href="/product">Get Started</PromoCard.Link> */}
            </PromoCard.Content>
          </PromoCard.Root>
        </div>
      </div>
    </section>
  );
};
