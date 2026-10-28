import type { Metadata } from "next";
import Link from "next/link";
import { brand } from "@/data/jedlikData";
import {
  snapshot,
  prototypeBuilds,
  vehicleSpecs,
  valueProposition,
  validationTiles,
  canvasBlocks,
  revenueStreams,
  bomRows,
  unitEconomics,
  productionPlan,
  darkFactory,
  cells,
  equipmentAllocation,
  goToMarket,
  fundUse,
  burn,
  capTable,
  operations,
  patents,
  milestones,
  projectionHeadline,
} from "@/data/detailData";
import DetailNav from "@/components/DetailNav";
import {
  AnimatedBar,
  ColumnChart,
  CountUpNumber,
  DonutChart,
  LineChart,
} from "@/components/charts/ChartParts";
import { SpecTile } from "@/components/charts/SpecVisuals";
import {
  CanvasWheel,
  CompareBars,
  StageTimeline,
  TaktChart,
} from "@/components/charts/DiagramParts";
import ValidationCollage from "@/components/charts/ValidationCollage";
import { IconStat, PrototypeCard, ValuePropStrip } from "@/components/charts/IconStats";
import InvestButton from "@/components/InvestButton";

/**
 * Founders are the people who built the company, so they are highlighted in
 * red on the ownership chart. Roles are written out in full in the data
 * ("Founder and CEO", "Co-founder and CTO", ...), so both spellings count.
 */
function isFounder(kind: string): boolean {
  return /(^|co-)founder/i.test(kind);
}

export const metadata: Metadata = {
  title: `${brand.name} — Detailed Information`,
  description:
    "The full investor detail for the e-POD: business model, unit economics, manufacturing plan, go-to-market, use of funds, cap table, operations, IP and the 14-year projection.",
};

/* ------------------------------------------------------------------ */
/* Small shared pieces                                                 */
/* ------------------------------------------------------------------ */

