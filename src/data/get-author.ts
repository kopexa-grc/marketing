import { createClient } from "@/prismicio";
import { cache } from "react";

export const getBlogAuthorByUID = cache(async (uid?: string, lang?: string) => {
  if (!uid) return null;
  const client = createClient();

  try {
    // Versuche, den Autor mit der angegebenen Sprache zu holen
    const author = await client.getByUID("blog_author", uid, { lang });
    return author;
  } catch {
    console.warn(
      `[getBlogAuthorByUID] No author found for lang: ${lang}, trying fallback...`
    );

    try {
      // Fallback: Ohne Sprachfilter versuchen
      const fallbackAuthor = await client.getByUID("blog_author", uid, {});
      return fallbackAuthor;
    } catch (fallbackError) {
      console.error(
        "[getBlogAuthorByUID] No author found at all",
        fallbackError
      );
      return null;
    }
  }
});

export const getBlogByUID = cache(async (uid: string, lang?: string) => {
  const client = createClient();

  try {
    const page = await client.getByUID("blog", uid, { lang });

    return page;
  } catch {
    console.warn(
      `[getBlogByUID] No blog found for lang: ${lang}, trying fallback...`
    );

    try {
      // Fallback: Ohne Sprachfilter versuchen
      const fallbackPage = await client.getByUID("blog", uid, {});
      return fallbackPage;
    } catch (fallbackError) {
      console.error("[getBlogByUID] No blog found at all", fallbackError);
      return null;
    }
  }
});

export const getCategoryByUID = cache(async (uid: string, lang?: string) => {
  const client = createClient();

  try {
    return await client.getByUID("blog_category", uid, { lang });
  } catch {
    console.warn(
      `[getCategoryByUID] No category found for lang: ${lang}, trying fallback...`
    );

    try {
      // Fallback: Ohne Sprachfilter versuchen
      const fallbackCategory = await client.getByUID("blog_category", uid, {});

      return fallbackCategory;
    } catch (fallbackError) {
      console.error(
        "[getCategoryByUID] No category found at all",
        fallbackError
      );
      return null;
    }
  }
});
