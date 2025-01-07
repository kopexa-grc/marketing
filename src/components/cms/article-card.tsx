import { cn } from "@/lib/utils";
import type { Post } from "@/payload-types";
import { useFormatter } from "next-intl";
import { Media } from "./media";
import { Link } from "@/i18n/routing";
import { Heading } from "../ui/typography";
import { paragraphVariants } from "../ui/typography/paragraph";

export type ArticleCardProps = {
  article: Partial<Post>;
};

export const ArticleCard = ({ article }: ArticleCardProps) => {
  const format = useFormatter();

  return (
    <article
      className={cn(
        "col-span-full lg:col-span-4",
        "flex relative w-full h-full",
        "flex-col relative group gap-2.5",
        "justify-between rounded-2xl bg-background"
      )}
    >
      {article.featuredImage && (
        <div className="relative w-full overflow-hidden rounded-2xl">
          <Media
            resource={article.featuredImage}
            className="transition-transform duration-300 group-hover:scale-105"
            imgClassName="aspect-video w-full rounded-2xl bg-accent object-cover"
          />
        </div>
      )}
      <div className="flex flex-col space-y-3">
        <Heading as="h3" level={5}>
          <Link
            href={`/blog/${article.slug}`}
            className="transition-colors duration-200 group-hover:text-secondary"
          >
            <span className="absolute inset-0" />
            {article.title}
          </Link>
        </Heading>
        {article.publishedOn && (
          <time dateTime={article.publishedOn} className={paragraphVariants()}>
            {format.dateTime(new Date(article.publishedOn), {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </time>
        )}
      </div>
    </article>
  );
};
