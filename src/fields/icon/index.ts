import { deepMerge, type Field } from "payload";

type IconFieldOptions = {
  overrides?: Partial<Field>;
};

export const iconField = ({ overrides = {} }: IconFieldOptions = {}): Field => {
  const base: Field = {
    name: "icon",
    type: "select",
    enumName: "enum_icon_name",
    options: [
      {
        label: "Sparkles",
        value: "Sparkles",
      },
    ],
  };

  return deepMerge(base, overrides);
};
