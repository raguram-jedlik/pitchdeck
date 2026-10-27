import type { Metadata } from "next";
import Link from "next/link";
import { brand } from "@/data/jedlikData";
import {
  snapshot,
  founders,
  prototypeBuilds,
  productSpecs,
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
        <div className="grid grid-cols-2 gap-px border border-rule bg-rule md:grid-cols-4">
          {snapshot.map((s) => (
            <Stat key={s.label} label={s.label} value={s.value} />
          ))}
        </div>
      </Section>

      {/* ---------- 02 Team ---------- */}
      <Section
        id="team"
        index="02"
        eyebrow="Founders"
        title="Who is building it"
        lede="Three mechanical engineers from the 2020 batch, working together since. Two are full-time; the third is part-time."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {founders.map((f) => (
            <div key={f.name} className="border border-rule bg-white p-6">
              <p className="font-display text-lg font-bold tracking-tight text-ink">{f.name}</p>
              <p className="mt-1 font-display text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted">
                {f.role}
              </p>
              <p
                className={`mt-4 inline-block px-2.5 py-1 font-display text-[0.6rem] font-bold uppercase tracking-[0.16em] ${
                  f.commitment === "Full-time"
                    ? "bg-ink text-paper"
                    : "border border-rule text-muted"
                }`}
              >
                {f.commitment}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ---------- 03 Prototypes ---------- */}
      <Section
        id="prototypes"
        index="03"
        eyebrow="Prototypes"
        title="Two vehicles have been built"
        lede="Alpha and Beta. Beta drove under its own power on public roads."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {prototypeBuilds.map((b) => (
            <div key={b.name} className="border border-rule bg-white p-6">
              <span className="font-display text-2xl font-bold tracking-tight text-ink">
                {b.name}
              </span>
              <p className="mt-4 text-sm leading-relaxed text-muted">{b.detail}</p>
            </div>
          ))}
        </div>

      </Section>

      {/* ---------- 04 Product ---------- */}
      <Section
        id="product"
        index="04"
        eyebrow="Product"
        title="What the e-POD is"
        lede="A fully enclosed two-wheeled electric vehicle. Car-grade safety and weather protection at two-wheeler scale, with a centre-hub steering architecture that is patent-protected."
      >
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <p className="eyebrow">Specifications</p>
            <dl className="mt-5 border-t border-rule">
              {productSpecs.map((s) => (
                <div
                  key={s.spec}
                  className="flex items-baseline justify-between gap-4 border-b border-rule py-3"
                >
                  <dt className="text-sm text-muted">{s.spec}</dt>
                  <dd className="text-right font-display text-sm font-bold text-ink">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <p className="eyebrow">What it promises</p>
            <ul className="mt-5 space-y-3">
              {[
                "Accessible premium commute",
                "Ultra-low cost of ownership",
                "Zero-straight ergonomics",
                "All-weather comfort and UV shielding",
                "Helmet-free commuting",
                "Automotive-grade safety",
              ].map((v) => (
                <li key={v} className="flex items-start gap-3 border-b border-rule pb-3">
                  <span className="dot mt-1.5 shrink-0" />
                  <span className="font-display text-sm font-semibold tracking-tight text-ink">
                    {v}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ---------- 05 Business model ---------- */}
      <Section
        id="model"
        index="05"
        eyebrow="Business model"
        title="How the business is put together"
        lede="The nine blocks of the business model canvas, as the founders have framed them."
      >
        <div className="grid gap-px border border-rule bg-rule md:grid-cols-2 lg:grid-cols-3">
          {canvasBlocks.map((b) => (
            <div key={b.title} className="bg-white p-5">
              <p className="font-display text-[0.65rem] font-bold uppercase tracking-[0.16em] text-red">
                {b.title}
              </p>
              <ul className="mt-3 space-y-1.5">
                {b.items.map((it) => (
                  <li key={it} className="text-sm leading-relaxed text-muted">
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* ---------- 06 Revenue mix ---------- */}
      <Section
        id="revenue"
        index="06"
        eyebrow="Revenue mix"
        title="Where the money comes from"
        lede="Vehicle sales carry the business. The rest is the recurring layer that builds on top of a growing fleet."
      >
        <div className="space-y-5">
          {revenueStreams.map((r) => (
            <div key={r.label}>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm font-medium text-ink">{r.label}</span>
                <span className="font-display text-sm font-bold text-ink">{r.share}%</span>
              </div>
              <div className="mt-2 h-2 w-full bg-rule">
                <div className="h-2 bg-red" style={{ width: `${r.share}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ---------- 07 Unit economics ---------- */}
      <Section
        id="economics"
        index="07"
        eyebrow="Unit economics"
        title="What one vehicle costs, and what it earns"
        lede="The full material bill of materials, and where cost lands as volume scales."
      >
        <DataTable
          head={["Cost element", "Share", "Per vehicle", "Contents"]}
          rows={bomRows.map((r) => [r.element, `${r.percent}%`, r.rupees, r.contents])}
        />

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

      {/* ---------- 08 Manufacturing ---------- */}
      <Section
        id="manufacturing"
        index="08"
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

        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-left">
            <thead>
              <tr>
                <th className="border-b-2 border-ink pb-3 pr-6 font-display text-[0.65rem] font-bold uppercase tracking-[0.16em] text-ink">
                  Dark factory
                </th>
                <th className="border-b-2 border-ink pb-3 pr-6 font-display text-[0.65rem] font-bold uppercase tracking-[0.16em] text-ink">
                  Manual CKD
                </th>
                <th className="border-b-2 border-ink pb-3 font-display text-[0.65rem] font-bold uppercase tracking-[0.16em] text-ink">
                  Effect
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-rule">
                <td className="py-3.5 pr-6 font-display text-sm font-semibold text-ink">
                  {darkFactory.capex}
                </td>
                <td className="py-3.5 pr-6 text-sm text-muted">{darkFactory.capexManual}</td>
                <td className="py-3.5 text-sm text-muted">~60% lower upfront</td>
              </tr>
              <tr className="border-b border-rule">
                <td className="py-3.5 pr-6 font-display text-sm font-semibold text-ink">
                  {darkFactory.staff} staff
                </td>
                <td className="py-3.5 pr-6 text-sm text-muted">{darkFactory.staffManual} staff</td>
                <td className="py-3.5 text-sm text-muted">~90% headcount reduction</td>
              </tr>
              <tr className="border-b border-rule">
                <td className="py-3.5 pr-6 font-display text-sm font-semibold text-ink">
                  {darkFactory.labourSaving} saved
                </td>
                <td className="py-3.5 pr-6 text-sm text-muted">&mdash;</td>
                <td className="py-3.5 text-sm text-muted">Annual labour saving</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid gap-px border border-rule bg-rule md:grid-cols-3">
          <Stat label="Output" value={darkFactory.output} />
          <Stat label="Operating days" value={darkFactory.days} />
          <Stat label="Efficiency" value={darkFactory.oee} />
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Five-cell layout</p>
            <div className="mt-5 space-y-3">
              {cells.map((c) => (
                <div key={c.cell}>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-sm font-medium text-ink">{c.cell}</span>
                    <span className="font-display text-sm font-bold text-ink">
                      {c.minutes} min
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full bg-rule">
                    <div className="h-1.5 bg-ink" style={{ width: `${c.share}%` }} />
                  </div>
                  <p className="mt-1 text-[0.7rem] text-muted">{c.share}% of takt</p>
                </div>
              ))}
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

      {/* ---------- 09 Go to market ---------- */}
      <Section
        id="gtm"
        index="09"
        eyebrow="Go to market"
        title="The path from pilot to break-even"
        lede="Four stages, each with a different scale and a different commercial model."
      >
        <div className="grid gap-px border border-rule bg-rule md:grid-cols-2 lg:grid-cols-4">
          {goToMarket.map((g, i) => (
            <div key={g.stage} className="bg-white p-6">
              <p className="font-display text-[0.65rem] font-bold uppercase tracking-[0.16em] text-red">
                Stage {i + 1}
              </p>
              <p className="mt-2 font-display text-lg font-bold tracking-tight text-ink">
                {g.stage}
              </p>
              <p className="mt-3 font-display text-sm font-semibold text-ink">{g.scale}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{g.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ---------- 10 The round ---------- */}
      <Section
        id="round"
        index="10"
        eyebrow="The round"
        title="₹7 crore, and exactly what it buys"
        lede="Every rupee is assigned to a named milestone. This is the plan, not the intention."
      >
        <div className="space-y-6">
          {fundUse.map((f) => (
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
              <div className="mt-3 h-1.5 w-full bg-rule">
                <div className="h-1.5 bg-red" style={{ width: `${f.percent}%` }} />
              </div>
            </div>
          ))}
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

      {/* ---------- 11 Cap table ---------- */}
      <Section
        id="captable"
        index="11"
        eyebrow="Cap table"
        title="Who owns the company"
        lede="Founders hold 87%. The incubator and the three angels hold the balance."
      >
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-4">
            {capTable.map((h) => (
              <div key={h.name}>
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <span className="text-sm font-medium text-ink">{h.name}</span>
                    <span className="ml-2 text-xs text-muted">{h.kind}</span>
                  </div>
                  <span className="font-display text-sm font-bold text-ink">{h.percent}%</span>
                </div>
                <div className="mt-1.5 h-2 w-full bg-rule">
                  <div
                    className={`h-2 ${h.kind.startsWith("Founder") ? "bg-ink" : "bg-red"}`}
                    style={{ width: `${h.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="border border-rule bg-white p-6">
            <p className="eyebrow">Reading the table</p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              The three founders came together as a batch and are the core of the
              company. Raguram and Muthuram are full-time; Nishanthraj is part-time. The
              Anna University incubator holds 3% and has hosted the company&rsquo;s GPU
              server from its Guindy campus.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              The three angel investors — Arihant, Ambili Arun Kumar and Poornima —
              hold 10% between them, subscribed under the share subscription and
              shareholders&rsquo; agreement executed in February 2026.
            </p>
          </div>
        </div>
      </Section>

      {/* ---------- 12 Operations ---------- */}
      <Section
        id="operations"
        index="12"
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

      {/* ---------- 13 IP ---------- */}
      <Section
        id="ip"
        index="13"
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

      {/* ---------- 14 Projection ---------- */}
      <Section
        id="projection"
        index="14"
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

      {/* ---------- Closing ---------- */}
      <section className="border-t border-rule bg-ink px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-deck">
          <p className="eyebrow text-paper/60">Next</p>
          <h2 className="display-lg mt-4 max-w-[18ch] text-paper">
            Back to the short version
          </h2>
          <p className="mt-5 max-w-[52ch] text-sm leading-relaxed text-paper/70 md:text-base">
            The deck takes two minutes. This page is the evidence behind it. If you want
            to go deeper on any single number, ask — most of them have a full
            calculation behind them.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center bg-red px-5 py-2.5 font-display text-xs font-bold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-red-deep"
            >
              Back to the deck
            </Link>
            <a
              href="#snapshot"
              className="inline-flex items-center border border-paper/30 px-5 py-2.5 font-display text-xs font-bold uppercase tracking-[0.16em] text-paper transition-colors hover:border-paper"
            >
              Top of this page
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
