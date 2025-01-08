import { RichText } from "@/components/cms/rich-text";
import { Heading, Paragraph } from "@/components/ui/typography";
import { HeadingVariants } from "@/components/ui/typography/heading";
import type { ContentGridBlock as ContentGridBlockProps } from "@/payload-types";

type Props = ContentGridBlockProps;

export const ContentGridBlock = ({
  content,
  cells,
  heading,
  headingLevel,
  headingTag,
}: Props) => {
  return (
    <div className="layout pt-xhuge">
      <div className="col-span-full lg:col-span-4 space-y-4">
        <Heading
          as={headingTag}
          level={
            (headingLevel
              ? (Number.parseInt(headingLevel) ?? 3)
              : 3) as HeadingVariants["level"]
          }
        >
          {heading}
        </Heading>
        {content && <RichText size="lg" content={content} />}
      </div>
      <div className="col-span-full lg:col-span-8">
        <div className="layout">
          {cells?.map((cell) => (
            <div
              key={`${cell.id}`}
              className="col-span-full lg:col-span-6 w-full @container space-y-2"
            >
              {cell.heading && (
                <Heading as="h4" level={5}>
                  {cell.heading}
                </Heading>
              )}
              {cell.description && <Paragraph>{cell.description}</Paragraph>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
