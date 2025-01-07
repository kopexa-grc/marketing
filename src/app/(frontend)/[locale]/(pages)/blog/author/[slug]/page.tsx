import { BlogList } from "@/components/cms/blog/blog-list";
import { UserBiographySection } from "@/components/cms/user/user-biography-section";
import { Locales, type TLocale } from "@/i18n/routing";
import { APP_URL } from "@/lib/config";
import { fetchAuthor, fetchUsers } from "@/lib/data";
import { mergeOpenGraph } from "@/lib/seo/mergeOpenGraph";
import type { Media, User } from "@/payload-types";
import { unstable_cache } from "next/cache";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

function isMediaObject(media: number | Media): media is Media {
  return typeof media === "object" && "url" in media;
}

function generateAuthorSchema(user: User) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `https://yourdomain.com/authors/${user.slug}`,
    name: user.name,
    jobTitle: user.headline,
    description: user.bio,
    image:
      user.avatar && isMediaObject(user.avatar) ? user.avatar.url : undefined,
    sameAs: [
      user.socialLinks?.website,
      user.socialLinks?.twitter &&
        `https://twitter.com/${user.socialLinks.twitter}`,
      user.socialLinks?.linkedin,
      user.socialLinks?.github,
    ].filter(Boolean),
  };
}

const getUser = (slug: string, draft?: boolean) =>
  draft
    ? fetchAuthor(slug)
    : unstable_cache(fetchAuthor, ["user", `user-${slug}`])(slug);

export default async function AuthorPage({
  params,
}: Readonly<{
  params: Promise<{ slug: string; locale: TLocale }>;
}>) {
  const [{ slug, locale }, { isEnabled: draft }] = await Promise.all([
    params,
    draftMode(),
  ]);

  const user = await getUser(slug, draft);

  if (!user) {
    notFound();
  }

  return (
    <div className="mt-16 mb-10 lg:mt-32 lg:mb-16">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: dev generated
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateAuthorSchema(user)),
        }}
      />
      <UserBiographySection user={user} />
      <BlogList
        className="pt-10 lg:pt-16"
        authorSlug={slug}
        pagination={false}
        locale={locale}
      />
    </div>
  );
}

export async function generateStaticParams() {
  const getUsers = unstable_cache(fetchUsers, ["users"]);
  const posts = await getUsers();

  return posts.flatMap(({ slug }) =>
    Locales.map((locale) => ({
      locale,
      slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ slug: string; locale: TLocale }>;
}>) {
  const { isEnabled: draft } = await draftMode();
  const { slug } = await params;
  const user = await getUser(slug, draft);

  const ogImage =
    user.avatar && isMediaObject(user.avatar)
      ? `${APP_URL}${user.avatar.url}`
      : undefined;

  return {
    description: user.bio,
    openGraph: mergeOpenGraph({
      description: user.bio ?? undefined,
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title: user.name ?? undefined,
      url: `/blog/author/${slug}`,
    }),
    title: user.name,
  };
}
