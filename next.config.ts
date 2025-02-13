import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["via.assets.so", "localhost"],
  },
  async redirects() {
    return [
      // redirect payload i18n to prismic i18n
      {
        source: "/en/:path*",
        destination: "/en-us/:path*",
        permanent: true,
      },
      {
        source: "/de/:path*",
        destination: "/de-de/:path*",
        permanent: true,
      },
      // platform

      {
        source: "/:locale/platform",
        destination: "/:locale/platform/overview",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
