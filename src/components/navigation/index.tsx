"use client";

import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { cn } from "@/lib/utils";
import type { MainMenu } from "@/payload-types";
import { CMSLink } from "../cms/cms-link";

interface MainNavProps {
  mainMenu: MainMenu;
}

export function MainNav({ mainMenu }: MainNavProps) {
  const pathname = usePathname();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {Array.isArray(mainMenu.tabs) &&
          mainMenu.tabs.map((tab) => {
            return (
              <NavigationMenuItem key={`tab-${tab.id}`}>
                {tab.enableDirectLink ? (
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                      //   pathname === item.href &&
                      //     "bg-accent text-accent-foreground",
                    )}
                  >
                    <CMSLink
                      {...tab.link}
                      label={tab.label}
                      appearance="none"
                    />
                  </NavigationMenuLink>
                ) : (
                  <NavigationMenuTrigger>{tab.label}</NavigationMenuTrigger>
                )}

                {Array.isArray(tab.navItems) && (
                  <NavigationMenuContent>
                    <ul className="p-5 grid gap-3 md:w-[400px]">
                      {tab.navItems.map((item) => (
                        <li key={`${item.id}`} className="relative">
                          <NavigationMenuLink asChild>
                            <CMSLink
                              {...item.link}
                              appearance="none"
                              className={cn(
                                "flex flex-col select-none py-2 pl-2.5 pr-8 rounded-md gap-1",
                                "leading-none no-underline outline-none transition-colors",
                                "hover:bg-accent hover:text-accent-foreground",
                                "focus:bg-accent focus:text-accent-foreground"
                              )}
                            >
                              <div className="relative flex items-center">
                                <span className="font-semibold leading-none text-sm">
                                  {item.label}
                                </span>
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {item.description}
                              </p>
                            </CMSLink>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                )}
              </NavigationMenuItem>
            );
          })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
