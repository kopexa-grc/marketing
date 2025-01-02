import { type ArrayField, deepMerge, type Field } from "payload";
import { link, type LinkAppearances } from "../link";

type LinkGroupOptions = {
  appearances?: LinkAppearances[] | false;
  overrides?: Partial<ArrayField>;
  additionalFields?: Field[];
  localized?: boolean;
};

export const linkGroup = ({
  appearances,
  overrides = {},
  additionalFields,
  localized,
}: LinkGroupOptions = {}) => {
  const lg: Field = {
    name: "links",
    type: "array",
    fields: [
      link({
        appearances,
        additionalFields,
        localized,
      }),
    ],
    admin: {
      initCollapsed: true,
    },
  };

  return deepMerge(lg, overrides);
};
