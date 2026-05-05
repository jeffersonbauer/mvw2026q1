# DECISIONS.md — Architecture & Data-Shape Decisions

Append a dated bullet whenever architecture, data shape, file structure, framework, or build approach changes. **Check this file before changing any of those things.**

---

## 2026-05-05 — Initial architecture (Q1 2026 dashboard)

- **Static SPA, no build step.** HTML + CSS + vanilla JS served as static files; deploy target is GitHub Pages. Same approach as the predecessor `jeffersonbauer/mvw` (FY2025 dashboard). Rationale: zero deployment friction, instant local preview via `python3 -m http.server`, no toolchain risk for an executive-facing dashboard that needs to be reliably refreshable each quarter.
- **Hash-based router.** Routes are `#/` (overview) and `#/company/<slug>/<tab>` (company drill-down). Six tabs per company: `exec`, `segments`, `footprint`, `financials`, `growth`, `risks`. Lifted from the predecessor for parity.
- **Data file shape: one global, one source-of-truth.** All data lives on `window.MVW_DATA` in `js/data.js`. Per-company structure documented at the top of that file. **New for Q1 2026:** quarterly metrics live in `q1Headline.*` (with `priorQ1` for YoY) — distinguishing them from the trailing FY anchors (`*FY` suffix on the same object) and the forward `guidance` block. This lets future-Claude refresh quarterly without hunting for which fields are quarterly vs. annual.
- **Strategic initiatives split out from growth catalysts.** `strategicInitiatives[]` captures programs explicitly announced *in this quarter's release/call* (e.g., MVW Inner Circle launch, HGV Elara buyout, TNL Resort Optimization). `growth[]` retains broader / longer-running catalysts. Both render on the Growth tab.
- **Charts library: Chart.js 4.4.1 via CDN.** Same as predecessor.
- **Map library: Leaflet 1.9.4 + CARTO light tiles via CDN.** Same as predecessor.
- **Fonts: Montserrat (display, thin weights) + Lato (body) + JetBrains Mono (numerics).** Loaded from Google Fonts. Same as predecessor.
- **No analytics, no telemetry, no cookies.** This is a static reference dashboard.

## 2026-05-05 — MVW Q1 segment data uses FY2025 baselines

- MVW does not break out segment-level revenue or Adj EBITDA in the Q1 2026 release; the press release reports consolidated figures only. The Segment Drill-Down tab for MVW therefore displays FY2025 segment splits as the baseline (with a clear note in the page header). HGV and TNL Q1 2026 releases do disclose Q1 segment revenue and Adj EBITDA — those tabs use Q1 numbers.
- If MVW begins disclosing segment-level Q1 figures in future quarters, switch the MVW segment block to quarterly figures and remove the FY2025 caveat in the views.

## 2026-05-05 — MVW Q1 VPG / tours not separately disclosed

- The MVW Q1 2026 release and presentation report consolidated contract sales ($411M, -2% YoY) and tour decline (-3% YoY) but do **not** publish a Q1 2026 VPG number in the headline materials. April 2026 VPG (+12.7% YoY) was disclosed verbally on the call. The data file leaves `q1Headline.vpg.value = null` and includes the call's qualitative statement in the `note`. Do not back-calculate or invent a Q1 VPG.

## 2026-05-05 — Live stock-quote data source

- Added compact live stock-quote display under each company nav pill (VAC / HGV / TNL) in the topbar.
- **Data source:** Yahoo Finance v8 chart endpoint (`https://query1.finance.yahoo.com/v8/finance/chart/<symbol>?interval=1d&range=2d`). Returns `meta.regularMarketPrice` and `meta.chartPreviousClose` from which we compute the absolute and percent change.
- **CORS:** Yahoo's endpoint does not set `Access-Control-Allow-Origin: *`, so we proxy through a public CORS pass-through. Primary: `https://corsproxy.io/?<url>`. Fallback: `https://api.allorigins.win/raw?url=<url>`. If both fail, the UI shows `—` and stays out of the way.
- **No API key.** Both the data source and the proxies are public/free. No secrets in client-side code.
- **Refresh cadence:** initial fetch on page load + every 60 seconds while the tab is visible. Pauses when `document.hidden`. Trade-off: 60s is fresh enough for an executive dashboard while staying well under any informal rate ceiling.
- **Resilience:** if the proxy or Yahoo changes shape, the dashboard still renders — the quote slot just shows `—`. The rest of the page is fully static and unaffected.
- **Module:** `js/quotes.js` exposes `MVW_QUOTES.refresh()` and self-bootstraps on `DOMContentLoaded`. No coupling to `app.js`/`views.js` so route changes don't tear it down.

