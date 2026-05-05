# CLAUDE.md — Project Operating Instructions

This file is loaded into context at the start of every Claude Code session. **Read it first.**

## What this project is

An interactive **executive competitive-intelligence dashboard** comparing **Marriott Vacations Worldwide (MVW / NYSE: VAC)** against its two largest pure-play timeshare peers, anchored on **Q1 2026 earnings results** (quarter ended March 31, 2026):

- **Hilton Grand Vacations (HGV)** — released Apr 29, 2026
- **Travel + Leisure Co. (TNL)** — released Apr 22, 2026
- **MVW** — released May 5, 2026 (this dashboard refreshed against the same-day call & investor presentation)

The dashboard is a static, single-page web app (HTML / CSS / vanilla JS) served from GitHub Pages. It is intended for use by executives evaluating quarterly market position, growth catalysts, and risk exposure.

Repo: https://github.com/jeffersonbauer/mvw2026q1
Live site: https://jeffersonbauer.github.io/mvw2026q1/

This project is the **Q1 2026 successor** to the FY2025 dashboard at https://github.com/jeffersonbauer/mvw — same layout, tabs, structure, fonts and styling, but updated data and a Q1-specific overview page.

## Source-of-truth rules (read every time)

1. **Facts come from primary documents.** Acceptable sources for figures, KPIs, segment data, risk language, and corporate facts are:
   - Q1 2026 earnings press releases (8-K Exhibit 99.1)
   - Q1 2026 investor presentations (slide decks)
   - Q1 2026 earnings-call transcripts
   - SEC EDGAR filings (10-K, 10-Q, 8-K, DEF 14A) for VAC, HGV, TNL
   - The companies' official investor-relations websites
2. **Never fabricate.** If a number is not in a filing or on the company's site, **do not invent or estimate**. Mark the field "not disclosed" in the data file (omit or use `null`) or ask the user. Calculated values must say "calculated from disclosed inputs" inline (use `calc:` field in `js/data.js`).
3. **Cite the source.** Every figure in `js/data.js` must include the source (e.g., `"MVW Q1 2026 release"`, `"HGV Q1 2026 call (Mathewes)"`, `"10-K FY2025, MD&A"`).
4. **Date-stamp the snapshot.** `meta.lastUpdated` and each company's `fiscal.releaseDate` must be current.

## Required file maintenance — read this every session

There are **three governance files** in the repo root. Treat them as the project's working memory. **Always update them when conversational instructions change scope, design, or architecture.**

| File | When to update | Read before |
|---|---|---|
| `DECISIONS.md` | The user changes architecture, data shape, file structure, framework, or build approach | Changing architecture or data shape |
| `DESIGN.md` | The user changes color palette, typography, component patterns, layout primitives, or UX behavior | Touching colors, fonts, or component patterns |
| `REQUIREMENTS.md` | The user adds/removes a feature, view, KPI, or company; clarifies in/out of scope | Adding any feature |

**Rule:** when the user gives an instruction in conversation that would land in one of those buckets, append it to the corresponding file (with the date) **before** implementing. If you implement first and forget to log it, log it before ending the turn.

## Workflow when starting a new session

1. Read `DECISIONS.md`, `DESIGN.md`, `REQUIREMENTS.md` in that order.
2. Read this file (`CLAUDE.md`).
3. Skim `js/data.js` to refresh which fiscal period is loaded.
4. Then begin work.

**Specifically:**
- **Before changing architecture or data shape → check `DECISIONS.md`.**
- **Before touching colors, fonts, or component patterns → check `DESIGN.md`.**
- **Before adding features → check `REQUIREMENTS.md` for what's in/out of scope.**
- **Don't fabricate figures — if a number isn't in the source files or the docs, ask.**

## Workflow when the user gives a new instruction

1. Classify it: architecture (→ DECISIONS), design (→ DESIGN), scope (→ REQUIREMENTS), or implementation only (no log needed).
2. If logged, append a dated bullet under the relevant section. Use today's date in `YYYY-MM-DD` format.
3. Implement.
4. If the implementation differed from what was planned, update the log entry with the actual outcome.

## Tech stack (locked — see DECISIONS.md before changing)

- **No build step.** Plain HTML, CSS, vanilla JS. Open `index.html` in a browser or serve with `python3 -m http.server`.
- **Charts:** Chart.js via CDN.
- **Maps:** Leaflet via CDN with OpenStreetMap (CARTO light) tiles.
- **Styling:** Custom CSS — no Tailwind, no preprocessors. Design tokens live as CSS custom properties in `css/main.css`.
- **Data:** All facts live in `js/data.js`. One module, one global (`window.MVW_DATA`). Per-company shape is documented at the top of that file.

## Data shape note (Q1 vs FY)

- **`q1Headline.*`** — Q1 2026 quarterly metrics. May include `priorQ1` for YoY comparison.
- **`q1Headline.*FY`** — trailing FY2025 anchor (revenue, EBITDA, contract sales, VPG, tours) carried forward from each company's most recent 10-K to give context.
- **`guidance.*`** — 2026 forward guidance disclosed in the Q1 release/call.
- **`strategicInitiatives[]`** — programs explicitly announced in the Q1 release/call (e.g., MVW Inner Circle, HGV Elara buyout, TNL Resort Optimization).
- **`recentCall.items[]`** — paraphrased / quoted highlights from the Q1 call.

When refreshing for a new fiscal period (Q2 2026, etc.):
1. Pull the new earnings release / 10-Q from each company's IR site and SEC EDGAR.
2. Update each company's `q1Headline` block (rename to `q2Headline` or generalize to `quarterHeadline`).
3. Update `meta.lastUpdated`, each `fiscal.releaseDate`, and `fiscal.period`.
4. Spot-check: revenue, Adj EBITDA, contract sales, VPG, tours, FICO, default rate, owner count, resort count.
5. Open the dashboard, click into each company, verify all six tabs render.

## What NOT to do

- Don't add a build step or framework without updating DECISIONS.md and getting user buy-in.
- Don't introduce a 4th company without updating REQUIREMENTS.md.
- Don't change brand colors without updating DESIGN.md — they map to MVW/HGV/TNL identity.
- Don't fabricate any number, ever. If unknown, ask or mark "not disclosed".
- Don't commit secrets or API keys — there shouldn't be any in this project.
- Don't merge data across periods (e.g., don't blend Q1 2026 contract sales with FY2025 contract sales without labeling).
