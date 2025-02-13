import type { LayoutDocument } from "../../../prismicio-types";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export type MainLayoutProps = {
  children: React.ReactNode;
  layout: LayoutDocument;
};

export function MainLayout(props: MainLayoutProps) {
  const { children, layout } = props;

  return (
    <div className="relative flex flex-col min-h-screen">
      <SiteHeader layout={layout} />
      <main className="grow flex flex-col">{children}</main>
      <SiteFooter layout={layout} />
    </div>
  );
}
