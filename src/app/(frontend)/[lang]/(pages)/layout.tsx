import { MainLayout } from "@/components/layout/main-layout";
import { getLayoutData } from "@/data/layout";

type Params = {
  lang: string;
};

export default async function PagesLayout({
  children,
  params: promiseParams,
}: {
  children: React.ReactNode;
  params: Promise<Params>;
}) {
  const params = await promiseParams;
  const layout = await getLayoutData(params.lang);

  return <MainLayout layout={layout}>{children}</MainLayout>;
}
