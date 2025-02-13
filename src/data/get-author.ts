import { createClient } from "@/prismicio";

export async function getBlogAuthorByUID(uid?: string) {
  if (!uid) return null;

  const client = createClient();
  return client.getByUID("blog_author", uid);
}
