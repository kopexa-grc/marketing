import { filter, isFilled, type Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { cn } from "@/lib/utils";
import { RichText } from "@/components/prismic/rich-text";
import { createClient } from "@/prismicio";
import { Carousel } from "@/components/ui/carousel";
import { BlogCardLarge } from "@/app/(frontend)/[lang]/blog/_components/blog-card-large";
import { PrismicNextLink } from "@prismicio/next";
import { buttonVariants } from "@/components/ui/button";

/**
 * Props for `BlogPostSlider`.
 */
export type BlogPostSliderProps = SliceComponentProps<
  Content.BlogPostSliderSlice,
  {
    lang?: string;
  }
>;

/**
 * Component for "BlogPostSlider" Slices.
 */
const BlogPostSlider = async ({ slice, context }: BlogPostSliderProps) => {
  const client = createClient();

  const tags =
    (isFilled.group(slice.primary.tags) &&
      slice.primary.tags
        .flatMap((t) => t.tag)
        .filter((tag): tag is string => Boolean(tag))) ||
    [];

  const blogPosts = await client.getByType("blog", {
    filters: [filter.any("document.tags", tags)],
    pageSize: 10,
    orderings: [
      {
        field: "my.blog.date",
        direction: "desc",
      },
    ],
  });

  return (
    <Carousel.Root
      className="py-12 md:py-20 xl:py-24 w-full overflow-hidden"
      opts={{
        align: "start",
      }}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          className={cn(
            "sm:col-span-1 z-10 relative",
            "after:bg-background after:w-[2000px] after:h-full after:absolute after:right-6 after:top-0 after:content-[''] after:block",
            "before:bg-gradient-to-l from-transparent to-background before:w-12 before:h-full before:absolute before:-right-6 before:top-0 before:content-[''] before:block"
          )}
        >
          <div className="relative z-10 pr-12 sm:pb-20">
            <RichText field={slice.primary.title} />
            <div className="text-base xl:text-lg font-medium print:text-xs print:text-justify mt-6">
              <RichText field={slice.primary.description} />
            </div>
            <PrismicNextLink
              field={slice.primary.cta_link}
              className={cn(
                buttonVariants({
                  variant: "link",
                }),
                "md:mt-12 xl:text-base/none"
              )}
            />
            <div className="gap-2 flex mt-10 absolute bottom-0 right-0 sm:left-0 sm:right-auto">
              <Carousel.Previous />
              <Carousel.Next />
            </div>
          </div>
        </div>
        <div className="sm:col-span-1 lg:col-span-2">
          <Carousel.Root
            className="h-full"
            opts={{
              align: "start",
            }}
          >
            <Carousel.Content>
              {blogPosts.results.map((post) => (
                <Carousel.Item key={post.id} className="h-full flex w-2/5 me-5">
                  <BlogCardLarge
                    variant="card"
                    post={post}
                    lang={context?.lang}
                  />
                </Carousel.Item>
              ))}
            </Carousel.Content>
          </Carousel.Root>
        </div>
      </div>
    </Carousel.Root>
  );
};

export default BlogPostSlider;
