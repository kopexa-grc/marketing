import { deepMerge, type Field } from "payload";

export type LinkAppearances = "default" | "outline";

export const appearanceOptions: Record<
  LinkAppearances,
  { label: string; value: string }
> = {
  default: {
    label: "Default",
    value: "default",
  },
  outline: {
    label: "Outline",
    value: "outline",
  },
};

type LinkType = (options?: {
  appearances?: LinkAppearances[] | false;
  localized?: boolean;
  disableLabel?: boolean;
  additionalFields?: Field[];
  overrides?: Partial<Field>;
}) => Field;

export const link: LinkType = ({
  localized = false,
  appearances,
  disableLabel = false,
  additionalFields = [],
  overrides = {},
} = {}) => {
  const linkResult: Field = {
    name: "link",
    type: "group",
    interfaceName: "CMSLinkField",
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: "row",
        fields: [
          {
            name: "type",
            type: "radio",
            admin: {
              layout: "horizontal",
              width: "50%",
            },
            defaultValue: "reference",
            enumName: "enum_link_type",
            options: [
              {
                label: "Internal Link",
                value: "reference",
              },
              {
                label: "Custom URL",
                value: "custom",
              },
            ],
          },
          {
            name: "newTab",
            type: "checkbox",
            label: "Open in new tab",
            admin: {
              style: {
                alignSelf: "flex-end",
              },
              width: "50%",
            },
          },
        ],
      },
    ],
  };

  const linkTypes: Field[] = [
    {
      type: "row",
      fields: [
        {
          name: "reference",
          type: "relationship",
          admin: {
            condition: (_, siblingData) => siblingData?.type === "reference",
            width: disableLabel ? "100%" : "50%",
          },
          label: "Document to link to",
          relationTo: ["pages"],
          required: true,
        },
        {
          name: "url",
          type: "text",
          admin: {
            condition: (_, siblingData) => siblingData?.type === "custom",
            width: disableLabel ? "100%" : "50%",
          },
          label: "Custom URL",
          required: true,
        },
        {
          name: "label",
          type: "text",
          admin: {
            width: "50%",
            hidden: disableLabel,
          },
          label: "Label",
          required: false,
          localized,
        },
      ],
    },
  ];

  linkResult.fields = [...linkResult.fields, ...linkTypes];

  if (appearances !== false) {
    let appearanceOptionsToUse = [
      appearanceOptions.default,
      appearanceOptions.outline,
    ];

    if (appearances) {
      appearanceOptionsToUse = appearances.map(
        (appearance) => appearanceOptions[appearance]
      );
    }

    linkResult.fields.push({
      name: "appearance",
      type: "select",
      admin: {
        description: "Choose how the link should be rendered.",
      },
      defaultValue: "default",
      options: appearanceOptionsToUse,
    });
  }

  linkResult.fields.push(...additionalFields);

  return deepMerge(linkResult, overrides);
};
