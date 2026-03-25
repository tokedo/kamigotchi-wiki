#!/usr/bin/env npx tsx
/**
 * Parses GDD catalog CSVs into typed JSON for the wiki.
 * Run: npx tsx scripts/parse-catalogs.ts
 */

import { parse } from "csv-parse/sync";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const GDD = "/Users/anatolyzaytsev/kamigotchi-gdd/catalogs";
const OUT = join(__dirname, "..", "src", "data");

function readCSV<T>(path: string): T[] {
  const raw = readFileSync(path, "utf-8").replace(/^\uFEFF/, ""); // strip BOM
  return parse(raw, {
    columns: true,
    skip_empty_lines: true,
    relax_column_count: true,
    trim: true,
  }) as T[];
}

function num(v: string | undefined): number {
  if (!v || v === "") return 0;
  return Number(v) || 0;
}

function splitNums(v: string | undefined): number[] {
  if (!v || v === "") return [];
  return v.split(",").map((s) => Number(s.trim())).filter((n) => !isNaN(n));
}

// ─── Items ───────────────────────────────────────────────────────────
interface RawItem {
  Index: string;
  Name: string;
  Type: string;
  Rarity: string;
  For: string;
  Flags: string;
  Effects: string;
  Requirements: string;
  Status: string;
  Description: string;
}

interface RawItemEffect {
  Name: string;
  Type: string;
  Descriptor: string;
  Index: string;
  Value: string;
  Terminator: string;
  Droptable: string;
}

interface RawDroptable {
  Name: string;
  Indices: string;
  Tiers: string;
  "Items (resolved names)"?: string;
  Notes?: string;
}

function parseItems() {
  const items = readCSV<RawItem>(join(GDD, "items/items.csv"));
  const effects = readCSV<RawItemEffect>(join(GDD, "items/effects.csv"));
  const droptables = readCSV<RawDroptable>(join(GDD, "items/droptables.csv"));

  const effectMap = new Map(effects.map((e) => [e.Name, {
    name: e.Name,
    type: e.Type,
    descriptor: e.Descriptor,
    index: num(e.Index),
    value: num(e.Value),
    terminator: e.Terminator || null,
    droptable: e.Droptable || null,
  }]));

  const dtMap = new Map(droptables.map((d) => [d.Name, {
    name: d.Name,
    indices: splitNums(d.Indices),
    tiers: splitNums(d.Tiers),
    items: d["Items (resolved names)"] || d.Notes || "",
  }]));

  const itemMap = new Map<number, string>();
  const parsed = items.map((item) => {
    const index = num(item.Index);
    itemMap.set(index, item.Name);
    const effectNames = item.Effects
      ? item.Effects.split(",").map((s) => s.trim()).filter(Boolean)
      : [];
    return {
      index,
      name: item.Name,
      type: item.Type,
      rarity: item.Rarity,
      forTarget: item.For || null,
      flags: item.Flags ? item.Flags.split(",").map((s) => s.trim()) : [],
      effects: effectNames.map((n) => effectMap.get(n) || { name: n, type: "", descriptor: "", index: 0, value: 0, terminator: null, droptable: null }),
      requirements: item.Requirements || null,
      status: item.Status,
      description: item.Description,
    };
  });

  return { items: parsed, itemMap, droptables: [...dtMap.values()] };
}

// ─── Skills ──────────────────────────────────────────────────────────
interface RawSkill {
  ".": string;
  Index: string;
  Name: string;
  Tree: string;
  Tier: string;
  "Tree req": string;
  Max: string;
  Cost: string;
  Effect: string;
  Value: string;
  Units: string;
  Exclusion: string;
  Description: string;
}

interface RawSkillEffect {
  Context: string;
  Key: string;
  Name: string;
  Type: string;
  AsphoAST: string;
  Operation: string;
  Units: string;
  Baseline: string;
  Precision: string;
  Notes: string;
}

