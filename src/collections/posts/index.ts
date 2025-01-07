/* eslint-disable @typescript-eslint/no-explicit-any */
import { slugField } from "@/fields/slug";
import { isAdmin } from "@/lib/access/is-admin";
import { publishedOnly } from "@/lib/access/published";
import { slugify } from "@/lib/slugify";
import type {
  SerializedEditorState,
  SerializedElementNode,
  SerializedLexicalNode,
} from "lexical";
import { revalidatePath } from "next/cache";
import type { CollectionConfig } from "payload";

type Heading = {
  text: string;
  level: number;
  id: string;
};

export const Posts: CollectionConfig = {
  slug: "posts",
  access: {
    create: isAdmin,
    delete: isAdmin,
    read: publishedOnly,
    readVersions: isAdmin,
    update: isAdmin,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "status", "publishedAt"],
    group: "Content Hub",
  },
  defaultPopulate: {
    slug: true,
    authors: true,
    featuredImage: true,
    publishedOn: true,
    title: true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: {
        description:
          "Maximum upload size: 4MB. Recommended dimensions: 1200x630",
      },
    },
    {
      name: "excerpt",
      type: "textarea",
      required: true,
      maxLength: 200,
    },
    // the actual content of our Post.
    {
      name: "lexicalContent",
      type: "richText",
    },
    {
      name: "tableOfContents",
      type: "array",
      hidden: true,
      fields: [
        { name: "text", type: "text", required: true },
        { name: "level", type: "number", required: true },
        { name: "id", type: "text", required: true },
      ],
    },
    {
      name: "relatedPosts",
      type: "relationship",
      filterOptions: ({ id }) => {
        return {
          id: {
            not_in: [id],
          },
        };
      },
      hasMany: true,
      relationTo: "posts",
    },
    /**
     * Sidebar below.
     */
    ...slugField(),
    {
      name: "authors",
      type: "relationship",
      admin: {
        position: "sidebar",
      },
      hasMany: true,
      relationTo: "users",
      required: true,
    },
    {
      name: "publishedOn",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
        position: "sidebar",
      },
      required: true,
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      hasMany: false,
      required: true,
      admin: {
        position: "sidebar",
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data }) => {
        const toc: Heading[] = [];

        function extractHeadings(node: SerializedElementNode) {
          if (node.type === "heading") {
            // @ts-expect-error not typed.
            const headingLevel = Number.parseInt(node.tag.replace("h", ""), 10);
            const text = node.children
              .filter((child: SerializedLexicalNode) => child.type === "text")
              // biome-ignore lint/suspicious/noExplicitAny: <explanation>
              .map((child: any) => child.text || "")
              .join("");

            // const text = node.children.map((child: any) => child.text).join("");
            const id = slugify(text);
            toc.push({ text, level: headingLevel, id });

            return; // break out, headings can't have child headings
          }

          if (node.children) {
            for (const child of node.children) {
              if (child.type === "element") {
                extractHeadings(child as SerializedElementNode);
              }
            }
          }
        }

        if (data.lexicalContent) {
          try {
            const editorState: SerializedEditorState =
              typeof data.lexicalContent !== "object"
                ? JSON.parse(data.lexicalContent)
                : data.lexicalContent;

            const rootNode = editorState.root;

            for (const node of rootNode.children) {
              extractHeadings(node as SerializedElementNode);
            }
          } catch (error) {
            console.error("Error parsing Lexical content:", error);
          }
        }

        return {
          ...data,
          tableOfContents: toc,
        };
      },
    ],
    afterChange: [
      ({ doc }) => {
        revalidatePath(`/blog/${doc.slug}`);
        revalidatePath("/blog", "page");
        console.log(`Revalidated: /blog/${doc.slug}`);
      },
    ],
  },
  versions: {
    drafts: true,
  },
};
