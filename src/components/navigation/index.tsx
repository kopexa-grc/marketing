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
import type { NavItem } from "./types";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Icon } from "../ui/icon";

interface MainNavProps {
  items: NavItem[];
}

export function MainNav({ items }: MainNavProps) {
  const pathname = usePathname();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {items.map((item) => {
          switch (item.type) {
            case "link":
              return (
                <NavigationMenuItem key={item.id}>
                  <Link href={item.href} passHref legacyBehavior>
                    <NavigationMenuLink
                      className={cn(
                        "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                        pathname === item.href &&
                          "bg-accent text-accent-foreground",
                        item.disabled && "pointer-events-none opacity-50"
                      )}
                    >
                      {item.icon && (
                        <Icon name={item.icon} className="mr-2 h-4 w-4" />
                      )}
                      {item.title}
                      {item.external && (
                        <ExternalLink className="ml-1 h-3 w-3" />
                      )}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              );

            case "dropdown":
              return (
                <NavigationMenuItem key={item.id}>
                  <NavigationMenuTrigger
                    className={cn(
                      item.disabled && "pointer-events-none opacity-50"
                    )}
                  >
                    {item.icon && (
                      <Icon name={item.icon} className="mr-2 h-4 w-4" />
                    )}
                    {item.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {item.items.map((subItem) => (
                        <RenderNavItem key={subItem.id} item={subItem} />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              );

            case "action":
              return (
                <NavigationMenuItem key={item.id}>
                  <Button
                    variant={item.variant || "default"}
                    onClick={item.onClick}
                    disabled={item.disabled}
                    className="h-9"
                  >
                    {item.icon && (
                      <Icon name={item.icon} className="mr-2 h-4 w-4" />
                    )}
                    {item.title}
                  </Button>
                </NavigationMenuItem>
              );

            case "group":
              return (
                <NavigationMenuItem key={item.id}>
                  <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px]">
                      {item.items.map((subItem) => (
                        <RenderNavItem key={subItem.id} item={subItem} />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              );

            default:
              return null;
          }
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function RenderNavItem({ item }: { item: NavItem }) {
  switch (item.type) {
    case "link":
      return (
        <Link href={item.href} passHref legacyBehavior>
          <NavigationMenuLink
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
            )}
          >
            <div className="flex items-center">
              {item.icon && <Icon name={item.icon} className="mr-2 h-4 w-4" />}
              <div className="text-sm font-medium">{item.title}</div>
            </div>
          </NavigationMenuLink>
        </Link>
      );

    case "feature":
      return (
        <li className="row-span-3">
          <NavigationMenuLink className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
            <div className="mb-2 flex items-center">
              {item.icon && (
                <Icon
                  name={item.icon}
                  className="h-6 w-6 text-yellow-500 mr-2"
                />
              )}
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium">{item.title}</div>
                {item.badge && (
                  <Badge variant={item.badge.type}>{item.badge.text}</Badge>
                )}
              </div>
            </div>
            <p className="text-sm leading-tight text-muted-foreground">
              {item.description}
            </p>
          </NavigationMenuLink>
        </li>
      );

    default:
      return null;
  }
}
