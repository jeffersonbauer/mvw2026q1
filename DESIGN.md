# DESIGN.md — Design System

The single source of truth for tokens, typography, components, and UX behavior. **Check this file before changing any color, font, or component pattern.**

The aesthetic is anchored to the **MVW Investor Relations website**: pure-white backgrounds, a deep-navy data anchor (`#1C1E35`), thin Montserrat display type, square edges (no rounded corners on tiles), and gold accent for "leader" highlighting. The Q1 2026 dashboard inherits these tokens from the FY2025 `jeffersonbauer/mvw` predecessor and adds Q1-specific extensions.

---

## Color tokens

### Surfaces (light theme — MVW IR aesthetic)
- `--bg-base` `#FFFFFF` — page background
- `--bg-panel` `#FFFFFF` — panels, cards
- `--bg-elevated` `#F5F5F7` — scorecard headers, nested blocks
- `--bg-input` `#FAFAFC` — map background

### Text
- `--text-primary` `#262626` — body
- `--text-secondary` `#63656A` — subheads, secondary copy
- `--text-tertiary` `#8E8E94` — muted

### Anchor color (deep navy)
- `--ink-deep` `#1C1E35` — table headers, footer band, dark-row backgrounds
- `--ink-deep-soft` `#2B2D45` — hover states on the deep navy

### Borders
- `--border-subtle` `#E5E5E7` — light separators
- `--border-strong` `#CBCBCD` — stronger structural borders

### Accent
- `--accent-gold` `#B8860B` — "leader" highlighting in scorecards, callout left-borders, period tag pill
- `--accent-gold-dim` `#8B6508` — dimmer gold variant

### Brand colors (per company — driven by `body.theme-{slug}`)
- **MVW** `--mvw-primary` `#0862A7` (Pantone PMS 641 C — solid surfaces & accents)
- **HGV** `--hgv-primary` `#002C51` (Hilton brand navy — reads sharply on white)
- **TNL** `--tnl-primary` `#1D6B44` (Travel + Leisure deep forest)

Each brand also has a `--{slug}-soft` (10% alpha tint) used for subtle backgrounds.

### Semantic
- `--positive` `#059669` — YoY positive deltas
- `--negative` `#DC2626` — YoY negative deltas
- `--neutral` `#64748B` — flat / unknown deltas
- `--warn` `#D97706` — warning / amber

---

## Typography

- **Display** (`h1`, `.display`, `.company-hero__name`) — `Montserrat`, weight 200 (thin), tight letter-spacing (-0.2px to -0.6px). Used for big numbers and page titles.
- **Body** — `Lato`, 14px / 1.65 line-height. Used for paragraphs, table cells, descriptions.
- **Numerics** (`.num`, `.mono`) — `JetBrains Mono`, tabular numerals, tight letter-spacing. Used for KPI values, scorecard cells, table numerics.
- **Subheads** (`h2`) — `Lato` 16px / 700.
- **Eyebrow labels** (`h3`, `.kpi__label`) — `Lato` 11-13px / 700, uppercase, 0.4px tracking.

All fonts loaded from Google Fonts in `css/main.css` (line 6).

---

## Component primitives

- **Square edges.** `--radius-sm` is `0`, `--radius-md` is `2px`, `--radius-lg` is `4px`. Round corners are reserved for KPI cards and dot markers only — everything else is square per IR aesthetic.
- **Panels** (`.panel`) — white background, `--border-subtle` 1px border, `var(--space-5) var(--space-6)` padding (24px / 32px). Add `.panel--accent` for a 3px brand-color top border.
- **KPI cards** (`.kpi`) — label (uppercase), value (Montserrat 30px thin), optional delta pill, optional source footer (dashed top-border).
- **Scorecard** (`.scorecard`) — CSS Grid with `240px repeat(3, 1fr)` columns. Section dividers (`.sc-section`) span all columns with elevated background. Leader cells (`.sc-cell--leader`) get a gold background tint and a 3px gold left-border.
- **Tabs** (`.tab`) — uppercase Lato 700, 12px, 0.4px tracking. Active state: `border-bottom-color: var(--brand-primary-on-dark)` 3px.
- **Callouts** (`.callout`) — elevated background, gold 3px left-border. Used for context blurbs and "this section explained" copy.
- **Tag** (`.tag`) — uppercase Lato 700, 11px, brand-colored background and border.

## Q1 2026 extensions (new components)

- **Quarter banner** (`.quarter-banner`) — full-width navy hero on the overview page. Two columns: headline copy (left, with gold-highlighted phrases) + release-date stats (right). Becomes single-column under 900px.
- **Momentum strip** (`.momentum-strip`) — three-up grid surfacing the single most-important Q1 number for each company. Each cell shows the company swatch + name, the headline metric (Montserrat 22px thin), an inline YoY (positive green / negative red), and a one-line subhead.
- **Transcript quote** (`.transcript-quote`) — used on MVW Executive Overview to surface verbatim CEO/COO/CFO quotes from the May 5 Commercial Turnaround call. Brand-color left-border, italic body text, speaker eyebrow above.
- **Guidance card** (`.guidance-card`) — used on Financial Deep Dive. Gold 3px top-border. Each row is `label · value` separated by a dashed underline. Captures 2026 full-year guidance plus Q2 outlook where disclosed.
- **Period tag** (`.sc-cell--head .period-tag`) — "Q1 '26" pill on each scorecard column header to reinforce the quarterly framing.
- **Vector tags** (`.vector-tag`) — gray pills on the executive-read panel listing the key strategic vectors per company across the quarter.

## Layout grid

- `--shell-max` `1440px` — content max-width.
- Spacing scale: `--space-1`..`--space-8` = 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 px.
- Grid utilities: `.grid--2`, `.grid--3`, `.grid--4`, `.grid--6` collapse responsively at 1100px and 700px breakpoints.

## UX behavior

- **Hash-based routing** — no history.pushState; URL changes via `window.location.hash`. Survives page refresh, bookmarkable.
- **Theme switching** — `body.theme-mvw|hgv|tnl` rebinds `--brand-primary` so panels, accents, dots, and chart fills inherit the active company's color when on a drill-down view.
- **Hover tooltips** — `[data-source]` elements show a small dark tooltip with the source citation on hover. Used heavily on scorecard cells and KPI cards.
- **Risk-dot click-to-scroll** — clicking a numbered dot in the risk heat-map scrolls smoothly to the verbatim risk-factor block on the right.
- **Map markers** — Leaflet `circleMarker` sized by resort count or VOI-sales share, colored by brand.
- **Charts always destroy on route change** — `MVW_CHARTS.destroyAll()` in `app.js` before each render to prevent canvas leaks.

## Iconography

- **No icon library.** All visual indicators are CSS-only (swatches, dots, pills, arrows from `→` / `←` text characters). Keeps the design IR-clean and zero-dependency.
- **Hero "mark"** for each company — colored 60×60 (drill-down) / 44×44 (overview) square with the 3-letter ticker abbreviation in white Montserrat 700.

## Changelog
- 2026-05-05: Initial design-system snapshot for the Q1 2026 dashboard. Inherits all tokens from the FY2025 predecessor; adds quarter-banner, momentum-strip, transcript-quote, guidance-card, period-tag, and vector-tag components for the Q1 framing.
