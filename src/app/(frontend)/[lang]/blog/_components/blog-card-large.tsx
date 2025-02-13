import { asText, isFilled } from "@prismicio/client";
import type { BlogDocument } from "../../../../../../prismicio-types";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { BlogCategoryLink } from "./blog-category-link";
import { dateFormatter } from "@/data/date-formatter";
import { headingRecipe } from "@/components/recipes/heading-recipe";
import { AuthorBadge } from "./author-badge";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";

const blogCardSlotRecipe = tv({
  slots: {
    root: "overflow-hidden flex w-full grow h-full relative border-2 rounded-xl flex-col bg-card text-card-foreground hover:border-primary-950 transition-colors",
    imageContainer: "",
    imageWrapper: "aspect-[258/145] overflow-hidden relative",
    image: "object-cover w-full h-full",
    contentContainer: "flex h-full gap-4 flex-col",
    metaContainer: "flex justify-between items-center gap-4",
    headingContainer: "flex flex-col gap-4 flex-grow",
    heading: headingRecipe.base,
    footer: "flex items-center",
  },
  variants: {
    variant: {
      large: {
        root: "",
        contentContainer: "p-8",
        heading: headingRecipe.variants.level.h2,
      },
      list: {
        root: "sm:flex-row py-6 px-8",
        imageContainer: "shrink-0 sm:w-[160px] xl:w-[260px]",
        imageWrapper: "rounded-md",
        contentContainer: "justify-between w-full mt-6 sm:mt-0 sm:ml-12",
        headingContainer: "max-w-md",
        heading: headingRecipe.variants.level.h3,
      },
      card: {
        contentContainer: "p-8",
        heading: headingRecipe.variants.level.h3,
      },
    },
  },
  defaultVariants: {
    variant: "large",
  },
});

type BlogCardSlotRecipe = VariantProps<typeof blogCardSlotRecipe>;

export type BlogCardLargeProps = {
  authorUid?: string;
  post: BlogDocument<string>;
  lang?: string;
} & BlogCardSlotRecipe;

export const BlogCardLarge = ({
  authorUid,
  post,
  lang,
  variant,
}: BlogCardLargeProps) => {
  const author = authorUid
    ? authorUid
    : isFilled.contentRelationship(post.data.author)
      ? post.data.author.uid
      : undefined;

  const recipe = blogCardSlotRecipe({ variant });

  return (
    <article key={post.id} className={cn(recipe.root())}>
      {isFilled.image(post.data.image) && (
        <div className={recipe.imageContainer()}>
          <div className={recipe.imageWrapper()}>
            <PrismicNextImage
              field={post.data.image}
              className={recipe.image()}
            />
          </div>
        </div>
      )}
      <div className={recipe.contentContainer()}>
        <div className={recipe.metaContainer()}>
          {isFilled.contentRelationship(post.data.category) && (
            <BlogCategoryLink uid={post.data.category.uid} />
          )}
          {isFilled.date(post.data.date) && (
            <span className="shrink-0 text-muted-foreground">
              {dateFormatter.format(new Date(post.data.date))}
            </span>
          )}
        </div>
        <div className={recipe.headingContainer()}>
          <PrismicNextLink
            href={post.url || ""}
            className="after:absolute after:inset-0"
          >
            <h2 className={recipe.heading()}>{asText(post.data.title)}</h2>
          </PrismicNextLink>
        </div>
        <footer className={recipe.footer()}>
          {author && <AuthorBadge uid={author} lang={lang} />}
        </footer>
      </div>
    </article>
  );
};