function parseSkills() {
  const skills = readCSV<RawSkill>(join(GDD, "skills/skills.csv"));
  const effects = readCSV<RawSkillEffect>(join(GDD, "skills/effects.csv"));

  const effectMap = new Map(effects.map((e) => [e.Key, {
    key: e.Key,
    name: e.Name,
    context: e.Context,
    type: e.Type,
    stat: e.AsphoAST,
    operation: e.Operation,
    units: e.Units,
  }]));

  return skills.map((s) => ({
    index: num(s.Index),
    name: s.Name,
    tree: s.Tree,
    tier: num(s.Tier),
    treeReq: num(s["Tree req"]),
    max: num(s.Max),
    cost: num(s.Cost),
    effect: effectMap.get(s.Effect) || null,
    effectKey: s.Effect,
    value: num(s.Value),
    units: s.Units,
    exclusion: s.Exclusion || null,
    description: s.Description,
  }));
}

// ─── Quests ──────────────────────────────────────────────────────────
interface RawQuest {
  Key: string;
  Index: string;
  Status: string;
  Title: string;
  Daily: string;
  Type: string;
  Giver: string;
  "Introduction Dialogue": string;
  "Resolution Dialogue": string;
  Requirements: string;
  Objectives: string;
  Rewards: string;
}

interface RawObjective {
  ".": string;
  Description: string;
  Operator: string;
  DeltaType: string;
  Type: string;
  Index: string;
  Value: string;
}

interface RawRequirement {
  ".": string;
  Description: string;
  Operator: string;
  Type: string;
  Index: string;
  Value: string;
}

interface RawReward {
  ".": string;
  Description: string;
  Type: string;
  Index: string;
  Value: string;
}

function parseQuests(itemMap: Map<number, string>) {
  const quests = readCSV<RawQuest>(join(GDD, "quests/quests.csv"));
  const objectives = readCSV<RawObjective>(join(GDD, "quests/objectives.csv"));
  const requirements = readCSV<RawRequirement>(join(GDD, "quests/requirements.csv"));
  const rewards = readCSV<RawReward>(join(GDD, "quests/rewards.csv"));

  // Build lookup maps by description (quests reference these by description text)
  const objMap = new Map<string, typeof objectives[0]>();
  objectives.forEach((o) => { if (o.Description) objMap.set(o.Description, o); });
  const reqMap = new Map<string, typeof requirements[0]>();
  requirements.forEach((r) => { if (r.Description) reqMap.set(r.Description, r); });
  const rewMap = new Map<string, typeof rewards[0]>();
  rewards.forEach((r) => { if (r.Description) rewMap.set(r.Description, r); });

  return quests.map((q) => {
    const reqDescs = q.Requirements ? q.Requirements.split("\n").map((s) => s.trim()).filter(Boolean) : [];
    const objDescs = q.Objectives ? q.Objectives.split("\n").map((s) => s.trim()).filter(Boolean) : [];
    const rewDescs = q.Rewards ? q.Rewards.split("\n").map((s) => s.trim()).filter(Boolean) : [];

    return {
      key: q.Key,
      index: num(q.Index),
      status: q.Status,
      title: q.Title,
      daily: q.Daily === "Yes",
      type: q.Type,
      giver: q.Giver,
      introDialogue: q["Introduction Dialogue"] || null,
      resolutionDialogue: q["Resolution Dialogue"] || null,
      requirements: reqDescs.map((d) => {
        const r = reqMap.get(d);
        return {
          description: d,
          type: r?.Type || null,
          index: r ? num(r.Index) : null,
          value: r ? num(r.Value) : null,
        };
      }),
      objectives: objDescs.map((d) => {
        const o = objMap.get(d);
        return {
          description: d,
          deltaType: o?.DeltaType || null,
          type: o?.Type || null,
          index: o ? num(o.Index) : null,
          value: o ? num(o.Value) : null,
        };
      }),
      rewards: rewDescs.map((d) => {
        const r = rewMap.get(d);
        return {
          description: d,
          type: r?.Type || null,
          index: r ? num(r.Index) : null,
          value: r ? num(r.Value) : null,
          itemName: r?.Type === "ITEM" ? itemMap.get(num(r.Index)) || null : null,
        };
      }),
    };
  });
}

// ─── Rooms & Nodes ───────────────────────────────────────────────────
interface RawRoom {
  Index: string;
  Name: string;
  Status: string;
  X: string;
  Y: string;
  Z: string;
  Exits: string;
  Description: string;
}

