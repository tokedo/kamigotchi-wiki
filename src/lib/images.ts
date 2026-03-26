/**
 * Converts an item/skill name to its image filename using the same
 * cleanName() convention as the game client.
 */
export function cleanName(name: string): string {
  if (!name) return "";
  let clean = name.toLowerCase();
  clean = clean.replaceAll(/ /g, "_").replaceAll(/-/g, "_");
  clean = clean.replaceAll("(", "").replaceAll(")", "");
  clean = clean.replaceAll("'", "").replaceAll("\u2019", "");
  clean = clean.replaceAll('"', "").replaceAll("\u201C", "").replaceAll("\u201D", "");
  return clean;
}

export function itemImagePath(name: string): string {
  return `/img/items/${cleanName(name)}.png`;
}

export function iconPath(name: string): string {
  return `/img/icons/${cleanName(name)}.png`;
}