function Section({
  id,
  index,
  eyebrow,
  title,
  lede,
  children,
}: {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  lede?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-rule px-6 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-deck">
        <p className="eyebrow">
          {index} — {eyebrow}
        </p>
        <h2 className="display-lg mt-4 max-w-[20ch] text-ink">{title}</h2>
        {lede ? (
          <p className="mt-5 max-w-[62ch] text-sm leading-relaxed text-muted md:text-base">{lede}</p>
        ) : null}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="border-t-2 border-ink bg-white px-4 py-5">
      <p className="eyebrow">{label}</p>
      <p
        className={`mt-2 font-display text-xl font-bold leading-tight tracking-tight md:text-2xl ${
          accent ? "text-red" : "text-ink"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-6 border-l-2 border-red bg-red-soft/40 px-4 py-3 text-xs leading-relaxed text-ink md:text-sm">
      {children}
    </p>
  );
}

function DataTable({
  head,
  rows,
}: {
  head: string[];
  rows: (string | number)[][];
}) {
  return (
    <div className="-mx-6 overflow-x-auto px-6 md:mx-0 md:px-0">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead>
          <tr>
            {head.map((h) => (
              <th
                key={h}
                className="border-b-2 border-ink pb-3 pr-6 font-display text-[0.65rem] font-bold uppercase tracking-[0.16em] text-ink"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-rule align-top">
              {r.map((c, j) => (
                <td
                  key={j}
                  className={`py-3.5 pr-6 text-sm leading-relaxed ${
                    j === 0 ? "font-display font-semibold text-ink" : "text-muted"
                  }`}
                >
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* The page                                                            */
/* ------------------------------------------------------------------ */

export default function DetailPage() {
  return (
    <main className="relative bg-paper">
      <DetailNav />

      {/* ---------- Hero ---------- */}
      <section className="px-6 pb-12 pt-28 md:px-10 md:pb-16 md:pt-36">
        <div className="mx-auto max-w-deck">
          <p className="eyebrow">Detailed information — e-POD</p>
          <h1 className="display-xl mt-4 text-ink">
            The full
            <br />
            picture
          </h1>
          <p className="mt-6 max-w-[60ch] text-sm leading-relaxed text-muted md:text-base">
            Everything behind the brief deck: the business model, the cost curve, how the
            factory is built, where the money goes, who owns what, and the fourteen-year
            projection. Every figure here comes from the company&rsquo;s own records and
            founder-confirmed numbers.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center border border-rule px-5 py-2.5 font-display text-xs font-bold uppercase tracking-[0.16em] text-ink transition-colors hover:border-ink"
            >
              &larr; Back to the deck
            </Link>
            <a
              href="#snapshot"
              className="inline-flex items-center bg-red px-5 py-2.5 font-display text-xs font-bold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-red-deep"
            >
              Start with the snapshot
            </a>
          </div>
        </div>
      </section>

      {/* ---------- 01 Snapshot ---------- */}
      <Section
        id="snapshot"
        index="01"
        eyebrow="Snapshot"
        title="Where the company stands today"
        lede="Two physical prototypes built and driven. A granted patent, a second filing published, and a funded plan to take both to a finished vehicle."
      >
        <div className="grid grid-cols-2 gap-px border border-rule bg-rule md:grid-cols-3 lg:grid-cols-5">
          {snapshot.map((s, i) => (
            <IconStat key={s.label} label={s.label} value={s.value} index={i} />
          ))}
        </div>
      </Section>

      {/* ---------- 02 Prototypes ---------- */}
      <Section
        id="prototypes"
        index="02"
        eyebrow="Prototypes"
        title="Two vehicles have been built"
        lede="Alpha and Beta. Beta drove under its own power on public roads."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {prototypeBuilds.map((b, i) => (
            <PrototypeCard key={b.name} name={b.name} detail={b.detail} index={i} />
          ))}
        </div>

      </Section>

      {/* ---------- 03 Validation ---------- */}
      <Section id="validation" index="03" eyebrow="Validation" title="The market answered before we did">
        <ValidationCollage tiles={validationTiles} />
      </Section>

      {/* ---------- 04 Product ---------- */}
      <Section
        id="product"
        index="04"
        eyebrow="Product"
        title="What the e-POD is"
        lede="A fully enclosed two-wheeled electric vehicle. Car-grade safety and weather protection at two-wheeler scale."
      >
        <div>
          <p className="eyebrow">What it promises</p>
          <div className="mt-5">
            <ValuePropStrip items={valueProposition} />
          </div>
        </div>
      </Section>

      {/* ---------- 05 Vehicle specifications ---------- */}
      <Section
        id="specifications"
        index="05"
        eyebrow="Vehicle specifications"
        title="Technical specifications"
        lede="The measured and targeted specifications of the e-POD."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {vehicleSpecs.map((s, i) => (
            <SpecTile key={s.spec} spec={s.spec} value={s.value} index={i} />
          ))}
        </div>
      </Section>

      {/* ---------- 06 Business model ---------- */}
      <Section
        id="model"
        index="06"
        eyebrow="Business model"
        title="How the business is put together"
        lede="The nine blocks of the business model canvas, as the founders have framed them."
      >
        <CanvasWheel blocks={canvasBlocks} />
      </Section>

      {/* ---------- 07 Revenue mix ---------- */}
      <Section
        id="revenue"
        index="07"
        eyebrow="Revenue mix"
        title="Where the money comes from"
        lede="Vehicle sales carry the business. The rest is the recurring layer that builds on top of a growing fleet."
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center">
          <DonutChart
            slices={revenueStreams.map((r, i) => ({
              label: r.label,
              value: r.share,
              color: i === 0 ? "red" : i === 1 ? "ink" : "muted",
            }))}
            centreLabel="Vehicle sales"
            centreValue={`${revenueStreams[0].share}%`}
          />

          <div className="space-y-5">
            {revenueStreams.map((r, i) => (
              <div key={r.label}>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-sm font-medium text-ink">{r.label}</span>
                  <span className="font-display text-sm font-bold text-ink">{r.share}%</span>
                </div>
                <AnimatedBar
                  percent={r.share}
                  color={i === 0 ? "red" : "ink"}
                  delay={i * 0.1}
                  className="mt-2"
                />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ---------- 08 Unit economics ---------- */}
      <Section
        id="economics"
        index="08"
        eyebrow="Unit economics"
        title="What one vehicle costs, and what it earns"
        lede="The full material bill of materials, and where cost lands as volume scales."
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          <div>
            <p className="eyebrow">Where the cost sits</p>
            <div className="mt-5">
              <DonutChart
                slices={bomRows.map((r, i) => ({
                  label: r.element,
                  value: r.percent,
                  color: i === 0 ? "red" : i === 1 ? "ink" : "muted",
                }))}
                size={200}
                thickness={30}
                centreLabel="Total BOM"
                centreValue={unitEconomics.bomTotal}
              />
            </div>
          </div>

          <div>
            <p className="eyebrow">The cost curve as volume scales</p>
            <div className="mt-5">
              <LineChart
                labels={["Prototype", "100K units", "Sell price"]}
                series={[
                  {
                    name: "Cost per vehicle",
                    color: "ink",
                    points: [
                      { y: Number(unitEconomics.prototypeValue) },
                      { y: Number(unitEconomics.volumeValue) },
                      { y: Number(unitEconomics.sellPriceValue) },
                    ],
                  },
                ]}
                logScale={false}
                format="rupeesK"
                height={230}
              />
            </div>
            <Note>
              Cost falls as volume rises; the sell price holds. The gap between them is
              the gross profit on every vehicle.
            </Note>
          </div>
        </div>

        <div className="mt-8 grid gap-px border border-rule bg-rule md:grid-cols-4">
          <Stat label="Total BOM" value={unitEconomics.bomTotal} accent />
          <Stat label="Prototype cost" value={unitEconomics.prototype} />
          <Stat label="Volume cost (100K)" value={unitEconomics.volume} />
          <Stat label="Sell price" value={unitEconomics.sellPrice} />
        </div>

        <div className="mt-px grid gap-px border border-rule bg-rule md:grid-cols-2">
          <Stat label="Gross profit per vehicle" value={unitEconomics.grossProfit} />
          <Stat label="Gross margin" value={unitEconomics.grossMargin} accent />
        </div>

        <p className="mt-6 font-display text-base font-semibold leading-relaxed tracking-tight text-ink md:text-lg">
          {unitEconomics.headline}
        </p>

        <div className="mt-10">
          <p className="eyebrow">Full bill of materials</p>
          <div className="mt-5">
            <DataTable
              head={["Cost element", "Share", "Per vehicle", "Contents"]}
              rows={bomRows.map((r) => [r.element, `${r.percent}%`, r.rupees, r.contents])}
            />
          </div>
        </div>

        <div className="mt-10">
          <p className="eyebrow">Production plan</p>
          <div className="mt-5 grid gap-px border border-rule bg-rule md:grid-cols-2">
            {productionPlan.map((p) => (
              <div key={p.label} className="bg-white px-5 py-4">
                <p className="font-display text-[0.65rem] font-bold uppercase tracking-[0.16em] text-red">
                  {p.label}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink">{p.value}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ---------- 09 Manufacturing ---------- */}
      <Section
        id="manufacturing"
        index="09"
        eyebrow="Manufacturing"
        title="The dark factory"
        lede={darkFactory.sub}
      >
        <p className="font-display text-2xl font-bold uppercase tracking-tight text-ink md:text-3xl">
          {darkFactory.headline}
        </p>

        <div className="mt-8 grid gap-px border border-rule bg-rule md:grid-cols-4">
          <Stat label="Equipment CapEx" value={darkFactory.capex} accent />
          <Stat label="Staff" value={darkFactory.staff} />
          <Stat label="Takt" value={darkFactory.takt} />
          <Stat label="Payback" value={darkFactory.payback} />
        </div>

        <div className="mt-8">
          <p className="eyebrow">Dark factory against manual CKD</p>
          <div className="mt-5">
            <CompareBars
              rows={[
                {
                  label: "Equipment CapEx",
                  ours: darkFactory.capex,
                  theirs: darkFactory.capexManual,
                  effect: "~60% lower upfront",
                  oursValue: 7,
                  theirsValue: 20,
                },
                {
                  label: "Staff",
                  ours: `${darkFactory.staff} staff`,
                  theirs: `${darkFactory.staffManual} staff`,
                  effect: "~90% headcount reduction",
                  oursValue: 7,
                  theirsValue: 72,
                },
              ]}
            />
          </div>
        </div>

        <div className="mt-8 grid gap-px border border-rule bg-rule md:grid-cols-4">
          <Stat label="Output" value={darkFactory.output} />
          <Stat label="Operating days" value={darkFactory.days} />
          <Stat label="Efficiency" value={darkFactory.oee} />
          <Stat label="Annual labour saving" value={darkFactory.labourSaving} accent />
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Five-cell layout</p>
            <div className="mt-5">
              <TaktChart cells={cells} taktMinutes={202} />
            </div>
            <Note>
              The cells run in parallel, so their cycle times are not additive — the
              202-minute takt is the constraint that sets the output rate.
            </Note>
          </div>

          <div>
            <p className="eyebrow">Equipment allocation</p>
            <div className="mt-5 space-y-3">
              {equipmentAllocation.map((e) => (
                <div key={e.item}>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-sm font-medium text-ink">{e.item}</span>
                    <span className="font-display text-sm font-bold text-ink">{e.share}%</span>
                  </div>
                  <div className="mt-2 h-2 w-full bg-rule">
                    <div className="h-2 bg-red" style={{ width: `${e.share}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm leading-relaxed text-muted">{darkFactory.roi}</p>
          </div>
        </div>
      </Section>

      {/* ---------- 10 Go to market ---------- */}
      <Section
        id="gtm"
        index="10"
        eyebrow="Go to market"
        title="The path from pilot to break-even"
        lede="Four stages, each with a different scale and a different commercial model."
      >
        <StageTimeline stages={goToMarket} />
      </Section>

      {/* ---------- 11 The round ---------- */}
      <Section
        id="round"
        index="11"
        eyebrow="The round"
        title="₹7 crore, and exactly what it buys"
        lede="Every rupee is assigned to a named milestone. This is the plan, not the intention."
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-center">
          <DonutChart
            slices={fundUse.map((f, i) => ({
              label: f.bucket,
              value: f.percent,
              color: i === 0 ? "red" : i === 1 ? "ink" : "muted",
            }))}
            centreLabel="Total round"
            centreValue="₹7 Cr"
          />

          <div className="space-y-6">
            {fundUse.map((f, i) => (
              <div key={f.bucket} className="border border-rule bg-white p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="font-display text-lg font-bold tracking-tight text-ink">
                    {f.bucket}
                  </h3>
                  <p className="font-display text-lg font-bold text-red">
                    {f.amount}
                    <span className="ml-2 text-sm font-semibold text-muted">{f.percent}%</span>
                  </p>
                </div>
                <AnimatedBar
                  percent={f.percent}
                  color="red"
                  delay={i * 0.1}
                  height="h-1.5"
                  className="mt-3"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <p className="eyebrow">Burn and runway</p>
          <div className="mt-5 grid gap-px border border-rule bg-rule md:grid-cols-3">
            <Stat label="Monthly burn" value={burn.monthly} accent />
            <Stat label="Runway" value={burn.runway} />
            <Stat label="Capital at current burn" value={burn.implied} />
          </div>
          <Note>{burn.note}</Note>
        </div>
      </Section>

      {/* ---------- 12 Cap table ---------- */}
      <Section
        id="captable"
        index="12"
        eyebrow="Cap table"
        title="Who owns the company"
        lede="Founders hold 87%. The incubator and the three angels hold the balance."
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
          <DonutChart
            slices={capTable.map((h) => ({
              label: h.name,
              value: h.percent,
              color: isFounder(h.kind) ? "red" : "ink",
            }))}
            centreLabel="Founders hold"
            centreValue="87%"
          />

          <div className="space-y-4">
            {capTable.map((h) => (
              <div key={h.name}>
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <span
                      className={`text-sm font-medium ${
                        isFounder(h.kind) ? "text-red" : "text-ink"
                      }`}
                    >
                      {h.name}
                    </span>
                    <span className="ml-2 text-xs text-muted">{h.kind}</span>
                  </div>
                  <span className="font-display text-sm font-bold text-ink">{h.percent}%</span>
                </div>
                <AnimatedBar
                  percent={h.percent}
                  color={isFounder(h.kind) ? "red" : "ink"}
                  height="h-2"
                  className="mt-1.5"
                />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ---------- 13 Operations ---------- */}
      <Section
        id="operations"
        index="13"
        eyebrow="Operations and supply chain"
        title="How the company operates"
        lede="Deliberately asset-light where it does not need to be, and rigorous where safety demands it."
      >
        <div className="grid gap-px border border-rule bg-rule md:grid-cols-2">
          {operations.map((o) => (
            <div key={o.title} className="bg-white p-6">
              <h3 className="font-display text-base font-bold tracking-tight text-ink">
                {o.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{o.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ---------- 14 IP ---------- */}
      <Section
        id="ip"
        index="14"
        eyebrow="Intellectual property"
        title="Two patents"
        lede="One granted, one published and under examination. International filings are funded by this round."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {patents.map((p) => (
            <div key={p.title} className="border border-rule bg-white p-6">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-base font-bold leading-snug tracking-tight text-ink">
                  {p.title}
                </h3>
                <span
                  className={`shrink-0 px-2.5 py-1 font-display text-[0.6rem] font-bold uppercase tracking-[0.16em] ${
                    p.status === "Granted" ? "bg-red text-paper" : "border border-rule text-muted"
                  }`}
                >
                  {p.status}
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">{p.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ---------- 15 Projection ---------- */}
      <Section
        id="projection"
        index="15"
        eyebrow="Financial projection"
        title="Fourteen years, five milestones"
        lede="Figures in USD at ₹83 to the dollar. This is the forecast that sits behind the round."
      >
        <div className="grid gap-px border border-rule bg-rule md:grid-cols-3 lg:grid-cols-6">
          {projectionHeadline.map((p) => (
            <Stat key={p.label} label={p.label} value={p.value} />
          ))}
        </div>

        <div className="mt-10">
          <p className="eyebrow">Revenue and valuation, on a log scale</p>
          <div className="mt-5">
            <LineChart
              labels={milestones.map((m) => m.year)}
              series={[
                {
                  name: "Revenue",
                  color: "red",
                  points: milestones.map((m) => ({ y: Number(m.revenueValue) })),
                },
                {
                  name: "Valuation",
                  color: "ink",
                  points: milestones.map((m) => ({ y: Number(m.valuationValue) })),
                },
              ]}
              format="usdM"
              height={280}
            />
          </div>
        </div>

        <div className="mt-10">
          <DataTable
            head={["Year", "Milestone", "Units", "Revenue", "Valuation"]}
            rows={milestones.map((m) => [m.year, m.label, m.units, m.revenue, m.valuation])}
          />
        </div>

        <Note>
          Breakeven lands in FY2035, Year 8. Gross margin opens at 10% and widens to 30%
          as volume scales. Across the same period, capital raised grows steadily while
          valuation compounds far faster — that multiple expansion is what the plan
          depends on.
        </Note>
      </Section>

      {/* ---------- Closing — the ask ---------- */}
      <section
        id="invest"
        className="scroll-mt-24 border-t border-rule bg-ink px-6 py-16 md:px-10 md:py-20"
      >
        <div className="mx-auto max-w-deck">
          <p className="eyebrow text-paper/60">The ask</p>
          <h2 className="display-lg mt-4 max-w-[20ch] text-paper">
            Join us for ₹7 crore
          </h2>
          <p className="mt-5 max-w-[58ch] text-sm leading-relaxed text-paper/70 md:text-base">
            This page is the evidence behind every number in the short deck. If it
            holds up, the next step is a conversation about taking the round.
            We are raising ₹7 crore to put the vehicle on the road, fund the
            tooling, and clear the certifications that turn a prototype into a
            product someone can buy.
          </p>

          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <h3 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-paper">
                What the round buys
              </h3>
              <ul className="mt-6 space-y-5">
                {[
                  {
                    title: "₹2.8 crore into product R&D",
                    body: "The next vehicle, built for Indian roads and Indian weather, not an imported platform.",
                  },
                  {
                    title: "₹1.75 crore into manufacturing",
                    body: "Line setup and tooling that take us from hand-built to production volume.",
                  },
                  {
                    title: "₹1.4 crore into regulatory and IP",
                    body: "Homologation, the certifications a road vehicle needs, and the patents that protect it.",
                  },
                  {
                    title: "₹1.05 crore into team and operations",
                    body: "The people and supply chain that turn one prototype into a repeatable product.",
                  },
                ].map((item) => (
                  <li key={item.title} className="border-l border-paper/20 pl-5">
                    <p className="font-display text-sm font-bold text-paper md:text-base">
                      {item.title}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-paper/60">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:pt-1">
              <div className="border border-paper/15 bg-paper/[0.03] p-7 md:p-9">
                <p className="font-display text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-paper/50">
                  Round size
                </p>
                <p className="display-lg mt-3 text-paper">₹7 Cr</p>
                <div className="mt-7 space-y-3 border-t border-paper/15 pt-6">
                  {[
                    ["Monthly burn", "₹13 L"],
                    ["Runway today", "1.5 years"],
                    ["Cap table", "Founders 87%"],
                    ["Next milestone", "Production vehicle"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-baseline justify-between gap-6"
                    >
                      <span className="text-sm text-paper/60">{label}</span>
                      <span className="font-display text-sm font-bold text-paper">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <InvestButton
                  label="Invest in Jedlik"
                  className="!m-0 !border-red !bg-red !px-6 !py-3.5 !text-xs hover:!border-paper hover:!bg-paper hover:!text-ink"
                />
                <p className="mt-4 text-xs leading-relaxed text-paper/50">
                  Leave your email and we will send the data room, the full
                  financial model, and a time to talk. If you would rather read
                  first, the numbers are all above.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-paper/15 pt-8">
            <a
              href="#snapshot"
              className="font-display text-xs font-bold uppercase tracking-[0.16em] text-paper/70 transition-colors hover:text-paper"
            >
              Top of this page
            </a>
            <Link
              href="/"
              className="font-display text-xs font-bold uppercase tracking-[0.16em] text-paper/70 transition-colors hover:text-paper"
            >
              Back to the short deck
            </Link>
            <p className="w-full text-xs text-paper/40 md:w-auto md:ml-auto">
              Raguram S K · Muthuram · Nishanthraj — Jedlik Motors
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
