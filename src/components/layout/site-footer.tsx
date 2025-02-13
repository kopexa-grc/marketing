import { PrismicNextLink } from "@prismicio/next";
import type {
  FooterColumnSlice,
  LayoutDocument,
} from "../../../prismicio-types";
import { RichText } from "../prismic/rich-text";
import { ArrowRight } from "lucide-react";
import { Separator } from "../ui/separator";
import { match } from "ts-pattern";
import { Logo } from "../ui/logo";
import { tv } from "tailwind-variants";

const footerSlotRecipe = tv({
  slots: {
    root: "py-16 2xl:py-20 print:hidden",
    columnContainer:
      "container flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-12 grid-rows-2 lg:grid-rows-1 mb-12",
    column: "col-span-1",
    group: "space-y-8 group mt-12 first:mt-0",
    link: [
      "focus:outline-none focus:ring-2 ring-offset-2 rounded-sm group gap-1 flex items-center",
    ],
    legalContainer: [
      "pt-8 border-t container",
      "flex flex-col lg:flex-row items-center justify-between",
      "gap-8",
    ],
    leftLeft: "flex flex-wrap justify-center gap-4",
    copyright: "lg:text-right text-sm",
    legalDivider: "mx-2 h-4 bg-border",
    legalLink: "text-sm flex items-center gap-1 group",
    legalLinkIcon:
      "h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity",
  },
  variants: {
    variant: {
      default: {
        root: "bg-background text-foreground",
        link: "text-foreground opacity-75 hover:opacity-100 transition-opacity",
        copyright: "text-foreground/80",
        legalLink:
          "text-foreground/80 transition-opacity hover:text-foreground",
        legalLinkIcon: "",
      },
      brand: {
        root: "bg-primary-950 text-primary-50",
        link: "text-primary-50/80 hover:text-primary-50",
        copyright: "text-primary-50/80",
        legalLink:
          "text-primary-50/80 transition-opacity hover:text-primary-50",
      },
    },
  },
  defaultVariants: {
    variant: "brand",
  },
});

export type SiteFooterProps = {
  layout: LayoutDocument;
};

export const SiteFooter = (props: SiteFooterProps) => {
  const { layout } = props;

  // group layout.data.slices1 by layout.data.slices1[0].column (1, 2, 3, 4)

  const groupedSlices = layout.data.slices1.reduce(
    (result, item) => {
      const group = item.primary.column;
      if (!result[group]) {
        result[group] = [];
      }
      result[group].push(item);
      return result;
    },
    {} as Record<string, FooterColumnSlice[]>
  ); // groupBy(layout.data.slices1, (slice) => slice.primary.column);

  const recipe = footerSlotRecipe();

  return (
    <footer className={recipe.root()} data-theme="dark">
      <div className={recipe.columnContainer()}>
        {["1", "2", "3", "4"].map((column) => (
          <div key={column} className={recipe.column()}>
            {groupedSlices[column]?.map((slice) =>
              match(slice)
                .with({ variation: "default" }, (slice) => (
                  <div key={slice.id} className={recipe.group()}>
                    <RichText field={slice.primary.heading} />
                    <ul className="gap-2 flex flex-col">
                      {slice.primary.links.map((link) => (
                        <PrismicNextLink
                          key={link.key}
                          field={link}
                          className={recipe.link()}
                        />
                      ))}
                    </ul>
                  </div>
                ))
                .with({ variation: "brand" }, (slice) => (
                  <div key={slice.id} className={recipe.group()}>
                    <Logo />
                  </div>
                ))
                .otherwise(() => null)
            )}
          </div>
        ))}
      </div>
      <div className={recipe.legalContainer()}>
        <div className={recipe.leftLeft()}>
          {layout.data.links.map((link, index) => (
            <div key={link.key} className="flex items-center">
              <PrismicNextLink field={link} className={recipe.legalLink()}>
                <span>{link.text}</span>
                <ArrowRight className={recipe.legalLinkIcon()} />
              </PrismicNextLink>
              {index < (layout.data.links?.length ?? 0) - 1 && (
                <Separator
                  orientation="vertical"
                  className={recipe.legalDivider()}
                />
              )}
            </div>
          ))}
        </div>
        <p className={recipe.copyright()}>
          {`© ${new Date().getFullYear()} Kopexa -  All rights reserved.`}
        </p>
      </div>
    </footer>
  );
};
