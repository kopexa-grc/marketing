import { canUseDom } from "@/lib/react/dom";
import { useState, useEffect } from "react";

export function useKeyboardFocus() {
  const [shouldShowOutline, setShouldShowOutline] = useState(true);

  useEffect(() => {
    if (!canUseDom) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Tab") {
        setShouldShowOutline(true);
      }
    }

    function handleMouseDown() {
      setShouldShowOutline(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return { shouldShowOutline };
}
