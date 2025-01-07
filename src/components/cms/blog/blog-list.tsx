import { Paragraph } from "@/components/ui/typography";
import type { TLocale } from "@/i18n/routing";
import { fetchBlogPosts } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import { ArticleCard } from "../article-card";

type BlogListProps = {
  category?: number;
  authorSlug?: string;
  limit?: number;
  locale?: TLocale;
  pagination?: boolean;
} & ComponentProps<"section">;

export const BlogList = async ({
  category,
  authorSlug,
  limit = 12,
  locale,
  pagination = true,
  className,
  ...restProps
}: BlogListProps) => {
  const posts = await fetchBlogPosts({
    category,
    authorSlug,
    limit,
    locale,
    pagination,
  });

  if (posts.length === 0) {
    return (
      <div className="text-center py-10">
        <Paragraph>No blog posts found.</Paragraph>
      </div>
    );
  }

  return (
    <section
      role="feed"
      aria-label="Blog articles"
      className={cn("layout", className)}
      {...restProps}
    >
      {posts.map((post) => (
        <ArticleCard key={post.id} article={post} />
      ))}
    </section>
  );
};
