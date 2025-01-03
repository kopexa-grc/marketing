import type { Block } from "payload";

export const FAQBlock: Block = {
  slug: "faq-section",
  labels: {
    singular: "FAQ Section",
    plural: "FAQ Sections",
  },
  interfaceName: "FAQBlock",
  fields: [
    {
      name: "headline",
      type: "text",
      label: "Headline",
      required: true,
      defaultValue: "Frequently Asked Questions",
      localized: true,
    },
    {
      name: "faqs",
      type: "array",
      label: "FAQs",
      minRows: 1,
      fields: [
        {
          name: "question",
          type: "text",
          label: "Question",
          required: true,
        },
        {
          name: "answer",
          type: "richText",
          label: "Answer",
          required: true,
        },
      ],
    },
  ],
};
