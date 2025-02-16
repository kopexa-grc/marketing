export type ThemeSettingValues = "Inherit from Parent" | "Light" | "Dark";

type DarkTheme = "dark";
type LightTheme = "light";

type Theme = DarkTheme | LightTheme;

export function resolveSliceThemeAttr(
  theme: ThemeSettingValues,
  parent: Theme = "light"
) {
  switch (theme) {
    case "Light": {
      return "light";
    }
    case "Dark": {
      return "dark";
    }
    default: {
      return parent;
    }
  }
}
