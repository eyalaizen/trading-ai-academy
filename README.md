# Trading & AI Academy v2

Static RTL Hebrew website for GitHub Pages. Upload `index.html`, `style.css`, `app.js` to repository root.

Features: technical analysis demo, global market scanner with **synthetic** prices, 18-week course outline, journal stored in localStorage, educational MA-crossover backtest using synthetic deterministic prices, AI research prompt builder and external source links.

No real-time market data, no live AI, no actual historical backtesting, no financial advice. Do not use demo prices for trading.


## גרסה 2.1 — נתוני אמת מקובץ CSV
במעבדת הניתוח בחרו קובץ CSV הכולל כותרות `Date,Open,High,Low,Close,Volume`. תאריך בפורמט YYYY-MM-DD או YYYYMMDD. ייבוא נתונים מתבצע מקומית בדפדפן; הקובץ לא נשלח לשרת. אפשר לבחור D/W/M לצבירה של נתונים יומיים לשבועיים/חודשיים. אין להשתמש בקובצי intraday עם אותו parser: הנתונים נאספים לפי יום. הנתונים אינם נבדקים מול בורסה ואינם מתעדכנים אוטומטית. קבצים מוגבלים ל-8MB.
