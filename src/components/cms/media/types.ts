import type { StaticImageData } from "next/image";

import type { Media as MediaType } from "@/payload-types";
import type { BoxProps } from "@/components/ui/box";

export interface Props extends Omit<BoxProps<"div">, "resource"> {
  alt?: string;
  className?: string;
  fill?: boolean; // for NextImage only
  imgClassName?: string;
  onClick?: () => void;
  onLoad?: () => void;
  loading?: "lazy" | "eager"; // for NextImage only
  priority?: boolean; // for NextImage only
  //   ref?: Ref<HTMLImageElement | HTMLVideoElement | null>;
  resource?: MediaType | string | number; // for Payload media
  size?: string; // for NextImage only
  src?: StaticImageData; // for static media
  videoClassName?: string;
}
