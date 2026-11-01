EA Academy v5.0 — Layout and market reliability update
=======================================================
Install: unzip, upload ALL files into the root of the existing GitHub repository, replacing files with the same names. Commit and wait for GitHub Pages to deploy.
Preview: https://eyalaizen.github.io/trading-ai-academy/?version=50

Changes:
- EA Academy wordmark (EA / Academy) and cleaner top navigation.
- Responsive three-column lab layout; avoids overflowing chart and sidebars.
- Improved chart size and course/market sidebar proportions.
- External TradingView chart keeps its symbol selector, but now clearly labels delayed/unverified data and provides a direct TradingView fallback link if the embedded iframe is blocked.
- Existing lessons, scanner, CSV, simulation, journal and backtesting files are preserved.

Important limitations:
- No authenticated real-time market-data API has been connected. TradingView's embedded widget may show delayed data or be blocked by network/browser conditions.
- The direct link opens the external TradingView site; it does not grant paid exchange entitlements.
- Local chart, scanner and backtesting demo data are not live; uploaded CSV is historical.
- No live AI model is connected.
- Do not enter secrets or API keys in a public GitHub Pages repository.

Testing: JavaScript syntax and archive integrity can be checked offline; browser rendering and live third-party feeds need verification in the user's environment.