## 2026-05-05 — Live-quotes performance optimization (v2)

The first cut of `js/quotes.js` was making three sequential proxy-fallback chains (one per symbol) and could take ~10s to render on cold load. Optimized:

- **Batched request.** Switched from Yahoo's `v8/finance/chart/<symbol>` (one request per symbol) to `v7/finance/spark?symbols=VAC,HGV,TNL` (one request for all three, smaller payload). 3× fewer roundtrips through the proxy.
- **Race the proxies via `Promise.any`.** Both proxies fire in parallel — the first to respond wins, the slow one is ignored. Cuts cold-start latency from "slow proxy timeout" to "fast proxy response" on every load.
- **Preconnect hints in `<head>`.** Added `<link rel="preconnect">` for both proxy origins and `<link rel="dns-prefetch">` for Yahoo. Browser warms DNS + TLS while the rest of the page parses.
- **Kick off the first fetch at module-eval time.** `quotes.js` starts the network request as soon as the script parses (the `defer` attr means HTML is already parsed by then) — `boot()` only awaits it later. Saves ~200-400ms of "wait for handler to fire" overhead.
- **`sessionStorage` cache + instant hydration.** On boot, `hydrateFromCache()` paints the previous session's last-known values immediately (zero network). The in-flight fetch then swaps in fresh values when ready. Subsequent reloads in the same browser session show prices instantly.

Net effect: cold first-load shifted from ~10s → ~1-2s typically; warm reload (with cache) → instant placeholder + fresh values within ~1s.

## 2026-05-05 — Market-cap data sourcing methodology

- End-of-quarter market cap is computed as **closing price on Mar 31, 2026 × Q1 weighted-average diluted shares**.
- Mar 31, 2026 close prices fetched once from Yahoo Finance (`/v7/finance/spark`) and hardcoded into `js/data.js` (VAC $65.12, HGV $39.12, TNL $69.19).
- Diluted shares derived from each company's Q1 2026 disclosed net income / diluted EPS:
  - VAC: $22M / $0.64 ≈ 34.4M shares
  - HGV: $66M / $0.79 ≈ 83.5M shares
  - TNL: $79M / $1.22 ≈ 64.8M shares
- This is the **weighted-average** diluted share count from Q1, not point-in-time shares outstanding at Mar 31. It's a defensible proxy that doesn't require pulling each company's 10-Q balance-sheet share-count footnote. Documented inline in the rendered panel so users see the methodology.
- Q1 share-price performance computed as Mar 31, 2026 close ÷ Dec 31, 2025 close − 1 (price-only, ex-dividends).
- Why hardcoded vs. live: market cap "for the quarter" is a point-in-time snapshot; pulling it live each load would (a) create unnecessary network dependency for a static value, (b) drift away from the Q1 EoQ snapshot users expect, and (c) require additional Yahoo round-trips. Live current quotes already exist for the topbar.

## Changelog
- 2026-05-05: Initial architecture established for the Q1 2026 dashboard, derived from the FY2025 `mvw` repo.
- 2026-05-05: Added live stock-quote display in topbar (Yahoo Finance + corsproxy.io / allorigins.win fallback).
- 2026-05-05: Live-quotes perf v2 — Yahoo spark batched endpoint + Promise.any proxy race + preconnect hints + sessionStorage instant-hydration cache. Cold load ~10s → ~1-2s.
- 2026-05-05: Added market-cap comparison data + UI; sourced Mar 31 / Dec 31 closes from Yahoo (hardcoded), diluted shares from Q1 NI/EPS.
