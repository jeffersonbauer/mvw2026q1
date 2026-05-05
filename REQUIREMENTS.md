# REQUIREMENTS.md — Scope & Feature Requirements

What's in scope, what's explicitly out of scope, and what features each view must have. **Check this file before adding any feature.**

---

## In scope (Q1 2026 release)

### Companies covered
- **MVW** (Marriott Vacations Worldwide) — primary subject.
- **HGV** (Hilton Grand Vacations) — peer.
- **TNL** (Travel + Leisure Co.) — peer.

These three are the only public pure-play vacation-ownership operators of meaningful scale. Adding a fourth (e.g., Bluegreen pre-acquisition, Wyndham Hotels & Resorts) would dilute the "competitive set" framing — flag and discuss before adding.

### Pages / routes
- **Overview** (`#/`) — Q1 2026 quarter banner, three-up momentum strip, three hero cards (one per company), comparative scorecard with Q1 2026 metrics + FY2025 anchors + 2026 guidance midpoints, four side-by-side comparison charts (Q1 revenue, Q1 EBITDA, Q1 contract sales, 2026 guidance), executive-read panel with strategic-vector tags.
- **Per-company drill-down** (`#/company/<slug>/<tab>`) — one of six tabs:
  1. **Executive Overview** (`exec`) — Q1 KPI grid (revenue, EBITDA, margin, NI, EPS, contract sales, VPG, tours, owners), company-at-a-glance table, current-chapter narrative. **MVW exec page must additionally include the Commercial Turnaround transcript-quote block** with verbatim CEO Avril, COO Flaskey, and CFO Marino quotes from the May 5 call.
  2. **Segment Drill-Down** (`segments`) — segment doughnut + revenue/EBITDA bar chart, segment-detail table, brand-portfolio table.
  3. **Global Footprint** (`footprint`) — Leaflet world map with company-themed markers, regional table.
  4. **Financial Deep Dive** (`financials`) — Q1 financial-position KPI grid, FY revenue/EBITDA trend charts, debt-structure stacked bar, **2026 guidance card**, receivables/credit KPI grid, **Q1/Q2 2026 capital-actions table** (ABS securitizations, asset purchases/sales).
  5. **Growth Catalysts** (`growth`) — **Q1/Q2 strategic-initiatives panel** + disclosed-growth-catalysts panel (numbered).
  6. **Risk Matrix** (`risks`) — analyst-coded 5×5 heat map of Item 1A risks + verbatim-risks list with Q1 2026 management commentary where applicable.

### KPI coverage required (Q1 2026)
- **Quarterly P&L:** revenue, Adj EBITDA, Adj EBITDA margin, net income, GAAP diluted EPS, adjusted diluted EPS — for all three companies, with Q1 2025 YoY comparisons where disclosed.
- **Quarterly timeshare KPIs:** contract sales / Gross VOI sales, VPG, tours, owner counts. Mark "not disclosed" where not in the release.
- **Capital position (Mar 31, 2026):** corporate debt, securitized debt, cash, leverage ratio.
- **Capital return (Q1):** dividends, buybacks, remaining authorization.
- **Receivables/credit:** average FICO, default rate, sales reserve / loan-loss provision, delinquency aging.
- **Forward guidance:** 2026 full-year Adj EBITDA, contract sales, VPG, free cash flow; Q2 outlook where disclosed.
- **Capital actions:** ABS securitizations, asset purchases/sales, new partnerships announced in Q1/Q2 2026.

### MVW-specific requirements
- The Commercial Turnaround Update transcript (May 5, 2026) is treated as a primary source. Verbatim quotes from CEO Avril, COO Flaskey, and CFO Marino appear on the MVW Executive Overview page.
- The MVW Q1 2026 Investor Presentation PDF (in the project parent folder) is treated as primary for: addressable market (~55M US households), Adj EBITDA contribution mix (Mgmt&Exch 35% / Dev 35% / Financing 20% / Rentals 10%), liquidity ($854M), debt maturity ladder, and 2026 guidance ($755-780M Adj EBITDA, $375-425M FCF, $1,815-1,885M contract sales).
- Strategic-initiatives panel must list: new sales/marketing leadership, owner-loyalty tier expansion (May 1), Dream Vacation Packages (late May), Inner Circle events (June 22), data-driven tour logistics, Bonvoy + World of Hyatt partnership marketing.

### Live stock quotes (added 2026-05-05)
- A small live stock-quote display sits under each of the three company nav pills (VAC / HGV / TNL) in the topbar.
- Shows current price + absolute change + percent change with green/red coloring.
- Refreshes every 60 seconds while the tab is visible. No API key required (Yahoo Finance via public CORS proxy).
- Graceful fallback to `—` if the feed is unavailable; the rest of the dashboard is unaffected.
- This is the **only** live/networked data point in the dashboard — every other figure is sourced from filings and edited manually in `js/data.js`.

### Source-citation requirements
- Every numeric KPI in `js/data.js` carries a `source:` string with the document name (e.g., `"MVW Q1 2026 release"`, `"HGV Q1 2026 call (Mathewes)"`).
- Every page renders a Sources block at the bottom with hyperlinks to: Q1 release, Q1 call transcript, latest 10-K, IR page, EDGAR filings index.
- Risk Matrix scores explicitly labeled "analyst-coded overlays — not company disclosures."

## Out of scope (do not add without user buy-in)

- **Real-time stock prices, market caps, multiples.** This is a fundamentals/strategy dashboard, not a market-data terminal.
- **Analyst price targets, ratings, consensus estimates.** Except where used as a beat/miss reference point in narrative copy (e.g., "HGV adj EPS $0.99 beat $0.56 consensus by 67%").
- **Forward EBITDA / earnings projections.** Only forward figures permitted are company-disclosed guidance.
- **A 4th company.** Discuss first.
- **User accounts, saved views, comments, favoriting.** Static read-only dashboard.
- **Dark mode.** The design system targets a single light theme (per IR aesthetic).
- **Mobile-first redesign.** Responsive breakpoints exist (1100px, 700px) but the primary viewing context is desktop / large-monitor executive use.
- **Build tooling, framework migration (React/Vue/Svelte).** Static-files-only is a deliberate decision — see DECISIONS.md.
- **Inline editing of data.** All data lives in `js/data.js`; refresh by editing that file.

## Changelog
- 2026-05-05: Initial scope set for the Q1 2026 dashboard.
- 2026-05-05: Added live stock-quote display under company nav pills (Yahoo Finance via public CORS proxy, 60s refresh).
