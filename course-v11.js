(()=>{'use strict';
const ai=window.EA_V11_AI||{},mk=window.EA_V11_MARKET||{};
const el=(tag,cls,txt)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(txt!==undefined)n.textContent=txt;return n};
const para=(text)=>{const n=el('p','deep-p',text);return n};
function heading(text){return el('h3','deep-head',text)}
function section(parent,title,text){parent.append(heading(title),para(text))}
function list(parent,title,items){parent.append(heading(title));const ol=el('ol','deep-list');items.forEach(x=>ol.append(el('li','',x)));parent.append(ol)}
function sourceCards(parent,sources){const wrap=el('div','deep-sources');sources.forEach(src=>{const a=el('a','deep-source',src.name+' ↗');a.href=src.url;a.target='_blank';a.rel='noopener noreferrer';const meta=el('small','',src.kind);a.append(meta);wrap.append(a)});parent.append(wrap)}
let filter='all';
function setTrack(t){filter=t;document.getElementById('allTrack')?.classList.toggle('track-on',t==='all');document.getElementById('aiTrack')?.classList.toggle('track-on',t==='ai');const all=document.querySelectorAll('.week-list button');let weekPanels=document.querySelectorAll('.week');all.forEach(btn=>{const btxt=btn.textContent;btn.hidden=(t==='ai'&&btn.querySelector('.num')?.textContent!=='3')});weekPanels.forEach(w=>{const any=Array.from(w.querySelectorAll('.week-list button')).some(b=>!b.hidden);w.hidden=!any;if(t==='ai'&&any)w.open=true});}
function initTrack(){document.getElementById('allTrack')?.addEventListener('click',()=>setTrack('all'));document.getElementById('aiTrack')?.addEventListener('click',()=>setTrack('ai'));const obs=new MutationObserver(()=>{if(filter==='ai'){const btns=document.querySelectorAll('.week-list button');btns.forEach(btn=>{btn.hidden=btn.querySelector('.num')?.textContent!=='3'});document.querySelectorAll('.week').forEach(w=>{w.hidden=!Array.from(w.querySelectorAll('.week-list button')).some(b=>!b.hidden)})}});obs.observe(document.getElementById('weekNav'),{childList:true,subtree:true})}
window.EA_V11_RENDER=(lesson)=>{
 const box=document.getElementById('v11DeepContent');if(!box)return;box.replaceChildren();const aiUnit=ai[lesson.id],mUnit=mk[lesson.id];
 if(aiUnit){
  box.append(el('div','deep-eyebrow','AI IN CAPITAL MARKETS · שיעור '+lesson.week+' מתוך 18'));
  box.append(el('h2','deep-title','מעבדת הידע: '+aiUnit.concept));
  box.append(el('p','deep-lead','לפני שמנסים כלי AI, לומדים מה הוא פותר, מתי הוא נכשל וכיצד בודקים פלט. זהו תוכן הלימוד העיקרי בשיעור — לא רק תרגיל Prompt.'));
  section(box,'מה באמת צריך להבין?',aiUnit.explanation);
  section(box,'איך הטכנולוגיה עובדת מאחורי הקלעים?',aiUnit.technology);
  box.append(el('div','deep-casehead','מקרה בוחן — ניתוח ולא המלצת השקעה'));
  box.append(el('div','deep-case',aiUnit.case));
  list(box,'תהליך עבודה מקצועי — שלב אחר שלב',aiUnit.steps);
  const prompt=el('div','deep-prompt');prompt.append(heading('תבנית Prompt ללמידה ביקורתית'));const code=el('pre','',aiUnit.prompt);prompt.append(code);const btn=el('button','deep-copy','העתק תבנית');btn.type='button';btn.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(aiUnit.prompt);btn.textContent='✓ הועתק'}catch{btn.textContent='אפשר לסמן ולהעתיק את הטקסט מעל'}});prompt.append(btn);box.append(prompt);
  section(box,'איך נראית תשובה טובה?',aiUnit.checks);
  const w=el('div','deep-warning');w.append(el('strong','','מגבלה שחשוב לזכור'),para(aiUnit.risk));box.append(w);
  const glossary=el('div','deep-glossary');aiUnit.glossary.forEach(v=>glossary.append(el('span','deep-term',v)));box.append(heading('מילון AI לשיעור'),glossary);
  box.append(heading('מאיפה מגיע הידע? מקורות עם תפקיד מוגדר'));sourceCards(box,aiUnit.sources);
  const target=document.getElementById('v11AISources'); if(target){target.replaceChildren(heading('מקורות ממוקדים לשיעור AI הזה'),para('בלשונית העיון מוסבר הקשר בין הרעיון לשיטת העבודה; כאן אפשר לפתוח את המקורות המלאים ולבדוק את הנחותיהם.'));sourceCards(target,aiUnit.sources)}
 }else if(mUnit){
  const target=document.getElementById('v11AISources');if(target)target.replaceChildren();
  box.append(el('div','deep-eyebrow','MARKET REASONING · העמקה מעבר להגדרות'));
  box.append(el('h2','deep-title','היגיון השיטה בשוק האמיתי'));
  section(box,'הבנה מקצועית',mUnit.analysis);
  const scenario=el('div','deep-case');scenario.append(el('strong','','מקרה לחשיבה ודיון'),para(mUnit.example));box.append(scenario);
  box.append(el('p','deep-micro','המקרה הוא המחשה לימודית; השווה אותו לדוגמה ולמגבלות שבשיעור, ואז נסח מחקר שניתן לבדוק.'));
 }else{const target=document.getElementById('v11AISources');if(target)target.replaceChildren();box.append(el('p','', 'שיעור זה כולל תוכן עיוני, מחקר ודוגמה בחלקי הקריאה הרגילים.'))}
};
document.addEventListener('DOMContentLoaded',initTrack);
})();