interface RawNode {
  Index: string;
  Name: string;
  Status: string;
  Drops: string;
  Affinity: string;
  "Level Limit": string;
  YieldIndex: string;
  "Scav Cost": string;
}

interface RawScavDT {
  Name: string;
  Indices: string;
  Tiers: string;
  "Items (resolved names)": string;
}

function parseRooms(itemMap: Map<number, string>) {
  const rooms = readCSV<RawRoom>(join(GDD, "rooms/rooms.csv"));
  const nodes = readCSV<RawNode>(join(GDD, "rooms/nodes.csv"));
  const scavDTs = readCSV<RawScavDT>(join(GDD, "rooms/scavenge-droptables.csv"));

  const nodeMap = new Map(nodes.map((n) => [num(n.Index), n]));
  const dtMap = new Map(scavDTs.map((d) => [d.Name, {
    name: d.Name,
    indices: splitNums(d.Indices),
    tiers: splitNums(d.Tiers),
    items: d.Indices ? splitNums(d.Indices).map((i) => itemMap.get(i) || `Item #${i}`) : [],
  }]));

  return rooms.map((r) => {
    const index = num(r.Index);
    const node = nodeMap.get(index);
    const scavDT = node?.Drops ? dtMap.get(node.Drops) || null : null;
    return {
      index,
      name: r.Name,
      status: r.Status,
      x: num(r.X),
      y: num(r.Y),
      z: num(r.Z),
      exits: splitNums(r.Exits),
      description: r.Description,
      node: node
        ? {
            name: node.Name,
            affinity: node.Affinity,
            levelLimit: num(node["Level Limit"]),
            yieldIndex: num(node.YieldIndex),
            yieldName: itemMap.get(num(node.YieldIndex)) || "MUSU",
            scavCost: num(node["Scav Cost"]),
            droptableName: node.Drops || null,
            droptable: scavDT,
          }
        : null,
    };
  });
}

// ─── Recipes ─────────────────────────────────────────────────────────
interface RawRecipe {
  Index: string;
  Name: string;
  Status: string;
  Type: string;
  "Output Index": string;
  "Output Name": string;
  "Output Amount": string;
  "Input Indices": string;
  "Input Amounts": string;
  "Stamina Cost": string;
  "XP Output": string;
  "Tool Index": string;
  "Tool Name": string;
  "Min Level": string;
}

function parseRecipes(itemMap: Map<number, string>) {
  const recipes = readCSV<RawRecipe>(join(GDD, "crafting/recipes.csv"));
  return recipes.map((r) => {
    const inputIndices = splitNums(r["Input Indices"]);
    const inputAmounts = splitNums(r["Input Amounts"]);
    return {
      index: num(r.Index),
      name: r.Name,
      status: r.Status,
      type: r.Type,
      output: {
        index: num(r["Output Index"]),
        name: r["Output Name"],
        amount: num(r["Output Amount"]),
      },
      inputs: inputIndices.map((idx, i) => ({
        index: idx,
        name: itemMap.get(idx) || `Item #${idx}`,
        amount: inputAmounts[i] || 0,
      })),
      staminaCost: num(r["Stamina Cost"]),
      xpOutput: num(r["XP Output"]),
      tool: num(r["Tool Index"])
        ? { index: num(r["Tool Index"]), name: r["Tool Name"] }
        : null,
      minLevel: num(r["Min Level"]),
    };
  });
}

// ─── Traits ──────────────────────────────────────────────────────────
interface RawTrait {
  Index: string;
  Name: string;
  Affinity?: string;
  Rarity: string;
  Tier: string;
  Tuning: string;
  Health: string;
  Power: string;
  Violence: string;
  Harmony: string;
  Slots?: string;
  Hex?: string;
  BPs: string;
  Gated?: string;
}

