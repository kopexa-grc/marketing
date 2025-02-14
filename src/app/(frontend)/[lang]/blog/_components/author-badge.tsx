import { getBlogAuthorByUID } from "@/data/get-author";
import { asText, isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

export type AuthorBadgeProps = {
  uid?: string;
  lang?: string;
};

export async function AuthorBadge({ uid, lang }: AuthorBadgeProps) {
  if (!uid) return null;

  const author = await getBlogAuthorByUID(uid, lang);
  if (!author) return null;

  return (
    <div className="flex items-center gap-2 text-sm overflow-hidden">
      <div className="flex items-center gap-2 text-sm/none focus:outline-none focus:ring-2 ring-offset-4 rounded-2xl ring-offset-white ring-ring">
        {isFilled.image(author.data.image) && (
          <PrismicNextImage
            className="rounded-full size-8"
            field={author.data.image}
          />
        )}
        <span className="overflow-hidden text-ellipsis whitespace-nowrap">
          <PrismicNextLink document={author}>
            {asText(author.data.name)}
          </PrismicNextLink>
        </span>
      </div>
    </div>
  );
}
