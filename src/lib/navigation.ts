import {
  Calculator,
  Globe,
  Package,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
}

export interface NavSection {
  title: string;
  icon: LucideIcon;
  items: NavItem[];
}

export const navigation: NavSection[] = [
  {
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
    title: "Item Database",
    icon: Package,
    items: [
      { title: "All Items", href: "/items" },
    ],
  },
  {
    title: "World Map",
    icon: Globe,
    items: [
      { title: "Interactive Map", href: "/map" },
    ],
  },
];
