/**
 * MVW Competitive Intelligence Dashboard — Q1 2026 Edition — Data Module
 * ======================================================================
 * Single source of truth. All figures sourced from primary documents:
 *   - Q1 2026 earnings press releases (8-K Exhibit 99.1)
 *   - Q1 2026 investor presentations
 *   - Q1 2026 earnings-call transcripts
 *   - Most recent FY2025 10-K filings on SEC EDGAR (for trailing context)
 *
 * SHAPE (per company):
 *   slug, name, ticker, exchange, brand{Color,Soft}, hq, ceo, cfo
 *   fiscal: { year, period, releaseDate, sourceUrl }
 *   narrative: { history, oneLiner, currentChapter }
 *   q1Headline: { revenue, ebitda, contractSales, vpg, tours, ... }
 *     each leaf is { value, prior, unit, source, calc?, note? }
 *   trend: { fy23, fy24, fy25, q1_25, q1_26 } per metric
 *   segments, brands, geography, financials, growth, risks, sources, recentCall, guidance
 *
 * Last refreshed: 2026-05-05 (after MVW Q1 2026 release)
 *
 * Where Q1 2026 figures are not yet disclosed (e.g., HGV JIT mix), the
 * field is omitted or marked "not disclosed". Do not invent numbers.
 */

