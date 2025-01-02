import { RichText } from "@/components/cms/rich-text";
import { cn } from "@/lib/utils";
import type { ContentBlock as ContentProps } from "@/payload-types";
import { tv } from "tailwind-variants";

const variants = tv({
  slots: {
    root: "layout pt-xhuge",
    column: "flex flex-col gap-6",
  },
  variants: {
    layout: {
      oneColumn: {
        column: "col-span-4 lg:col-span-12",
      },
      twoColumns: {
        column: "col-span-4 lg:col-span-6",
      },
      threeColumns: {
        column: "col-span-4",
      },
    },
  },
  defaultVariants: {
    layout: "oneColumn",
  },
});

type Props = ContentProps;

export const ContentBlock = ({
  columnOne,
  columnTwo,
  columnThree,
  layout,
}: Props) => {
  const css = variants({ layout: layout ?? "oneColumn" });

  return (
    <section className={cn(css.root())} aria-label="Content Block">
      {/* Column One */}
      <article className={cn(css.column(), "lg:col-start-1")}>
        <RichText content={columnOne} />
      </article>

      {/* Column Two */}
      {layout !== "oneColumn" && columnTwo && (
        <article className={cn(css.column(), "lg:col-start-7")}>
          <RichText content={columnTwo} />
        </article>
      )}

      {/* Column Three */}
      {layout === "threeColumns" && columnThree && (
        <article className={cn(css.column(), "lg:col-start-9")}>
          <RichText content={columnThree} />
        </article>
      )}
    </section>
  );
};
