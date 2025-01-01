"use client";

import type { MainMenu } from "@/payload-types";
import { NavigationLabel } from "./navigation-label";
import { useCallback, useState } from "react";
import { Panel } from "./panel";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { CMSLink } from "@/components/cms/cms-link";
import { cn } from "@/lib/utils";

interface MainNavProps {
  mainMenu: MainMenu;
  isScrolled?: boolean;
  dark?: boolean;
}

type PanelContextValue = Map<number, { wrapper: DOMRect; content?: DOMRect }>;

export function MainNav({ mainMenu }: MainNavProps) {
  const [visiblePanel, setVisiblePanel] = useState<number | null>(null);
  const [previousVisiblePanel, setPreviousVisiblePanel] = useState<
    number | null
  >(null);
  const [panelContextState, setPanelContextState] = useState<PanelContextValue>(
    new Map()
  );

  const setPanelRect = useCallback(
    (id: number, wrapper: DOMRect, content?: DOMRect) => {
      setPanelContextState((prevState) => {
        const newState = new Map(prevState); // Kopiere die aktuelle Map
        newState.set(id, { wrapper, content }); // Aktualisiere oder füge hinzu
        return newState; // Rückgabe der aktualisierten Map
      });
    },
    []
  );

  const handleMouseEnter = useCallback(
    (index: number) => {
      setPreviousVisiblePanel(visiblePanel);
      setVisiblePanel(index);
    },
    [visiblePanel]
  );

  const hidePanel = useCallback(() => {
    setPreviousVisiblePanel(visiblePanel);
    setVisiblePanel(null);
  }, [visiblePanel]);

  return (
    <nav className="relative w-full flex flex-row items-center justify-between gap-12">
      <Link href="/" className="relative group">
        <Logo />
      </Link>
      <ul className="flex flex-row grow">
        {Array.isArray(mainMenu.tabs) &&
          mainMenu.tabs.map((tab, index) => {
            const isActive = visiblePanel === index;

            const withPanel =
              !tab.enableDirectLink &&
              Array.isArray(tab.navItems) &&
              tab.navItems.length > 0;

            const hasPrevPanel =
              typeof previousVisiblePanel === "number" &&
              panelContextState.has(previousVisiblePanel);

            const hasCurrentPanel =
              typeof visiblePanel === "number" &&
              panelContextState.has(visiblePanel);

            let panelStatus: "transition" | "opening" | "closing";

            if (isActive) {
              panelStatus = hasPrevPanel ? "transition" : "opening";
            } else {
              panelStatus = hasCurrentPanel ? "transition" : "closing";
            }

            return (
              <NavigationLabel
                key={`tab-${tab.id}`}
                link={tab.link}
                text={tab.label}
                withPanel={withPanel}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={hidePanel}
              >
                {withPanel && (
                  <Panel
                    isVisible={isActive}
                    panelId={index}
                    panel={tab}
                    setPanelRect={setPanelRect}
                    panelStatus={panelStatus}
                  />
                )}
              </NavigationLabel>
            );
          })}
      </ul>

      <div className="flex items-center space-x-6">
        {Array.isArray(mainMenu.ctas) &&
          mainMenu.ctas.map((cta) => (
            <CMSLink
              key={`${cta.id}`}
              {...cta.link}
              className={cn("transition-colors duration-200")}
              aria-label={cta.link.label}
            />
          ))}
      </div>
    </nav>
  );
}
