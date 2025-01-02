import { useOnResize } from "@/hooks/use-on-resize";
import { useCallback, useRef } from "react";
import { motion, type Variant } from "motion/react";
import { cn } from "@/lib/utils";
import type { MainMenuPanels } from "@/payload-types";
import { LinkSection } from "./link-section";

type PanelProps = {
  panel: NonNullable<MainMenuPanels>[number];
  panelId: number;
  isVisible: boolean;
  setPanelRect: (id: number, wrapper: DOMRect, content?: DOMRect) => void;
  panelStatus: "transition" | "opening" | "closing";
};

const variants = {
  hidden: {
    opacity: 0,
    y: -30,
    transition: {
      duration: 0.3,
    },
    visibility: "hidden",
  } satisfies Variant,
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
    visibility: "inherit",
  } satisfies Variant,
};

export const Panel = ({
  panel,
  panelId,
  setPanelRect,
  isVisible,
}: PanelProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  const onResize = useCallback(() => {
    if (cardRef.current && setPanelRect) {
      const wrapper = cardRef.current.getBoundingClientRect();
      const content = linksRef.current?.getBoundingClientRect();
      setPanelRect(panelId, wrapper, content);
    }
  }, [panelId, setPanelRect]);

  useOnResize(onResize);

  return (
    <motion.div
      ref={panelRef}
      variants={variants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      className={cn(
        "absolute top-full -left-4 invisible opacity-0 will-change-[transform, opacity] cursor-default",
        "min-w-[100vw] max-w-full border-t border-white/30",
        "-translate-x-full bg-navbar-panel shadow"
      )}
      data-theme="light"
    >
      <div className="layout">
        <div
          className={cn(
            "col-span-full flex flex-col w-full box-border border-white/30 mt-4"
          )}
        >
          <div ref={cardRef} className="flex flex-row w-full box-border">
            {/** links wrapper */}
            <div
              ref={linksRef}
              className="flex flex-col justify-between box-border grow shrink relative"
            >
              {/** links sections */}
              <div className="relative flex justify-between">
                {Array.isArray(panel.navItems) &&
                  panel.navItems.map((item) => (
                    <LinkSection
                      key={item.id}
                      section={item}
                      sectionsLength={panel.navItems?.length ?? 0}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
