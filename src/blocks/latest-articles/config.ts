import type { Block } from "payload";

export const LatestArticles: Block = {
  slug: "latestArticles",
  interfaceName: "LatestArticlesBlock",
  labels: {
    singular: "Latest Articles Block",
    plural: "Latest Articles Blocks",
  },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Latest Articles",
      localized: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      localized: true,
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      required: true,
      admin: {
        description: "Select a category to show articles from",
      },
    },
    {
      name: "numberOfArticles",
      type: "number",
      required: true,
      min: 1,
      max: 6,
      defaultValue: 3,
      admin: {
        description: "How many articles to show",
      },
    },
  ],
};
