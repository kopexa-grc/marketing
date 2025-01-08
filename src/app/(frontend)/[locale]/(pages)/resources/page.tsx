import { Heading, Paragraph } from "@/components/ui/typography";
import type { TLocale } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";

export default async function ResourcesPage({
  params,
}: Readonly<{
  params: Promise<{ locale: TLocale }>;
}>) {
  const { locale } = await params;

  setRequestLocale(locale);

  return (
    <>
      <div className="layout">
        <div className="col-span-full lg:col-span-10 lg:col-start-2 my-xhuge flex flex-col items-center space-y-4">
          <Heading as="h1" level={1} className="text-center">
            Resource Center
          </Heading>
          <Paragraph className="text-center max-w-md">
            Whether you need technical documentation, best practices, or
            compliance insights, our resource hub provides everything you need
            to streamline your compliance processes.
          </Paragraph>
        </div>
      </div>
      <span>resource center</span>
    </>
  );
}