window.MVW_DATA = {
  meta: {
    lastUpdated: "2026-05-05",
    fiscalPeriod: "Q1 2026 (quarter ended March 31, 2026)",
    note: "All three peers have now reported Q1 2026: TNL (Apr 22), HGV (Apr 29), MVW (May 5). FY2025 baselines retained from each company's 10-K (filed Feb 2026).",
    disclaimer: "This dashboard summarizes publicly disclosed information. Severity and likelihood scores in the Risk Matrix are analyst-coded overlays — they are not company disclosures. No projections or estimates are presented as facts."
  },

  // -------------------------------------------------------------------------
  // MVW — Marriott Vacations Worldwide Corporation (NYSE: VAC)
  // -------------------------------------------------------------------------
  companies: {
    mvw: {
      slug: "mvw",
      name: "Marriott Vacations Worldwide",
      shortName: "MVW",
      ticker: "VAC",
      exchange: "NYSE",
      brandColor: "#0862A7",
      brandAccent: "#0862A7",
      brandSoft: "#04345C",
      hq: "Orlando, Florida",
      foundedSpinOff: "Spun off from Marriott International on November 21, 2011",
      ceo: { name: "Matthew E. Avril", title: "President & CEO", note: "Permanent CEO since February 16, 2026; six months in role at time of Q1 call" },
      cfo: { name: "Jason P. Marino", title: "EVP & CFO" },
      coo: { name: "Michael A. Flaskey", title: "President & COO", note: "Joined ~3 months prior to Q1 2026 call; new Chief Sales & Marketing Officer added under his leadership" },
      employees: { value: 21100, source: "10-K FY2025 (most recent disclosure)" },
      fiscal: {
        year: 2026,
        period: "Q1 2026 (quarter ended March 31, 2026)",
        filingType: "Q1 2026 earnings release / Investor Presentation",
        releaseDate: "2026-05-05",
        callDate: "2026-05-05",
        callTime: "8:30am ET",
        sourceUrl: "https://ir.marriottvacationsworldwide.com/news-releases"
      },
      narrative: {
        oneLiner: "The largest pure-play vacation-ownership operator under the Marriott umbrella, in the early innings of a commercial-turnaround led by a new operating team — with April 2026 contract sales already up 8% globally and 11% in North America.",
        history: "Spun off from Marriott International in 2011, MVW expanded materially via the 2018 Interval Leisure Group merger (adding Interval International, Hyatt Vacation Club, Aqua-Aston) and the 2021 Welk Resorts acquisition (folded into the Hyatt vacation-ownership business). Licenses Marriott, Sheraton, Westin, Ritz-Carlton, St. Regis, Luxury Collection, and Hyatt timeshare brands.",
        currentChapter: "Q1 2026 was the first quarter under permanent CEO Matt Avril (effective Feb 16, 2026) and the first full quarter for new President & COO Mike Flaskey. Headline Q1 contract sales declined 2% YoY to $411M — but the bigger story is the operational reset: a new Chief Sales & Marketing Officer, sales-force restructuring on May 1, owner-loyalty program expansion, and an 'Inner Circle' experiential-events platform launching in June. Management raised full-year contract-sales guidance to +3-7% (from prior guide) while reaffirming Adj EBITDA of $755-780M. April 2026 contract sales already +8% globally / +11% North America. Adjusted free cash flow guide of $375-425M for 2026 implies +176% growth vs. FY2025."
      },

      // Q1 2026 headline metrics
      q1Headline: {
        revenue: { value: 1260, priorQ1: 1248, unit: "USD millions", source: "MVW Q1 2026 release (May 5, 2026)", note: "Beat consensus of ~$1.20B by 5%" },
        adjEbitda: { value: 161, priorQ1: 192, unit: "USD millions", source: "MVW Q1 2026 release", note: "Down 16% YoY on lower contract sales, lower reportability, higher product/marketing costs" },
        adjEbitdaMargin: { value: 19.0, unit: "percent", calc: "Adj EBITDA / revenue excl. cost reimbursements", source: "MVW Q1 2026 release / call", note: "Down 370 bps YoY" },
        netIncome: { value: 22, priorQ1: 56, unit: "USD millions", source: "MVW Q1 2026 release", note: "Net income attributable to common stockholders" },
        dilutedEps: { value: 0.64, priorQ1: 1.46, unit: "USD per share", source: "MVW Q1 2026 release" },
        adjDilutedEps: { value: 1.24, priorQ1: 1.66, unit: "USD per share", source: "MVW Q1 2026 release", note: "Adj diluted EPS down 25%; missed consensus $1.71 by $0.47" },
        adjNetIncome: { value: 43, priorQ1: 65, unit: "USD millions", source: "MVW Q1 2026 release", note: "Down 34% YoY" },
        contractSales: { value: 411, priorQ1: 419, unit: "USD millions", source: "MVW Q1 2026 release", note: "Down 2% YoY; excl. Asia-Pac, contract sales down 1%" },
        ownerSales: { value: null, prior: null, unit: "percent change YoY", source: "MVW Q1 2026 call", note: "Owner sales +3% YoY; offset by lower first-time buyer sales" },
        vpg: { value: null, unit: "USD per guest", source: "MVW Q1 2026 release / call", note: "Q1 VPG not separately disclosed in summary materials; April 2026 VPG up ~$450 / +12.7% YoY" },
        tours: { value: null, unit: "tours", source: "MVW Q1 2026 release", note: "Tours down 3% YoY driven by planned Asia-Pacific reduction and FICO <640 cutoff" },
        adjFreeCashFlow: { value: 114, priorQ1: 40, unit: "USD millions", source: "MVW Q1 2026 release", note: "+$74M YoY; includes $50M Westin Cancun sale proceeds" },

        // Trailing FY2025 anchors (from 10-K)
        revenueFY: { value: 5032, prior: 4967, unit: "USD millions", source: "10-K FY2025" },
        adjEbitdaFY: { value: 751, prior: 736, unit: "USD millions", source: "10-K FY2025" },
        adjEbitdaMarginFY: { value: 22.5, unit: "percent", source: "10-K FY2025 MD&A" },
        contractSalesFY: { value: 1762, prior: 1813, unit: "USD millions", source: "10-K FY2025" },
        vpgFY: { value: 3794, prior: 3911, unit: "USD per guest", source: "10-K FY2025" },
        toursFY: { value: 431974, prior: 432716, unit: "tours", source: "10-K FY2025" },
        owners: { value: 700000, unit: "owner families", source: "10-K FY2025 / Q1 2026 IR Presentation", note: "~700,000 owner families" },
        existingOwnerMix: { value: 70, unit: "percent", source: "MVW Q1 2026 call", note: "Q1 existing-owner mix; ~30% first-time buyers" },
        firstTimeBuyerMix: { value: 28, unit: "percent of tour volume", source: "MVW Q1 2026 call", note: "First-time buyers as % of Q1 tour volume; higher on contract basis" },
        avgFico: { value: 740, unit: "FICO", source: "MVW Q1 2026 IR Presentation", note: "Buyers who financed their purchase in FY2025; ~80% of all owners have no loan" },
        salesReserve: { value: 12.3, prior: null, unit: "percent of contract sales", source: "MVW Q1 2026 call", note: "Down sequentially from Q4 2025; 120-day delinquencies +17 bps YoY but down 45 bps vs. 2024" },
        defaultRate: { value: null, unit: "percent", source: "MVW Q1 2026 call", note: "Defaults unchanged YoY; '2025 receivable originations performing in line with expectations'" },

        // Liquidity / debt as of March 30, 2026 (per IR Presentation)
        // Market cap as of end of Q1 2026 (close × Q1 weighted-avg diluted shares)
        marketCapEoq: { value: 2238, unit: "USD millions", source: "calculated: Mar 31, 2026 close $65.12 × Q1 weighted-avg diluted shares 34.4M (from $22M NI / $0.64 diluted EPS)" },
        priceMar31: { value: 65.12, unit: "USD per share", source: "Yahoo Finance (Mar 31, 2026 close)" },
        priceDec31: { value: 57.69, unit: "USD per share", source: "Yahoo Finance (Dec 31, 2025 close)" },
        q1PricePerformance: { value: 12.88, unit: "percent", source: "calculated: ($65.12 / $57.69) - 1", note: "Q1 2026 stock-price total return (price-only, ex-dividends)" },
        dilutedShares: { value: 34.4, unit: "millions of weighted-avg diluted shares", source: "calculated from Q1 2026 net income / diluted EPS" },

        liquidity: { value: 854, unit: "USD millions", source: "MVW Q1 2026 IR Presentation, slide 11", note: "$268M cash + $108M securitization-eligible notes + $478M revolver capacity" },
        cashOnHand: { value: 268, unit: "USD millions", source: "MVW Q1 2026 IR Presentation" },
        revolverAvailability: { value: 478, unit: "USD millions", source: "MVW Q1 2026 IR Presentation" },
        corporateDebt: { value: 3300, unit: "USD millions", source: "MVW Q1 2026 release", note: "$3.3B at quarter end; leverage ~4.2x (corp debt net of cash / Adj EBITDA)" },
        securitizedDebt: { value: 2300, unit: "USD millions", source: "MVW Q1 2026 release", note: "Non-recourse VOI receivable securitizations" },
        leverage: { value: 4.2, unit: "x", source: "MVW Q1 2026 release", note: "Corporate debt net of cash / TTM Adj EBITDA; framework target <4.0x" },

        // Capital actions
        securitizationApr2026: { value: 460, unit: "USD millions", source: "MVW Q1 2026 release / call", note: "Closed April 2026 at 4.86% blended rate, 98% advance rate" },
        westinCancunSale: { value: 50, unit: "USD millions", source: "MVW Q1 2026 release", note: "Closed in quarter; included in Q1 adjusted free cash flow" },
        nonCoreDispoTarget: { value: 200, unit: "USD millions (low end)", source: "MVW Q1 2026 release", note: "$200-250M total non-core asset disposition proceeds targeted by end of 2027; $125M+ expected in 2026" },

        resorts: { value: 120, unit: "vacation-ownership resorts", source: "10-K FY2025 / Q1 2026 IR Presentation" },
        countries: { value: 13, unit: "countries / territories", source: "10-K FY2025" },
        keys: { value: 31640, unit: "keys", source: "10-K FY2025" }
      },

      // 2026 guidance
      guidance: {
        contractSales: { low: 1815, high: 1885, unit: "USD millions", growth: 5, source: "MVW Q1 2026 release", note: "RAISED to +3-7% from prior guide; midpoint +5% YoY" },
        adjEbitda: { low: 755, high: 780, unit: "USD millions", growth: 4, source: "MVW Q1 2026 release", note: "Reaffirmed; +4% at midpoint" },
        adjFreeCashFlow: { low: 375, high: 425, unit: "USD millions", growth: 176, source: "MVW Q1 2026 release", note: "+176% YoY; mid-50% conversion" },
        vpgGrowth: { low: 5, high: 9, unit: "percent", source: "MVW Q1 2026 call", note: "Mid-to-high single digits" },
        toursGrowth: { low: -3, high: -1, unit: "percent", source: "MVW Q1 2026 call", note: "Decline driven by planned Asia-Pac reductions" },
        q2Adjebitda: { low: 187, high: 202, unit: "USD millions", source: "MVW Q1 2026 call" },
        q2ContractSales: { low: 4, high: 8, unit: "percent YoY", source: "MVW Q1 2026 call" }
      },

      // Strategic initiatives announced/in-flight on Q1 call
      strategicInitiatives: [
        {
          title: "New sales & marketing leadership",
          detail: "Hired new Chief Sales & Marketing Officer with track record alongside COO Mike Flaskey; reorganized sales / field-marketing organizations; restructured leadership compensation packages effective May 1, 2026 to align with revenue and net operating income growth.",
          announced: "Q1 2026 call"
        },
        {
          title: "Owner loyalty tier expansion (May 1, 2026)",
          detail: "Added two new tiers at the high end of the Marriott vacation-ownership loyalty program; designed to drive higher close rates and more predictable future-tour pipeline.",
          announced: "May 1, 2026"
        },
        {
          title: "Dream Vacation Packages (late May 2026)",
          detail: "New buyer-incentive program launching end of May; designed to increase company-wide VPG.",
          announced: "Q1 2026 call"
        },
        {
          title: "Inner Circle experiential events (June 22, 2026)",
          detail: "Experiential event-marketing platform launching late Q2 2026 — first events targeted for that quarter. Management says this kind of event business 'has proven to drive higher-quality, incremental tour flow and VPG' and was 'created for the entire industry' by leaders now back at MVW.",
          announced: "Q1 2026 call"
        },
        {
          title: "Data-driven tour logistics",
          detail: "Proprietary model matching individual sales executives' VPGs by guest type with the BPG of inbound tour guests; designed to maximize close propensity. Just took hold in April 2026.",
          announced: "Q1 2026 call"
        },
        {
          title: "Bonvoy + World of Hyatt partnership-marketing",
          detail: "Building national/local partnership-marketing capability beyond existing databases to drive incremental tour flow via the Marriott Bonvoy and World of Hyatt loyalty programs.",
          announced: "Q1 2026 call"
        }
      ],

      segments: [
        {
          name: "Vacation Ownership",
          revenue: 4805,
          revenuePrior: 4730,
          adjEbitda: 868,
          adjEbitdaPrior: 848,
          margin: 28,
          share: 90,
          color: "#0862A7",
          source: "10-K FY2025 / Q1 2026 IR Presentation slide A-4",
          description: "Sales of vacation ownership interests, financing income, resort management, rental, and ancillary services across the Marriott, Sheraton, Westin, Ritz-Carlton, St. Regis, Luxury Collection, and Hyatt timeshare brands."
        },
        {
          name: "Exchange & Third-Party Management",
          revenue: 213,
          revenuePrior: 231,
          adjEbitda: 91,
          adjEbitdaPrior: 102,
          margin: 45,
          share: 10,
          color: "#D4AF37",
          source: "10-K FY2025 / Q1 2026 IR Presentation slide 10",
          description: "Interval International exchange business (1.5M paid members, ~40% are MVW VO owners) and Aqua-Aston Hospitality third-party hotel and resort management. CapEx is ~4% of revenue (ex. cost reimb.) — capital-light."
        }
      ],

      brands: [
        { name: "Marriott Vacation Club", resorts: 65, keys: 19076, licensor: "Marriott International", source: "10-K FY2025, Item 1" },
        { name: "Sheraton Vacation Club", resorts: 9, keys: 4377, licensor: "Marriott International", source: "10-K FY2025, Item 1" },
        { name: "Westin Vacation Club", resorts: 12, keys: 4334, licensor: "Marriott International", source: "10-K FY2025, Item 1" },
        { name: "Hyatt Vacation Club", resorts: 22, keys: 2672, licensor: "Hyatt", source: "10-K FY2025, Item 1" },
        { name: "Grand Residences by Marriott", resorts: 2, keys: 381, licensor: "Marriott International", source: "10-K FY2025, Item 1" },
        { name: "The Ritz-Carlton Club", resorts: 5, keys: 259, licensor: "Marriott International", source: "10-K FY2025, Item 1" },
        { name: "St. Regis / Luxury Collection Residence Club", resorts: 3, keys: 83, licensor: "Marriott International", source: "10-K FY2025, Item 1" },
        { name: "Other (incl. unbranded)", resorts: 2, keys: 458, source: "10-K FY2025, Item 1" }
      ],

      geography: {
        summary: "120 vacation-ownership resorts across 13 countries; 90% of FY2025 contract sales originated in North America; 90% sold at on-site sales centers co-located with resorts. Asia-Pacific footprint being intentionally scaled back: tours down 3% in Q1 2026 driven by planned Asia reductions, and Asia-Pacific operations restructured at the end of January 2026 to improve profitability and cash flow.",
        regions: [
          { name: "Florida (US)", lat: 27.99, lng: -81.76, resorts: 23, keys: 8005, source: "10-K FY2025, Item 2" },
          { name: "California (US)", lat: 36.78, lng: -119.42, resorts: 17, keys: 6248, source: "10-K FY2025, Item 2" },
          { name: "Hawaii (US)", lat: 21.31, lng: -157.86, resorts: 13, keys: 4894, source: "10-K FY2025, Item 2", note: "Important Maui presence; first 1.5 weeks of March 2026 disrupted by weather per Q1 call" },
          { name: "Colorado (US)", lat: 39.55, lng: -105.78, resorts: 13, keys: 971, source: "10-K FY2025, Item 2" },
          { name: "South Carolina (US)", lat: 33.84, lng: -81.16, resorts: 10, keys: 1865, source: "10-K FY2025, Item 2" },
          { name: "Arizona (US)", lat: 34.05, lng: -111.09, resorts: 5, source: "10-K FY2025, Item 2" },
          { name: "Nevada (US)", lat: 36.17, lng: -115.14, resorts: 2, source: "10-K FY2025, Item 2" },
          { name: "Utah (US)", lat: 39.32, lng: -111.09, resorts: 2, source: "10-K FY2025, Item 2" },
          { name: "Missouri (US)", lat: 38.48, lng: -92.30, resorts: 2, source: "10-K FY2025, Item 2" },
          { name: "New York (US)", lat: 40.71, lng: -74.00, resorts: 2, source: "10-K FY2025, Item 2" },
          { name: "Other US (MA, NM, NJ, TX, VA, DC)", lat: 39.50, lng: -98.35, resorts: 6, source: "10-K FY2025, Item 2" },
          { name: "Aruba", lat: 12.52, lng: -69.97, resorts: 2, keys: 1211, source: "10-K FY2025, Item 2" },
          { name: "Mexico", lat: 21.16, lng: -86.85, resorts: 4, keys: 1295, source: "10-K FY2025, Item 2", note: "Westin Cancun sold for $50M in Q1 2026; agreed to acquire 64 timeshare units in Puerto Vallarta for $46M (delivery late 2028)" },
          { name: "U.S. Virgin Islands", lat: 18.34, lng: -64.93, resorts: 3, keys: 513, source: "10-K FY2025, Item 2" },
          { name: "Bahamas", lat: 25.04, lng: -77.35, resorts: 1, keys: 382, source: "10-K FY2025, Item 2" },
          { name: "Puerto Rico", lat: 18.22, lng: -66.59, resorts: 1, source: "10-K FY2025, Item 2" },
          { name: "Costa Rica", lat: 9.93, lng: -84.09, resorts: 1, source: "10-K FY2025, Item 2" },
          { name: "France", lat: 48.86, lng: 2.78, resorts: 1, keys: 202, source: "10-K FY2025, Item 2" },
          { name: "Spain", lat: 36.51, lng: -4.88, resorts: 3, keys: 715, source: "10-K FY2025, Item 2" },
          { name: "United Kingdom", lat: 51.51, lng: -0.13, resorts: 1, keys: 49, source: "10-K FY2025, Item 2" },
          { name: "Indonesia", lat: -8.34, lng: 115.09, resorts: 2, keys: 161, source: "10-K FY2025, Item 2", note: "Asia-Pac scale-back in progress" },
          { name: "Thailand", lat: 7.88, lng: 98.39, resorts: 4, keys: 384, source: "10-K FY2025, Item 2", note: "$27M Khao Lak inventory impairment in FY2025; Asia-Pac scale-back continues" },
          { name: "Australia", lat: -28.00, lng: 153.43, resorts: 1, keys: 77, source: "10-K FY2025, Item 2" }
        ]
      },

      financials: {
        revenueTrend: [
          { year: 2023, value: 4727, source: "10-K FY2025, comparative" },
          { year: 2024, value: 4967, source: "10-K FY2025, comparative" },
          { year: 2025, value: 5032, source: "10-K FY2025" }
        ],
        ebitdaTrend: [
          { year: 2023, value: 761, source: "10-K FY2025, comparative" },
          { year: 2024, value: 736, source: "10-K FY2025, comparative" },
          { year: 2025, value: 751, source: "10-K FY2025" }
        ],
        contractSalesTrend: [
          { period: "Q1'25", value: 419, source: "MVW Q1 2026 release (prior-year)" },
          { period: "FY2025", value: 1762, source: "10-K FY2025" },
          { period: "Q1'26", value: 411, source: "MVW Q1 2026 release" },
          { period: "FY2026E (mid)", value: 1850, source: "MVW 2026 guidance midpoint" }
        ],
        debtMaturity: [
          { year: 2026, value: 0, label: "Repaid $575M convertibles in Jan 2026", source: "MVW Q1 2026 IR Presentation slide 12" },
          { year: 2027, value: 575, label: "Convertible notes", source: "IR Presentation" },
          { year: 2028, value: 350, label: "Unsecured notes", source: "IR Presentation" },
          { year: 2029, value: 500, label: "Unsecured notes", source: "IR Presentation" },
          { year: 2030, value: 800, label: "Term Loan B + Revolver (capacity)", source: "IR Presentation" },
          { year: 2031, value: 786, label: "Unsecured notes", source: "IR Presentation" },
          { year: 2033, value: 575, label: "6.50% senior notes (2025 issuance)", source: "IR Presentation" }
        ],
        debtStack: [
          { label: "Term Loan B", value: 786, source: "MVW Q1 2026 IR Presentation, slide 12" },
          { label: "Revolver capacity (drawn portion shown)", value: 310, source: "Q1 2026 IR Presentation" },
          { label: "2027 Convertible Notes", value: 575, source: "Q1 2026 IR Presentation" },
          { label: "2028 Notes", value: 350, source: "Q1 2026 IR Presentation" },
          { label: "2029 Notes", value: 500, source: "Q1 2026 IR Presentation" },
          { label: "2031 Notes", value: 786, source: "Q1 2026 IR Presentation" },
          { label: "2033 6.50% Notes", value: 575, source: "Q1 2026 IR Presentation" },
          { label: "Securitized (non-recourse)", value: 2300, source: "MVW Q1 2026 release" }
        ],
        adjEbitdaContribution: [
          { line: "Management & Exchange", pct: 35, color: "#D4AF37" },
          { line: "Development", pct: 35, color: "#0862A7" },
          { line: "Financing", pct: 20, color: "#04345C" },
          { line: "Rentals", pct: 10, color: "#8E8E94" }
        ],
        capitalReturn: {
          dividends: 110,
          buybacks: 61,
          remainingAuthorization: 322,
          source: "10-K FY2025 / Q1 2026 release",
          note: "FY2025 baseline; Q1 2026 capital-return cadence not separately disclosed in headline release. $322M remaining authorization carries through 2026."
        }
      },

      growth: [
        {
          headline: "Three-point commercial-growth strategy",
          detail: "Per the May 5, 2026 Commercial Turnaround Update: (1) launch new initiatives to drive tours and contract sales [Inner Circle, Dream Vacation Packages, new loyalty tiers]; (2) add new owners — ~100K first-time buyers added in 2021-2025; (3) take actions to improve profitability and free cash flow.",
          source: "Q1 2026 IR Presentation slide 15 / Commercial Turnaround transcript"
        },
        {
          headline: "Inner Circle experiential events platform",
          detail: "Launches June 22, 2026. The leadership team that built event-marketing 'for the entire industry' is now executing it inside MVW with brands the company has uniquely. Expected to generate higher-quality incremental tour flow and VPG; meaningfully impacts EBITDA in 2H 2026 and ramps through 2027.",
          source: "Q1 2026 call (Mike Flaskey prepared remarks)"
        },
        {
          headline: "Owner-loyalty tier expansion (May 1, 2026)",
          detail: "Two new top-tier loyalty levels added; combined with Dream Vacation Packages and Inner Circle, designed to drive predictable future-tour pipeline at higher VPGs and higher close rates.",
          source: "Q1 2026 call"
        },
        {
          headline: "Tour-logistics analytics — match guest VPG to executive VPG",
          detail: "Proprietary model matching the BPG (book per guest) of inbound tours by guest type to individual sales executives' VPGs by guest type. Started taking hold in April 2026 and contributed to the +12.7% April VPG.",
          source: "Q1 2026 call (Mike Flaskey)"
        },
        {
          headline: "Multi-brand loyalty pipeline (Marriott Bonvoy + World of Hyatt)",
          detail: "Building national/local partnership-marketing capability to drive incremental tour flow beyond existing databases via the Bonvoy and Hyatt loyalty programs — described by Flaskey as 'by far the most robust data pool I've had to generate leads with' in his career.",
          source: "Q1 2026 call"
        },
        {
          headline: "Asia-Pacific scale-back",
          detail: "Restructured Asia-Pacific operations at the end of January 2026 to improve profitability and cash flow. Drives Q1 tour decline (-3%) and supports better full-year flow-through. Contract sales ex-Asia-Pac were down only 1% in Q1.",
          source: "Q1 2026 call"
        },
        {
          headline: "Non-core asset dispositions",
          detail: "Closed Westin Cancun for $50M in Q1; listed additional assets expected to generate $125M+ in 2026; targeting $200-250M total disposition proceeds by end of 2027 — funds reinvested in capital-efficient inventory like the $46M Puerto Vallarta 64-unit deal (delivery late 2028).",
          source: "Q1 2026 release / call"
        },
        {
          headline: "Adjusted free cash flow inflection",
          detail: "Q1 2026 adjusted FCF $114M vs. $40M Q1'25; full-year guide $375-425M (+176%). Mid-50% conversion. Cash will balance debt reduction toward <4.0x leverage, dividends ($3.20/share annualized), and opportunistic buybacks.",
          source: "Q1 2026 release / call"
        }
      ],

      // Risks — verbatim language from FY2025 10-K Item 1A + Q1 2026 mgmt commentary
      // Severity / likelihood are analyst-coded overlays. Q1 2026 emergent risks are
      // tagged in the title with "(Q1 2026)" and sourced from the May 5 call/release.
      risks: [
        { title: "Travel disruption / discretionary demand", severity: 5, likelihood: 4, verbatim: "Our business may be adversely affected by factors that disrupt or deter travel.", source: "10-K FY2025, Item 1A", note: "Q1 2026: CEO Avril acknowledged Hawaii / Maui weather disruption in the first 1.5 weeks of March 2026 — 'we are not going to lean on weather… we get paid to work through them.'" },
        { title: "Macroeconomic & policy uncertainty", severity: 4, likelihood: 4, verbatim: "Uncertainty in the current global macroeconomic environment created by rapid governmental policy and regulatory changes could negatively impact our business.", source: "10-K FY2025, Item 1A", note: "Q1 2026: April securitization completed 'in the midst of market volatility and increasing uncertainty' (CFO Marino, Q1 call)." },
        { title: "Inflation / interest-rate sensitivity", severity: 4, likelihood: 4, verbatim: "Significant inflation, higher interest rates or deflation could adversely affect our business and financial results.", source: "10-K FY2025, Item 1A" },
        { title: "Default rates above projections", severity: 4, likelihood: 3, verbatim: "If default rates increase beyond current projections and result in higher than expected foreclosure activity, our results of operations would be adversely affected.", source: "10-K FY2025, Item 1A", note: "Q1 2026: defaults unchanged YoY; sales reserve at 12.3% (down sequentially from Q4); 120-day delinquencies +17 bps YoY but down 45 bps vs. 2024. Mgmt: '2025 receivable originations performing in line with our expectations.'" },
        { title: "Inventory mismatch", severity: 3, likelihood: 3, verbatim: "We may not have inventory available for sale when needed or we may have excess inventory.", source: "10-K FY2025, Item 1A", note: "Q1 2026: Westin Cancun sold for $50M; agreed to acquire 64 Puerto Vallarta units for $46M (delivery late 2028). Capital-efficient inventory rotation in progress." },
        { title: "Brand-license termination", severity: 5, likelihood: 1, verbatim: "The termination of our license agreements with Marriott International or Hyatt, or our rights to use their trademarks at our existing or future properties, could materially harm our business.", source: "10-K FY2025, Item 1A", note: "Marriott / Hyatt licenses extend to 2090-2095. Q1 2026 call did not raise license-renewal concerns." },
        { title: "Spanish timeshare litigation", severity: 3, likelihood: 4, verbatim: "Spanish court rulings voiding certain timeshare contracts have increased our exposure to litigation that may materially adversely affect our business and financial condition.", source: "10-K FY2025, Item 1A", note: "Not specifically updated in Q1 2026 call." },
        { title: "Turnaround execution / sales-team transition", severity: 4, likelihood: 3, verbatim: "Effects of steps we have taken and may continue to take to reduce operating costs and accelerate growth and profitability.", source: "10-K FY2025, Item 1A (forward-looking factors)", note: "ANALYST OVERLAY: New CEO/COO/CSMO team must execute Inner Circle launch (Jun 22), loyalty-tier rollout (May 1), Dream Vacation Packages (late May), and tour-logistics deployment on accelerated timeline." },
        { title: "Q1 2026 margin compression from turnaround investment (Q1 2026)", severity: 3, likelihood: 5, verbatim: "Marketing and sales costs increased year over year, primarily due to increased training costs and higher salaries, which are being addressed with the initiatives Mike mentioned. Adjusted EBITDA margin declined 370 basis points to 19%.", source: "MVW Q1 2026 call (CFO Marino)", note: "Q1 EMERGENT: Adj EBITDA -16% YoY; margin -370 bps; mgmt expects opex as % of revenue to decline sequentially over balance of 2026 as revenue initiatives ramp. Risk: timing mismatch between cost ramp (now) and revenue ramp (2H 2026 / 2027)." },
        { title: "April momentum sustainability — single data point (Q1 2026)", severity: 3, likelihood: 3, verbatim: "Global contract sales were up 8% in April on a year-over-year basis, powered by North America where we were up 11%.", source: "MVW Q1 2026 call (COO Flaskey)", note: "ANALYST OVERLAY: April +8% global / +11% NA contract-sales acceleration is one month of data; 2026 contract-sales guide raised to +3-7% (mid +5%) implies confidence the trend sustains. New revenue initiatives haven't started yet (Inner Circle launches June 22), so April result is from sales/operating discipline alone — sustainability TBD." }
      ],

      recentCall: {
        period: "Q1 2026 — Commercial Turnaround Update",
        date: "2026-05-05",
        sourceLabel: "MVW Q1 2026 earnings call transcript (May 5, 2026)",
        sourceUrl: "https://ir.marriottvacationsworldwide.com/news-releases",
        items: [
          "Avril is six months in role; permanent CEO since Feb 16, 2026. Flaskey ~3 months in role as President & COO; new Chief Sales & Marketing Officer added under his leadership.",
          "Three-point operating framework: (1) grow the right tour flow; (2) strengthen sales operating discipline; (3) expand demand from new sources & drive incremental tours from existing infrastructure — all while increasing average sales price.",
          "May 1, 2026: restructured sales & marketing leadership compensation packages aligning incentives with revenue and net operating income growth. Two new owner-loyalty tiers added at high end of Marriott program.",
          "End of May 2026: Dream Vacation Packages buyer-incentive launches — designed to drive higher close rates, more predictable future-tour pipeline, and higher VPGs company-wide.",
          "FY2026 guidance: contract sales RAISED to +3-7% (mid: $1,815-1,885M). Adj EBITDA REAFFIRMED at $755-780M (+4% mid). Adj free cash flow $375-425M (+176% YoY).",
          "Capital framework: reduce leverage from 4.2x to <4.0x; balance debt reduction with dividends and opportunistic buybacks.",
          "Q1 specifics: contract sales $411M (-2% YoY); Adj EBITDA $161M (-16% YoY) on lower contract sales, lower reportability, higher product/marketing costs; sales reserve 12.3% of contract sales (down sequentially); Adj FCF $114M (+$74M YoY incl. $50M Westin Cancun proceeds).",
          "Asia-Pacific contribution: tours down 3% in Q1 driven by planned Asia reductions; ex-Asia-Pac, contract sales down only 1%. Asia-Pacific operations restructured at end of January 2026.",
          "Hawaii: first 1.5 weeks of March 2026 disrupted by weather (Maui exposure); company will not 'lean on weather' as an excuse and is focused on direct-marketing flywheel."
        ]
      },

      sources: [
        { label: "MVW Q1 2026 Investor Presentation (May 5, 2026)", url: "https://ir.marriottvacationsworldwide.com/news-releases" },
        { label: "MVW Q1 2026 Commercial Turnaround Update transcript (May 5, 2026)", url: "https://ir.marriottvacationsworldwide.com/news-releases" },
        { label: "MVW Q1 2026 earnings press release", url: "https://ir.marriottvacationsworldwide.com/news-releases" },
        { label: "Q4/FY2025 earnings press release (Feb 25, 2026)", url: "https://ir.marriottvacationsworldwide.com/news-releases/news-release-details/marriott-vacations-worldwide-reports-fourth-quarter-and-full-9" },
        { label: "FY2025 10-K (filed Feb 2026)", url: "https://www.sec.gov/Archives/edgar/data/1524358/000152435826000010/vac-20251231.htm" },
        { label: "EDGAR filings index (CIK 0001524358)", url: "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001524358&type=10-Q" },
        { label: "Investor Relations", url: "https://ir.mvwc.com" }
      ]
    },

    // -----------------------------------------------------------------------
    // HGV — Hilton Grand Vacations Inc. (NYSE: HGV)
    // -----------------------------------------------------------------------
    hgv: {
      slug: "hgv",
      name: "Hilton Grand Vacations",
      shortName: "HGV",
      ticker: "HGV",
      exchange: "NYSE",
      brandColor: "#002C51",
      brandAccent: "#002C51",
      brandSoft: "#001628",
      hq: "Orlando, Florida",
      foundedSpinOff: "Became an independent public company on January 3, 2017 (spun off from Hilton Worldwide Holdings)",
      ceo: { name: "Mark D. Wang", title: "President & CEO", note: "CEO since 2017 spin-off" },
      cfo: { name: "Daniel J. Mathewes", title: "President & CFO" },
      employees: { value: 22300, source: "10-K FY2025 (most recent)" },
      fiscal: {
        year: 2026,
        period: "Q1 2026 (quarter ended March 31, 2026)",
        filingType: "Q1 2026 earnings release / 10-Q",
        releaseDate: "2026-04-29",
        callDate: "2026-04-30",
        sourceUrl: "https://investors.hgv.com"
      },
      narrative: {
        oneLiner: "Largest timeshare operator under the Hilton brand — 720K Club members, $1.285B Q1 2026 revenue, and the strongest Q1 EPS beat among the three peers (adj diluted EPS $0.99 vs. $0.56 consensus, +67%).",
        history: "Spun off from Hilton in 2017. Acquired Diamond Resorts (August 2021) and Bluegreen Vacations (closed January 17, 2024 for $1.6B inclusive of net debt). The combination roughly doubled HGV's footprint and added Hilton Vacation Club, Hilton Club, and Bluegreen brands plus exclusive marketing alliances with Bass Pro Shops and Choice Hotels.",
        currentChapter: "Q1 2026 was a clean beat: $1.285B revenue (+11.9% YoY), adj diluted EPS $0.99 (vs. $0.56 consensus), real-estate margin +350 bps to 28%, and the highest Q1 new-buyer tour count since 2023 (+8% YoY). HGV RAISED 2026 Adj EBITDA guidance to $1.225B-1.265B (from $1.185B-1.225B). VPG was the soft spot at $3,778 (-8.1% YoY) as the company laps the Bluegreen HGV Max launch period; mgmt expects VPG headwind through Q2/Q3 before returning to growth in Q4. Capital-return cadence: ~$150M / quarter buybacks (3.3M shares for $150M in Q1; another $41M post-quarter through April 23). Two large Q2 events: $500M ABS securitization (April 16) at 5.13% / 98% advance rate, and a $129M buyout of the remaining 75% of the Elara JV (April 29) — flagship Las Vegas inventory conversion expected to add ~$20M EBITDA for rest-of-year."
      },

      q1Headline: {
        revenue: { value: 1285, priorQ1: 1148, unit: "USD millions", source: "HGV Q1 2026 release (Apr 29, 2026)", note: "+11.9% YoY" },
        adjEbitda: { value: 267, priorQ1: 247, unit: "USD millions", source: "HGV Q1 2026 release", note: "Adj EBITDA attributable to stockholders, ex deferrals/recognitions; +8% YoY" },
        adjEbitdaReported: { value: 249, unit: "USD millions", source: "HGV Q1 2026 release", note: "Adj EBITDA attributable to stockholders, reported (incl. deferrals)" },
        adjEbitdaMargin: { value: 23.0, unit: "percent", source: "HGV Q1 2026 release / call", note: "Excl. cost reimbursements; +130 bps YoY" },
        netIncome: { value: 66, priorQ1: -16, unit: "USD millions", source: "HGV Q1 2026 release", note: "Net income attributable to stockholders; turnaround from net loss" },
        dilutedEps: { value: 0.79, priorQ1: -0.17, unit: "USD per share", source: "HGV Q1 2026 release" },
        adjDilutedEps: { value: 0.99, unit: "USD per share", source: "HGV Q1 2026 release", note: "Beat $0.56 consensus by 67.5%" },
        adjNetIncome: { value: 83, unit: "USD millions", source: "HGV Q1 2026 release" },
        contractSales: { value: 719, priorQ1: 721, unit: "USD millions", source: "HGV Q1 2026 release", note: "Roughly flat (-$2M / -0.3%)" },
        vpg: { value: 3778, priorQ1: 4111, unit: "USD per guest", source: "HGV Q1 2026 release", note: "-8.1% YoY; lapping HGV Max launch period" },
        toursGrowth: { value: 8.5, unit: "percent YoY", source: "HGV Q1 2026 call", note: "High single-digit tour growth; new-buyer transactions +8% YoY (highest Q1 since 2023)" },
        members: { value: 720079, priorQ1: 724617, unit: "Club members", source: "HGV Q1 2026 release", note: "Slight YoY decline driven by recapture activity" },
        hgvMax: { value: 277000, prior: 215000, unit: "HGV Max members", source: "HGV Q1 2026 call", note: "+29% YoY" },
        defaultRate: { value: 10.1, priorQ1: 10.2, unit: "percent", source: "HGV Q1 2026 call (Mathewes)", note: "Slight YoY improvement; consolidated annualized" },
        delinquency31_60: { value: 1.48, priorQ1: 1.49, unit: "percent", source: "HGV Q1 2026 call" },
        loanLossProvisionRate: { value: 14.9, priorQ1: 18.0, unit: "percent (sequential)", source: "HGV Q1 2026 call", note: "Down from 18% sequentially" },
        feeForServiceMix: { value: 16.7, unit: "percent of contract sales", source: "HGV Q1 2026 release" },
        ownedMix: { value: 83.3, unit: "percent of contract sales", source: "HGV Q1 2026 release", note: "JIT inventory not separately disclosed in Q1 release" },

        // Trailing FY2025 anchors
        revenueFY: { value: 5047, prior: 4981, unit: "USD millions", source: "10-K FY2025" },
        adjEbitdaFY: { value: 969, prior: 1094, unit: "USD millions", source: "10-K FY2025" },
        adjEbitdaMarginFY: { value: 19.2, unit: "percent", source: "10-K FY2025" },
        contractSalesFY: { value: 3314, prior: 3002, unit: "USD millions", source: "10-K FY2025" },
        vpgFY: { value: 3851, prior: 3572, unit: "USD per guest", source: "10-K FY2025" },
        toursFY: { value: 856676, prior: 835181, unit: "tours", source: "10-K FY2025" },
        owners: { value: 720000, unit: "Club members", source: "HGV Q1 2026 release" },
        avgFico: { value: 734, unit: "FICO", source: "10-K FY2025, TFR Note", note: "Weighted-average for new originations" },

        // Market cap as of end of Q1 2026 (close × Q1 weighted-avg diluted shares)
        marketCapEoq: { value: 3268, unit: "USD millions", source: "calculated: Mar 31, 2026 close $39.12 × Q1 weighted-avg diluted shares 83.5M (from $66M NI / $0.79 diluted EPS)" },
        priceMar31: { value: 39.12, unit: "USD per share", source: "Yahoo Finance (Mar 31, 2026 close)" },
        priceDec31: { value: 44.75, unit: "USD per share", source: "Yahoo Finance (Dec 31, 2025 close)" },
        q1PricePerformance: { value: -12.58, unit: "percent", source: "calculated: ($39.12 / $44.75) - 1", note: "Q1 2026 stock-price total return (price-only, ex-dividends)" },
        dilutedShares: { value: 83.5, unit: "millions of weighted-avg diluted shares", source: "calculated from Q1 2026 net income / diluted EPS" },

        // Capital / balance sheet (March 31, 2026)
        corporateDebt: { value: 4800, unit: "USD millions", source: "HGV Q1 2026 release", note: "Net; weighted avg rate 5.649%" },
        securitizedDebt: { value: 2600, unit: "USD millions", source: "HGV Q1 2026 release", note: "Non-recourse; weighted avg rate 5.028%" },
        netLeverage: { value: 3.9, unit: "x", source: "HGV Q1 2026 release", note: "TTM basis" },
        cash: { value: 261, unit: "USD millions", source: "HGV Q1 2026 release" },
        restrictedCash: { value: 291, unit: "USD millions", source: "HGV Q1 2026 release" },
        revolverCapacity: { value: 591, unit: "USD millions", source: "HGV Q1 2026 release", note: "Remaining capacity" },
        timeshareFacilityCapacity: { value: 150, unit: "USD millions", source: "HGV Q1 2026 release" },

        freeCashFlow: { value: 108, priorQ1: 6, unit: "USD millions", source: "HGV Q1 2026 release" },
        adjFreeCashFlow: { value: -37, priorQ1: 185, unit: "USD millions", source: "HGV Q1 2026 release", note: "Pressured by inventory and ABS timing" },
        buybacks: { value: 150, unit: "USD millions", source: "HGV Q1 2026 release", note: "3.3M shares in Q1; another $41M (904k shares) Apr 1-23; $237M remaining authorization; ~$2.3B cumulative since IPO" },
        remainingAuth: { value: 237, unit: "USD millions", source: "HGV Q1 2026 release" },
        cumulativeBuybacksSinceIPO: { value: 2300, unit: "USD millions", source: "HGV Q1 2026 call", note: "~$2.3B returned since 2017 spin-off" },

        // Q2 2026 capital actions already announced
        absSecuritizationApr: { value: 500, unit: "USD millions", source: "HGV Q1 2026 release", note: "Closed Apr 16, 2026; upsized from $400M; 5.13% blended coupon, 98% advance rate" },
        elaraBuyout: { value: 129, unit: "USD millions", source: "HGV Q1 2026 release", note: "Apr 29, 2026: bought remaining 75% of Elara JV (Las Vegas flagship); will contribute ~$20M EBITDA rest of 2026" },

        resorts: { value: 200, unit: "properties (>200)", source: "10-K FY2025, Item 2" },
        salesCenters: { value: 100, unit: "sales distribution centers (>100)", source: "10-K FY2025" }
      },

      guidance: {
        adjEbitda: { low: 1225, high: 1265, unit: "USD millions", source: "HGV Q1 2026 release", note: "RAISED from prior $1,185-1,225M (+$40M at midpoint); excl. deferrals/recognitions" },
        contractSalesGrowth: { value: "low single-digit", source: "HGV Q1 2026 call", note: "Reaffirmed; tours low-to-mid single-digit growth, VPG slightly down" },
        buybackPace: { value: 150, unit: "USD millions / quarter", source: "HGV Q1 2026 call (Mathewes)" }
      },

      strategicInitiatives: [
        { title: "Elara JV buyout — $129M", detail: "Apr 29, 2026: bought remaining 75% of Elara JV (HGV's Las Vegas flagship). Converts from fee-for-service to owned; unlocks upgrade pipeline for existing Elara owners; ~$20M EBITDA contribution for rest of 2026.", announced: "Q1 2026 call" },
        { title: "$500M ABS securitization (Apr 16)", detail: "Upsized from $400M; 98% advance rate, 5.13% blended coupon. Continues HGV's track record of efficient ABS financing.", announced: "April 2026" },
        { title: "Hilton Honors enhancements within HGV Max", detail: "Additional Hilton Honors point-conversion options added; HGV Max base now 277K (+29% YoY).", announced: "Q1 2026 call" },
        { title: "Bass Pro Shops alliance expansion", detail: "More than 125 targeted Bass Pro locations rebranded in past year; continues to expand lead-gen via Bluegreen-acquired alliance.", announced: "Q1 2026 call" },
        { title: "Ultimate Access experiential programming", detail: "New events added including FIFA World Cup and NASCAR experiences for HGV Max members.", announced: "Q1 2026 call" }
      ],

      segments: [
        {
          name: "Real Estate Sales & Financing",
          revenue: 754,
          revenuePrior: null,
          adjEbitda: 211,
          adjEbitdaPrior: null,
          margin: 28.0,
          share: 65,
          color: "#002C51",
          source: "HGV Q1 2026 release",
          description: "Sales of vacation ownership intervals (net), sales/marketing/brand fees, and consumer financing. Q1 2026 segment margin +350 bps YoY to 28%."
        },
        {
          name: "Resort Operations & Club Management",
          revenue: 402,
          revenuePrior: null,
          adjEbitda: 128,
          adjEbitdaPrior: null,
          margin: 31.8,
          share: 35,
          color: "#D4AF37",
          source: "HGV Q1 2026 release",
          description: "Club management, resort management, rental, and ancillary services. Higher-margin recurring fee streams; Club & Resort Mgmt sub-line ~68% margin."
        }
      ],

      brands: [
        { name: "Hilton Grand Vacations Club", type: "Core club", source: "10-K FY2025, Item 1" },
        { name: "Hilton Club", type: "Premium urban product (NYC, etc.)", source: "10-K FY2025, Item 1" },
        { name: "HGV Max", type: "Top-tier owner program — 277K members (+29% YoY in Q1'26)", source: "Q1 2026 call" },
        { name: "Hilton Vacation Club", type: "Mid-tier (legacy Diamond properties)", source: "10-K FY2025, Item 1" },
        { name: "Bluegreen Vacations", type: "Legacy Bluegreen (rebranding underway)", source: "10-K FY2025, Item 1" },
        { name: "Big Cedar Lodge", type: "JV (HGV 51% / 49%); 4 wilderness resorts via Bass Pro/Bluegreen alliance", source: "10-K FY2025, Item 1" },
        { name: "Elara, a Hilton Grand Vacations Club", type: "Las Vegas flagship — 100% owned post Apr 29, 2026 buyout", source: "Q1 2026 release" },
        { name: "Diamond Resorts (legacy)", type: "Legacy properties being converted to Hilton brand standards", source: "10-K FY2025, Item 1" }
      ],

      geography: {
        summary: ">200 properties in the United States, Europe, Canada, the Caribbean, Mexico, and Asia. Concentration in Florida, Hawaii, South Carolina, California, Arizona, Nevada, and Virginia. Resort-level country breakdown not disclosed in 10-K — markers below represent disclosed geographic concentrations as approximate regional clusters.",
        regions: [
          { name: "Florida (US) — concentration market", lat: 27.99, lng: -81.76, note: "Disclosed as concentration market", source: "10-K FY2025, Item 1A" },
          { name: "Hawaii (US) — concentration market", lat: 21.31, lng: -157.86, note: "Disclosed as concentration market", source: "10-K FY2025, Item 1A" },
          { name: "Nevada / Las Vegas — Elara flagship + sales hub", lat: 36.17, lng: -115.14, note: "Bought remaining 75% of Elara JV in Q1'26; primary call-center & sales hub", source: "Q1 2026 release" },
          { name: "South Carolina (US) — concentration market", lat: 33.84, lng: -81.16, note: "Disclosed as concentration market", source: "10-K FY2025, Item 1A" },
          { name: "California (US) — concentration market", lat: 36.78, lng: -119.42, note: "Disclosed as concentration market", source: "10-K FY2025, Item 1A" },
          { name: "Arizona (US) — concentration market", lat: 34.05, lng: -111.09, note: "Disclosed as concentration market", source: "10-K FY2025, Item 1A" },
          { name: "Virginia (US) — concentration market", lat: 37.43, lng: -78.66, note: "Disclosed as concentration market", source: "10-K FY2025, Item 1A" },
          { name: "Orlando — corporate HQ + call center", lat: 28.54, lng: -81.46, note: "HQ at 6355 MetroWest Blvd", source: "10-K FY2025, Item 2" },
          { name: "New York City — Hilton Club urban product", lat: 40.71, lng: -74.00, note: "Hilton Club premium urban portfolio", source: "10-K FY2025, Item 1" },
          { name: "United Kingdom — Europe operations", lat: 51.51, lng: -0.13, note: "UK call-center; European resort presence", source: "10-K FY2025, Item 1" },
          { name: "Europe (Mediterranean)", lat: 41.90, lng: 12.50, note: "European resort presence", source: "10-K FY2025, Item 1" },
          { name: "Mexico", lat: 21.16, lng: -86.85, note: "Resort presence", source: "10-K FY2025, Item 1" },
          { name: "Caribbean", lat: 18.34, lng: -64.93, note: "Resort presence", source: "10-K FY2025, Item 1" },
          { name: "Canada", lat: 56.13, lng: -106.35, note: "Resort presence", source: "10-K FY2025, Item 1" },
          { name: "Asia (Japan)", lat: 35.69, lng: 139.69, note: "Asian resort presence", source: "10-K FY2025, Item 1" },
          { name: "Bass Pro / Cabela's footprint (US)", lat: 39.50, lng: -98.35, note: "125+ Bass Pro locations rebranded for HGV vacation-package marketing in past year", source: "Q1 2026 call" }
        ]
      },

      financials: {
        revenueTrend: [
          { year: 2023, value: 3978, source: "10-K FY2025, comparative" },
          { year: 2024, value: 4981, source: "10-K FY2025, comparative" },
          { year: 2025, value: 5047, source: "10-K FY2025" }
        ],
        ebitdaTrend: [
          { year: 2023, value: 1005, source: "10-K FY2025, comparative" },
          { year: 2024, value: 1094, source: "10-K FY2025, comparative" },
          { year: 2025, value: 969, source: "10-K FY2025" }
        ],
        contractSalesTrend: [
          { period: "Q1'25", value: 721, source: "HGV prior-year" },
          { period: "FY2025", value: 3314, source: "10-K FY2025" },
          { period: "Q1'26", value: 719, source: "HGV Q1 2026 release" }
        ],
        debtStack: [
          { label: "Corporate debt (net)", value: 4800, source: "HGV Q1 2026 release", note: "Weighted avg rate 5.649%; term loans, senior notes, revolver" },
          { label: "Non-recourse securitized", value: 2600, source: "HGV Q1 2026 release", note: "Weighted avg rate 5.028%; VOI receivable securitizations" }
        ],
        capitalReturn: {
          dividends: 0,
          buybacks: 150,
          remainingAuthorization: 237,
          source: "HGV Q1 2026 release",
          note: "Q1: 3.3M shares for $150M; Apr 1-23: $41M / 904k shares; ~$2.3B returned cumulatively since IPO; pace ~$150M / quarter; no common dividend."
        },
        q12026: {
          revenue: 1285,
          adjEbitda: 267,
          netIncome: 66,
          source: "HGV Q1 2026 release"
        }
      },

      growth: [
        {
          headline: "Elara JV buyout (Apr 29, 2026)",
          detail: "$129M to acquire remaining 75% of HGV's Las Vegas flagship Elara. Converts from fee-for-service to owned, unlocks upgrade pipeline for existing Elara owners, and contributes ~$20M EBITDA for rest of 2026. Mark Wang: \"It's not about shrinking. It's about upgrading the portfolio…improving the margin and cash flow.\"",
          source: "HGV Q1 2026 release / call"
        },
        {
          headline: "Bluegreen integration approaching steady state",
          detail: "Acquisition closed Jan 17, 2024 ($1.6B). FY2025 acquisition/integration expense fell to $98M (from $237M in FY2024). Q1 2026 contract-sales decline reflects lapping the strong HGV Max launch period from Q1 2025 — VPG headwind expected through Q2/Q3 before returning to growth in Q4.",
          source: "HGV Q1 2026 call"
        },
        {
          headline: "HGV Max momentum",
          detail: "HGV Max base grew 29% YoY to 277K in Q1'26. Hilton Honors point-conversion enhancements added. Highest first-quarter new-buyer transactions since 2023 (+8% YoY).",
          source: "HGV Q1 2026 call"
        },
        {
          headline: "Bass Pro Shops alliance expansion",
          detail: "Acquired through Bluegreen. 10-year contract from Nov 2023 grants HGV the right to market vacation packages at Bass Pro / Cabela's stores. 125+ targeted locations rebranded in the past year. Big Cedar Lodge JV (HGV 51%) operates 4 wilderness resorts under the alliance.",
          source: "Q1 2026 call / 10-K FY2025"
        },
        {
          headline: "Capital-return cadence — ~$150M/quarter buybacks",
          detail: "$150M Q1 2026 buybacks (3.3M shares); $41M April 1-23 (904k shares); $237M remaining authorization. CFO Mathewes: \"Continue repurchasing our shares at a pace of approximately $150 million per quarter.\" ~$2.3B cumulative since IPO.",
          source: "HGV Q1 2026 call"
        },
        {
          headline: "Capital-efficient inventory mix",
          detail: "Q1 2026: fee-for-service mix 16.7% of contract sales (just-in-time mix not separately disclosed in Q1 release; FY2025 was 9%). HGV continues deliberate shift away from capex-funded inventory.",
          source: "HGV Q1 2026 release"
        },
        {
          headline: "$500M ABS securitization (Apr 16)",
          detail: "Upsized from $400M; 98% advance rate, 5.13% blended coupon. Track record of efficient ABS financing supports the consumer-receivables flywheel.",
          source: "HGV Q1 2026 release"
        }
      ],

      risks: [
        { title: "Discretionary travel demand", severity: 5, likelihood: 4, verbatim: "Macroeconomic and other factors beyond our control can adversely affect and reduce demand for our products and services.", source: "10-K FY2025, Item 1A", note: "Not specifically updated in Q1 2026 call." },
        { title: "Hilton brand-license dependency", severity: 5, likelihood: 1, verbatim: "We do not own the Hilton brands and our business will be materially harmed if we breach our license agreement with Hilton or it is terminated.", source: "10-K FY2025, Item 1A", note: "Q1 2026 call highlighted enhancements to Hilton Honors point conversions within HGV Max — relationship characterized as deepening." },
        { title: "Brand-conversion execution risk", severity: 3, likelihood: 3, verbatim: "Our ability to use the Hilton brands and trademarks and rebrand the Diamond and Bluegreen businesses and properties.", source: "10-K FY2025, Item 1A", note: "Q1 2026: 125+ Bass Pro locations rebranded over past year; Bluegreen rebrand to Hilton Vacation Club continuing." },
        { title: "Diamond + Bluegreen integration", severity: 4, likelihood: 3, verbatim: "Our ability to integrate the Diamond and the Bluegreen businesses successfully and effectively manage our expanded operations resulting from both the Diamond Acquisition and the Bluegreen Acquisition.", source: "10-K FY2025, Item 1A", note: "Q1 2026 contract-sales ~flat reflects lapping HGV Max Bluegreen launch period; VPG -8.1% YoY. HGV Max base now 277K (+29% YoY) — integration thesis on track." },
        { title: "Receivable defaults", severity: 4, likelihood: 4, verbatim: "Our limited underwriting standards and a possible decline in the default rates or other credit metrics underlying our timeshare financing receivables.", source: "10-K FY2025, Item 1A", note: "Q1 2026 default rate 10.1% (slight YoY improvement); loan loss provision rate 14.9% sequentially (down from 18%); 31-60 day delinquency 1.48% (vs 1.49% Q1'25)." },
        { title: "Substantial indebtedness / variable-rate", severity: 4, likelihood: 3, verbatim: "Our substantial indebtedness and other contractual obligations, restrictions imposed on us by certain of our debt agreements and instruments and our variable rate indebtedness which subjects us to interest rate risk.", source: "10-K FY2025, Item 1A", note: "Q1 2026: $4.8B corporate debt + $2.6B securitized; net leverage 3.9x; $500M ABS at 5.13% (Apr 16) demonstrates continued ABS-market access." },
        { title: "Industry competition", severity: 3, likelihood: 5, verbatim: "We operate in a highly competitive industry.", source: "10-K FY2025, Item 1A", note: "Not specifically updated in Q1 2026 call." },
        { title: "Forward VPG decline through Q2/Q3 — mgmt-disclosed (Q1 2026)", severity: 3, likelihood: 5, verbatim: "VPG headwind expected to continue through Q2/Q3 (low-to-mid single-digit declines) before returning to growth in Q4 as we fully lap the Bluegreen Max launch.", source: "HGV Q1 2026 call (CFO Mathewes)", note: "Q1 EMERGENT: explicit mgmt-disclosed forward warning. Q1 VPG already -8.1% YoY ($3,778 vs $4,111). Risk: if Q4 inflection slips, FY VPG misses guidance and 2026 EBITDA guide ($1.225-1.265B) is at risk." },
        { title: "Adj free cash flow swing in Q1 (Q1 2026)", severity: 3, likelihood: 3, verbatim: "Adjusted free cash flow $(37)M in Q1 2026 vs. $185M in Q1 2025.", source: "HGV Q1 2026 release", note: "Q1 EMERGENT: $222M YoY swing driven by inventory and ABS timing (per release). Need to watch through Q2/Q3 — sustained negative adj FCF would constrain the $150M/quarter buyback cadence." }
      ],

      recentCall: {
        period: "Q1 2026",
        date: "2026-04-30",
        sourceLabel: "HGV Q1 2026 earnings call (Apr 30, 2026)",
        sourceUrl: "https://www.businesswire.com/news/home/20260429338945/en/Hilton-Grand-Vacations-Reports-First-Quarter-2026-Results",
        items: [
          "CEO Mark Wang: \"We delivered results that exceeded our expectations in the first quarter, driven by disciplined execution and efficiency initiatives that fueled strong Adjusted EBITDA growth and meaningful margin expansion.\"",
          "Wang on new buyers: \"Highest level of first-quarter new-buyer transactions since 2023, up 8% versus the prior year.\" Bluegreen contract-sales decline reflects lapping the strong HGV Max launch period from Q1 2025.",
          "Wang on capital return: \"We repurchased $150 million in stock during the quarter, bringing the total to nearly $2.3 billion we've returned since becoming a standalone public company.\"",
          "Wang on Elara: \"It's not about shrinking. It's about upgrading the portfolio…improving the margin and cash flow.\" $129M acquisition closed Apr 29, 2026.",
          "CFO Mathewes: Real-estate margin +350 bps YoY to 28%. Capital-allocation cadence ~$150M/quarter buybacks.",
          "Mathewes on Elara: ~$20M EBITDA contribution for rest of 2026.",
          "Mathewes on credit: Default rate 10.1% (slight YoY improvement); loan-loss provision rate 14.9% sequentially (down from 18%).",
          "Mathewes on VPG: Headwind expected to continue through Q2/Q3 (low-to-mid single-digit declines) before returning to growth in Q4 as Bluegreen Max launch fully laps.",
          "2026 guidance RAISED: Adj EBITDA to $1.225B-$1.265B (from $1.185B-$1.225B); +$40M at midpoint. Contract-sales outlook reaffirmed (low single-digit growth, low-to-mid tour growth, VPG slightly down).",
          "Q1 specifics: revenue $1.285B (+11.9%); Adj EBITDA attributable $267M (+8%); Adj diluted EPS $0.99 (vs. $0.56 consensus); contract sales $719M (-0.3%); VPG $3,778 (-8.1%); HGV Max members 277K (+29%); $500M ABS at 5.13%/98% advance rate (Apr 16); Elara JV buyout $129M (Apr 29)."
        ]
      },

      sources: [
        { label: "HGV Q1 2026 Press Release (BusinessWire, Apr 29 2026)", url: "https://www.businesswire.com/news/home/20260429338945/en/Hilton-Grand-Vacations-Reports-First-Quarter-2026-Results" },
        { label: "HGV Q1 2026 earnings-call transcript (Motley Fool, Apr 30 2026)", url: "https://www.fool.com/earnings/call-transcripts/2026/04/30/hgv-q1-2026-earnings-call-transcript/" },
        { label: "HGV Q1 2026 earnings deep-dive (Alphastreet)", url: "https://news.alphastreet.com/hilton-grand-vacations-q1-2026-deep-dive-eps-beats-by-a-wide-margin/" },
        { label: "HGV Investor Relations", url: "https://investors.hgv.com" },
        { label: "FY2025 10-K (filed Feb 26, 2026)", url: "https://www.sec.gov/Archives/edgar/data/1674168/000167416826000017/hgv-20251231.htm" },
        { label: "EDGAR filings index (CIK 0001674168)", url: "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001674168" }
      ]
    },

    // -----------------------------------------------------------------------
    // TNL — Travel + Leisure Co. (NYSE: TNL)
    // -----------------------------------------------------------------------
    tnl: {
      slug: "tnl",
      name: "Travel + Leisure Co.",
      shortName: "TNL",
      ticker: "TNL",
      exchange: "NYSE",
      brandColor: "#1D6B44",
      brandAccent: "#1D6B44",
      brandSoft: "#0E3D26",
      hq: "Orlando, Florida",
      foundedSpinOff: "Wyndham Worldwide spun off from Cendant on July 31, 2006; renamed Travel + Leisure Co. on February 17, 2021",
      ceo: { name: "Michael D. Brown", title: "President & CEO" },
      cfo: { name: "Erik Hoag", title: "EVP & CFO" },
      employees: { value: 19300, source: "10-K FY2025 (most recent)" },
      fiscal: {
        year: 2026,
        period: "Q1 2026 (quarter ended March 31, 2026)",
        filingType: "Q1 2026 earnings release / 10-Q",
        releaseDate: "2026-04-22",
        sourceUrl: "https://investor.travelandleisureco.com/news-events/press-releases/detail/955/travel-leisure-co-reports-first-quarter-2026-results"
      },
      narrative: {
        oneLiner: "The largest timeshare operator by resort count and operator of RCI — the world's largest vacation-exchange network. Q1 2026 marked the strongest segment EBITDA growth of the three peers (+20% Vacation Ownership) on +5% tours and +3% VPG.",
        history: "Corporate roots in Cendant (1990s); Wyndham Worldwide spun off in 2006. Hotel franchising spun off in 2018 (Wyndham Hotels & Resorts), leaving the vacation-ownership and exchange business as Wyndham Destinations. In 2021 acquired the Travel + Leisure media brand from Meredith and rebranded as Travel + Leisure Co. Owns Club Wyndham, WorldMark, Margaritaville Vacation Club, Sports Illustrated Resorts, Eddie Bauer Adventure Club, Accor Vacation Club, plus RCI exchange, Travel + Leisure GO, and Travel + Leisure For Business.",
        currentChapter: "Q1 2026 was a strong start: Adj EBITDA $225M (+11% YoY), Vacation Ownership segment EBITDA +20% to $191M on +7% Gross VOI sales, +5% tours, +3% VPG. Travel & Membership softer (-8% revenue, -13% Adj EBITDA) on -10% revenue per transaction and richer travel-club mix. Resort-Optimization Initiative (17 underperforming resorts) progressing — $19M Q1 inventory write-downs + $5M closure costs. 4th Sports Illustrated Resorts location announced (Baton Rouge, LSU/Southern Univ markets). Capital return: $128M to shareholders ($41M dividends at $0.60/share + $87M buybacks at $72.51 avg), $832M remaining authorization. 2026 guide reaffirmed at $1,030-1,055M Adj EBITDA."
      },

      q1Headline: {
        revenue: { value: 961, priorQ1: null, unit: "USD millions", source: "TNL Q1 2026 release (Apr 22, 2026)", note: "Q1 net revenue" },
        adjEbitda: { value: 225, priorQ1: 203, unit: "USD millions", source: "TNL Q1 2026 release", note: "+11% YoY" },
        adjEbitdaMargin: { value: 23.4, unit: "percent", source: "calculated", calc: "Adj EBITDA / net revenue" },
        netIncome: { value: 79, unit: "USD millions", source: "TNL Q1 2026 release", note: "Net income attributable to TNL" },
        dilutedEps: { value: 1.22, unit: "USD per share", source: "TNL Q1 2026 release" },
        adjDilutedEps: { value: 1.45, unit: "USD per share", source: "TNL Q1 2026 release", note: "+31% YoY" },

        // Vacation Ownership segment
        voRevenue: { value: 798, unit: "USD millions", source: "TNL Q1 2026 release", note: "+6% YoY" },
        voAdjEbitda: { value: 191, priorQ1: 159, unit: "USD millions", source: "TNL Q1 2026 release", note: "+20% YoY" },
        grossVoiSales: { value: 549, unit: "USD millions", source: "TNL Q1 2026 release", note: "+7% YoY" },
        netVoiSales: { value: 427, unit: "USD millions", source: "TNL Q1 2026 release", note: "+11% YoY" },
        vpg: { value: 3321, priorQ1: 3221, unit: "USD per guest", source: "TNL Q1 2026 release", note: "+3% YoY" },
        tours: { value: 161000, priorQ1: 153000, unit: "tours", source: "TNL Q1 2026 release", note: "+5% YoY" },

        // Travel & Membership segment
        tmRevenue: { value: 165, priorQ1: 179, unit: "USD millions", source: "TNL Q1 2026 release", note: "-8% YoY" },
        tmAdjEbitda: { value: 59, priorQ1: 68, unit: "USD millions", source: "TNL Q1 2026 release", note: "-13% YoY" },
        rciAvgMembers: { value: 3291, priorQ1: 3358, unit: "thousands", source: "TNL Q1 2026 release / 10-Q", note: "Average exchange members; -2% YoY" },
        exchangeTransactions: { value: 206, unit: "thousands", source: "TNL Q1 2026 release", note: "+17% YoY" },
        exchangeRevPerTxn: { value: 207, unit: "USD per transaction", source: "TNL Q1 2026 release" },
        travelClubTransactions: { value: 417, unit: "thousands", source: "TNL Q1 2026 release", note: "Roughly flat YoY" },
        travelClubRevPerTxn: { value: 280, unit: "USD per transaction", source: "TNL Q1 2026 release" },

        // Trailing FY2025 anchors
        revenueFY: { value: 4021, prior: 3864, unit: "USD millions", source: "10-K FY2025" },
        adjEbitdaFY: { value: 990, prior: 929, unit: "USD millions", source: "10-K FY2025" },
        adjEbitdaMarginFY: { value: 24.6, unit: "percent", source: "10-K FY2025" },
        contractSalesFY: { value: 2486, prior: 2293, unit: "USD millions", source: "10-K FY2025" },
        vpgFY: { value: 3284, prior: 3094, unit: "USD per guest", source: "10-K FY2025" },
        toursFY: { value: 734000, prior: 716000, unit: "tours", source: "10-K FY2025" },
        owners: { value: 797000, unit: "owner families", source: "10-K FY2025, Item 1" },
        avgFico: { value: 746, unit: "FICO", source: "10-K FY2025, TFR Note", note: "Highest among the three peers" },

        // Credit / receivables (Q1 2026)
        loanLossProvision: { value: 100, priorQ1: 91, unit: "USD millions", source: "TNL Q1 2026 release / 10-Q" },
        allowance: { value: 646, unit: "USD millions", source: "TNL Q1 2026 10-Q", note: "Down from $663M YE 2025; up from $595M Q1 2025" },
        receivablesCurrent: { value: 94.2, unit: "percent", source: "TNL Q1 2026 10-Q", note: "Current portion of receivables" },
        delinquency91_120: { value: 1.4, unit: "percent of receivables", source: "TNL Q1 2026 10-Q" },
        fico700plus: { value: 62, unit: "percent of receivables", source: "TNL Q1 2026 10-Q" },

        // Market cap as of end of Q1 2026 (close × Q1 weighted-avg diluted shares)
        marketCapEoq: { value: 4481, unit: "USD millions", source: "calculated: Mar 31, 2026 close $69.19 × Q1 weighted-avg diluted shares 64.8M (from $79M NI / $1.22 diluted EPS)" },
        priceMar31: { value: 69.19, unit: "USD per share", source: "Yahoo Finance (Mar 31, 2026 close)" },
        priceDec31: { value: 70.53, unit: "USD per share", source: "Yahoo Finance (Dec 31, 2025 close)" },
        q1PricePerformance: { value: -1.90, unit: "percent", source: "calculated: ($69.19 / $70.53) - 1", note: "Q1 2026 stock-price total return (price-only, ex-dividends)" },
        dilutedShares: { value: 64.8, unit: "millions of weighted-avg diluted shares", source: "calculated from Q1 2026 net income / diluted EPS" },

        // Capital / balance sheet
        corporateDebt: { value: 3600, unit: "USD millions", source: "TNL Q1 2026 release" },
        securitizedDebt: { value: 2100, unit: "USD millions", source: "TNL Q1 2026 release" },
        cash: { value: 254, unit: "USD millions", source: "TNL Q1 2026 release" },
        restrictedCash: { value: 202, unit: "USD millions", source: "TNL Q1 2026 release" },
        leverage: { value: 3.2, unit: "x (covenant)", source: "TNL Q1 2026 release", note: "Below 3.2x covenant" },

        // Capital actions
        absSecuritizationMar: { value: 325, unit: "USD millions", source: "TNL Q1 2026 release", note: "Closed Mar 26, 2026; 5.11% coupon, 98% advance rate" },
        dividendsPaid: { value: 41, unit: "USD millions", source: "TNL Q1 2026 release", note: "$0.60/share Q1 dividend" },
        buybacks: { value: 87, unit: "USD millions", source: "TNL Q1 2026 release", note: "~1.2M shares at avg $72.51" },
        remainingAuth: { value: 832, unit: "USD millions", source: "TNL Q1 2026 release" },
        q2Dividend: { value: 0.60, unit: "USD per share", source: "TNL Q1 2026 release", note: "Q2 2026 dividend held flat at $0.60/share" },

        operatingCashFlow: { value: 38, priorQ1: 121, unit: "USD millions", source: "TNL Q1 2026 release" },
        adjFreeCashFlow: { value: 0, priorQ1: 152, unit: "USD millions", source: "TNL Q1 2026 release", note: "Approximately flat in Q1 2026" },
        capex: { value: 19, unit: "USD millions", source: "TNL Q1 2026 release" },

        // Resort-optimization initiative
        resortOptimResorts: { value: 17, unit: "underperforming resorts identified", source: "TNL Q1 2026 release" },
        resortOptimWriteDownsQ1: { value: 19, unit: "USD millions (inventory write-downs)", source: "TNL Q1 2026 release" },
        resortOptimClosureCosts: { value: 5, unit: "USD millions", source: "TNL Q1 2026 release", note: "Resort closure & employee-related costs" },

        resorts: { value: 280, unit: "vacation-ownership resorts (>280)", source: "10-K FY2025, Item 1" },
        rciAffiliatedResorts: { value: 3600, unit: "affiliated VO resorts", source: "10-K FY2025, Item 1", note: "Across 101 countries" },
        rciCountries: { value: 101, unit: "countries / territories", source: "10-K FY2025, Item 1" }
      },

      guidance: {
        q2AdjEbitda: { low: 260, high: 270, unit: "USD millions", source: "TNL Q1 2026 release" },
        q2GrossVoiSales: { low: 660, high: 690, unit: "USD millions", source: "TNL Q1 2026 release" },
        q2Vpg: { low: 3200, high: 3250, unit: "USD per guest", source: "TNL Q1 2026 release" },
        adjEbitda: { low: 1030, high: 1055, unit: "USD millions", source: "TNL Q1 2026 release", note: "Reaffirmed full-year" },
        grossVoiSales: { low: 2500, high: 2600, unit: "USD millions", source: "TNL Q1 2026 release" },
        vpg: { low: 3175, high: 3275, unit: "USD per guest", source: "TNL Q1 2026 release" }
      },

      strategicInitiatives: [
        { title: "Resort-Optimization Initiative", detail: "17 underperforming resorts identified for portfolio rationalization. Q1 charges: $19M inventory write-downs + $5M closure & employee-related costs. Expected to drive meaningful annual maintenance-fee savings and EBITDA accretion in 2026 and beyond.", announced: "Q1 2026 release" },
        { title: "Sports Illustrated Resorts — 4th location", detail: "Baton Rouge announced (LSU / Southern University markets). Continues licensed-lifestyle-brand portfolio expansion.", announced: "Q1 2026 release" },
        { title: "Margaritaville Vacation Club + Eddie Bauer Adventure Club momentum", detail: "Both lifestyle brands cited as robust contributors to Q1 growth. Multi-brand strategy diversifies beyond legacy Wyndham Club.", announced: "Q1 2026 release" },
        { title: "$325M ABS securitization (Mar 26, 2026)", detail: "5.11% coupon, 98% advance rate. Continues low-cost securitization cadence supporting consumer-financing flywheel.", announced: "Q1 2026 release" },
        { title: "Capital return acceleration", detail: "$128M returned in Q1 ($41M dividends + $87M buybacks). $832M remaining authorization (post-year-end +$750M increase). Q2 dividend held flat at $0.60/share.", announced: "Q1 2026 release" }
      ],

      segments: [
        {
          name: "Vacation Ownership",
          revenue: 798,
          revenuePrior: 753,
          adjEbitda: 191,
          adjEbitdaPrior: 159,
          margin: 23.9,
          share: 83,
          color: "#1D6B44",
          source: "TNL Q1 2026 release",
          description: "Sale of VOIs, consumer financing, club dues, resort management, and rentals across Club Wyndham, WorldMark, Margaritaville Vacation Club, Sports Illustrated Resorts, Eddie Bauer Adventure Club, and Accor Vacation Club. Q1 segment Adj EBITDA +20% YoY."
        },
        {
          name: "Travel & Membership",
          revenue: 165,
          revenuePrior: 179,
          adjEbitda: 59,
          adjEbitdaPrior: 68,
          margin: 35.8,
          share: 17,
          color: "#D4AF37",
          source: "TNL Q1 2026 release",
          description: "RCI exchange (3.3M paid members across 3,600 resorts in 101 countries), Travel + Leisure GO direct-to-consumer club, Travel + Leisure For Business B2B private-label clubs. Revenue -8% YoY, Adj EBITDA -13% on -10% revenue per transaction."
        }
      ],

      brands: [
        { name: "Club Wyndham", type: "Core points-based timeshare", source: "10-K FY2025, Item 1" },
        { name: "WorldMark by Wyndham", type: "Northwest US / California-focused points club", source: "10-K FY2025, Item 1" },
        { name: "Margaritaville Vacation Club", type: "Licensed lifestyle brand (Margaritaville Holdings) — robust Q1 2026 growth", source: "Q1 2026 release" },
        { name: "Sports Illustrated Resorts", type: "Licensed brand (Authentic Brands Group) — 4th location announced Q1 2026 (Baton Rouge)", source: "Q1 2026 release" },
        { name: "Eddie Bauer Adventure Club", type: "Licensed outdoor lifestyle brand — robust Q1 2026 growth", source: "Q1 2026 release" },
        { name: "Accor Vacation Club", type: "Licensed brand (Accor) — Asia-Pacific focus", source: "10-K FY2025, Item 1" },
        { name: "RCI", type: "Largest VO exchange — 3.3M paid members, 3,600 resorts, 101 countries", source: "10-K FY2025, Item 1" },
        { name: "Travel + Leisure GO", type: "Direct-to-consumer travel club", source: "10-K FY2025, Item 1" },
        { name: "Travel + Leisure For Business", type: "B2B private-label clubs", source: "10-K FY2025, Item 1" }
      ],

      geography: {
        summary: "280+ vacation-ownership resorts in U.S., Canada, Mexico, Caribbean, and Asia Pacific. Plus RCI exchange network of 3,600 affiliated resorts across 101 countries — the broadest geographic footprint of the three peers via affiliation, though directly-owned/managed inventory is concentrated in the US (FL 21%, CA 12%, NV 9% of FY2025 VOI sales).",
        regions: [
          { name: "Florida (US) — 21% of FY2025 VOI sales", lat: 27.99, lng: -81.76, share: 21, source: "10-K FY2025, Note 23" },
          { name: "California (US) — 12% of FY2025 VOI sales", lat: 36.78, lng: -119.42, share: 12, source: "10-K FY2025, Note 23" },
          { name: "Nevada (US) — 9% of FY2025 VOI sales", lat: 36.17, lng: -115.14, share: 9, source: "10-K FY2025, Note 23" },
          { name: "Orlando — corporate HQ", lat: 28.54, lng: -81.46, note: "501 W. Church St.; lease through Oct 2040", source: "10-K FY2025, Item 2" },
          { name: "Other US (Hawaii, Carolinas, NW, etc.)", lat: 39.50, lng: -98.35, note: "Resorts disclosed in aggregate", source: "10-K FY2025, Item 1" },
          { name: "Baton Rouge — new Sports Illustrated Resort", lat: 30.45, lng: -91.19, note: "Announced Q1 2026; 4th SI Resorts location", source: "Q1 2026 release" },
          { name: "Canada", lat: 56.13, lng: -106.35, source: "10-K FY2025, Item 1" },
          { name: "Mexico", lat: 21.16, lng: -86.85, source: "10-K FY2025, Item 1" },
          { name: "Caribbean", lat: 18.34, lng: -64.93, source: "10-K FY2025, Item 1" },
          { name: "Asia-Pacific (Accor Vacation Club)", lat: -25.27, lng: 133.78, note: "Australia / Asia-Pacific via Accor brand license", source: "10-K FY2025, Item 1" }
        ]
      },

      financials: {
        revenueTrend: [
          { year: 2023, value: 3750, source: "10-K FY2025, comparative" },
          { year: 2024, value: 3864, source: "10-K FY2025, comparative" },
          { year: 2025, value: 4021, source: "10-K FY2025" }
        ],
        ebitdaTrend: [
          { year: 2023, value: 908, source: "10-K FY2025, comparative" },
          { year: 2024, value: 929, source: "10-K FY2025, comparative" },
          { year: 2025, value: 990, source: "10-K FY2025" }
        ],
        contractSalesTrend: [
          { period: "Q1'25", value: 513, source: "TNL prior-year (Q1'25 Gross VOI)" },
          { period: "FY2025", value: 2486, source: "10-K FY2025" },
          { period: "Q1'26", value: 549, source: "TNL Q1 2026 release (Gross VOI sales)" },
          { period: "FY2026E (mid)", value: 2550, source: "TNL 2026 guidance midpoint" }
        ],
        debtStack: [
          { label: "Corporate debt", value: 3600, source: "TNL Q1 2026 release" },
          { label: "Non-recourse securitized", value: 2100, source: "TNL Q1 2026 release" }
        ],
        capitalReturn: {
          dividends: 41,
          buybacks: 87,
          remainingAuthorization: 832,
          source: "TNL Q1 2026 release",
          note: "Q1 2026: $0.60/share dividend ($41M paid); $87M / 1.2M shares at $72.51 avg buybacks. Q2 dividend held flat at $0.60. $832M remaining; post-FY2025 +$750M authorization."
        },
        q12026: {
          revenue: 961,
          adjEbitda: 225,
          netIncome: 79,
          source: "TNL Q1 2026 release"
        }
      },

      growth: [
        {
          headline: "Vacation Ownership +20% segment EBITDA in Q1",
          detail: "Best Q1 segment EBITDA growth among the three peers. Powered by +7% Gross VOI sales, +11% Net VOI sales, +3% VPG, +5% tours. CEO Brown: \"We're off to a strong start to 2026, with positive momentum in our Vacation Ownership business.\"",
          source: "TNL Q1 2026 release"
        },
        {
          headline: "Multi-brand expansion strategy advancing",
          detail: "Margaritaville Vacation Club and Eddie Bauer Adventure Club cited as robust Q1 2026 contributors. Sports Illustrated Resorts 4th location announced (Baton Rouge / LSU markets). Each licensed brand targets distinct lifestyle segment with separate marketing channels.",
          source: "Q1 2026 release"
        },
        {
          headline: "Resort-Optimization Initiative — 17 resorts",
          detail: "Underperforming resort portfolio rationalization. Q1 charges: $19M inventory write-downs + $5M closure costs. Removes underperforming inventory from active sales mix; refocuses capital on higher-velocity properties; expected to drive maintenance-fee savings.",
          source: "Q1 2026 release"
        },
        {
          headline: "Travel Club growth offsetting RCI exchange decline",
          detail: "Q1 2026: exchange transactions +17% YoY (vs. -9% in FY2025); travel-club transactions roughly flat. Avg RCI members 3.29M (-2% YoY). T&L GO and T&L For Business are structurally growing as direct-to-consumer demand expands.",
          source: "Q1 2026 release"
        },
        {
          headline: "Capital return — $128M in Q1",
          detail: "$41M dividends ($0.60/share) + $87M buybacks (1.2M shares at $72.51 avg). $832M remaining authorization (post-year-end $750M boost). Q2 dividend held flat at $0.60.",
          source: "Q1 2026 release"
        },
        {
          headline: "$325M ABS securitization (Mar 26, 2026)",
          detail: "5.11% coupon, 98% advance rate. Demonstrates continued ABS-market access; supports consumer-financing flywheel that drives both contract sales and recurring financing revenue.",
          source: "Q1 2026 release"
        },
        {
          headline: "Wyndham Hotels relationship",
          detail: "Long-term exclusive license + marketing agreement with Wyndham Hotels (~121M Wyndham Rewards members) provides high-volume top-of-funnel for tour generation. Not specifically updated in Q1 2026 release.",
          source: "10-K FY2025, Item 1A"
        }
      ],

      risks: [
        { title: "Industry competition", severity: 4, likelihood: 5, verbatim: "The timeshare industry is highly competitive and we are subject to risks related to competition that may adversely affect our performance.", source: "10-K FY2025, Item 1A", note: "Not specifically updated in Q1 2026 release." },
        { title: "Travel-industry health", severity: 5, likelihood: 4, verbatim: "Our revenues are highly dependent on the health of the travel industry and declines in or disruptions to the travel industry such as those caused by economic conditions, terrorism or acts of violence, political strife, severe weather events and other natural disasters, war, and pandemics may adversely affect us.", source: "10-K FY2025, Item 1A", note: "Q1 2026 release did not flag specific demand disruptions; VO segment +20% Adj EBITDA suggests demand backdrop healthy." },
        { title: "VO receivables portfolio", severity: 4, likelihood: 4, verbatim: "We are subject to risks related to our vacation ownership receivables portfolio.", source: "10-K FY2025, Item 1A", note: "Q1 2026: loan loss provision $100M (vs. $91M Q1'25, +10%); allowance $646M (down from $663M YE 2025, up from $595M Q1'25); 91-120 day delinquency 1.4%; 62% of receivables score ≥700 FICO." },
        { title: "Cyber & data integrity", severity: 4, likelihood: 3, verbatim: "Failure to maintain the integrity of internal or customer data or to protect our systems from cyber-attacks could disrupt our business, damage our reputation, and subject us to significant costs, fines or lawsuits.", source: "10-K FY2025, Item 1A", note: "Not specifically updated in Q1 2026 release." },
        { title: "Indebtedness & cost of capital", severity: 3, likelihood: 3, verbatim: "We are subject to certain risks related to our indebtedness, hedging transactions, securitization of certain of our assets, surety bond requirements, the cost and availability of capital and the extension of credit by us.", source: "10-K FY2025, Item 1A", note: "Q1 2026: $3.6B corporate + $2.1B securitized; leverage <3.2x covenant; $325M ABS at 5.11% / 98% advance rate (Mar 26, 2026)." },
        { title: "Regulatory compliance", severity: 3, likelihood: 4, verbatim: "Our business is subject to extensive regulation and the cost of compliance or failure to comply with such regulations may adversely affect us.", source: "10-K FY2025, Item 1A", note: "Not specifically updated in Q1 2026 release." },
        { title: "Wyndham Hotels relationship", severity: 4, likelihood: 1, verbatim: "Our success depends in part on our ongoing relationship with Wyndham Hotels.", source: "10-K FY2025, Item 1A", note: "Not specifically updated in Q1 2026 release." },
        { title: "RCI exchange member-base decline", severity: 3, likelihood: 4, verbatim: "Variations in demand for vacation ownership and exchange products and services.", source: "10-K FY2025, Item 1A (forward-looking)", note: "Q1 EMERGENT: T&M segment Q1 2026 revenue -8% YoY ($165M vs $179M); Adj EBITDA -13% to $59M; revenue per transaction -10%; avg RCI members -2% YoY to 3.29M. Travel-club transactions roughly flat (after FY2025 +13.8% growth)." },
        { title: "Q1 cash flow compression vs Q1 2025 (Q1 2026)", severity: 3, likelihood: 4, verbatim: "Net cash provided by operating activities of $38M in Q1 2026 (vs $121M Q1 2025); adjusted free cash flow approximately $0M (vs $152M Q1 2025).", source: "TNL Q1 2026 release / 10-Q", note: "Q1 EMERGENT: $114M operating-CF YoY decline and $152M adj-FCF YoY decline are material — would be more concerning if not for the strong Q1 segment EBITDA (+20% VO; +11% total). Risk: if cash conversion doesn't normalize through Q2/Q3, $128M/quarter capital-return cadence (div + buyback) tightens." },
        { title: "Resort-Optimization Initiative execution (Q1 2026)", severity: 3, likelihood: 3, verbatim: "17 underperforming resorts identified for portfolio optimization; $19M of Q1 inventory write-downs and $5M of resort closure & employee-related costs.", source: "TNL Q1 2026 release", note: "Q1 EMERGENT: $24M of Q1 charges with expected annual maintenance-fee savings. Risk: execution / customer-relationship friction at the 17 resorts; mgmt has not disclosed a specific savings target or completion timeline." }
      ],

      recentCall: {
        period: "Q1 2026",
        date: "2026-04-22",
        sourceLabel: "TNL Q1 2026 press release (Apr 22, 2026)",
        sourceUrl: "https://investor.travelandleisureco.com/news-events/press-releases/detail/955/travel-leisure-co-reports-first-quarter-2026-results",
        items: [
          "CEO Michael Brown: \"We're off to a strong start to 2026, with positive momentum in our Vacation Ownership business.\" Q1 net revenue $961M, net income $79M ($1.22 diluted EPS), Adj EBITDA $225M (+11% YoY); adj diluted EPS up 31% to $1.45.",
          "Vacation Ownership: gross VOI sales $549M (+7% YoY) on +5% tours and +3% VPG to $3,321; net VOI sales +11% to $427M; segment Adj EBITDA +20% to $191M — the strongest Q1 segment growth among the three peers.",
          "Capital return: $128M to shareholders in Q1 ($41M dividends at $0.60/share + $87M buybacks at $72.51 avg); $832M remaining repurchase authorization; Q2 dividend held flat at $0.60.",
          "Q2 2026 guidance: Adj EBITDA $260-270M; Gross VOI sales $660-690M; VPG $3,200-3,250.",
          "Full-year 2026 guidance reaffirmed: Adj EBITDA $1,030-1,055M; Gross VOI sales $2.5-2.6B; VPG $3,175-3,275.",
          "Resort-Optimization Initiative: 17 underperforming resorts identified; $19M Q1 inventory write-downs + $5M closure/employee costs ($24M total). Objective: reduce maintenance-fee pressure and generate annual savings.",
          "Brand expansion: continued growth from Margaritaville Vacation Club and Eddie Bauer Adventure Club; announced 4th Sports Illustrated Resorts location (Baton Rouge — LSU / Southern University markets).",
          "Travel & Membership: revenue -8% to $165M (Adj EBITDA -13% to $59M) on -10% revenue per transaction and richer travel-club mix. Exchange transactions +17% YoY (RCI base however -2%); travel club roughly flat.",
          "Q1 specifics: Adj FCF roughly $0M (vs. $152M Q1'25); operating cash flow $38M; $325M securitization Mar 26, 2026 at 5.11%/98% advance rate; $646M loan loss allowance."
        ]
      },

      sources: [
        { label: "TNL Q1 2026 press release (Apr 22, 2026)", url: "https://investor.travelandleisureco.com/news-events/press-releases/detail/955/travel-leisure-co-reports-first-quarter-2026-results" },
        { label: "TNL Q1 2026 10-Q (filed Apr 22, 2026)", url: "https://www.stocktitan.net/sec-filings/TNL/10-q-travel-leisure-co-quarterly-earnings-report-fcc0d77c426b.html" },
        { label: "FY2025 10-K (filed Feb 18, 2026)", url: "https://www.sec.gov/Archives/edgar/data/1361658/000136165826000009/tnl-20251231.htm" },
        { label: "TNL Investor Relations", url: "https://investor.travelandleisureco.com" },
        { label: "EDGAR filings index (CIK 0001361658)", url: "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001361658" }
      ]
    }
  }
};
