"use client";

import {
  MechanicPage,
  InfoBox,
  FormulaBlock,
  StatTable,
} from "@/components/mechanic-page";
import { useState } from "react";
import recipes from "@/data/recipes.json";

export default function CraftingPage() {
  return (
    <MechanicPage
      title="Crafting"
      subtitle="Combine materials into potions, reagents, and gear — 41 recipes to master"
      overview={<Overview />}
      details={<Details />}
    />
  );
}

function Overview() {
  return (
    <>
      <h2>How Crafting Works</h2>
      <p>
        Crafting lets you combine input items into output items using predefined
        recipes. Gather the right materials, make sure you have the right tool,
        and spend some stamina to create something new.
      </p>
      <p>
        The basic flow is:
      </p>
      <ol>
        <li>Find a recipe you want to craft</li>
        <li>Gather the required input materials</li>
        <li>
          Make sure you own the required <strong>tool</strong> (if the recipe
          needs one)
        </li>
        <li>Meet any level or location requirements</li>
        <li>
          Craft it! The inputs are consumed, stamina is spent, and you receive
          the output items plus XP
        </li>
      </ol>

      <h2>Crafting Tools</h2>
      <p>
        Most recipes require you to own a specific tool. Tools are{" "}
        <strong>not consumed</strong> during crafting — you just need to have
        one in your inventory.
      </p>
      <StatTable
        headers={["Tool", "Where to Get It", "Price"]}
        rows={[
          ["Spice Grinder", "Buy from Mina (Room 13)", "2,500 Musu"],
          ["Portable Burner", "Buy from Mina (Room 13)", "4,000 Musu"],
          ["Screwdriver", "Found in-game", "—"],
        ]}
      />

      <h2>Batch Crafting</h2>
      <p>
        You can craft multiple copies of a recipe in a single transaction by
        specifying an amount. Both inputs and outputs scale linearly:
      </p>
      <ul>
        <li>Crafting 5x a recipe uses 5x the inputs</li>
        <li>You receive 5x the outputs</li>
        <li>Stamina cost is 5x</li>
        <li>XP reward is 5x</li>
      </ul>

      <InfoBox variant="tip">
        Batch crafting saves you time and gas fees compared to crafting one at a
        time. If you have the materials, always craft in bulk!
      </InfoBox>

      <h2>Stamina and XP</h2>
      <p>
        Every recipe costs <strong>stamina</strong> to craft and rewards{" "}
        <strong>XP</strong> on completion. Higher-tier recipes generally cost
        more stamina but give significantly more XP, making crafting one of the
        best ways to level up your account.
      </p>

      <h2>Recipe Table</h2>
      <RecipeTable />
    </>
  );
}

function Details() {
  return (
    <>
      <h2>Crafting Process (Technical)</h2>
      <p>
        The crafting system executes these steps in order:
      </p>
      <ol>
        <li>Verify recipe exists in the registry</li>
        <li>
          Verify requirements — check all conditions (account level, location,
          item ownership, etc.)
        </li>
        <li>Sync account — update stamina based on elapsed time</li>
        <li>Deduct stamina cost (cost per craft multiplied by amount)</li>
        <li>
          Consume input items (amounts multiplied by batch size — reverts if you
          do not have enough)
        </li>
        <li>Produce output items (amounts multiplied by batch size)</li>
        <li>Grant XP (recipe XP multiplied by batch size)</li>
      </ol>

      <h2>Scaling Formulas</h2>
      <FormulaBlock label="Batch Crafting">
        {
          "actualInputs[i]  = recipe.inputAmounts[i]  x amount\nactualOutputs[i] = recipe.outputAmounts[i] x amount\ntotalStamina     = staminaCost x amount\ntotalXP          = recipeXP x amount"
        }
      </FormulaBlock>

      <h2>Requirements System</h2>
      <p>
        Recipes can have conditional requirements checked before crafting.
        Common requirement types include:
      </p>
      <ul>
        <li>Minimum account level</li>
        <li>Being in a specific location</li>
        <li>Owning specific items (tools are checked this way)</li>
      </ul>

      <h2>Full Recipe Data</h2>
      <RecipeTable />
    </>
  );
}

function RecipeTable() {
  const [filter, setFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");

  const types = ["ALL", ...Array.from(new Set(recipes.map((r) => r.type)))];

  const filtered = recipes.filter((r) => {
    const matchesText =
      filter === "" ||
      r.name.toLowerCase().includes(filter.toLowerCase()) ||
      r.output.name.toLowerCase().includes(filter.toLowerCase());
    const matchesType = typeFilter === "ALL" || r.type === typeFilter;
    return matchesText && matchesType;
  });

  return (
    <div className="not-prose">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          placeholder="Search recipes..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-md border border-border bg-background px-3 py-2 text-sm"
        />
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-md border border-border bg-background px-3 py-2 text-sm"
        >
          {types.map((t) => (
            <option key={t} value={t}>
              {t === "ALL" ? "All Types" : t}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-3 py-2 text-left font-medium">Recipe</th>
              <th className="px-3 py-2 text-left font-medium">Output</th>
              <th className="px-3 py-2 text-left font-medium">Inputs</th>
              <th className="px-3 py-2 text-left font-medium">Tool</th>
              <th className="px-3 py-2 text-right font-medium">Stamina</th>
              <th className="px-3 py-2 text-right font-medium">XP</th>
              <th className="px-3 py-2 text-right font-medium">Min Lvl</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((recipe) => (
              <tr
                key={recipe.index}
                className="border-b border-border last:border-0"
              >
                <td className="px-3 py-2 font-medium">{recipe.name}</td>
                <td className="px-3 py-2">
                  {recipe.output.amount}x {recipe.output.name}
                </td>
                <td className="px-3 py-2">
                  <ul className="list-none space-y-0.5">
                    {recipe.inputs.map((input, i) => (
                      <li key={i} className="text-xs text-muted-foreground">
                        {input.amount}x {input.name}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-3 py-2 text-xs">
                  {recipe.tool ? recipe.tool.name : "None"}
                </td>
                <td className="px-3 py-2 text-right">{recipe.staminaCost}</td>
                <td className="px-3 py-2 text-right">
                  {recipe.xpOutput.toLocaleString()}
                </td>
                <td className="px-3 py-2 text-right">{recipe.minLevel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Showing {filtered.length} of {recipes.length} recipes
      </p>
    </div>
  );
}
