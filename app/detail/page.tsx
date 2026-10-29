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
import ScrollToTopOnMount from "@/components/ScrollToTopOnMount";
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
} from "@/components/charts/DiagramParts";
import ValidationCollage from "@/components/charts/ValidationCollage";
import { IconStat, PrototypeCard, ValuePropStrip } from "@/components/charts/IconStats";
import InvestButton from "@/components/InvestButton";
import DeckShell from "@/components/DeckShell";

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

/**
 * A long topic split into one full-viewport snap section per content block.
 *
 * Forcing a multi-screen topic into a single fitted slide crushes it to the
 * 0.5 scale floor and still clips the tail. Instead each block becomes its
 * own `main > section`, so DeckShell's existing per-section fit gives it a
 * full screen at full scale, and the detail deck's proximity snap rests at
 * each block. The first block carries the real eyebrow/title/lede; every
 * later block shows a small continuation header naming the block, so the
 * reader always knows which section they are in without the topic's intro
 * repeating on every screen.
 */
function SectionPages({
  id,
  index,
  eyebrow,
  title,
  lede,
  blocks,
}: {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  lede?: string;
  blocks: { key: string; label: string; node: React.ReactNode }[];
}) {
  return (
    <>
      {blocks.map((b, i) => (
        <section
          key={b.key}
          id={i === 0 ? id : `${id}-part-${i + 1}`}
          className="scroll-mt-24 border-t border-rule px-6 py-14 md:px-10 md:py-20"
        >
          <div className="mx-auto max-w-deck">
            {i === 0 ? (
              <>
                <p className="eyebrow">
                  {index} — {eyebrow}
                </p>
                <h2 className="display-lg mt-4 max-w-[20ch] text-ink">{title}</h2>
                {lede ? (
                  <p className="mt-5 max-w-[62ch] text-sm leading-relaxed text-muted md:text-base">
                    {lede}
                  </p>
                ) : null}
              </>
            ) : (
              <>
                <p className="eyebrow">
                  {index} — {eyebrow}
                  <span className="text-muted"> · continued</span>
                </p>
                <h2 className="mt-3 font-display text-xl font-bold tracking-tight text-ink md:text-2xl">
                  {b.label}
                </h2>
              </>
            )}
            <div className="mt-8">{b.node}</div>
          </div>
        </section>
      ))}
    </>
  );
}

