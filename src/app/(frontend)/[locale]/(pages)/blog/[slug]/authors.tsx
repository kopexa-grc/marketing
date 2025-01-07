import { Media } from "@/components/cms/media";
import { Paragraph } from "@/components/ui/typography";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import type { User } from "@/payload-types";

interface AuthorsListProps {
  authors?: (number | User)[];
}

export function AuthorsList({ authors }: AuthorsListProps) {
  if (!authors) return null;

  const validAuthors = authors.filter(
    (author): author is User => typeof author !== "number"
  );
  if (!validAuthors.length) return null;

  return (
    <div className="prose-meta space-y-4">
      <div className="space-y-3">
        <Paragraph color="muted" level="small" id="authors-heading">
          Written by
        </Paragraph>
        {/* Avatar Stack */}
        {validAuthors.length > 1 && (
          <div className="flex">
            <div className="flex -space-x-4">
              {validAuthors.map(
                (author) =>
                  author.avatar && (
                    <Media
                      key={author.id}
                      resource={author.avatar}
                      className="ring-4 ring-background"
                      imgClassName="object-cover size-12 rounded-full grayscale"
                      alt={`Profile photo of ${author.name}`}
                    />
                  )
              )}
            </div>
          </div>
        )}
      </div>
      <div
        aria-labelledby="authors-heading"
        className={cn(
          "flex flex-col",
          validAuthors.length > 1 ? "gap-3" : "gap-2"
        )}
      >
        {validAuthors.map((author) => (
          <AuthorCard
            key={author.id}
            author={author}
            showAvatar={validAuthors.length === 1}
          />
        ))}
      </div>
    </div>
  );
}

interface AuthorCardProps {
  author: User;
  showAvatar?: boolean;
}

function AuthorCard({ author, showAvatar }: AuthorCardProps) {
  if (typeof author === "number") return null;

  return (
    <div
      className="flex items-start gap-4"
      itemProp="author"
      itemScope
      itemType="https://schema.org/Person"
    >
      {showAvatar && author.avatar && (
        <Media
          resource={author.avatar}
          imgClassName="object-cover size-12 rounded-full grayscale"
          alt={`Profile photo of ${author.name}`}
        />
      )}
      <Link href={`/blog/author/${author.slug}`} className="group">
        <Paragraph className="font-semibold text-sm group-hover:text-secondary">
          <span itemProp="name">{author.name}</span>
        </Paragraph>
        {author.headline && (
          <Paragraph className="text-sm" itemProp="jobTitle">
            {author.headline}
          </Paragraph>
        )}
      </Link>
    </div>
  );
}
