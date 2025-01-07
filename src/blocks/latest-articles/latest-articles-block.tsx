import { ArticleCard } from "@/components/cms/article-card";
import { buttonVariants } from "@/components/ui/button";
import { Heading, Paragraph } from "@/components/ui/typography";
import { Link, type TLocale } from "@/i18n/routing";
import { fetchBlogPosts, fetchCategory } from "@/lib/data";
import type {
  Category,
  LatestArticlesBlock as LatestArticlesBlockProps,
} from "@/payload-types";
import { ChevronRight } from "lucide-react";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";

type Props = LatestArticlesBlockProps;

const resolveCategory = async (category: number | Category) => {
  if (typeof category === "number") return fetchCategory(category);

  return category;
};

export const LatestArticlesBlock = async ({
  description,
  heading,
  category: categoryParam,
}: Props) => {
  const locale = await getLocale();
  const category = await resolveCategory(categoryParam);
  if (!category) {
    return notFound();
  }

  const articles = await fetchBlogPosts({
    category: category.id,
    locale: locale as TLocale,
  });

  if (!articles.length) {
    return null;
  }

  return (
    <section className="relative pt-huge" id={`${category.slug}`}>
      <div className="layout">
        <div className="col-span-full flex flex-col lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col items-start space-y-4">
            <Heading as="h2" level={3}>
              {heading}
            </Heading>
            <Paragraph className="w-full lg:w-3/5" color="muted">
              {description}
            </Paragraph>
          </div>
          <Link
            className={buttonVariants({
              variant: "link",
              className: "font-semibold",
            })}
            href={`/blog/category/${category.slug}`}
          >
            View all
            <ChevronRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
      <div className="layout pt-medium">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
};
