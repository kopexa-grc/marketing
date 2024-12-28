import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["via.assets.so", "localhost"],
  },
};

export default withPayload(nextConfig);