function parseTraits() {
  const categories = [
    { file: "bodies.csv", category: "Body", hasAffinity: true },
    { file: "faces.csv", category: "Face", hasAffinity: true },
    { file: "hands.csv", category: "Hand", hasAffinity: true },
    { file: "backgrounds.csv", category: "Background", hasAffinity: false },
    { file: "colors.csv", category: "Color", hasAffinity: false },
  ] as const;

  const all: Array<{
    index: number;
    name: string;
    category: string;
    affinity: string | null;
    rarity: string;
    tier: number;
    health: number;
    power: number;
    violence: number;
    harmony: number;
    slots: number;
    hex: string | null;
    bps: number;
  }> = [];

  for (const cat of categories) {
    const rows = readCSV<RawTrait>(join(GDD, "traits", cat.file));
    for (const row of rows) {
      all.push({
        index: num(row.Index),
        name: row.Name,
        category: cat.category,
        affinity: cat.hasAffinity ? (row.Affinity || "Normal") : null,
        rarity: row.Rarity,
        tier: num(row.Tier),
        health: num(row.Health),
        power: num(row.Power),
        violence: num(row.Violence),
        harmony: num(row.Harmony),
        slots: num(row.Slots),
        hex: row.Hex || null,
        bps: num(row.BPs),
      });
    }
  }

  return all;
}

// ─── NPCs & Listings ─────────────────────────────────────────────────
interface RawNPC {
  Index: string;
  Name: string;
  "Room Index": string;
  "Room Name": string;
}

interface RawListing {
  Name: string;
  Status: string;
  "NPC Index": string;
  "NPC Name": string;
  "Item Index": string;
  "Item Name": string;
  "Currency Index": string;
  "Base Price": string;
  "Buy Price Model": string;
  Requirements: string;
}

function parseNPCs(itemMap: Map<number, string>) {
  const npcs = readCSV<RawNPC>(join(GDD, "npcs/npcs.csv"));
  const listings = readCSV<RawListing>(join(GDD, "npcs/listings.csv"));

  const parsedNPCs = npcs.map((n) => ({
    index: num(n.Index),
    name: n.Name,
    roomIndex: num(n["Room Index"]),
    roomName: n["Room Name"],
  }));

  const parsedListings = listings.map((l) => ({
    name: l.Name,
    status: l.Status,
    npcIndex: num(l["NPC Index"]),
    npcName: l["NPC Name"],
    itemIndex: num(l["Item Index"]),
    itemName: l["Item Name"],
    currencyIndex: num(l["Currency Index"]),
    currencyName: itemMap.get(num(l["Currency Index"])) || `Item #${l["Currency Index"]}`,
    basePrice: l["Base Price"] ? Number(l["Base Price"]) : 0,
    buyPriceModel: l["Buy Price Model"] || "FIXED",
    requirements: l.Requirements || null,
  }));

  return { npcs: parsedNPCs, listings: parsedListings };
}

// ─── Factions ────────────────────────────────────────────────────────
interface RawFaction {
  Image: string;
  Name: string;
  Index: string;
  Key: string;
  Description: string;
}

function parseFactions() {
  const factions = readCSV<RawFaction>(join(GDD, "factions/factions.csv"));
  return factions.map((f) => ({
    index: num(f.Index),
    name: f.Name,
    key: f.Key,
    description: f.Description,
  }));
}

// ─── Quest Lines (markdown) ──────────────────────────────────────────
function parseQuestLines() {
  const md = readFileSync(join(GDD, "quests/quest-lines.md"), "utf-8");
  return md;
}

// ─── Main ────────────────────────────────────────────────────────────
function main() {
  console.log("Parsing catalogs...");

  const { items, itemMap, droptables } = parseItems();
  const skills = parseSkills();
  const quests = parseQuests(itemMap);
  const rooms = parseRooms(itemMap);
  const recipes = parseRecipes(itemMap);
  const traits = parseTraits();
  const { npcs, listings } = parseNPCs(itemMap);
  const factions = parseFactions();
  const questLinesMd = parseQuestLines();

  const write = (name: string, data: unknown) => {
    const path = join(OUT, name);
    writeFileSync(path, JSON.stringify(data, null, 2));
    console.log(`  ${name}: ${Array.isArray(data) ? data.length + " records" : "written"}`);
  };

  write("items.json", items);
  write("item-droptables.json", droptables);
  write("skills.json", skills);
  write("quests.json", quests);
  write("rooms.json", rooms);
  write("recipes.json", recipes);
  write("traits.json", traits);
  write("npcs.json", npcs);
  write("npc-listings.json", listings);
  write("factions.json", factions);
  write("quest-lines.json", { markdown: questLinesMd });

  console.log("Done!");
}

main();
