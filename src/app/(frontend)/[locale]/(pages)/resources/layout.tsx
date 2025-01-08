import { Header } from "@/components/header/header";
import { Footer } from "@/components/layout/footer";
import { fetchGlobals } from "@/lib/data";
import { setRequestLocale } from "next-intl/server";
import { unstable_cache } from "next/cache";
import { draftMode } from "next/headers";

export default async function ResourcesLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: "en" | "de" }>;
}>) {
  const { locale } = await params;
  const { isEnabled: draft } = await draftMode();

  setRequestLocale(locale);

  const getGlobals = draft
    ? fetchGlobals
    : unstable_cache(fetchGlobals, ["footer"]);

  const { footer, mainMenu } = await getGlobals(locale);

  return (
    <>
      <Header mainMenu={mainMenu} colorScheme="primary" />
      <main className="flex-1">{children}</main>
      <Footer footer={footer} />
    </>
  );
}