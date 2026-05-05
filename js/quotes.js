/**
 * Live stock-quote module — Q1 2026 dashboard
 *
 * Renders compact "$XX.XX +X.XX (X%)" lines under each company nav pill.
 * Data: Yahoo Finance v8 chart endpoint, proxied through corsproxy.io (with
 * allorigins.win fallback) since Yahoo doesn't set CORS headers for this route.
 *
 * Refreshes every 60s while the tab is visible. Pauses when hidden.
 * No API key. If the feed fails the slot shows "—" — the rest of the
 * dashboard is unaffected.
 */

window.MVW_QUOTES = (() => {
  const SYMBOLS = ["VAC", "HGV", "TNL"];
  const REFRESH_MS = 60_000;
  const YAHOO = (sym) => `https://query1.finance.yahoo.com/v8/finance/chart/${sym}?interval=1d&range=2d`;
  const PROXIES = [
    (url) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
    (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`
  ];

  let timerId = null;
  let lastSuccess = null;

  async function fetchJson(url) {
    const r = await fetch(url, { cache: "no-store" });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  }

  async function fetchOne(symbol) {
    const target = YAHOO(symbol);
    let lastErr = null;
    for (const proxy of PROXIES) {
      try {
        const data = await fetchJson(proxy(target));
        const meta = data?.chart?.result?.[0]?.meta;
        if (!meta) throw new Error("no meta");
        const price = meta.regularMarketPrice;
        const prev = meta.chartPreviousClose ?? meta.previousClose;
        if (typeof price !== "number" || typeof prev !== "number") throw new Error("bad shape");
        return { symbol, price, prev, change: price - prev, pct: ((price - prev) / prev) * 100, currency: meta.currency || "USD", time: meta.regularMarketTime };
      } catch (e) {
        lastErr = e;
      }
    }
    throw lastErr || new Error("all proxies failed");
  }

  function fmtPrice(v) {
    return "$" + v.toFixed(2);
  }
  function fmtChange(c, pct) {
    const sign = c > 0 ? "+" : (c < 0 ? "−" : "");
    return `${sign}${Math.abs(c).toFixed(2)} (${sign}${Math.abs(pct).toFixed(2)}%)`;
  }
  function changeClass(c) {
    if (c > 0) return "is-positive";
    if (c < 0) return "is-negative";
    return "is-neutral";
  }

  function renderQuote(symbol, q) {
    const slot = document.querySelector(`.ticker-quote[data-symbol="${symbol}"]`);
    if (!slot) return;
    const priceEl = slot.querySelector(".ticker-price");
    const changeEl = slot.querySelector(".ticker-change");
    if (!q) {
      // keep old values if we have them; only initialize the placeholder
      if (priceEl.dataset.placeholder === "1") {
        priceEl.textContent = "—";
        changeEl.textContent = "";
      }
      slot.title = lastSuccess ? `Quote feed unavailable; last good update ${new Date(lastSuccess).toLocaleTimeString()}` : "Quote feed unavailable";
      return;
    }
    const newPrice = fmtPrice(q.price);
    const newChange = fmtChange(q.change, q.pct);
    if (priceEl.textContent !== newPrice) priceEl.textContent = newPrice;
    priceEl.dataset.placeholder = "0";
    changeEl.className = `ticker-change ${changeClass(q.change)}`;
    if (changeEl.textContent !== newChange) changeEl.textContent = newChange;
    const tt = `${symbol} · ${fmtPrice(q.price)} · ${fmtChange(q.change, q.pct)}${q.time ? ` · last ${new Date(q.time * 1000).toLocaleTimeString()}` : ""}`;
    slot.title = tt;
  }

  async function refresh() {
    const results = await Promise.allSettled(SYMBOLS.map(fetchOne));
    let anySuccess = false;
    results.forEach((r, i) => {
      const sym = SYMBOLS[i];
      if (r.status === "fulfilled") {
        renderQuote(sym, r.value);
        anySuccess = true;
      } else {
        renderQuote(sym, null);
      }
    });
    if (anySuccess) lastSuccess = Date.now();
  }

  function start() {
    refresh();
    if (timerId) clearInterval(timerId);
    timerId = setInterval(() => {
      if (!document.hidden) refresh();
    }, REFRESH_MS);
  }

  document.addEventListener("DOMContentLoaded", start);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) refresh();
  });

  return { refresh, fetchOne };
})();
