import type { LayoutDocument } from "../../../prismicio-types";
import { SiteFooter } from "./site-footer";
import { SiteHeader, type SiteHeaderSlotRecipe } from "./site-header";

type LayoutSettings = {
  header?: {
    variant?: SiteHeaderSlotRecipe["variant"];
  };
};

export type MainLayoutProps = {
  children: React.ReactNode;
  layout: LayoutDocument;
  settings?: LayoutSettings;
};

export function MainLayout(props: MainLayoutProps) {
  const { children, layout, settings } = props;

  return (
    <div className="relative flex flex-col min-h-screen">
      <SiteHeader layout={layout} variant={settings?.header?.variant} />
      <main className="grow flex flex-col">{children}</main>
      <SiteFooter layout={layout} />
    </div>
  );
}
