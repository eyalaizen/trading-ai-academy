/* EA Academy v6: adjacent lab and persistent research notebook */
(()=>{'use strict';
const $=id=>document.getElementById(id);
const papers=[
 ['Lo, Mamaysky & Wang (2000)','Foundations of Technical Analysis: Computational Algorithms, Statistical Inference, and Empirical Implementation','https://www.nber.org/papers/w7613','בדיקה כמותית של תבניות מחיר; ממצאים תלויים בשוק, בתקופה ובמתודולוגיה.'],
 ['Brock, Lakonishok & LeBaron (1992)','Simple Technical Trading Rules and the Stochastic Properties of Stock Returns','https://scholar.google.com/scholar?q=Brock+Lakonishok+LeBaron+1992+Simple+Technical+Trading+Rules','בחינת כללי מסחר טכניים היסטוריים; לא הבטחה לתשואה עתידית.'],
 ['Sullivan, Timmermann & White (1999)','Data-Snooping, Technical Trading Rule Performance, and the Bootstrap','https://scholar.google.com/scholar?q=Sullivan+Timmermann+White+1999+Data+Snooping+Technical+Trading','מדגים למה בחירת אסטרטגיה אחרי ניסויים רבים עלולה להטעות.'],
 ['Park & Irwin (2007)','What Do We Know About the Profitability of Technical Analysis?','https://scholar.google.com/scholar?q=Park+Irwin+2007+profitability+technical+analysis','סקירת ספרות: הממצאים מעורבים ותלויים באיכות המחקר ובעלויות מסחר.'],
 ['Fama (1970)','Efficient Capital Markets: A Review of Theory and Empirical Work','https://scholar.google.com/scholar?q=Fama+1970+Efficient+Capital+Markets','מסגרת ביקורתית: מידע גלוי עשוי כבר להיות מגולם במחירים.'],
 ['Andrew W. Lo (2004)','The Adaptive Markets Hypothesis: Market Efficiency from an Evolutionary Perspective','https://scholar.google.com/scholar?q=Andrew+Lo+2004+Adaptive+Markets+Hypothesis','הצעה תיאורטית להבנת שינויים בהתנהגות השווקים לאורך זמן.']
];
function researchSources(){return `<div class="research-literature"><h3>מחקר אקדמי — ראיות וביקורת</h3><p>אלו מאמרים אמיתיים לדיון ביקורתי; אין לראות בהם הוכחה שכל תבנית עובדת, או המלצה של החוקרים על האתר.</p>${papers.map(p=>`<a class="reader-source" href="${p[2]}" target="_blank" rel="noopener noreferrer"><strong>${p[0]}</strong><span>${p[1]}</span><small>${p[3]}</small></a>`).join('')}</div>`}
let frameLoaded=false;
function showLab(){const dock=$('academyPracticeDock'),frame=$('academyLabFrame');if(!dock||!frame)return;dock.hidden=false;if(!frameLoaded){frame.src=frame.dataset.src;frameLoaded=true;}dock.scrollIntoView({block:'nearest',behavior:'smooth'});}
function hideLab(){if($('academyPracticeDock'))$('academyPracticeDock').hidden=true;}
function setMode(mode){let frame=$('academyLabFrame');if(!frame)return;showLab();$('practiceLocal')?.classList.toggle('active',mode==='local');$('practiceExternal')?.classList.toggle('active',mode==='external');try{let doc=frame.contentDocument;if(!doc)return;let button=doc.querySelector(`[data-pro-mode="${mode}"]`);button?.click()}catch(e){} }
function bindPractice(id,title){const fields=[...document.querySelectorAll('[data-note]')],key='ea-v6-research-'+id;let notes={};try{notes=JSON.parse(localStorage.getItem(key)||'{}')}catch(e){};fields.forEach(field=>{field.value=notes[field.dataset.note]||'';field.addEventListener('input',()=>{notes[field.dataset.note]=field.value;try{localStorage.setItem(key,JSON.stringify(notes));$('noteSaveStatus').textContent='✓ נשמר במכשיר זה'}catch(e){$('noteSaveStatus').textContent='לא ניתן לשמור אוטומטית — השתמש בייצוא'}})});
$('openLabSide')?.addEventListener('click',showLab);$('closeLabSide')?.addEventListener('click',hideLab);
$('exportResearchNote')?.addEventListener('click',()=>{const lines=[`EA Academy | ${title}`,`שיעור ${id+1}`,`נוצר: ${new Date().toLocaleString('he-IL')}`,'',...fields.map(f=>`${f.closest('label')?.textContent?.trim()||f.dataset.note}\n${f.value}\n`)];const blob=new Blob([lines.join('\n')],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`ea-academy-lesson-${id+1}.txt`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)});
}
window.EAAcademyV6={bindPractice,researchSources,showLab};
$('closePracticeDock')?.addEventListener('click',hideLab);
$('practiceLocal')?.addEventListener('click',()=>setMode('local'));
$('practiceExternal')?.addEventListener('click',()=>setMode('external'));
// Embedded mode: only the local lab and chart remain visible in the iframe.
if(new URLSearchParams(location.search).get('embed')==='lab'){
 document.documentElement.classList.add('ea-embed');
 document.addEventListener('DOMContentLoaded',()=>{document.querySelector('[data-view="lab"]')?.click();});
}
})();
