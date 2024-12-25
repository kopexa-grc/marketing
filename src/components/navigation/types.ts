import type { icons } from "lucide-react";

export type BadgeType = "default" | "secondary" | "destructive" | "yellow";

// Base navigation item interface
interface BaseNavItem {
  id: string;
  title: string;
  icon: keyof typeof icons;
}

// Simple link
interface NavLink extends BaseNavItem {
  type: "link";
  href: string;
  external?: boolean;
  disabled?: boolean;
}

// Dropdown menu
interface NavDropdown extends BaseNavItem {
  type: "dropdown";
  disabled?: boolean;
  items: Array<NavLink | NavAction | NavFeature>;
}

// Action button
interface NavAction extends BaseNavItem {
  type: "action";
  onClick: () => void;
  variant?: "default" | "ghost" | "outline";
}

// Feature showcase
interface NavFeature extends BaseNavItem {
  type: "feature";
  description: string;
  image?: string;
  badge?: {
    text: string;
    type: BadgeType;
  };
}

// Group of navigation items
interface NavGroup extends BaseNavItem {
  type: "group";
  items: Array<NavLink | NavFeature>;
}

export type NavItem = NavLink | NavDropdown | NavAction | NavFeature | NavGroup;
