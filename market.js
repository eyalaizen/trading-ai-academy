/* Public TradingView embed; no API key and no claim of exchange real-time entitlements. */
(()=>{
const input=document.getElementById('liveSymbol'),frame=document.getElementById('tvFrame'),status=document.getElementById('liveStatus');
if(!input||!frame)return;
function load(){let sym=input.value.trim().toUpperCase();if(!/^[A-Z0-9._:-]{1,36}$/.test(sym)){status.textContent='סימול לא תקין. לדוגמה NASDAQ:AAPL';return;}
const params=new URLSearchParams({symbol:sym,interval:'D',theme:'dark',style:'1',locale:'en',hide_top_toolbar:'0',hide_legend:'0',allow_symbol_change:'1',save_image:'0',calendar:'0',hide_side_toolbar:'0',withdateranges:'1',details:'0',hotlist:'0',studies:'[]'});
frame.src='https://s.tradingview.com/widgetembed/?'+params.toString();status.textContent='גרף חיצוני: '+sym+' · זמן אמת אינו מובטח';}
document.getElementById('loadLive').onclick=load;input.addEventListener('keydown',e=>{if(e.key==='Enter')load()});load();
})();
