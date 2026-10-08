const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduced && 'IntersectionObserver' in window) {
 document.documentElement.classList.add('motion-ready');
 const observer = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});
 document.querySelectorAll('.reveal').forEach(item=>observer.observe(item));
}
const progress = document.querySelector('.scroll-progress');
let ticking=false;
function updateProgress(){const height=document.documentElement.scrollHeight-innerHeight;if(progress)progress.style.transform=`scaleX(${height>0?Math.min(1,scrollY/height):0})`;ticking=false;}
addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(updateProgress);ticking=true;}},{passive:true});addEventListener('resize',updateProgress);updateProgress();
document.querySelectorAll('a[href$=".html"]').forEach(link=>link.addEventListener('click',event=>{if(reduced||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey||event.button!==0)return;event.preventDefault();document.body.classList.add('leaving');setTimeout(()=>location.assign(link.href),180);}));
addEventListener('pageshow',()=>document.body.classList.remove('leaving'));
const form=document.getElementById('brief-form');
if(form)form.addEventListener('submit',event=>{event.preventDefault();const data=new FormData(form);document.getElementById('brief-text').value=`Здравствуйте! Хочу обсудить сайт.\n\nИмя: ${String(data.get('name')).trim()}\nТип сайта: ${data.get('kind')}\nЗадача: ${String(data.get('task')).trim()}\nСроки: ${String(data.get('timing')).trim()||'Обсудим'}`;const result=document.getElementById('brief-result');result.hidden=false;result.scrollIntoView({behavior:reduced?'auto':'smooth',block:'center'});document.getElementById('brief-text').focus({preventScroll:true});});
const copy=document.getElementById('copy-brief');
if(copy)copy.addEventListener('click',async()=>{const text=document.getElementById('brief-text');try{await navigator.clipboard.writeText(text.value);document.getElementById('copy-status').textContent='Скопировано. Откройте Telegram и вставьте сообщение в чат @apothemm.';}catch{text.focus();text.select();document.getElementById('copy-status').textContent='Выделено. Скопируйте текст сочетанием Ctrl+C или через меню телефона.'}});
