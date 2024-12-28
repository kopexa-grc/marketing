import { Media } from "@/components/cms/media";
import { RichText } from "@/components/cms/rich-text";
import { Heading } from "@/components/ui/typography";
import type { TextWithImageBlock as TextWithImageBlockProps } from "@/payload-types";

type Props = TextWithImageBlockProps;

export const TextWithImageBlock = ({ title, description, media }: Props) => {
  return (
    <div className="layout">
      <div className="order-2 lg:order-1 col-span-full lg:col-span-6">
        <div className="flex flex-col space-y-4">
          {title && (
            <Heading as="h3" level={2}>
              {title}
            </Heading>
          )}
          {description && <RichText content={description} />}
        </div>
      </div>
      <div className="order-1 lg:order-1 col-span-full lg:col-start-8 lg:col-span-5">
        <div className="relative w-full">
          {media && typeof media === "object" && (
            <Media
              fill
              className="relative w-full h-full aspect-square"
              imgClassName="w-full h-auto max-w-full rounded-2xl"
              priority
              resource={media}
            />
          )}
        </div>
      </div>
    </div>
  );
};
