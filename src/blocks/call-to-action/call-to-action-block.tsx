import { CMSLink } from "@/components/cms/cms-link";
import { RichText } from "@/components/cms/rich-text";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Heading, Paragraph } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import type { CallToActionBlock as CTABlockProps } from "@/payload-types";
import { tv } from "tailwind-variants";

const styles = tv({
  slots: {
    root: "bg-accent lg:bg-transparent text-accent-foreground lg:pb-24",
    wrapper: [
      "bg-accent px-5 py-16 layout space-y-8",
      "lg:rounded-2xl lg:py-16 lg:px-16",
    ],
    title: ["col-span-full text-center flex flex-col items-center"],
  },
});

type Props = CTABlockProps;

export const CallToActionBlock = ({ title, description, links, id }: Props) => {
  const css = styles();

  return (
    <div className={css.root()}>
      <div className={css.wrapper()}>
        <div className={css.title()}>
          <div className="max-w-lg space-y-4">
            <Heading as="h2" level={2}>
              {title}
            </Heading>
            {description && <RichText content={description} />}
          </div>
        </div>
        {(links || []).map(({ link }, i) => (
          <div
            key={`${id}-${link.url}-${i}`}
            className="col-span-full lg:col-span-6"
          >
            <Card className="border-transparent hover:border-primary relative group">
              <CardHeader className="pb-6 lg:pb-8">
                <CardTitle>
                  <CMSLink
                    appearance="none"
                    className={cn(
                      "before:top-0 before:left-0 before:w-full before:h-full before:absolute before:block"
                    )}
                    {...link}
                  />
                </CardTitle>
              </CardHeader>
              <CardContent>
                {
                  // @ts-expect-error intented
                  link.description && <Paragraph>{link.description}</Paragraph>
                }
                <div className="flex items-center justify-end">
                  <div className="rounded-full size-8 bg-black group-hover:bg-primary text-primary-foreground grid place-content-center transition-colors duration-300">
                    <Icon className="size-4" name="ArrowRight" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
