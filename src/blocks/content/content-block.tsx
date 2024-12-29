import { RichText } from "@/components/cms/rich-text";
import { cn } from "@/lib/utils";
import type { ContentBlock as ContentProps } from "@/payload-types";
import { tv } from "tailwind-variants";

const variants = tv({
  slots: {
    root: "layout",
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
    <div className={cn(css.root())}>
      {/* Column One */}
      <div className={cn(css.column(), "lg:col-start-1")}>
        <RichText content={columnOne} />
      </div>

      {/* Column Two */}
      {layout !== "oneColumn" && columnTwo && (
        <div className={cn(css.column(), "lg:col-start-7")}>
          <RichText content={columnTwo} />
        </div>
      )}

      {/* Column Three */}
      {layout === "threeColumns" && columnThree && (
        <div className={cn(css.column(), "lg:col-start-9")}>
          <RichText content={columnThree} />
        </div>
      )}
    </div>
  );
};
