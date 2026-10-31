(()=>{'use strict';
const help=document.getElementById('eaHelp');
['eaOpenHelp','eaOpenHelpTop'].forEach(id=>document.getElementById(id)?.addEventListener('click',()=>help?.showModal()));
document.getElementById('eaCloseHelp')?.addEventListener('click',()=>help?.close());
help?.addEventListener('click',e=>{if(e.target===help)help.close()});
// Existing app's nav handler is attached to buttons at startup, so route added buttons through original nav.
document.querySelectorAll('.ea-left-rail [data-view],.ea-bottom-tiles [data-view],.ea-chart-top [data-view],header .nav-academy').forEach(b=>b.addEventListener('click',()=>{const view=b.dataset.view;const original=[...document.querySelectorAll('header nav button')].find(x=>x!==b&&x.dataset.view===view);original?.click();document.querySelectorAll('.ea-rail-menu button').forEach(x=>x.classList.toggle('active',x.dataset.view===view));window.scrollTo({top:0,behavior:'smooth'});}));
function progress(){let done=[];try{const v=JSON.parse(localStorage.getItem('taa-academy-v23')||'[]');done=Array.isArray(v)?v:Object.keys(v||{}).filter(k=>v[k]);}catch{}const n=Math.min(54,done.length),pct=Math.round(n/54*100);const ring=document.getElementById('eaRing');if(ring)ring.style.setProperty('--ea-progress',pct+'%');document.getElementById('eaPct').textContent=pct+'%';document.getElementById('eaDone').textContent=n+' מתוך 54 שיעורים';}
progress();document.addEventListener('click',e=>{if(e.target.closest('#complete,.academy-reader,.coursegrid'))setTimeout(progress,100)});
})();
