import { createClient } from "@/prismicio";
import { asText, isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

type BlogCategoryLinkProps = {
  uid?: string;
};

export async function BlogCategoryLink(props: BlogCategoryLinkProps) {
  const { uid } = props;

  if (!uid) return null;

  const client = createClient();

  const category = await client.getByUID("blog_category", uid);

  return (
    <PrismicNextLink
      document={category}
      className="flex justify-between items-center tracking-tight gap-1.5 relative h-6 font-bold text-sm/none overflow-auto z-10 text-muted-foreground"
    >
      {isFilled.image(category.data.icon) && (
        <PrismicNextImage
          field={category.data.icon}
          className="size-5 shrink-0"
        />
      )}
      <span className="whitespace-nowrap overflow-ellipsis overflow-hidden">
        {asText(category.data.title)}
      </span>
    </PrismicNextLink>
  );
}
