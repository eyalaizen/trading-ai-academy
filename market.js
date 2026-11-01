/* EA Academy v5 — external market chart with explicit delayed-data caveat and direct fallback. */
(()=>{
 const input=document.getElementById('liveSymbol'),frame=document.getElementById('tvFrame'),status=document.getElementById('liveStatus'),button=document.getElementById('loadLive'),container=document.getElementById('liveMarket');
 if(!input||!frame||!status||!button||!container)return;
 const note=document.createElement('div');note.className='ea-live-note';note.setAttribute('role','note');
 note.innerHTML='<strong>גרף שוק חיצוני</strong> — נתוני הבורסה עשויים להיות מושהים. אם הגרף לא מופיע, השתמש בקישור לפתיחה ישירה ב-TradingView. אין כאן חיבור Live מובטח לסורק או ל-Backtesting. <a id="eaOpenTradingView" href="https://www.tradingview.com/chart/" target="_blank" rel="noopener noreferrer">פתח גרף בחלון חדש ↗</a>';
 container.querySelector('.live-tools')?.after(note);
 const link=note.querySelector('a');
 function load(){
  const symbol=input.value.trim().toUpperCase();
  if(!/^[A-Z0-9._:-]{1,36}$/.test(symbol)){status.textContent='סימול לא תקין; למשל NASDAQ:AAPL';return;}
  const params=new URLSearchParams({symbol,interval:'D',theme:'dark',style:'1',locale:'en',hide_top_toolbar:'0',hide_legend:'0',allow_symbol_change:'1',save_image:'0',hide_side_toolbar:'0',withdateranges:'1'});
  frame.src='https://s.tradingview.com/widgetembed/?'+params.toString();
  link.href='https://www.tradingview.com/chart/?symbol='+encodeURIComponent(symbol);
  status.textContent='טוען גרף חיצוני של '+symbol+' · ייתכן עיכוב בנתונים';
 }
 button.addEventListener('click',load);
 input.addEventListener('keydown',e=>{if(e.key==='Enter')load()});
 frame.addEventListener('load',()=>{status.textContent='רכיב הגרף נטען; אם הוא ריק, פתח את הקישור הישיר. נתונים חיים אינם מובטחים.'});
 load();
})();
