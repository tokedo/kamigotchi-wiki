import {
  Calculator,
  Globe,
  Package,
  ScrollText,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
}

export interface NavSection {
  kind: "section";
  title: string;
  icon: LucideIcon;
  items: NavItem[];
}

export interface NavLink {
  kind: "link";
  title: string;
  icon: LucideIcon;
  href: string;
}

export type NavEntry = NavSection | NavLink;

export const navigation: NavEntry[] = [
  {
    kind: "section",
    title: "Game Formulas",
    icon: Calculator,
    items: [
      { title: "Stats & Bonuses", href: "/formulas/stats" },
      { title: "Harvesting", href: "/formulas/harvesting" },
      { title: "Liquidations", href: "/formulas/liquidations" },
      { title: "Leveling & XP", href: "/formulas/leveling" },
      { title: "Economy", href: "/formulas/economy" },
    ],
  },
  {
    kind: "link",
    title: "Item Database",
    icon: Package,
    href: "/items",
  },
  {
    kind: "link",
    title: "Quest Database",
    icon: ScrollText,
    href: "/quests",
  },
  {
    kind: "link",
    title: "World Map",
    icon: Globe,
    href: "/map",
  },
];
