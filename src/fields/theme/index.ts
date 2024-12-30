import type { Field } from "payload";

export const themeField = (): Field => {
  return {
    name: "theme",
    type: "group",
    interfaceName: "ThemeField",
    fields: [
      {
        type: "select",
        name: "colorMode",
        required: true,
        defaultValue: "light",
        options: [
          {
            label: "Light",
            value: "light",
          },
          {
            label: "Dark",
            value: "dark",
          },
        ],
      },
    ],
  };
};
