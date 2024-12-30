import { deepMerge, type Field } from "payload";

type ThemeFieldOptions = {
  overrides?: Partial<Field>;
};

export const themeField = (options: ThemeFieldOptions = {}): Field => {
  const { overrides = {} } = options;
  return deepMerge(
    {
      name: "theme",
      type: "group",
      interfaceName: "ThemeField",
      fields: [
        {
          type: "select",
          name: "colorMode",
          required: true,
          defaultValue: "light",
          enumName: "enum_theme_color_mode",
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
    } satisfies Field,
    overrides
  );
};
