# Trading & AI Academy — Interactive MVP

A Hebrew RTL technical-analysis learning website. Runs as static files with no backend or API key.

## Run locally
Open `index.html` in a modern browser, or run `python -m http.server 8000` and visit http://localhost:8000.

## Deploy to GitHub Pages
1. Create a public GitHub repository and upload `index.html`, `style.css`, `app.js`.
2. Go to Settings → Pages → Build and deployment → Deploy from a branch.
3. Select `main` and `/ (root)` and save. GitHub Pages will provide a URL.

## Features
- Hebrew RTL responsive dashboard
- Interactive synthetic candlestick chart with drawing support/resistance, MA20, Bollinger Bands, RSI, MACD and volume
- Market selection: US, EU, Japan, India, Israel (synthetic example series)
- Risk/reward and position-sizing calculator
- 18-week curriculum outline (54 lesson titles)
- Sample interactive exercise and quiz
- Demo global market screener
- Trading journal and completion flags stored in localStorage

## Important limitations
All chart values, market labels and screening results are synthetic and are **not live or historical market prices**. The weekly curriculum is an outline, not 54 complete lessons. Backtesting and live AI are not implemented; their buttons explain this. Browser localStorage is not cloud backup. This is educational software, not investment advice.

## Next engineering milestones
1. Integrate licensed historical OHLCV market data via a server-side API, with exchange coverage and delay labels.
2. Implement authenticated accounts and cloud sync.
3. Build full 45-minute lesson content with dated, verifiable sources and exercises.
4. Add real backtesting with transaction costs, slippage, lookahead-bias controls and out-of-sample evaluation.
5. Add a server-side RAG assistant with citations and secure API key storage.
