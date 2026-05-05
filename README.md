# MVW Competitive Intelligence Dashboard — Q1 2026 Edition

Executive-grade competitive analysis dashboard for **Marriott Vacations Worldwide (NYSE: VAC)** vs. its two largest pure-play timeshare peers — **Hilton Grand Vacations (NYSE: HGV)** and **Travel + Leisure Co. (NYSE: TNL)** — anchored on **Q1 2026 earnings results** (quarter ended March 31, 2026).

All numbers are sourced from the latest **Q1 2026 earnings releases, 10-Q filings, investor presentations, and earnings-call transcripts**. No projections, no estimates, no fabrication — every cited figure traces back to a specific document.

## Quick start

**Live site (GitHub Pages):** https://jeffersonbauer.github.io/mvw2026q1/

**Local:** No build step. Serve the directory with any static server:

```bash
cd /path/to/mvw2026q1
python3 -m http.server 8080
# then open http://localhost:8080
```

Or just double-click `index.html`.

## What's inside

- **Comparative overview** (`#/`) — Q1 2026 quarter banner, three-up momentum strip, comparative scorecard with Q1 2026 metrics + FY2025 anchors + 2026 guidance midpoints, four side-by-side YoY charts (revenue, EBITDA, contract sales, 2026 guide).
- **Per-company drill-down** (`#/company/<slug>/<tab>`) for MVW, HGV, and TNL — six tabs each:
  - **Executive Overview** — Q1 KPI grid, company-at-a-glance, current-chapter narrative. **MVW additionally includes verbatim transcript quotes** from the May 5, 2026 Commercial Turnaround Update call (Avril, Flaskey, Marino).
  - **Segment Drill-Down** — segment doughnut + revenue/EBITDA bars, segment table, brand portfolio.
  - **Global Footprint** — Leaflet world map with company-themed markers + regional table.
  - **Financial Deep Dive** — Q1 financial position, FY trend charts, debt structure, 2026 guidance card, receivables/credit KPIs, Q1/Q2 capital-actions table.
  - **Growth Catalysts** — Q1/Q2 strategic-initiatives panel + longer-running growth catalysts.
  - **Risk Matrix** — analyst-coded 5×5 heat map of Item 1A risks with verbatim language and Q1 2026 management commentary.

## Tech stack

- **Static files only** — HTML / CSS / vanilla JS, no build step.
- Chart.js 4.4.1 (CDN), Leaflet 1.9.4 + CARTO light tiles (CDN).
- Google Fonts: Montserrat, Lato, JetBrains Mono.

## Refreshing data

All facts live in `js/data.js`. Per-company shape is documented at the top of that file. To refresh for Q2 2026 or beyond:
1. Pull the new earnings release / 10-Q from each company's IR site (or SEC EDGAR).
2. Update each company's `q1Headline` block (or rename to `q2Headline` etc.).
3. Update `meta.lastUpdated`, `fiscal.releaseDate`, and `fiscal.period`.
4. Spot-check: revenue, Adj EBITDA, contract sales, VPG, tours, FICO, default rate.
5. Open the dashboard, click into each company, verify all six tabs render.

## Governance files (read these first)

- [`CLAUDE.md`](./CLAUDE.md) — project operating instructions for Claude Code sessions.
- [`DECISIONS.md`](./DECISIONS.md) — architecture & data-shape decisions (read before changing those).
- [`DESIGN.md`](./DESIGN.md) — design system: colors, fonts, components (read before changing those).
- [`REQUIREMENTS.md`](./REQUIREMENTS.md) — scope: in/out of scope, KPI coverage required (read before adding features).

## Source attribution

- **MVW Q1 2026:** earnings release + Investor Presentation + Commercial Turnaround Update transcript (May 5, 2026). https://ir.marriottvacationsworldwide.com/news-releases
- **HGV Q1 2026:** earnings release (Apr 29, 2026) + earnings call transcript (Apr 30, 2026). https://investors.hgv.com
- **TNL Q1 2026:** earnings release + 10-Q (Apr 22, 2026). https://investor.travelandleisureco.com

Risk-matrix severity / likelihood scores are analyst-coded overlays — not company disclosures.

## License

This is a private analytical dashboard. All company logos, brand names, and verbatim text are the property of their respective owners and are used here solely for editorial / competitive-intelligence purposes.
