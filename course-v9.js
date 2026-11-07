(()=>{'use strict';
const c=window.EA_COURSE_V9;if(!c||!Array.isArray(c.lessons)){document.body.textContent='שגיאה בטעינת נתוני הקורס';return}
const $=id=>document.getElementById(id), N=c.lessons.length; let at=0,tab='learn',completed={},quizOK={},notesTimer;
try{completed=JSON.parse(localStorage.getItem('ea9-done')||'{}')||{}}catch{}
try{quizOK=JSON.parse(localStorage.getItem('ea9-quiz')||'{}')||{}}catch{}
const stored=(key)=>{try{return JSON.parse(localStorage.getItem(key)||'{}')||{}}catch{return {}}};
const saveObj=(key,val)=>{try{localStorage.setItem(key,JSON.stringify(val));return true}catch{return false}};
const noteKey=()=>`ea9-note-${c.lessons[at].id}`;
const noteIds=['noteSummary','noteData','noteCounter','noteConclusion'];
function node(tag,text,cls){let e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(cls)e.className=cls;return e}
function safeLink(url){try{let u=new URL(url);return u.protocol==='https:'?u.toString():'#'}catch{return '#'}}
function sidebar(){let old=document.querySelector('.week[open] summary');const opened=old?old.parentElement.dataset.week:null;let q=$('lessonSearch').value.trim().toLowerCase();$('weekNav').replaceChildren();for(let w=1;w<=18;w++){
 let matches=c.lessons.map((x,i)=>({x,i})).filter(o=>o.x.week===w&&(!q||(o.x.title+' '+o.x.type+' '+c.weeks[w-1]).toLowerCase().includes(q)));
 if(!matches.length)continue;let d=node('details',undefined,'week');d.dataset.week=String(w);d.open=Boolean(q)||String(w)===opened||(!opened&&w===c.lessons[at].week);
 let summary=node('summary');summary.append(node('strong',`שבוע ${w}: ${c.weeks[w-1]}`),node('span',`${matches.filter(o=>completed[o.x.id]).length}/3`));d.append(summary);
 let list=node('div',undefined,'week-list');matches.forEach(({x,i})=>{let b=node('button');b.type='button';b.className=(i===at?'active ':'')+(completed[x.id]?'done':'');b.append(node('span',String(x.slot),'num'),node('span',x.title+(completed[x.id]?' ✓':'')));b.addEventListener('click',()=>go(i));list.append(b)});d.append(list);$('weekNav').append(d)}
 let n=c.lessons.filter(l=>completed[l.id]).length;$('progressTitle').textContent=`${n} מתוך ${N} שיעורים`;let pc=Math.round(n/N*100);$('progressPercent').textContent=pc+'%';$('progressFill').style.width=pc+'%'
}
function renderSourceCards(){let box=$('sourceCards');box.replaceChildren();let keys=[...new Set(c.lessons[at].sources)];keys.forEach(k=>{let s=c.sources[k];if(!s)return;let div=node('div',undefined,'source-card');div.append(node('small',s.kind),node('a',s.name+' ↗'));let a=div.querySelector('a');a.href=safeLink(s.url);a.target='_blank';a.rel='noopener noreferrer';div.append(node('p',s.tip));box.append(div)})}
function updateNotes(){let x=stored(noteKey());for(let id of noteIds)$(id).value=x[id]||'';$('saveStatus').textContent='המחברת נשמרת במכשיר זה (לא בענן)'}
function saveNotes(){let obj={};noteIds.forEach(id=>obj[id]=$(id).value);let ok=saveObj(noteKey(),obj);$('saveStatus').textContent=ok?'✓ נשמר בדפדפן':'לא ניתן לשמור בדפדפן — מומלץ לייצא';return obj}
function setTab(t){tab=t;document.querySelectorAll('[data-panel]').forEach(el=>el.hidden=el.dataset.panel!==t);document.querySelectorAll('[data-tab]').forEach(btn=>{let active=btn.dataset.tab===t;btn.classList.toggle('active',active);btn.setAttribute('aria-selected',String(active))});
 if(t==='practice'&&$('labArea').hidden){$('labArea').hidden=false;$('toggleLab').textContent='הסתר גרף';$('toggleLab').setAttribute('aria-expanded','true')}
 if(t==='learn'){} // Keep chart visible if learner chose it; do not interrupt simultaneous study.
}
function renderQuiz(){const l=c.lessons[at], area=$('quizArea');area.replaceChildren(node('h3',l.question));l.choices.forEach((choice,i)=>{let b=node('button',choice);b.dataset.answer=String(i);b.onclick=()=>chooseAnswer(i);area.append(b)});$('quizFeedback').textContent=quizOK[l.id]?'✓ השאלה כבר נענתה נכון. אפשר לחזור עליה.':'';$('markComplete').textContent=completed[l.id]?'✓ השיעור הושלם — לחץ לביטול':'בדוק תנאי השלמה'}
function chooseAnswer(i){const l=c.lessons[at],correct=i===l.correct;document.querySelectorAll('#quizArea button[data-answer]').forEach(btn=>{btn.classList.toggle('chosen',Number(btn.dataset.answer)===i);btn.classList.toggle('correct',Number(btn.dataset.answer)===l.correct&&correct);btn.classList.toggle('wrong',Number(btn.dataset.answer)===i&&!correct)});$('quizFeedback').textContent=(correct?'✓ תשובה נכונה. ':'לא מדויק. ')+l.explanation;if(correct){quizOK[l.id]=true;saveObj('ea9-quiz',quizOK)}}
function render(){let x=c.lessons[at];$('breadcrumb').textContent=`שבוע ${x.week} / 18 · שיעור ${x.slot} / 3 · ${c.weeks[x.week-1]}`;$('lessonTitle').textContent=x.title;$('lessonType').textContent=x.type;
 $('objectives').replaceChildren(...x.objectives.map(t=>node('li',t)));$('coreIdea').textContent=x.idea;$('mechanism').textContent=x.mechanism;$('caseStudy').textContent=x.example;$('limitations').textContent=x.limitation;$('practiceTask').textContent=x.practice;
 $('prevLesson').disabled=at===0;$('nextLesson').disabled=at===N-1;
 renderSourceCards();renderQuiz();updateNotes();sidebar();setTab('learn');
 // preserve option to keep lab visible; no fullscreen or scrolling surprises.
}
function go(i){if(i<0||i>=N)return;clearTimeout(notesTimer);saveNotes();at=i;render();window.scrollTo({top:0,behavior:'instant'});if(location.hash!==`#lesson-${c.lessons[at].id}`)history.replaceState(null,'',`#lesson-${c.lessons[at].id}`)}
$('lessonSearch').addEventListener('input',sidebar);
$('prevLesson').onclick=()=>go(at-1);$('nextLesson').onclick=()=>go(at+1);
document.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',()=>setTab(b.dataset.tab)));
$('toPractice').onclick=()=>{setTab('practice');$('practicePanel').scrollIntoView({block:'start',behavior:'smooth'})};
$('toggleLab').onclick=()=>{let hidden=!$('labArea').hidden;$('labArea').hidden=hidden;$('toggleLab').textContent=hidden?'הצג גרף':'הסתר גרף';$('toggleLab').setAttribute('aria-expanded',String(!hidden))};
for(let id of noteIds)$(id).addEventListener('input',()=>{clearTimeout(notesTimer);notesTimer=setTimeout(saveNotes,250)});
$('markComplete').onclick=()=>{let l=c.lessons[at];if(completed[l.id]){delete completed[l.id];saveObj('ea9-done',completed);renderQuiz();sidebar();$('completionHint').textContent='סימון ההשלמה בוטל; הסיכום והשאלה נשמרו.';return}
 let notes=saveNotes();let n=(notes.noteSummary||'').trim().length;
 if(!quizOK[l.id]||n<80){$('completionHint').textContent='כדי להשלים: '+(!quizOK[l.id]?'ענה נכון על שאלת ההבנה. ':'')+(n<80?`כתוב סיכום של לפחות 80 תווים (כרגע ${n}).`:'');return}
 completed[l.id]=true;saveObj('ea9-done',completed);renderQuiz();sidebar();$('completionHint').textContent='✓ השיעור הושלם. אפשר לעבור לשיעור הבא.'};
$('exportNotes').onclick=()=>{let l=c.lessons[at],obj=saveNotes(),labels={'noteSummary':'סיכום במילים שלי','noteData':'נתונים ומקורות','noteCounter':'ראיה נגדית / שאלות','noteConclusion':'מסקנות'};let txt=['EA Academy | '+l.title,'שבוע '+l.week+', שיעור '+l.slot,'',...noteIds.flatMap(id=>[labels[id],obj[id]||'',''])].join('\n');let a=document.createElement('a'),u=URL.createObjectURL(new Blob([txt],{type:'text/plain;charset=utf-8'}));a.href=u;a.download=`EA-Academy-lesson-${l.id}.txt`;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),500)};
let hash=(location.hash||'').match(/^#lesson-(\d{2}-\d)$/);if(hash){let ix=c.lessons.findIndex(x=>x.id===hash[1]);if(ix>=0)at=ix}render();
})();