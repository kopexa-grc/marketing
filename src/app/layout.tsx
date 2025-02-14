import { APP_URL } from "@/lib/config";
import { repositoryName } from "@/prismicio";
import { PrivacyProvider } from "@/providers/privacy";
import { PrismicPreview } from "@prismicio/next";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL || "https://kopexa.com"),
  title: {
    default: "Kopexa",
    template: "%s - Kopexa",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@kopexa",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PrivacyProvider>
      {children}

      <PrismicPreview
        repositoryName={repositoryName}
        updatePreviewURL="/api/preview"
        exitPreviewURL="/api/exit-preview"
      />
    </PrivacyProvider>
  );
}
