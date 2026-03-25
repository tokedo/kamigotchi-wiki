import {
  BookOpen,
  Cat,
  Globe,
  Wheat,
  Scroll,
  Package,
  Store,
  Database,
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
    title: "Getting Started",
    icon: BookOpen,
    items: [{ title: "Quick Start", href: "/getting-started" }],
  },
  {
    title: "Kamigotchi",
    icon: Cat,
    items: [
      { title: "Overview", href: "/kamigotchi" },
      { title: "Stats", href: "/kamigotchi/stats" },
      { title: "Traits", href: "/kamigotchi/traits" },
      { title: "Types", href: "/kamigotchi/types" },
      { title: "Levels & Skills", href: "/kamigotchi/levels-and-skills" },
      { title: "Bonuses", href: "/kamigotchi/bonuses" },
      { title: "Sacrifice", href: "/kamigotchi/sacrifice" },
      { title: "Naming & Sending", href: "/kamigotchi/naming-and-sending" },
    ],
  },
  {
    title: "The World",
    icon: Globe,
    items: [
      { title: "Overview", href: "/world" },
      { title: "Movement & Stamina", href: "/world/movement-and-stamina" },
      { title: "Time", href: "/world/time" },
      { title: "World Map", href: "/world/map" },
    ],
  },
  {
    title: "Harvesting",
    icon: Wheat,
    items: [
      { title: "Overview", href: "/harvesting" },
      { title: "Cooldown", href: "/harvesting/cooldown" },
      { title: "Liquidations", href: "/harvesting/liquidations" },
      { title: "Scavenging", href: "/harvesting/scavenging" },
      { title: "Harvesting Rooms", href: "/harvesting/rooms" },
    ],
  },
  {
    title: "Quests & Factions",
    icon: Scroll,
    items: [
      { title: "Overview", href: "/quests" },
      { title: "Quest Graph", href: "/quests/graph" },
      { title: "Factions & Co-Ops", href: "/quests/factions" },
    ],
  },
  {
    title: "Items",
    icon: Package,
    items: [
      { title: "Overview", href: "/items" },
      { title: "Equipment", href: "/items/equipment" },
      { title: "Crafting", href: "/items/crafting" },
      { title: "Item Database", href: "/items/database" },
    ],
  },
  {
    title: "Marketplace",
    icon: Store,
    items: [
      { title: "Overview", href: "/marketplace" },
      { title: "Merchants", href: "/marketplace/merchants" },
      { title: "Trading (KWOB)", href: "/marketplace/trading" },
      { title: "ONYX & Token Portal", href: "/marketplace/onyx" },
      { title: "VIP", href: "/marketplace/vip" },
      { title: "Kami Distribution", href: "/marketplace/kami-distribution" },
      { title: "KamiSwap", href: "/marketplace/kamiswap" },
    ],
  },
  {
    title: "Databases",
    icon: Database,
    items: [
      { title: "Item Database", href: "/items/database" },
      { title: "Quest Graph", href: "/quests/graph" },
      { title: "World Map", href: "/world/map" },
    ],
  },
];
