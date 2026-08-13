import {
  Calculator,
  Compass,
  Globe,
  Link2,
  Package,
  ScrollText,
  Swords,
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
    kind: "link",
    title: "Start Here",
    icon: Compass,
    href: "/start",
  },
  {
    kind: "section",
    title: "Mechanics",
    icon: Calculator,
    items: [
      { title: "All Mechanics", href: "/formulas" },
      { title: "Stats & Bonuses", href: "/formulas/stats" },
      { title: "Harvesting", href: "/formulas/harvesting" },
      { title: "Liquidations", href: "/formulas/liquidations" },
      { title: "Leveling & XP", href: "/formulas/leveling" },
      { title: "Economy", href: "/formulas/economy" },
      { title: "Item Pools", href: "/formulas/item-pools" },
    ],
  },
  {
    kind: "section",
    title: "Playing Well",
    icon: Swords,
    items: [
      { title: "How It Is Really Played", href: "/strategy" },
      { title: "Farming Well", href: "/strategy/farming" },
      { title: "Staying Alive", href: "/strategy/defense" },
      { title: "The Predator's Economy", href: "/strategy/predation" },
      { title: "Choosing Ground", href: "/strategy/ground" },
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
  {
    kind: "link",
    title: "Resources",
    icon: Link2,
    href: "/resources",
  },
];
