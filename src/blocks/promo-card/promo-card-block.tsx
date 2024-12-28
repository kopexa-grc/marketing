import { CMSLink } from "@/components/cms/cms-link";
import { Icon, type IconName } from "@/components/ui/icon";
import { PromoCard } from "@/components/ui/promo-card";
import { Heading, Paragraph } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import type { PromoCardBlock as PromoCardProps } from "@/payload-types";

type Props = PromoCardProps;

export const PromoCardBlock = ({
  heading,
  description,
  dark,
  link,
  icon,
}: Props) => {
  return (
    <div className={cn("layout", dark && "dark")}>
      <div className="col-span-full">
        <PromoCard.Root>
          {icon && (
            <PromoCard.Image className="size-20">
              <Icon className="h-full w-full" name={icon as IconName} />
            </PromoCard.Image>
          )}
          <PromoCard.Content>
            <PromoCard.Text>
              <Heading level={3} as="p" className="mb-3">
                {heading}
              </Heading>
              {description && (
                <Paragraph>
                  Enable teams (human + AI) to intelligently automate the
                  assessment process to focus on your daily business.
                </Paragraph>
              )}
            </PromoCard.Text>
            {link && <CMSLink {...link} size="xl" />}
          </PromoCard.Content>
        </PromoCard.Root>
      </div>
    </div>
  );
};
