import React from "react";

import type { Props } from "./types";

import { ImageMedia } from "./image-media";
import { VideoMedia } from "./video-media";
import { Box } from "@/components/ui/box";

export const Media = (props: Props) => {
  const { className, as = "div", resource } = props;

  const isVideo =
    typeof resource === "object" && resource?.mimeType?.includes("video");

  return (
    <Box as={as} className={className}>
      {isVideo ? <VideoMedia {...props} /> : <ImageMedia {...props} />}
    </Box>
  );
};
