import {
  MechanicPage,
  InfoBox,
  FormulaBlock,
  StatTable,
} from "@/components/mechanic-page";

function Overview() {
  return (
    <>
      <h2>How Time Works</h2>
      <p>
        Kamigotchi runs on a <strong>36-hour day cycle</strong> &mdash; longer
        than a real-world day. The cycle is split into three 12-hour phases,
        each with a distinct mood and potential gameplay effects.
      </p>

      <h3>The Three Phases</h3>
      <StatTable
        headers={["Phase", "Name", "Hours", "Feel"]}
        rows={[
          ["1", "Daylight", "0 - 11", "Bright and active, the standard daytime"],
          ["2", "Evenfall", "12 - 23", "Dusk settles, the transition into night"],
          ["3", "Moonside", "24 - 35", "Deep night, the most mysterious phase"],
        ]}
      />

      <p>
        The full cycle lasts <strong>36 real-world hours</strong> (1.5 days),
        meaning the phases shift relative to your local time. If Daylight
        starts at noon today, tomorrow it will start at midnight.
      </p>

      <InfoBox variant="tip">
        Because the cycle is 36 hours instead of 24, you will experience
        different phases at different times of your real day. Plan around the
        phase you need &mdash; it won&apos;t always line up with the same time
        of day.
      </InfoBox>

      <h3>What Phases Affect</h3>
      <p>
        The phase system can gate or modify various game mechanics. Certain
        content, NPCs, or events may only be available during a specific phase.
        For example:
      </p>
      <ul>
        <li>Some quests may require kills during a specific phase (e.g. Moonside)</li>
        <li>Scavenging yields or NPC availability could differ by phase</li>
        <li>Special encounters might only appear at night</li>
      </ul>
    </>
  );
}

function Details() {
  return (
    <>
      <h2>Phase Calculation</h2>
      <p>
        The current phase is computed purely from the blockchain timestamp.
        There is no stored state &mdash; the phase is derived on-the-fly:
      </p>

      <FormulaBlock label="Phase from Timestamp">
        {`hour = (block.timestamp / 3600) % 36
phase = floor(hour / 12) + 1`}
      </FormulaBlock>

      <StatTable
        headers={["Hour Range", "Phase", "Name"]}
        rows={[
          ["0 - 11", "1", "Daylight"],
          ["12 - 23", "2", "Evenfall"],
          ["24 - 35", "3", "Moonside"],
        ]}
      />

      <h2>Cycle Timing</h2>
      <StatTable
        headers={["Property", "Value"]}
        rows={[
          ["Full cycle", "36 hours (129,600 seconds)"],
          ["Each phase", "12 hours (43,200 seconds)"],
          ["Phase count", "3"],
          ["Epoch offset", "Cycle starts from Unix epoch (Jan 1, 1970)"],
        ]}
      />

      <InfoBox>
        Since the cycle is anchored to the Unix epoch and repeats every 36
        hours, the cycle is deterministic and identical for all players. You
        can calculate the current phase for any future timestamp using the
        formula above.
      </InfoBox>

      <h2>Phase-Gated Content</h2>
      <p>
        Other game systems can use the current phase to control access or modify
        behavior. Known phase-gated mechanics include:
      </p>
      <StatTable
        headers={["System", "Phase Usage"]}
        rows={[
          ["Kill logging", "Kills are tracked per phase (LIQ_WHEN_{phase}), enabling phase-specific quest objectives"],
          ["Quest objectives", "Some quests can require actions during a specific phase"],
          ["Future systems", "NPC schedules, enemy behavior, and environmental effects may vary by phase"],
        ]}
      />
    </>
  );
}

export default function TimePage() {
  return (
    <MechanicPage
      title="Day/Night Cycle"
      subtitle="A 36-hour cycle with 3 phases: Daylight, Evenfall, and Moonside"
      overview={<Overview />}
      details={<Details />}
    />
  );
}
