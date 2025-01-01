import { canUseDom } from "@/lib/react/dom";
import { useEffect, useLayoutEffect } from "react";

export const useIsomorphicLayoutEffect = canUseDom
  ? useLayoutEffect
  : useEffect;