function Stat({
  label,
  value,
  accent,
  span = 1,
}: {
  label: string;
  value: string;
  accent?: boolean;
  span?: 1 | 2;
}) {
  return (
    <div
      className={`bg-paper-2 px-4 py-5 ${span === 2 ? "md:col-span-2" : ""}`}
    >
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
      <table className="w-full min-w-[640px] border-collapse bg-paper-2 text-left">
        <thead>
          <tr>
            {head.map((h) => (
              <th
                key={h}
                className="border-b-2 border-ink pb-3 pr-6 font-display text-[0.75rem] font-bold uppercase tracking-[0.16em] text-ink"
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
    <main className="deck-detail deck-photo-bg relative">
      <ScrollToTopOnMount />
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
              className="inline-flex min-h-[44px] items-center border border-rule px-5 py-2.5 font-display text-xs font-bold uppercase tracking-[0.16em] text-ink transition-colors hover:border-ink"
            >
              &larr; Back to the deck
            </Link>
            <a
              href="#snapshot"
              className="inline-flex min-h-[44px] items-center bg-red px-5 py-2.5 font-display text-xs font-bold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-red-deep"
            >
              Start with the snapshot
            </a>
          </div>
        </div>
      </section>

      {/* ---------- 01 Snapshot ---------- */}
      <DeckShell
        title="Jedlik Motors — Detailed"
        sectionSelector=".deck-shell > section"
        fitToViewport
      >
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
              <div key={r.label} className="bg-paper-2 px-4 py-3">
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
      <SectionPages
        id="economics"
        index="08"
        eyebrow="Unit economics"
        title="What one vehicle costs, and what it earns"
        lede="The full material bill of materials, and where cost lands as volume scales."
        blocks={[
          {
            key: "cost-split",
            label: "Where the cost sits, and the cost curve",
            node: (
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
                    Cost falls as volume rises; the sell price holds. The gap between them
                    is the gross profit on every vehicle.
                  </Note>
                </div>
              </div>
            ),
          },
          {
            key: "economics-headline",
            label: "The headline numbers",
            node: (
              <>
                <div className="grid gap-px border-y-2 border-ink bg-rule md:grid-cols-4">
                  <Stat label="Total BOM" value={unitEconomics.bomTotal} accent />
                  <Stat label="Prototype cost" value={unitEconomics.prototype} />
                  <Stat label="Volume cost (100K)" value={unitEconomics.volume} />
                  <Stat label="Sell price" value={unitEconomics.sellPrice} />
                  <Stat
                    label="Gross profit per vehicle"
                    value={unitEconomics.grossProfit}
                    span={2}
                  />
                  <Stat
                    label="Gross margin"
                    value={unitEconomics.grossMargin}
                    accent
                    span={2}
                  />
                </div>

                <p className="mt-6 bg-paper-2 px-4 py-3 font-display text-base font-semibold leading-relaxed tracking-tight text-ink md:text-lg">
                  {unitEconomics.headline}
                </p>
              </>
            ),
          },
          {
            key: "full-bom",
            label: "Full bill of materials",
            node: (
              <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
                <div>
                  <p className="eyebrow">Full bill of materials</p>
                  <div className="mt-5">
                    <DataTable
                      head={["Cost element", "Share", "Per vehicle", "Contents"]}
                      rows={bomRows.map((r) => [
                        r.element,
                        `${r.percent}%`,
                        r.rupees,
                        r.contents,
                      ])}
                    />
                  </div>
                </div>
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
              </div>
            ),
          },
          {
            key: "production-plan",
            label: "Production plan",
            node: (
              <>
                <p className="eyebrow">Production plan</p>
                <div className="mt-5 grid gap-px border border-rule bg-rule md:grid-cols-2">
                  {productionPlan.map((p) => (
                    <div key={p.label} className="bg-paper-2 px-5 py-4">
                      <p className="font-display text-[0.75rem] font-bold uppercase tracking-[0.16em] text-red">
                        {p.label}
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink">{p.value}</p>
                    </div>
                  ))}
                </div>
              </>
            ),
          },
        ]}
      />

      {/* ---------- 09 Manufacturing ---------- */}
      <SectionPages
        id="manufacturing"
        index="09"
        eyebrow="Manufacturing"
        title="The dark factory"
        lede={darkFactory.sub}
        blocks={[
          {
            key: "headline",
            label: "The dark factory at a glance",
            node: (
              <>
                <p className="font-display text-2xl font-bold uppercase tracking-tight text-ink md:text-3xl">
                  {darkFactory.headline}
                </p>

                <div className="mt-8 grid gap-px border border-rule bg-rule md:grid-cols-4">
                  <Stat label="Equipment CapEx" value={darkFactory.capex} accent />
                  <Stat label="Staff" value={darkFactory.staff} />
                  <Stat label="Takt" value={darkFactory.takt} />
                  <Stat label="Payback" value={darkFactory.payback} />
                </div>
              </>
            ),
          },
          {
            key: "compare",
            label: "Dark factory against manual CKD",
            node: (
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
            ),
          },
          {
            key: "output",
            label: "Output and savings",
            node: (
              <div className="mt-8 grid gap-px border border-rule bg-rule md:grid-cols-4">
                <Stat label="Output" value={darkFactory.output} />
                <Stat label="Operating days" value={darkFactory.days} />
                <Stat label="Efficiency" value={darkFactory.oee} />
                <Stat
                  label="Annual labour saving"
                  value={darkFactory.labourSaving}
                  accent
                />
              </div>
            ),
          },
        ]}
      />

      {/* ---------- 10 Equipment allocation ---------- */}
      <Section
        id="equipment"
        index="10"
        eyebrow="Manufacturing"
        title="Equipment allocation"
        lede="What the equipment budget buys, item by item."
      >
          <div className="mt-5 space-y-3">
            {equipmentAllocation.map((e) => (
              <div key={e.item} className="bg-paper-2 px-4 py-3">
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
      </Section>

      {/* ---------- 10 Go to market ---------- */}
      <Section
        id="gtm"
        index="11"
        eyebrow="Go to market"
        title="The path from pilot to break-even"
        lede="Four stages, each with a different scale and a different commercial model."
      >
        <StageTimeline stages={goToMarket} />
      </Section>

      {/* ---------- 11 The round ---------- */}
      <Section
        id="round"
        index="12"
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
              <div key={f.bucket} className="border border-rule bg-paper-2 p-6">
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
        index="13"
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
        index="14"
        eyebrow="Operations and supply chain"
        title="How the company operates"
        lede="Deliberately asset-light where it does not need to be, and rigorous where safety demands it."
      >
        <div className="grid gap-px border border-rule bg-rule md:grid-cols-2">
          {operations.map((o) => (
            <div key={o.title} className="bg-paper-2 p-6">
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
        index="15"
        eyebrow="Intellectual property"
        title="Two patents"
        lede="One granted, one published and under examination. International filings are funded by this round."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {patents.map((p) => (
            <div key={p.title} className="border border-rule bg-paper-2 p-6">
              <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                <h3 className="min-w-0 font-display text-base font-bold leading-snug tracking-tight text-ink">
                  {p.title}
                </h3>
                <span
                  className={`shrink-0 whitespace-normal px-2.5 py-1 text-left font-display text-[0.75rem] font-bold uppercase leading-tight tracking-[0.16em] ${
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
      <SectionPages
        id="projection"
        index="16"
        eyebrow="Financial projection"
        title="Fourteen years, five milestones"
        lede="Figures in USD at ₹83 to the dollar. This is the forecast that sits behind the round."
        blocks={[
          {
            key: "headline",
            label: "The projection at a glance",
            node: (
              <div className="grid gap-px border border-rule bg-rule md:grid-cols-3 lg:grid-cols-6">
                {projectionHeadline.map((p) => (
                  <Stat key={p.label} label={p.label} value={p.value} />
                ))}
              </div>
            ),
          },
          {
            key: "chart",
            label: "Revenue and valuation, on a log scale",
            node: (
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
            ),
          },
          {
            key: "table",
            label: "The milestones behind the forecast",
            node: (
              <div className="mt-10">
                <DataTable
                  head={["Year", "Milestone", "Units", "Revenue", "Valuation"]}
                  rows={milestones.map((m) => [
                    m.year,
                    m.label,
                    m.units,
                    m.revenue,
                    m.valuation,
                  ])}
                />
              </div>
            ),
          },
          {
            key: "note",
            label: "What the forecast depends on",
            node: (
              <Note>
                Breakeven lands in FY2035, Year 8. Gross margin opens at 10% and widens to
                30% as volume scales. Across the same period, capital raised grows
                steadily while valuation compounds far faster — that multiple expansion is
                what the plan depends on.
              </Note>
            ),
          },
        ]}
      />

      {/* ---------- Closing — the ask ---------- */}
      <section
        id="invest"
        className="scroll-mt-24 border-t border-rule bg-ink px-6 py-20 md:px-10 md:py-28"
      >
        <div className="mx-auto max-w-deck">
          <p className="eyebrow text-paper/60">The ask</p>
          <h2 className="display-lg mt-4 max-w-[18ch] text-paper">
            ₹7 crore, and we build it
          </h2>
          <p className="mt-6 max-w-[46ch] text-sm leading-relaxed text-paper/70 md:text-base">
            We have shown you the vehicle, the market and the plan. If it holds
            up, take the round with us.
          </p>

          <div className="mt-10">
            <InvestButton
              label="Invest in Us"
              className="!m-0 !border-red !bg-red !px-6 !py-3.5 !text-xs hover:!border-paper hover:!bg-paper hover:!text-ink"
            />
            <p className="mt-4 text-xs leading-relaxed text-paper/50">
              Data room, financial model, and a time to talk.
            </p>
          </div>

          <div className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-paper/15 pt-8">
            <a
              href="#snapshot"
              className="-mx-1 inline-flex min-h-[44px] items-center px-1 py-2 font-display text-xs font-bold uppercase tracking-[0.16em] text-paper/70 transition-colors hover:text-paper"
            >
              Top of this page
            </a>
            <Link
              href="/"
              className="-mx-1 inline-flex min-h-[44px] items-center px-1 py-2 font-display text-xs font-bold uppercase tracking-[0.16em] text-paper/70 transition-colors hover:text-paper"
            >
              Back to the short deck
            </Link>
            <p className="w-full text-xs text-paper/40 md:w-auto md:ml-auto">
              Raguram S K · Muthuram · Nishanthraj — Jedlik Motors
            </p>
          </div>
        </div>
      </section>
      </DeckShell>
    </main>
  );
}
