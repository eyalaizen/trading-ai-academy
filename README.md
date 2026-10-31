# Trading & AI Academy Pro — v2.3

Static Hebrew RTL learning and charting application for GitHub Pages.

## Deploy
Upload all six files to the repository root (replace existing `index.html`, `style.css`, `app.js`, `README.md`; add `academy.js` and `market.js`). GitHub Pages: main / root. Reload with `?version=23`.

## Features
- TradingView-inspired layout and drawing toolbar for the existing local candlestick canvas.
- Embedded external TradingView market chart. Enter exchange-qualified symbols, e.g. `NASDAQ:AAPL`, `NASDAQ:NVDA`, `NASDAQ:MSFT`, `TASE:TEVA`. **Market availability and exchange coverage depend on TradingView.** Real-time data is **not guaranteed**; data may be delayed, unavailable or subject to licensing. Embedded chart is separate from the application's local CSV-based chart, backtest and scanner.
- 18-week, 54-lesson curriculum. Lesson reader has a conceptual overview, example, practice prompt, one knowledge-check question, and external learning references. Progress is saved in localStorage.
- Existing CSV import, technical indicators, simulator, backtesting, research prompt and trading journal are retained.

## Limitations
The 54 lessons have individual topics but use a shared pedagogical framework and are **not 54 expert-authored full 45-minute lectures**. Sources are links to institutions/educators, not licensed embedded lectures or endorsements. AI research area does not call an LLM. Scanner remains demonstration data. No brokerage connectivity or trade execution. Historical CSV remains necessary for local calculations and backtests. TradingView embeds may be blocked by browser/privacy settings, CSP, or third-party restrictions. For a reliable first-party real-time OHLCV API, a backend proxy, data license and provider credentials are required; do not publish API secrets in a public GitHub repository.

Educational only; not investment advice.
