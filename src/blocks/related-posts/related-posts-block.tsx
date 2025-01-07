import { ArticleCard } from "@/components/cms/article-card";
import { Heading } from "@/components/ui/typography";
import type { Post } from "@/payload-types";

export type RelatedPostsBlock = {
  id?: string;
  blockName: string;
  blockType: "relatedPosts";
  relatedPosts: (Post | number)[] | null;
};

export const RelatedPosts = ({ relatedPosts }: RelatedPostsBlock) => {
  if (!relatedPosts || relatedPosts?.length === 0) {
    return null;
  }

  return (
    <section className="layout mt-8">
      <Heading level={2} as="h2" className="col-span-full mb-8">
        Related articles
      </Heading>
      {relatedPosts.map((article) => {
        if (typeof article === "number") return null;

        return <ArticleCard key={article.id} article={article} />;
      })}
    </section>
  );
};
