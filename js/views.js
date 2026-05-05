/**
 * View renderers — Q1 2026 edition.
 *
 * Returns HTML strings and (where needed) exports an `after()` hook
 * that runs once the markup is mounted (charts, maps, etc.).
 *
 * Tabs: exec | segments | footprint | financials | growth | risks
 *
 * Data shape: see js/data.js. The Q1 2026 edition uses `q1Headline` to
 * distinguish quarterly figures from FY rollup figures (which carry the
 * `*FY` suffix on the same object).
 */

window.MVW_VIEWS = (() => {

  // ---------------------------------------------------------------- formatters
  function fmtNumber(v, unit) {
    if (v === null || v === undefined) return "—";
    if (typeof v !== "number") return v;
    if (unit === "USD millions" || unit === "USD billions") {
      const sign = v < 0 ? "-" : "";
      const abs = Math.abs(v);
      if (unit === "USD billions") return `${sign}$${abs.toFixed(1)}B`;
      if (abs >= 1000) return `${sign}$${(abs / 1000).toFixed(2)}B`;
      return `${sign}$${abs.toLocaleString()}M`;
    }
    if (unit === "USD per share" || unit === "USD per share annualized") {
      return (v < 0 ? "-" : "") + "$" + Math.abs(v).toFixed(2);
    }
    if (unit === "USD per guest" || unit === "USD per transaction" || unit === "USD per exchange transaction" || unit === "USD per Travel Club transaction") {
      return "$" + v.toLocaleString();
    }
    if (unit === "USD") return "$" + v.toLocaleString();
    if (unit === "percent" || (unit && String(unit).startsWith("percent"))) return v.toFixed(1) + "%";
    if (unit === "FICO") return v.toString();
    if (unit === "x" || unit === "x (covenant)") return v.toFixed(1) + "x";
    if (unit === "tours" || unit === "owner families" || unit === "Club members") return v.toLocaleString();
    if (unit === "thousands" || unit === "thousands of transactions") return v.toLocaleString() + "k";
    if (typeof unit === "string" && unit.includes("affiliated")) return v.toLocaleString();
    if (typeof unit === "string" && unit.includes("HGV Max")) return v.toLocaleString();
    return v.toLocaleString();
  }

  function fmtDelta(current, prior) {
    if (current === null || prior === null || current === undefined || prior === undefined) return null;
    if (prior === 0) return null;
    return ((current - prior) / Math.abs(prior)) * 100;
  }

  function deltaClass(pct, opts = {}) {
    if (pct === null || pct === undefined) return "is-neutral";
    if (opts.invert) return pct > 0 ? "is-negative" : (pct < 0 ? "is-positive" : "is-neutral");
    return pct > 0 ? "is-positive" : (pct < 0 ? "is-negative" : "is-neutral");
  }

  function fmtDeltaPct(pct) {
    if (pct === null || pct === undefined) return "";
    const sign = pct > 0 ? "+" : "";
    return `${sign}${pct.toFixed(1)}% YoY`;
  }

  function escapeHtml(s) {
    if (s === null || s === undefined) return "";
    return String(s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  // ---------------------------------------------------------------- KPI card
  function kpiCard({ label, value, unit, prior, source, note, valueOverride, invertDelta }) {
    let pct = null;
    let deltaTxt = "";
    if (typeof value === "number" && typeof prior === "number") {
      pct = fmtDelta(value, prior);
    }
    const cls = deltaClass(pct, { invert: invertDelta });
    if (pct !== null) deltaTxt = fmtDeltaPct(pct);

    const display = valueOverride !== undefined ? valueOverride : fmtNumber(value, unit);

    return `
      <div class="kpi" ${source ? `data-source="${escapeHtml(source)}"` : ""}>
        <div class="kpi__label">${escapeHtml(label)}</div>
        <div class="kpi__value">${escapeHtml(display)}</div>
        ${pct !== null ? `<div class="kpi__delta ${cls}">${escapeHtml(deltaTxt)}</div>` : ""}
        ${note ? `<div class="kpi__source">${escapeHtml(note)}</div>` : ""}
      </div>
    `;
  }

  // helpers — read a Q1 metric from a company; pull priorQ1 if present
  function q(co, key) { return co.q1Headline?.[key] || null; }

  // ---------------------------------------------------------------- Overview (comparative)
  function renderOverview() {
    const D = window.MVW_DATA.companies;
    const mvw = D.mvw, hgv = D.hgv, tnl = D.tnl;

    // Q1 2026 comparative scorecard rows
    const rows = [
      { label: "Q1 2026 quarterly P&L", isSection: true },
      { label: "Q1 revenue", path: "revenue", unit: "USD millions", direction: "high" },
      { label: "Q1 Adj EBITDA", path: "adjEbitda", unit: "USD millions", direction: "high" },
      { label: "Q1 Adj EBITDA margin", path: "adjEbitdaMargin", unit: "percent", direction: "high" },
      { label: "Q1 net income", path: "netIncome", unit: "USD millions", direction: "high" },
      { label: "Q1 diluted EPS (GAAP)", path: "dilutedEps", unit: "USD per share", direction: "high" },
      { label: "Q1 adjusted diluted EPS", path: "adjDilutedEps", unit: "USD per share", direction: "high" },

      { label: "Q1 2026 timeshare KPIs", isSection: true },
      { label: "Q1 contract / Gross VOI sales", path: { mvw: "contractSales", hgv: "contractSales", tnl: "grossVoiSales" }, unit: "USD millions", direction: "high", note: "MVW & HGV: contract sales; TNL: Gross VOI sales" },
      { label: "Q1 VPG", path: "vpg", unit: "USD per guest", direction: "high", caption: "MVW Q1 not separately disclosed; April 2026 VPG +12.7% YoY per call." },
      { label: "Q1 tours growth (YoY)", path: { mvw: null, hgv: "toursGrowth", tnl: null }, unit: "percent", direction: "high", caption: "HGV reported +8.5%; MVW down 3% (Asia-Pac planned reduction); TNL +5%." },
      { label: "Adj free cash flow (Q1)", path: { mvw: "adjFreeCashFlow", hgv: "adjFreeCashFlow", tnl: "adjFreeCashFlow" }, unit: "USD millions", direction: "high" },

      { label: "Market capitalization (Mar 31, 2026)", isSection: true },
      { label: "Q1 EoQ market cap", path: "marketCapEoq", unit: "USD millions", direction: "high" },
      { label: "Q1 stock-price performance", path: "q1PricePerformance", unit: "percent", direction: "high" },
      { label: "Mar 31, 2026 close price", path: "priceMar31", unit: "USD per share", direction: "high" },

      { label: "Capital position (Mar 31, 2026)", isSection: true },
      { label: "Corporate debt", path: "corporateDebt", unit: "USD millions", direction: "low" },
      { label: "Securitized debt (non-recourse)", path: "securitizedDebt", unit: "USD millions", direction: "low" },
      { label: "Q1 buybacks", path: "buybacks", unit: "USD millions", direction: "high", note: "MVW Q1 buyback not broken out" },
      { label: "Q1 dividends paid", path: { mvw: null, hgv: null, tnl: "dividendsPaid" }, unit: "USD millions", direction: "high" },

      { label: "FY2025 operating anchors", isSection: true },
      { label: "FY2025 revenue", path: "revenueFY", unit: "USD millions", direction: "high" },
      { label: "FY2025 Adj EBITDA", path: "adjEbitdaFY", unit: "USD millions", direction: "high" },
      { label: "FY2025 contract / Gross VOI sales", path: "contractSalesFY", unit: "USD millions", direction: "high" },
      { label: "FY2025 VPG", path: "vpgFY", unit: "USD per guest", direction: "high" },
      { label: "Owner / member families", path: "owners", unit: "owner families", direction: "high" },
      { label: "Resorts", path: "resorts", unit: "vacation-ownership resorts", direction: "high" },
      { label: "New-buyer FICO", path: "avgFico", unit: "FICO", direction: "high" },

      { label: "2026 Adj EBITDA guidance (mid)", isSection: true },
      { label: "2026 Adj EBITDA guide (mid)", path: null, unit: "USD millions", direction: "high",
        guideMid: { mvw: 768, hgv: 1245, tnl: 1043 },
        guideRange: { mvw: "$755-780M", hgv: "$1,225-1,265M (raised)", tnl: "$1,030-1,055M (reaffirmed)" } }
    ];

    function getKpi(co, path) {
      if (path === null || path === undefined) return null;
      const key = typeof path === "string" ? path : path[co.slug];
      if (!key) return null;
      return co.q1Headline[key] || null;
    }
    function getValue(co, path) { const k = getKpi(co, path); return k ? k.value : null; }
    function findLeader(values, direction) {
      const valid = values.filter(v => typeof v === "number");
      if (valid.length === 0 || direction === "neutral") return -1;
      const target = direction === "high" ? Math.max(...valid) : Math.min(...valid);
      return values.indexOf(target);
    }

    const scorecardRows = rows.map(row => {
      if (row.isSection) {
        return `<div class="sc-section">${row.label}</div>`;
      }

      // 2026 guidance row uses pre-set midpoints
      if (row.guideMid) {
        const vals = [row.guideMid.mvw, row.guideMid.hgv, row.guideMid.tnl];
        const leaderIdx = findLeader(vals, row.direction);
        const cell = (idx, mid, range, slug) => `
          <div class="sc-cell sc-cell--num ${idx === leaderIdx ? "sc-cell--leader" : ""}" data-source="2026 full-year guidance midpoint">
            ${escapeHtml(fmtNumber(mid, "USD millions"))}
            <span class="delta is-neutral" style="font-style:normal;">${escapeHtml(range)}</span>
          </div>`;
        return `
          <div class="sc-cell sc-cell--label">${escapeHtml(row.label)}</div>
          ${cell(0, row.guideMid.mvw, row.guideRange.mvw, "mvw")}
          ${cell(1, row.guideMid.hgv, row.guideRange.hgv, "hgv")}
          ${cell(2, row.guideMid.tnl, row.guideRange.tnl, "tnl")}
        `;
      }

      const m = getKpi(mvw, row.path);
      const h = getKpi(hgv, row.path);
      const t = getKpi(tnl, row.path);
      const vals = [m?.value, h?.value, t?.value];
      const leaderIdx = findLeader(vals, row.direction);

      const cell = (idx, kpi, slug) => {
        if (!kpi || kpi.value === null || kpi.value === undefined) {
          return `<div class="sc-cell sc-cell--num muted">—</div>`;
        }
        const isLeader = idx === leaderIdx;
        const pct = (typeof kpi.value === "number" && typeof kpi.priorQ1 === "number")
          ? fmtDelta(kpi.value, kpi.priorQ1)
          : (typeof kpi.value === "number" && typeof kpi.prior === "number") ? fmtDelta(kpi.value, kpi.prior) : null;
        return `
          <div class="sc-cell sc-cell--num ${isLeader ? "sc-cell--leader" : ""}" data-source="${escapeHtml(kpi.source || "")}">
            ${escapeHtml(fmtNumber(kpi.value, kpi.unit || row.unit))}
            ${pct !== null ? `<span class="delta ${deltaClass(pct)}">${fmtDeltaPct(pct)}</span>` : ""}
          </div>
        `;
      };

      return `
        <div class="sc-cell sc-cell--label">
          ${escapeHtml(row.label)}${row.note ? ` <span class="muted">(${escapeHtml(row.note)})</span>` : ""}
          ${row.caption ? `<div class="sc-cell__caption">${escapeHtml(row.caption)}</div>` : ""}
        </div>
        ${cell(0, m, "mvw")}
        ${cell(1, h, "hgv")}
        ${cell(2, t, "tnl")}
      `;
    }).join("");

    const headerCell = (slug, name, ticker, color, period) => `
      <div class="sc-cell sc-cell--head" data-route="#/company/${slug}/exec">
        <span class="swatch" style="background:${color}"></span>${escapeHtml(name)}
        <span class="ticker">${escapeHtml(ticker)}</span>
        <span class="period-tag">Q1 '26</span>
        <span class="arrow">→</span>
      </div>
    `;

    return `
      <div class="quarter-banner">
        <div>
          <div class="quarter-banner__eyebrow">Q1 2026 · Quarter ended Mar 31, 2026 · All three peers reported</div>
          <h1 class="quarter-banner__headline">
            <span class="quarter-banner__highlight">HGV beats &amp; raises</span>, <span class="quarter-banner__highlight">TNL accelerates</span>, and <span class="quarter-banner__highlight">MVW resets</span> — three pure-plays, three different chapters in the same quarter.
          </h1>
        </div>
        <div class="quarter-banner__stats">
          <div class="quarter-banner__stat">MVW released<span class="num">May 5</span></div>
          <div class="quarter-banner__stat">HGV released<span class="num">Apr 29</span></div>
          <div class="quarter-banner__stat">TNL released<span class="num">Apr 22</span></div>
        </div>
      </div>

      <div class="momentum-strip">
        <div class="momentum-strip__cell">
          <div class="momentum-strip__co"><span class="swatch" style="background:#0862A7"></span>MVW · Q1 Adj EBITDA</div>
          <div class="momentum-strip__metric">$161M <span class="num" style="color:var(--negative);font-size:14px;">−16% YoY</span></div>
          <div class="momentum-strip__sub">The reset. New operating team in place; April contract sales already <strong>+8% global / +11% North America</strong>.</div>
        </div>
        <div class="momentum-strip__cell">
          <div class="momentum-strip__co"><span class="swatch" style="background:#002C51"></span>HGV · Q1 Adj EBITDA</div>
          <div class="momentum-strip__metric">$267M <span class="num" style="color:var(--positive);font-size:14px;">+8% YoY</span></div>
          <div class="momentum-strip__sub">The beat &amp; raise. Adj EPS $0.99 vs. $0.56 cons; raised 2026 EBITDA guide to <strong>$1.225-1.265B</strong>.</div>
        </div>
        <div class="momentum-strip__cell">
          <div class="momentum-strip__co"><span class="swatch" style="background:#1D6B44"></span>TNL · Q1 Adj EBITDA</div>
          <div class="momentum-strip__metric">$225M <span class="num" style="color:var(--positive);font-size:14px;">+11% YoY</span></div>
          <div class="momentum-strip__sub">The accelerator. VO segment EBITDA <strong>+20%</strong> on +5% tours, +3% VPG, +7% Gross VOI.</div>
        </div>
      </div>

      <div class="page-header">
        <div>
          <h1>Q1 2026 Vacation Ownership Competitive Position</h1>
          <p>Side-by-side view of the three pure-play public timeshare operators after the full Q1 2026 reporting cycle. Click any company column to drill into Executive Overview, Segment Drill-Down, Global Footprint, Financial Deep Dive, Growth Catalysts, and Risk Matrix. Leader cell in each row is highlighted in gold.</p>
        </div>
        <span class="tag">Q1 2026</span>
      </div>

      <div class="grid grid--3" style="margin-bottom:32px;">
        ${heroCard("MVW", "Marriott Vacations", "VAC", mvw, "mvw")}
        ${heroCard("HGV", "Hilton Grand Vacations", "HGV", hgv, "hgv")}
        ${heroCard("TNL", "Travel + Leisure Co.", "TNL", tnl, "tnl")}
      </div>

      <h2>Q1 2026 Comparative Scorecard</h2>
      <div class="scorecard">
        <div class="sc-cell sc-cell--label" style="background:var(--bg-elevated);font-weight:700;">Metric</div>
        ${headerCell("mvw", "Marriott Vacations", "NYSE: VAC", "#0862A7")}
        ${headerCell("hgv", "Hilton Grand Vacations", "NYSE: HGV", "#002C51")}
        ${headerCell("tnl", "Travel + Leisure Co.", "NYSE: TNL", "#1D6B44")}
        ${scorecardRows}
      </div>

      <div class="grid grid--2" style="margin-top:32px;">
        <div class="panel">
          <h2>Q1 Revenue — YoY comparison</h2>
          <div class="chart-wrap"><canvas id="ov-chart-revenue"></canvas></div>
          <p class="muted" style="margin-top:12px;font-size:11px;">HGV led top-line growth at +11.9% YoY; MVW up modestly (+1%); TNL prior-year Q1 revenue not separately disclosed in headline release (FY2025 base $4.0B implies Q1 trajectory).</p>
        </div>
        <div class="panel">
          <h2>Q1 Adj EBITDA — YoY comparison</h2>
          <div class="chart-wrap"><canvas id="ov-chart-ebitda"></canvas></div>
          <p class="muted" style="margin-top:12px;font-size:11px;">MVW Adj EBITDA -16% YoY (lower contract sales, higher S&amp;M investment for turnaround); HGV +8% (margin expansion); TNL +11% (driven by VO segment +20%).</p>
        </div>
        <div class="panel">
          <h2>Q1 Contract sales / Gross VOI sales</h2>
          <div class="chart-wrap"><canvas id="ov-chart-contract"></canvas></div>
          <p class="muted" style="margin-top:12px;font-size:11px;">TNL Gross VOI +7% to $549M; HGV ~flat at $719M (lapping HGV Max launch); MVW -2% to $411M (Asia-Pac planned reductions). Note: TNL "contract sales" reported as Gross VOI sales.</p>
        </div>
        <div class="panel">
          <h2>2026 Adj EBITDA guidance (midpoint)</h2>
          <div class="chart-wrap"><canvas id="ov-chart-guide"></canvas></div>
          <p class="muted" style="margin-top:12px;font-size:11px;">HGV midpoint $1,245M (RAISED +$40M from prior). TNL midpoint $1,043M (reaffirmed). MVW midpoint $768M (reaffirmed; +4% YoY).</p>
        </div>
      </div>

      <div class="panel" style="margin-top:32px;">
        <h2>Q1 2026 market capitalization &amp; share-price performance</h2>
        <p class="muted" style="font-size:12px;margin-bottom:16px;">
          Market cap as of <strong>March 31, 2026</strong> close (Yahoo Finance) × Q1 2026 weighted-average diluted shares (derived from each company's Q1 net income / diluted EPS).
          Q1 stock-price performance compares Mar 31, 2026 close to Dec 31, 2025 close (price-only return, ex-dividends).
        </p>
        <div class="grid grid--3">
          ${marketCapCard("MVW", mvw, "#0862A7", "mvw")}
          ${marketCapCard("HGV", hgv, "#002C51", "hgv")}
          ${marketCapCard("TNL", tnl, "#1D6B44", "tnl")}
        </div>
        <div class="grid grid--2" style="margin-top:24px;">
          <div>
            <h3>Market cap — Q1 starting vs. ending</h3>
            <div class="chart-wrap"><canvas id="ov-chart-mktcap"></canvas></div>
            <p class="muted" style="font-size:11px;margin-top:8px;">Bars compare market cap on Dec 31, 2025 (Q1 starting) to Mar 31, 2026 (Q1 ending). TNL leads in absolute size; MVW is the smallest but had the strongest Q1 share-price gain.</p>
          </div>
          <div>
            <h3>Q1 stock-price performance</h3>
            <div class="chart-wrap"><canvas id="ov-chart-perf"></canvas></div>
            <p class="muted" style="font-size:11px;margin-top:8px;">VAC +12.9% reflects investor optimism about the new operating team's commercial-turnaround plan; HGV −12.6% reflects the lap of Bluegreen Max launch + VPG headwind; TNL roughly flat after a record FY2025.</p>
          </div>
        </div>
      </div>

      <div class="panel" style="margin-top:32px;">
        <h2>What's the executive read on Q1 2026?</h2>
        <div class="grid grid--3" style="margin-top:8px;">
          <div>
            <h3>MVW · The reset quarter</h3>
            <ul style="font-size:13px;color:var(--text-secondary);line-height:1.7;">
              <li><strong>New operating team installed</strong> — Avril (CEO), Flaskey (COO), new CSMO. Six months of work showing up in <strong>April</strong>: +8% global / +11% NA contract sales, VPG +$450 / +12.7%.</li>
              <li><strong>Three near-term catalysts</strong>: new loyalty tiers (May 1), Dream Vacation Packages (late May), Inner Circle events platform (June 22).</li>
              <li><strong>Guide raised on top line</strong> (+3-7% contract sales) but EBITDA reaffirmed — reflects upfront investment in turnaround initiatives.</li>
              <li><strong>$114M Q1 adjusted FCF</strong> (+$74M YoY) and $850M liquidity; non-core dispositions on track ($125M+ this year toward $200-250M by 2027).</li>
            </ul>
          </div>
          <div>
            <h3>HGV · The financial outperformer</h3>
            <ul style="font-size:13px;color:var(--text-secondary);line-height:1.7;">
              <li><strong>Adj diluted EPS $0.99</strong> beat $0.56 consensus by 67%. Real-estate margin +350 bps to 28%.</li>
              <li><strong>Highest Q1 new-buyer transactions since 2023</strong> (+8% YoY); HGV Max base 277K (+29% YoY).</li>
              <li><strong>2026 Adj EBITDA guide raised</strong> to $1.225-1.265B (+$40M at mid). Buyback cadence ~$150M/quarter sustained ($2.3B since IPO).</li>
              <li><strong>VPG headwind</strong> -8.1% YoY; mgmt expects continued declines through Q2/Q3 before Q4 inflection as Bluegreen Max launch fully laps.</li>
              <li><strong>Elara JV buyout</strong> ($129M, Apr 29) converts Las Vegas flagship to owned; ~$20M EBITDA contribution rest of 2026.</li>
            </ul>
          </div>
          <div>
            <h3>TNL · The operational accelerator</h3>
            <ul style="font-size:13px;color:var(--text-secondary);line-height:1.7;">
              <li><strong>Vacation Ownership segment +20% Adj EBITDA</strong> — best Q1 segment growth of the three peers.</li>
              <li><strong>Tours +5%, VPG +3%, Gross VOI +7%</strong> — clean operational beat across all three timeshare unit drivers.</li>
              <li><strong>Resort-Optimization Initiative</strong> ($24M Q1 charges; 17 resorts) on track to deliver maintenance-fee savings.</li>
              <li><strong>Capital return discipline</strong> — $128M to shareholders ($41M div + $87M buyback); $832M remaining authorization. Q2 div held flat.</li>
              <li><strong>Travel & Membership</strong> -8% revenue / -13% EBITDA on softer rev/transaction; the soft spot vs. accelerating VO.</li>
            </ul>
          </div>
        </div>
        <div style="margin-top:20px;">
          <span class="vector-tag">MVW · Inner Circle launch (Jun 22)</span>
          <span class="vector-tag">MVW · Loyalty tiers (May 1)</span>
          <span class="vector-tag">HGV · Elara buyout</span>
          <span class="vector-tag">HGV · Buybacks ~$150M/qtr</span>
          <span class="vector-tag">TNL · 17-resort optimization</span>
          <span class="vector-tag">TNL · 4th SI Resort (Baton Rouge)</span>
          <span class="vector-tag">All · ABS issuance @ ~5.0-5.1%</span>
        </div>
      </div>

      ${sourcesBlock([...mvw.sources, ...hgv.sources, ...tnl.sources])}
    `;

    function marketCapCard(short, co, color, slug) {
      const k = co.q1Headline;
      const mc = k.marketCapEoq.value;
      const mcStart = (k.priceDec31.value * k.dilutedShares.value);
      const change = k.q1PricePerformance.value;
      const changeClass = change > 0 ? "is-positive" : (change < 0 ? "is-negative" : "is-neutral");
      const changeArrow = change > 0 ? "▲" : (change < 0 ? "▼" : "▬");
      return `
        <div class="panel" style="border-top:3px solid ${color};padding:20px 24px;cursor:pointer;" data-route="#/company/${slug}/financials">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
            <span style="display:inline-block;width:14px;height:14px;background:${color};"></span>
            <span style="font-family:'Lato';font-size:11px;font-weight:700;letter-spacing:0.6px;text-transform:uppercase;color:var(--text-secondary);">${short} · ${escapeHtml(co.ticker)}</span>
          </div>
          <div style="font-family:'Montserrat';font-size:30px;font-weight:200;color:var(--ink-deep);letter-spacing:-0.6px;line-height:1.05;">
            ${fmtNumber(mc, "USD millions")}
          </div>
          <div style="font-size:11px;color:var(--text-tertiary);margin-top:2px;">EoQ market cap</div>
          <div style="margin-top:14px;padding-top:10px;border-top:1px dashed var(--border-subtle);display:flex;justify-content:space-between;align-items:baseline;font-size:12px;">
            <span style="color:var(--text-secondary);font-weight:600;">Q1 share-price</span>
            <span class="${changeClass}" style="font-family:'JetBrains Mono';font-weight:700;font-size:14px;">
              ${changeArrow} ${change > 0 ? "+" : ""}${change.toFixed(2)}%
            </span>
          </div>
          <div style="margin-top:8px;display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:11px;color:var(--text-tertiary);">
            <div>Dec 31, 2025: <span class="num" style="color:var(--text-primary);font-weight:600;">$${k.priceDec31.value.toFixed(2)}</span></div>
            <div>Mar 31, 2026: <span class="num" style="color:var(--text-primary);font-weight:600;">$${k.priceMar31.value.toFixed(2)}</span></div>
            <div style="grid-column:span 2;">Diluted shares: <span class="num" style="color:var(--text-primary);font-weight:600;">${k.dilutedShares.value.toFixed(1)}M</span></div>
          </div>
        </div>
      `;
    }

    function heroCard(short, full, ticker, co, slug) {
      const mark = co.brandColor;
      const accent = co.brandAccent || co.brandColor;
      const k = co.q1Headline;
      return `
        <div class="panel panel--accent hero-card" style="--brand-primary:${mark};--brand-primary-on-dark:${accent};border-top-color:${accent};" data-route="#/company/${slug}/exec">
          <div class="hero-card__head">
            <div class="hero-card__mark" style="background:${mark};">${short}</div>
            <div class="hero-card__title">
              <div class="hero-card__name">${full}</div>
              <div class="hero-card__ticker">${ticker} · Q1 2026</div>
            </div>
            <div class="hero-card__arrow">→</div>
          </div>
          <div class="hero-card__revenue num">${fmtNumber(k.revenue.value, "USD millions")}<span class="kpi__unit"> Q1 revenue</span></div>
          <div class="hero-card__desc">${co.narrative.oneLiner}</div>
          <div class="hero-card__stats">
            <div><span class="num">${fmtNumber(k.adjEbitda.value, "USD millions")}</span> Q1 Adj EBITDA</div>
            <div><span class="num">${k.resorts.value}+</span> resorts</div>
            <div><span class="num">${(k.owners.value / 1000).toFixed(0)}k</span> owners</div>
          </div>
        </div>
      `;
    }
  }

  function afterOverview() {
    const D = window.MVW_DATA.companies;
    // Q1 revenue YoY
    MVW_CHARTS.comparativeBars("ov-chart-revenue", {
      labels: ["Q1 2025", "Q1 2026"],
      mvw: [D.mvw.q1Headline.revenue.priorQ1 ?? null, D.mvw.q1Headline.revenue.value],
      hgv: [D.hgv.q1Headline.revenue.priorQ1 ?? null, D.hgv.q1Headline.revenue.value],
      tnl: [null, D.tnl.q1Headline.revenue.value],
      currency: true, unit: "M"
    });
    // Q1 Adj EBITDA YoY
    MVW_CHARTS.comparativeBars("ov-chart-ebitda", {
      labels: ["Q1 2025", "Q1 2026"],
      mvw: [D.mvw.q1Headline.adjEbitda.priorQ1, D.mvw.q1Headline.adjEbitda.value],
      hgv: [D.hgv.q1Headline.adjEbitda.priorQ1, D.hgv.q1Headline.adjEbitda.value],
      tnl: [D.tnl.q1Headline.adjEbitda.priorQ1, D.tnl.q1Headline.adjEbitda.value],
      currency: true, unit: "M"
    });
    // Q1 contract / VOI sales
    MVW_CHARTS.comparativeBars("ov-chart-contract", {
      labels: ["Q1 2025", "Q1 2026"],
      mvw: [D.mvw.q1Headline.contractSales.priorQ1, D.mvw.q1Headline.contractSales.value],
      hgv: [D.hgv.q1Headline.contractSales.priorQ1, D.hgv.q1Headline.contractSales.value],
      tnl: [513, D.tnl.q1Headline.grossVoiSales.value],
      currency: true, unit: "M"
    });
    // 2026 Adj EBITDA guidance midpoint
    MVW_CHARTS.comparativeBars("ov-chart-guide", {
      labels: ["2026 Adj EBITDA guide (mid)"],
      mvw: [(D.mvw.guidance.adjEbitda.low + D.mvw.guidance.adjEbitda.high) / 2],
      hgv: [(D.hgv.guidance.adjEbitda.low + D.hgv.guidance.adjEbitda.high) / 2],
      tnl: [(D.tnl.guidance.adjEbitda.low + D.tnl.guidance.adjEbitda.high) / 2],
      currency: true, unit: "M"
    });
    // Market cap — Q1 starting vs. ending
    const startCap = (co) => Math.round(co.q1Headline.priceDec31.value * co.q1Headline.dilutedShares.value);
    MVW_CHARTS.comparativeBars("ov-chart-mktcap", {
      labels: ["Dec 31, 2025", "Mar 31, 2026"],
      mvw: [startCap(D.mvw), D.mvw.q1Headline.marketCapEoq.value],
      hgv: [startCap(D.hgv), D.hgv.q1Headline.marketCapEoq.value],
      tnl: [startCap(D.tnl), D.tnl.q1Headline.marketCapEoq.value],
      currency: true, unit: "M"
    });
    // Q1 stock-price performance (% change)
    MVW_CHARTS.comparativeBars("ov-chart-perf", {
      labels: ["Q1 2026 share-price change"],
      mvw: [D.mvw.q1Headline.q1PricePerformance.value],
      hgv: [D.hgv.q1Headline.q1PricePerformance.value],
      tnl: [D.tnl.q1Headline.q1PricePerformance.value],
      currency: false, unit: "%"
    });
  }

  // ---------------------------------------------------------------- Company hero
  function companyHero(co) {
    return `
      <div class="company-hero">
        <div class="company-hero__mark" style="background:${co.brandColor};">${co.shortName}</div>
        <div class="company-hero__body">
          <div class="company-hero__name">${escapeHtml(co.name)}</div>
          <div class="company-hero__meta">
            <span>${escapeHtml(co.exchange)}: ${escapeHtml(co.ticker)}</span>
            <span>HQ ${escapeHtml(co.hq)}</span>
            <span>CEO ${escapeHtml(co.ceo.name)}</span>
            <span>${co.fiscal.period}</span>
            <span>Released ${escapeHtml(co.fiscal.releaseDate)}</span>
          </div>
        </div>
        <button class="company-hero__back" data-route="#/">← Back to overview</button>
      </div>
    `;
  }

  function companyTabs(co, activeTab) {
    const tabs = [
      ["exec", "Executive Overview"],
      ["segments", "Segment Drill-Down"],
      ["footprint", "Global Footprint"],
      ["financials", "Financial Deep Dive"],
      ["growth", "Growth Catalysts"],
      ["risks", "Risk Matrix"]
    ];
    return `
      <div class="tabs">
        ${tabs.map(([slug, label]) => `
          <button class="tab ${activeTab === slug ? "is-active" : ""}" data-route="#/company/${co.slug}/${slug}">
            ${label}
          </button>
        `).join("")}
      </div>
    `;
  }

  function sourcesBlock(sources) {
    const unique = [...new Map(sources.map(s => [s.url + s.label, s])).values()];
    return `
      <div class="sources">
        <h3>Sources</h3>
        <ul>
          ${unique.map(s => `<li><a href="${escapeHtml(s.url)}" target="_blank" rel="noopener">${escapeHtml(s.label)}</a></li>`).join("")}
        </ul>
      </div>
    `;
  }

  // ---------------------------------------------------------------- Tab: Executive Overview
  function renderExec(co) {
    const k = co.q1Headline;
    return `
      ${companyHero(co)}
      ${companyTabs(co, "exec")}

      <div class="callout">
        <strong>${escapeHtml(co.name)}.</strong> ${escapeHtml(co.narrative.oneLiner)}
      </div>

      <h3 style="margin-top:8px;">Q1 2026 headline metrics</h3>
      <div class="grid grid--4" style="margin-bottom:24px;">
        ${kpiCard({ label: "Q1 revenue", value: k.revenue.value, unit: k.revenue.unit, prior: k.revenue.priorQ1, source: k.revenue.source, note: k.revenue.note })}
        ${kpiCard({ label: "Q1 Adj EBITDA", value: k.adjEbitda.value, unit: k.adjEbitda.unit, prior: k.adjEbitda.priorQ1, source: k.adjEbitda.source, note: k.adjEbitda.note })}
        ${kpiCard({ label: "Q1 Adj EBITDA margin", value: k.adjEbitdaMargin.value, unit: k.adjEbitdaMargin.unit, source: k.adjEbitdaMargin.source, note: k.adjEbitdaMargin.note })}
        ${kpiCard({ label: "Q1 net income", value: k.netIncome.value, unit: k.netIncome.unit, prior: k.netIncome.priorQ1, source: k.netIncome.source })}
        ${k.adjDilutedEps ? kpiCard({ label: "Q1 adj diluted EPS", value: k.adjDilutedEps.value, unit: k.adjDilutedEps.unit, prior: k.adjDilutedEps.priorQ1, source: k.adjDilutedEps.source, note: k.adjDilutedEps.note }) : ""}
        ${k.dilutedEps ? kpiCard({ label: "Q1 diluted EPS (GAAP)", value: k.dilutedEps.value, unit: k.dilutedEps.unit, prior: k.dilutedEps.priorQ1, source: k.dilutedEps.source }) : ""}
        ${k.contractSales ? kpiCard({ label: "Q1 contract sales", value: k.contractSales.value, unit: k.contractSales.unit, prior: k.contractSales.priorQ1, source: k.contractSales.source, note: k.contractSales.note }) : (k.grossVoiSales ? kpiCard({ label: "Q1 Gross VOI sales", value: k.grossVoiSales.value, unit: k.grossVoiSales.unit, source: k.grossVoiSales.source, note: k.grossVoiSales.note }) : "")}
        ${k.vpg && k.vpg.value !== null ? kpiCard({ label: "Q1 VPG", value: k.vpg.value, unit: k.vpg.unit, prior: k.vpg.priorQ1, source: k.vpg.source, note: k.vpg.note }) : `<div class="kpi"><div class="kpi__label">Q1 VPG</div><div class="kpi__value is-small">Not separately disclosed</div><div class="kpi__source">${escapeHtml(k.vpg?.note || "")}</div></div>`}
      </div>

      <div class="grid grid--2">
        <div class="panel">
          <h2>Company at a glance</h2>
          <table class="data">
            <tbody>
              <tr><td>Headquarters</td><td class="num">${escapeHtml(co.hq)}</td></tr>
              <tr><td>History</td><td>${escapeHtml(co.foundedSpinOff)}</td></tr>
              <tr><td>CEO</td><td>${escapeHtml(co.ceo.name)} — ${escapeHtml(co.ceo.title)}<div class="muted">${escapeHtml(co.ceo.note || "")}</div></td></tr>
              <tr><td>CFO</td><td>${escapeHtml(co.cfo.name)} — ${escapeHtml(co.cfo.title)}</td></tr>
              ${co.coo ? `<tr><td>COO</td><td>${escapeHtml(co.coo.name)} — ${escapeHtml(co.coo.title)}<div class="muted">${escapeHtml(co.coo.note || "")}</div></td></tr>` : ""}
              <tr><td>Associates (latest 10-K)</td><td class="num">${co.employees.value.toLocaleString()}</td></tr>
              <tr><td>Resorts</td><td class="num">${k.resorts.value}+</td></tr>
              <tr><td>Owner / member families</td><td class="num">${k.owners.value.toLocaleString()}</td></tr>
              ${k.countries ? `<tr><td>Countries</td><td class="num">${k.countries.value}</td></tr>` : ""}
              <tr><td>Q1 2026 release date</td><td>${escapeHtml(co.fiscal.releaseDate)}</td></tr>
            </tbody>
          </table>
        </div>

        <div class="panel">
          <h2>The Q1 2026 chapter</h2>
          <p style="font-size:13px;line-height:1.7;color:var(--text-secondary);">${escapeHtml(co.narrative.history)}</p>
          <div class="divider"></div>
          <p style="font-size:13px;line-height:1.7;color:var(--text-primary);">${escapeHtml(co.narrative.currentChapter)}</p>
        </div>
      </div>

      ${co.slug === "mvw" ? `
        <div class="panel" style="margin-top:24px;">
          <h2>Commercial Turnaround Update — May 5, 2026 transcript highlights</h2>
          <div class="callout" style="margin-bottom:16px;">
            <strong>Q1 2026 earnings call</strong> · CEO Matt Avril (six months in role) and President & COO Mike Flaskey (~3 months in role) gave the most substantive operating-strategy update since the leadership transition.
          </div>
          <div class="transcript-quote">
            <div class="transcript-quote__speaker">Matt Avril, CEO</div>
            <div class="transcript-quote__text">"In any situation like the one when I stepped in, you assess who and then you go assess what. I will tell you that we are, from my personal perspective, well ahead where I could have hoped we would be a little over two months ago, stepping in and taking on the role in a more permanent way."</div>
          </div>
          <div class="transcript-quote">
            <div class="transcript-quote__speaker">Mike Flaskey, President & COO</div>
            <div class="transcript-quote__text">"Global contract sales were up 8% in April on a year-over-year basis, powered by North America where we were up 11%. This is a significant indicator that our strategy has taken hold. Our VPGs in April were up $450, just over 12.7% versus prior year."</div>
          </div>
          <div class="transcript-quote">
            <div class="transcript-quote__speaker">Mike Flaskey on Inner Circle (launches June 22)</div>
            <div class="transcript-quote__text">"This type of event platform has proven to drive higher quality, incremental tour flow and VPG, while strengthening engagement across the owner's life cycle. The team that we now have introduced this concept to our industry — so we feel very confident in our ability to execute on it."</div>
          </div>
          <div class="transcript-quote">
            <div class="transcript-quote__speaker">Mike Flaskey on data-driven tour logistics</div>
            <div class="transcript-quote__text">"This is the most robust data pool that we've had to generate leads with — the Marriott Bonvoy and the World of Hyatt. We have significant runway left for first-time buyers in those databases. This company significantly underperformed versus the industry on owner arrival to tour rates — we have a serious opportunity to enhance that."</div>
          </div>
          <div class="transcript-quote">
            <div class="transcript-quote__speaker">Jason Marino, CFO</div>
            <div class="transcript-quote__text">"In April, in the midst of market volatility and increasing uncertainty, we completed our first securitization of the year, raising $460 million at a blended interest rate of 4.86%, and an advance rate of 98%, further strengthening our liquidity and demonstrating continued access to the ABS market."</div>
          </div>
          <div class="call-source">
            Source: <a href="${escapeHtml(co.recentCall.sourceUrl)}" target="_blank" rel="noopener">${escapeHtml(co.recentCall.sourceLabel)}</a>
          </div>
        </div>
      ` : ""}

      ${co.recentCall ? `
        <div class="panel" style="margin-top:24px;">
          <h2>${co.slug === "mvw" ? "Q1 call — full key-items list" : "Q1 2026 call — key items"}</h2>
          <div class="callout" style="margin-bottom:16px;">
            <strong>${escapeHtml(co.recentCall.period)} call</strong> · released ${escapeHtml(co.recentCall.date)} · paraphrased from primary-source release / transcript.
          </div>
          <ul class="call-list">
            ${co.recentCall.items.map(item => `<li>${escapeHtml(item)}</li>`).join("")}
          </ul>
          <div class="call-source">
            Source: <a href="${escapeHtml(co.recentCall.sourceUrl)}" target="_blank" rel="noopener">${escapeHtml(co.recentCall.sourceLabel)}</a>
          </div>
        </div>
      ` : ""}

      ${sourcesBlock(co.sources)}
    `;
  }

  // ---------------------------------------------------------------- Tab: Segment Drill-Down
  function renderSegments(co) {
    const segs = co.segments;
    return `
      ${companyHero(co)}
      ${companyTabs(co, "segments")}

      <div class="callout">
        Segment-level revenue, Adj EBITDA, and margin from each company's Q1 2026 release. <strong>Note:</strong> MVW segments are FY2025 baselines (Q1 segment splits not separately disclosed in the May 5, 2026 release); HGV and TNL segment splits are Q1 2026.
      </div>

      <div class="grid grid--2">
        <div class="panel">
          <h2>Revenue mix by segment</h2>
          <div class="chart-wrap chart-wrap--tall"><canvas id="seg-doughnut"></canvas></div>
        </div>
        <div class="panel">
          <h2>Revenue & Adj EBITDA — by segment</h2>
          <div class="chart-wrap chart-wrap--tall"><canvas id="seg-bars"></canvas></div>
        </div>
      </div>

      <div class="panel" style="margin-top:24px;">
        <h2>Segment detail</h2>
        <table class="data">
          <thead>
            <tr>
              <th>Segment</th>
              <th class="num">Revenue</th>
              <th class="num">YoY %</th>
              <th class="num">Adj EBITDA</th>
              <th class="num">Margin</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            ${segs.map(s => {
              const yoy = (s.revenuePrior && s.revenue) ? fmtDelta(s.revenue, s.revenuePrior) : null;
              const ebitdaMargin = (s.margin || (s.revenue && s.adjEbitda ? (s.adjEbitda / s.revenue) * 100 : null));
              return `
                <tr>
                  <td><span class="tag" style="background:${s.color}22;border-color:${s.color};color:${s.color};">${escapeHtml(s.name)}</span></td>
                  <td class="num">${fmtNumber(s.revenue, "USD millions")}</td>
                  <td class="num"><span class="${deltaClass(yoy)}">${yoy !== null ? fmtDeltaPct(yoy) : "—"}</span></td>
                  <td class="num">${fmtNumber(s.adjEbitda, "USD millions")}</td>
                  <td class="num">${ebitdaMargin !== null ? ebitdaMargin.toFixed(1) + "%" : "—"}</td>
                  <td class="muted" style="max-width:380px;font-size:12px;">${escapeHtml(s.description)}</td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>

      <div class="panel" style="margin-top:24px;">
        <h2>Brand portfolio</h2>
        <table class="data">
          <thead>
            <tr>
              <th>Brand</th>
              ${co.brands[0].resorts !== undefined ? `<th class="num">Resorts</th>` : ""}
              ${co.brands[0].keys !== undefined ? `<th class="num">Keys</th>` : ""}
              <th>${co.brands[0].licensor ? "Licensor / Type" : "Type / Notes"}</th>
            </tr>
          </thead>
          <tbody>
            ${co.brands.map(b => `
              <tr>
                <td><strong>${escapeHtml(b.name)}</strong>${b.note ? `<div class="muted" style="font-size:11px;">${escapeHtml(b.note)}</div>` : ""}</td>
                ${co.brands[0].resorts !== undefined ? `<td class="num">${b.resorts !== undefined ? b.resorts : "—"}</td>` : ""}
                ${co.brands[0].keys !== undefined ? `<td class="num">${b.keys !== undefined ? b.keys.toLocaleString() : "—"}</td>` : ""}
                <td>${escapeHtml(b.licensor || b.type || "")}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
        <p class="muted" style="font-size:11px;margin-top:12px;">
          Brand-level operating metrics (tours, contract sales, VPG) are <strong>not disclosed at the individual-brand level</strong> in any of the three peers' Q1 2026 releases — these metrics are reported only at the consolidated company or operating-segment level.
        </p>
      </div>

      ${sourcesBlock(co.sources)}
    `;
  }

  function afterSegments(co) {
    MVW_CHARTS.segmentDoughnut("seg-doughnut", { segments: co.segments });
    MVW_CHARTS.segmentBars("seg-bars", { segments: co.segments });
  }

  // ---------------------------------------------------------------- Tab: Global Footprint
  function renderFootprint(co) {
    const regions = co.geography.regions;
    const totalResorts = regions.reduce((s, r) => s + (r.resorts || 0), 0);

    return `
      ${companyHero(co)}
      ${companyTabs(co, "footprint")}

      <div class="callout">
        ${escapeHtml(co.geography.summary)}
      </div>

      <div class="panel">
        <h2>Resort footprint — interactive map</h2>
        <div id="footprint-map"></div>
        <p class="muted" style="font-size:11px;margin-top:12px;">
          Markers represent disclosed regions or country clusters from the company's filings.
          ${co.slug !== "mvw" ? "Resort-level coordinates are not disclosed; markers are positioned at approximate regional centroids and sized by available data." : "MVW provides state/country-level resort and key counts in Item 2 of the FY2025 10-K."}
        </p>
      </div>

      <div class="panel" style="margin-top:24px;">
        <h2>Regional table</h2>
        <table class="data">
          <thead>
            <tr>
              <th>Region</th>
              <th class="num">Resorts</th>
              <th class="num">Keys / units</th>
              <th>Notes</th>
              <th class="num">Source</th>
            </tr>
          </thead>
          <tbody>
            ${regions.map(r => `
              <tr>
                <td>${escapeHtml(r.name)}</td>
                <td class="num">${r.resorts !== undefined ? r.resorts : (r.share !== undefined ? r.share + "%" : "—")}</td>
                <td class="num">${r.keys ? r.keys.toLocaleString() : "—"}</td>
                <td class="muted" style="font-size:11px;">${escapeHtml(r.note || "")}</td>
                <td class="num muted" style="font-size:10px;">${escapeHtml(r.source || "")}</td>
              </tr>
            `).join("")}
            <tr style="font-weight:600;background:rgba(255,255,255,0.025);">
              <td>Total disclosed resorts (regions with counts)</td>
              <td class="num">${totalResorts}</td>
              <td class="num">—</td>
              <td class="muted" style="font-size:11px;">${co.slug === "mvw" ? "Sums to 120 (10-K Item 1)" : "Disclosed concentrations only"}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      ${sourcesBlock(co.sources)}
    `;
  }

  function afterFootprint(co) {
    if (!window.L) return;
    const map = L.map("footprint-map", {
      center: [25, -40],
      zoom: 2,
      minZoom: 2,
      worldCopyJump: true,
      scrollWheelZoom: false
    });
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 19
    }).addTo(map);

    const color = co.brandAccent || co.brandColor;
    co.geography.regions.forEach(r => {
      if ((r.lat === 0 && r.lng === 0) || r.lat === undefined) return;
      const radius = r.resorts ? Math.min(28, 8 + Math.sqrt(r.resorts) * 4) : (r.share ? Math.min(28, 8 + Math.sqrt(r.share) * 3) : 8);
      const marker = L.circleMarker([r.lat, r.lng], {
        radius,
        color: color,
        weight: 2,
        fillColor: color,
        fillOpacity: 0.45
      }).addTo(map);
      const popup = `
        <strong>${escapeHtml(r.name)}</strong>
        ${r.resorts ? `<div>${r.resorts} resorts</div>` : ""}
        ${r.keys ? `<div>${r.keys.toLocaleString()} keys</div>` : ""}
        ${r.share ? `<div>${r.share}% of VOI sales</div>` : ""}
        ${r.note ? `<div style="color:var(--text-tertiary);font-size:11px;margin-top:4px;">${escapeHtml(r.note)}</div>` : ""}
      `;
      marker.bindPopup(popup);
    });

    setTimeout(() => map.invalidateSize(), 100);
  }

  // ---------------------------------------------------------------- Tab: Financial Deep Dive
  function renderFinancials(co) {
    const k = co.q1Headline;
    const totalDebt = (k.corporateDebt?.value || 0) + (k.securitizedDebt?.value || 0);
    const g = co.guidance;

    return `
      ${companyHero(co)}
      ${companyTabs(co, "financials")}

      <h3>Q1 2026 financial position</h3>
      <div class="grid grid--4" style="margin-bottom:24px;">
        ${kpiCard({ label: "Q1 Adj free cash flow", value: k.adjFreeCashFlow.value, unit: k.adjFreeCashFlow.unit, prior: k.adjFreeCashFlow.priorQ1, source: k.adjFreeCashFlow.source, note: k.adjFreeCashFlow.note })}
        ${kpiCard({ label: "Total debt (corp + non-recourse)", value: totalDebt, unit: "USD millions", source: "Q1 2026 release", note: `Corporate ${fmtNumber(k.corporateDebt.value, "USD millions")} + Non-recourse ${fmtNumber(k.securitizedDebt.value, "USD millions")}` })}
        ${kpiCard({ label: "Cash on hand", value: (k.cash || k.cashOnHand).value, unit: "USD millions", source: (k.cash || k.cashOnHand).source })}
        ${kpiCard({ label: "Leverage", value: (k.leverage || k.netLeverage).value, unit: "x", source: (k.leverage || k.netLeverage).source, note: (k.leverage || k.netLeverage).note, invertDelta: true })}
        ${k.adjDilutedEps ? kpiCard({ label: "Q1 adj diluted EPS", value: k.adjDilutedEps.value, unit: k.adjDilutedEps.unit, source: k.adjDilutedEps.source, note: k.adjDilutedEps.note }) : ""}
        ${k.buybacks ? kpiCard({ label: "Q1 buybacks", value: k.buybacks.value, unit: k.buybacks.unit, source: k.buybacks.source, note: k.buybacks.note }) : ""}
        ${k.dividendsPaid ? kpiCard({ label: "Q1 dividends paid", value: k.dividendsPaid.value, unit: k.dividendsPaid.unit, source: k.dividendsPaid.source, note: k.dividendsPaid.note }) : ""}
        ${k.remainingAuth ? kpiCard({ label: "Remaining buyback authorization", value: k.remainingAuth.value, unit: k.remainingAuth.unit, source: k.remainingAuth.source }) : ""}
      </div>

      <div class="grid grid--2">
        <div class="panel">
          <h2>Revenue trend (FY)</h2>
          <div class="chart-wrap chart-wrap--tall"><canvas id="fin-revenue"></canvas></div>
          <p class="muted" style="font-size:11px;margin-top:8px;">FY2023 / FY2024 / FY2025 from each company's most recent 10-K.</p>
        </div>
        <div class="panel">
          <h2>Adjusted EBITDA trend (FY)</h2>
          <div class="chart-wrap chart-wrap--tall"><canvas id="fin-ebitda"></canvas></div>
        </div>
        <div class="panel">
          <h2>Debt structure (post-Q1 2026)</h2>
          <div class="chart-wrap"><canvas id="fin-debt"></canvas></div>
          <p class="muted" style="font-size:11px;margin-top:8px;">Corporate tranches plus non-recourse securitized debt collateralized by VOI receivables.</p>
        </div>
        <div class="panel guidance-card">
          <h3>2026 Guidance</h3>
          ${g?.adjEbitda ? `<div class="guidance-card__row"><span class="label">Adj EBITDA</span><span class="val">$${g.adjEbitda.low.toLocaleString()}-${g.adjEbitda.high.toLocaleString()}M</span></div>` : ""}
          ${g?.contractSales ? `<div class="guidance-card__row"><span class="label">Contract sales</span><span class="val">$${g.contractSales.low.toLocaleString()}-${g.contractSales.high.toLocaleString()}M (+${g.contractSales.growth}%)</span></div>` : ""}
          ${g?.adjFreeCashFlow ? `<div class="guidance-card__row"><span class="label">Adj free cash flow</span><span class="val">$${g.adjFreeCashFlow.low}-${g.adjFreeCashFlow.high}M (+${g.adjFreeCashFlow.growth}%)</span></div>` : ""}
          ${g?.grossVoiSales ? `<div class="guidance-card__row"><span class="label">Gross VOI sales</span><span class="val">$${g.grossVoiSales.low.toLocaleString()}-${g.grossVoiSales.high.toLocaleString()}M</span></div>` : ""}
          ${g?.vpg ? `<div class="guidance-card__row"><span class="label">VPG</span><span class="val">$${g.vpg.low.toLocaleString()}-${g.vpg.high.toLocaleString()}</span></div>` : ""}
          ${g?.q2AdjEbitda ? `<div class="guidance-card__row"><span class="label">Q2 Adj EBITDA</span><span class="val">$${g.q2AdjEbitda.low}-${g.q2AdjEbitda.high}M</span></div>` : ""}
          ${g?.q2Adjebitda ? `<div class="guidance-card__row"><span class="label">Q2 Adj EBITDA</span><span class="val">$${g.q2Adjebitda.low}-${g.q2Adjebitda.high}M</span></div>` : ""}
          ${g?.q2GrossVoiSales ? `<div class="guidance-card__row"><span class="label">Q2 Gross VOI sales</span><span class="val">$${g.q2GrossVoiSales.low.toLocaleString()}-${g.q2GrossVoiSales.high.toLocaleString()}M</span></div>` : ""}
          ${g?.q2ContractSales ? `<div class="guidance-card__row"><span class="label">Q2 contract sales</span><span class="val">+${g.q2ContractSales.low}-${g.q2ContractSales.high}% YoY</span></div>` : ""}
          ${g?.contractSalesGrowth ? `<div class="guidance-card__row"><span class="label">Contract-sales outlook</span><span class="val">${escapeHtml(g.contractSalesGrowth.value)}</span></div>` : ""}
          ${g?.buybackPace ? `<div class="guidance-card__row"><span class="label">Buyback pace</span><span class="val">~$${g.buybackPace.value}M / quarter</span></div>` : ""}
          ${g?.adjEbitda?.note ? `<p class="muted" style="font-size:11px;margin-top:12px;">${escapeHtml(g.adjEbitda.note)}</p>` : ""}
        </div>
      </div>

      <div class="panel" style="margin-top:24px;">
        <h2>Receivables &amp; credit (Q1 2026)</h2>
        <div class="grid grid--3">
          ${k.avgFico ? kpiCard({ label: "New-buyer FICO (avg)", value: k.avgFico.value, unit: k.avgFico.unit, source: k.avgFico.source, note: k.avgFico.note }) : ""}
          ${k.defaultRate ? kpiCard({ label: "Default rate", value: k.defaultRate.value, unit: k.defaultRate.unit, prior: k.defaultRate.priorQ1, source: k.defaultRate.source, invertDelta: true, note: k.defaultRate.note }) : ""}
          ${k.salesReserve ? kpiCard({ label: "Sales reserve (Q1)", value: k.salesReserve.value, unit: k.salesReserve.unit, source: k.salesReserve.source, note: k.salesReserve.note, invertDelta: true }) : ""}
          ${k.delinquency31_60 ? kpiCard({ label: "31-60 day delinquency", value: k.delinquency31_60.value, unit: k.delinquency31_60.unit, prior: k.delinquency31_60.priorQ1, source: k.delinquency31_60.source, invertDelta: true }) : ""}
          ${k.delinquency91_120 ? kpiCard({ label: "91-120 day delinquency", value: k.delinquency91_120.value, unit: k.delinquency91_120.unit, source: k.delinquency91_120.source, invertDelta: true }) : ""}
          ${k.loanLossProvision ? kpiCard({ label: "Loan loss provision (Q1)", value: k.loanLossProvision.value, unit: k.loanLossProvision.unit, prior: k.loanLossProvision.priorQ1, source: k.loanLossProvision.source, invertDelta: true }) : ""}
          ${k.loanLossProvisionRate ? kpiCard({ label: "Loan loss provision rate", value: k.loanLossProvisionRate.value, unit: k.loanLossProvisionRate.unit, prior: k.loanLossProvisionRate.priorQ1, source: k.loanLossProvisionRate.source, note: k.loanLossProvisionRate.note, invertDelta: true }) : ""}
          ${k.allowance ? kpiCard({ label: "Loan loss allowance", value: k.allowance.value, unit: k.allowance.unit, source: k.allowance.source, note: k.allowance.note }) : ""}
          ${k.fico700plus ? kpiCard({ label: "Receivables ≥ 700 FICO", value: k.fico700plus.value, unit: k.fico700plus.unit, source: k.fico700plus.source }) : ""}
        </div>
      </div>

      ${k.absSecuritizationApr || k.absSecuritizationMar || k.securitizationApr2026 ? `
        <div class="panel" style="margin-top:24px;">
          <h2>Q1/Q2 2026 capital actions</h2>
          <table class="data">
            <thead><tr><th>Action</th><th class="num">Size</th><th>Terms / Notes</th><th class="num">Source</th></tr></thead>
            <tbody>
              ${k.securitizationApr2026 ? `<tr><td>April 2026 ABS securitization</td><td class="num">${fmtNumber(k.securitizationApr2026.value, "USD millions")}</td><td class="muted">${escapeHtml(k.securitizationApr2026.note)}</td><td class="num muted" style="font-size:10px;">${escapeHtml(k.securitizationApr2026.source)}</td></tr>` : ""}
              ${k.absSecuritizationApr ? `<tr><td>April 2026 ABS securitization</td><td class="num">${fmtNumber(k.absSecuritizationApr.value, "USD millions")}</td><td class="muted">${escapeHtml(k.absSecuritizationApr.note)}</td><td class="num muted" style="font-size:10px;">${escapeHtml(k.absSecuritizationApr.source)}</td></tr>` : ""}
              ${k.absSecuritizationMar ? `<tr><td>March 2026 ABS securitization</td><td class="num">${fmtNumber(k.absSecuritizationMar.value, "USD millions")}</td><td class="muted">${escapeHtml(k.absSecuritizationMar.note)}</td><td class="num muted" style="font-size:10px;">${escapeHtml(k.absSecuritizationMar.source)}</td></tr>` : ""}
              ${k.elaraBuyout ? `<tr><td>Elara JV 75% buyout</td><td class="num">${fmtNumber(k.elaraBuyout.value, "USD millions")}</td><td class="muted">${escapeHtml(k.elaraBuyout.note)}</td><td class="num muted" style="font-size:10px;">${escapeHtml(k.elaraBuyout.source)}</td></tr>` : ""}
              ${k.westinCancunSale ? `<tr><td>Westin Cancun sale</td><td class="num">${fmtNumber(k.westinCancunSale.value, "USD millions")}</td><td class="muted">${escapeHtml(k.westinCancunSale.note)}</td><td class="num muted" style="font-size:10px;">${escapeHtml(k.westinCancunSale.source)}</td></tr>` : ""}
            </tbody>
          </table>
        </div>
      ` : ""}

      ${sourcesBlock(co.sources)}
    `;
  }

  function afterFinancials(co) {
    const accent = co.brandAccent || co.brandColor;
    const rev = co.financials.revenueTrend.filter(r => r.value !== null);
    const ebitda = co.financials.ebitdaTrend.filter(r => r.value !== null);
    MVW_CHARTS.trendLine("fin-revenue", {
      labels: rev.map(r => "FY" + r.year),
      data: rev.map(r => r.value),
      color: accent,
      currency: true, unit: "M"
    });
    MVW_CHARTS.trendLine("fin-ebitda", {
      labels: ebitda.map(r => "FY" + r.year),
      data: ebitda.map(r => r.value),
      color: accent,
      currency: true, unit: "M"
    });
    MVW_CHARTS.stackedDebt("fin-debt", {
      tranches: co.financials.debtStack,
      color: accent
    });
  }

  // ---------------------------------------------------------------- Tab: Growth Catalysts
  function renderGrowth(co) {
    return `
      ${companyHero(co)}
      ${companyTabs(co, "growth")}

      <div class="callout">
        Strategic initiatives, capital-allocation priorities, and partnerships disclosed in the
        ${escapeHtml(co.fiscal.filingType)}, the ${escapeHtml(co.recentCall.period)} earnings call, and the most recent 10-K. No analyst projections.
      </div>

      ${co.strategicInitiatives && co.strategicInitiatives.length ? `
        <div class="panel">
          <h2>Initiatives announced or in-flight in Q1/Q2 2026</h2>
          ${co.strategicInitiatives.map((s, i) => `
            <div class="catalyst">
              <div class="catalyst__num">${i + 1}</div>
              <div>
                <div class="catalyst__head">${escapeHtml(s.title)}</div>
                <div class="catalyst__detail">${escapeHtml(s.detail)}</div>
                <div class="catalyst__source">Announced: ${escapeHtml(s.announced)}</div>
              </div>
            </div>
          `).join("")}
        </div>
      ` : ""}

      <div class="panel" style="margin-top:24px;">
        <h2>Disclosed growth catalysts</h2>
        ${co.growth.map((g, i) => `
          <div class="catalyst">
            <div class="catalyst__num">${i + 1}</div>
            <div>
              <div class="catalyst__head">${escapeHtml(g.headline)}</div>
              <div class="catalyst__detail">${escapeHtml(g.detail)}</div>
              <div class="catalyst__source">Source: ${escapeHtml(g.source)}</div>
            </div>
          </div>
        `).join("")}
      </div>

      ${sourcesBlock(co.sources)}
    `;
  }

  // ---------------------------------------------------------------- Tab: Risk Matrix
  function renderRisks(co) {
    const SEV_WORDS = { 1: "Minor", 2: "Low", 3: "Moderate", 4: "Major", 5: "Severe" };
    const LIK_WORDS = { 1: "Rare", 2: "Unlikely", 3: "Possible", 4: "Likely", 5: "Almost Certain" };

    const cells = {};
    co.risks.forEach((r, i) => {
      const key = `${r.likelihood}_${r.severity}`;
      if (!cells[key]) cells[key] = [];
      cells[key].push({ ...r, idx: i + 1 });
    });

    const heatScore = (likelihood, severity) => Math.min(5, Math.round((likelihood + severity) / 2));
    const dotColor = co.brandAccent || co.brandColor;

    let matrixHTML = "";
    matrixHTML += `<div></div><div></div>`;
    for (let lik = 1; lik <= 5; lik++) {
      matrixHTML += `
        <div class="risk-x-label">
          <span class="risk-axis-num">${lik}</span>
          <span class="risk-axis-word">${LIK_WORDS[lik]}</span>
        </div>
      `;
    }
    matrixHTML += `<div class="risk-y-title" style="grid-column:1; grid-row:2 / 7;">Severity →</div>`;
    for (let sev = 5; sev >= 1; sev--) {
      matrixHTML += `
        <div class="risk-y-label">
          <span class="risk-axis-num">${sev}</span>
          <span class="risk-axis-word">${SEV_WORDS[sev]}</span>
        </div>
      `;
      for (let lik = 1; lik <= 5; lik++) {
        const cellRisks = cells[`${lik}_${sev}`] || [];
        const heat = heatScore(lik, sev);
        matrixHTML += `
          <div class="risk-cell" data-heat="${heat}">
            ${cellRisks.map(r => `
              <div class="risk-dot" style="background:${dotColor}" title="${escapeHtml(r.title)} — Sev ${r.severity}/5, Lik ${r.likelihood}/5" data-risk="${r.idx - 1}">${r.idx}</div>
            `).join("")}
          </div>
        `;
      }
    }

    return `
      ${companyHero(co)}
      ${companyTabs(co, "risks")}

      <div class="callout">
        Risk titles &amp; verbatim language come from <strong>FY2025 10-K Item 1A</strong>, enriched with <strong>Q1 2026 management commentary</strong> on each topic. Items tagged <strong>(Q1 2026)</strong> in the title are <strong>Q1-emergent risks</strong> not in the 10-K — sourced from the Q1 release / call. Severity &amp; likelihood scores are <strong>analyst-coded overlays</strong>, not company disclosures. Hover or click any dot to jump to the verbatim risk language.
      </div>

      <div class="grid grid--2" style="align-items:start;">
        <div class="panel">
          <h2>Risk heat map</h2>
          <div class="risk-matrix-wrap">
            <div class="risk-matrix">${matrixHTML}</div>
            <div class="risk-x-title">Likelihood →</div>
          </div>
        </div>

        <div class="panel">
          <h2>All disclosed risk factors (verbatim) — with Q1 2026 mgmt commentary</h2>
          <div class="risk-list">
            ${co.risks.map((r, i) => `
              <div class="risk-list-item" id="risk-${i}">
                <div class="risk-list-item__num">${i + 1}</div>
                <div>
                  <div class="risk-list-item__title">${escapeHtml(r.title)}</div>
                  <div class="risk-list-item__verbatim">"${escapeHtml(r.verbatim)}"</div>
                  <div class="risk-list-item__meta">
                    <span><strong>Severity:</strong> ${r.severity}/5 — ${SEV_WORDS[r.severity]}</span>
                    <span><strong>Likelihood:</strong> ${r.likelihood}/5 — ${LIK_WORDS[r.likelihood]}</span>
                    <span><strong>Source:</strong> ${escapeHtml(r.source)}</span>
                  </div>
                  ${r.note ? `<div class="muted" style="font-size:11px;margin-top:6px;"><strong>Q1 2026 update:</strong> ${escapeHtml(r.note)}</div>` : ""}
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>

      ${sourcesBlock(co.sources)}
    `;
  }

  function afterRisks() {
    document.querySelectorAll(".risk-dot").forEach(dot => {
      dot.addEventListener("click", () => {
        const idx = dot.getAttribute("data-risk");
        const target = document.getElementById(`risk-${idx}`);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    });
  }

  return {
    renderOverview, afterOverview,
    renderExec,
    renderSegments, afterSegments,
    renderFootprint, afterFootprint,
    renderFinancials, afterFinancials,
    renderGrowth,
    renderRisks, afterRisks
  };
})();
