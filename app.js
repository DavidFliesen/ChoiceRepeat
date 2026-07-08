const storageKey = "choicerepeat.stack.v9";
const settingsKey = "choicerepeat.settings.v9";

const choices = [
  {id:"drink-swap",category:"Eat",title:"Change the drink, not the whole meal.",why:"A small drink swap can reduce extra sugar without making the meal feel like a punishment.",tryThis:"Keep the meal, but choose water or unsweetened tea.",tags:["food","simple","low-friction"]},
  {id:"protein-first",category:"Eat",title:"Put protein first.",why:"Protein can make meals feel more satisfying and may reduce grazing later.",tryThis:"Start one meal with eggs, fish, chicken, Greek yogurt, beans, cottage cheese, or another protein you like.",tags:["food","cravings","fullness"]},
  {id:"ten-minute-walk",category:"Move",title:"Walk for 10 minutes after one meal.",why:"A short walk is small enough to repeat and can help turn movement into a normal rhythm.",tryThis:"After lunch or dinner, walk for 10 minutes. Slow counts. Easy counts.",tags:["movement","gentle","repeatable"]},
  {id:"pause-before-snack",category:"Reset",title:"Pause before the snack.",why:"A pause creates space between the urge and the action. That is where choice lives.",tryThis:"Before an unplanned snack, wait five minutes and ask: am I hungry, tired, stressed, or bored?",tags:["cravings","mindset","self-control"]},
  {id:"comfort-upgrade",category:"Reset",title:"Upgrade comfort food by one step.",why:"Comfort matters. The goal is not to erase comfort; it is to make the choice a little more supportive.",tryThis:"Keep the comforting food, but reduce one extra: smaller portion, no sweet drink, or add protein.",tags:["real life","food","stress"]},
  {id:"screen-down",category:"Rest",title:"Give sleep a small head start.",why:"Better sleep can make better choices easier the next day.",tryThis:"Put the phone down 15 minutes earlier than usual tonight, or dim the screen and stop scrolling in bed.",tags:["sleep","routine","energy"]},
  {id:"grateful-breath",category:"Reflect",title:"Take one grateful breath.",why:"A brief moment of gratitude can slow the rush and reconnect choices to meaning.",tryThis:"Before one meal or snack, pause for one breath and name one thing you are thankful for.",tags:["reflection","calm","meaning"]}
];

const inspirationMoments = [
  {id:"roosevelt",person:"Theodore Roosevelt",title:"Build strength gradually",theme:"Strength",summary:"As a child, Roosevelt dealt with physical weakness and health struggles, but he worked over time to build himself stronger.",choice:"He treated growth like something that could be trained, not wished into existence.",tryToday:"Choose one small act that builds your strength gently: a walk, a stretch, or a calmer meal choice.",repeatLine:"Strength is often trained in small reps."},
  {id:"tubman",person:"Harriet Tubman",title:"Move with courage, even while afraid",theme:"Courage",summary:"Tubman faced danger repeatedly, yet she kept moving with purpose and helped others move toward freedom too.",choice:"She did not wait for fear to disappear. She took the next meaningful step anyway.",tryToday:"Choose one thing you have been avoiding and take the smallest possible action toward it.",repeatLine:"Courage often looks like one more step."},
  {id:"douglass",person:"Frederick Douglass",title:"Build yourself through learning",theme:"Growth",summary:"Douglass knew that learning and clear thinking could change the course of a life.",choice:"He kept strengthening his mind and voice, even when the world gave him every reason not to.",tryToday:"Spend 10 minutes learning something that supports the person you want to become.",repeatLine:"Growth begins long before anyone else sees it."},
  {id:"helen-keller",person:"Helen Keller",title:"Keep reaching beyond the limit",theme:"Possibility",summary:"Keller faced extraordinary barriers, yet she continued learning, communicating, and expanding what many thought was possible.",choice:"She kept moving toward growth rather than letting limitation become her whole identity.",tryToday:"When you feel limited, ask: what is still possible for me today?",repeatLine:"Limitation does not erase possibility."},
  {id:"lincoln",person:"Abraham Lincoln",title:"Return after the setback",theme:"Resilience",summary:"Long before the presidency, Lincoln faced repeated losses, personal grief, and periods of discouragement.",choice:"He kept learning, kept serving, and kept returning to the work instead of letting a setback define the whole story.",tryToday:"When one thing goes wrong today, write one next step instead of calling the day ruined.",repeatLine:"A setback is not a stop sign."},
  {id:"jackie-robinson",person:"Jackie Robinson",title:"Hold your dignity under pressure",theme:"Composure",summary:"Robinson faced relentless pressure and hostility, yet he kept showing up with discipline and composure.",choice:"He focused on the larger mission instead of reacting to every insult.",tryToday:"When something irritates you today, pause before reacting and choose the response that serves the bigger goal.",repeatLine:"Dignity is a form of strength."},
  {id:"eleanor-roosevelt",person:"Eleanor Roosevelt",title:"Grow into your voice",theme:"Confidence",summary:"Roosevelt was not born fully confident. Over time, she grew into a strong public voice through service and conviction.",choice:"She practiced becoming the person she needed to be.",tryToday:"Speak one honest, useful sentence today instead of staying silent out of self-doubt.",repeatLine:"Confidence often grows by being used."},
  {id:"carver",person:"George Washington Carver",title:"Let patience become part of progress",theme:"Patience",summary:"Carver’s work reflected deep curiosity, patient effort, and the belief that small observations can lead to useful change.",choice:"He kept paying attention and working steadily instead of rushing for instant results.",tryToday:"Give one healthy habit a little more patience today instead of abandoning it because it feels small.",repeatLine:"Quiet effort still counts."}
];

const coachRules = [
  {terms:["fast food","burger","fries","combo","drive"],title:"Keep it normal. Improve one part.",better:"Keep the main item, but change the drink to water or unsweet tea.",repeat:"Try that same drink swap the next time you eat fast food.",reflection:"Did changing one part feel doable?"},
  {terms:["snack","chips","cookies","ice cream","late","night"],title:"Create a pause, then choose.",better:"Wait five minutes, then choose a single portion or a planned snack with protein or fiber.",repeat:"Repeat the pause before the snack. The pause is the win.",reflection:"Were you hungry, tired, stressed, or bored?"},
  {terms:["exercise","tired","movement","walk","pain","sore"],title:"Make movement small enough to repeat.",better:"Do 5–10 minutes of gentle movement: slow walk, stretching, chair movement, or light house movement.",repeat:"Repeat the small movement tomorrow before increasing it.",reflection:"Did it leave you feeling better or worse?"},
  {terms:["sleep","bed","scroll","phone"],title:"Give tomorrow a better start tonight.",better:"Stop one screen habit 15 minutes earlier or put the phone across the room.",repeat:"Repeat the same bedtime cue for three nights before changing anything else.",reflection:"What kept you up tonight?"},
  {terms:["stress","rough","comfort","angry","sad","anxious"],title:"Support the feeling without surrendering the choice.",better:"Name the feeling, then make one supportive choice: water first, smaller portion, walk, prayer, breath, or text someone.",repeat:"Repeat the naming step. Awareness is part of the habit.",reflection:"What did the feeling really need?"}
];

function todayISO(){return new Date().toISOString().slice(0,10)}
function prettyDate(){return new Intl.DateTimeFormat("en-US",{weekday:"short",month:"short",day:"numeric"}).format(new Date())}
function getStack(){return JSON.parse(localStorage.getItem(storageKey)||"[]")}
function saveStack(stack){localStorage.setItem(storageKey,JSON.stringify(stack))}
function getSettings(){return JSON.parse(localStorage.getItem(settingsKey)||"{}")}
function saveSettings(settings){localStorage.setItem(settingsKey,JSON.stringify(settings))}
function escapeHTML(v){return String(v).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}
function imagePath(id){return `./assets/portraits/${id}.png`}
function choiceOfTheDay(){const s=getSettings(),id=s.todayChoiceId;if(id)return choices.find(c=>c.id===id)||choices[0];return choices[4]}
function momentOfTheDay(){const s=getSettings(),id=s.todayMomentId;if(id)return inspirationMoments.find(c=>c.id===id)||inspirationMoments[0];return inspirationMoments[0]}

function renderToday(){
  const c=choiceOfTheDay();
  document.querySelector("#dailyCategory").textContent=c.category;
  document.querySelector("#todayDate").textContent=prettyDate();
  document.querySelector("#dailyTitle").textContent=c.title;
  document.querySelector("#dailyWhy").textContent=c.why;
  document.querySelector("#dailyTry").textContent=c.tryThis;
  renderActiveMoment(momentOfTheDay());
  const stack=getStack();
  const weekAgo=new Date(); weekAgo.setDate(weekAgo.getDate()-6);
  const weekly=stack.filter(i=>new Date(i.date)>=new Date(weekAgo.toISOString().slice(0,10))).length;
  document.querySelector("#stackCount").textContent=stack.length;
  document.querySelector("#weekCount").textContent=weekly;
}

function renderActiveMoment(m){
  document.querySelector("#activeMomentLine").textContent=m.title;
  document.querySelector("#activeMomentPortrait").src=imagePath(m.id);
  document.querySelector("#activeMomentPortrait").alt=`Stylized portrait of ${m.person}`;
  document.querySelector("#activeMomentTheme").textContent=m.theme;
  document.querySelector("#activeMomentPerson").textContent=m.person;
  document.querySelector("#activeMomentTitle").textContent=m.title;
  document.querySelector("#activeMomentSummary").textContent=m.summary;
  document.querySelector("#activeMomentChoice").textContent=m.choice;
  document.querySelector("#activeMomentTry").textContent=m.tryToday;
  document.querySelector("#activeMomentRepeat").textContent=m.repeatLine;
  document.querySelectorAll(".moment-thumb").forEach(btn=>btn.classList.toggle("active",btn.dataset.momentId===m.id));
}

function renderMomentCarousel(){
  const row=document.querySelector("#momentCarousel");
  row.innerHTML=inspirationMoments.map(m=>`
    <button class="moment-thumb" data-moment-id="${escapeHTML(m.id)}">
      <img src="${imagePath(m.id)}" alt="Stylized portrait of ${escapeHTML(m.person)}" />
      <span>${escapeHTML(m.person).replace(" ","<br>")}</span>
    </button>`).join("");
  row.querySelectorAll(".moment-thumb").forEach(btn=>btn.addEventListener("click",()=>{
    const m=inspirationMoments.find(x=>x.id===btn.dataset.momentId);
    const s=getSettings(); s.todayMomentId=m.id; saveSettings(s); renderActiveMoment(m);
    document.querySelector("#momentDetailCard").classList.add("open");
  }));
}

function renderCategories(){
  const cats=["All",...new Set(choices.map(c=>c.category))], filters=document.querySelector("#categoryFilters");
  filters.innerHTML=cats.map((cat,i)=>`<button class="category-pill ${i===0?"active":""}" data-category="${escapeHTML(cat)}">${escapeHTML(cat)}</button>`).join("");
  filters.querySelectorAll(".category-pill").forEach(btn=>btn.addEventListener("click",()=>{filters.querySelectorAll(".category-pill").forEach(b=>b.classList.remove("active"));btn.classList.add("active");renderChoiceLibrary(btn.dataset.category)}));
  renderChoiceLibrary("All");
}

function renderChoiceLibrary(category="All"){
  const list=document.querySelector("#choiceLibrary"), filtered=category==="All"?choices:choices.filter(c=>c.category===category);
  list.innerHTML=filtered.map(choice=>`
    <article class="content-card">
      <span class="badge">${escapeHTML(choice.category)}</span>
      <h2>${escapeHTML(choice.title)}</h2>
      <p>${escapeHTML(choice.why)}</p>
      <div class="try-panel compact"><strong>Try it this way</strong><p>${escapeHTML(choice.tryThis)}</p></div>
      <button class="secondary-button" data-set-choice="${escapeHTML(choice.id)}">Make this today’s choice</button>
    </article>`).join("");
  list.querySelectorAll("[data-set-choice]").forEach(btn=>btn.addEventListener("click",()=>{const s=getSettings();s.todayChoiceId=btn.dataset.setChoice;saveSettings(s);renderToday();routeTo("today")}));
}

function renderInspirationLibrary(){
  const list=document.querySelector("#inspirationLibrary");
  list.innerHTML=inspirationMoments.map(m=>`
    <button data-set-moment="${escapeHTML(m.id)}">
      <img src="${imagePath(m.id)}" alt="Stylized portrait of ${escapeHTML(m.person)}" />
      <strong>${escapeHTML(m.person)}</strong>
      <span>${escapeHTML(m.theme)}</span>
    </button>`).join("");
  list.querySelectorAll("[data-set-moment]").forEach(btn=>btn.addEventListener("click",()=>{const s=getSettings();s.todayMomentId=btn.dataset.setMoment;saveSettings(s);renderToday();routeTo("today");document.querySelector("#momentDetailCard").classList.add("open")}));
}

function markTried(choice,reflection=""){
  const stack=getStack(), entry={id:crypto.randomUUID?crypto.randomUUID():String(Date.now()),choiceId:choice.id,title:choice.title,category:choice.category,tryThis:choice.tryThis,reflection,date:todayISO()};
  saveStack([entry,...stack]); renderToday(); renderStack();
}

function renderStack(){
  const stack=getStack(), stats=document.querySelector("#stackStats"), timeline=document.querySelector("#stackTimeline");
  const categories=stack.reduce((a,i)=>{a[i.category]=(a[i.category]||0)+1;return a},{}), topCategory=Object.entries(categories).sort((a,b)=>b[1]-a[1])[0]?.[0]||"None yet";
  stats.innerHTML=`<article><span class="stat-icon stones"></span><strong>${stack.length}</strong><span>Total choices stacked</span><em>Keep it going.</em></article><article><span class="stat-icon sprig"></span><strong>${escapeHTML(topCategory)}</strong><span>Most repeated area</span><em>You’re building momentum.</em></article>`;
  if(!stack.length){timeline.innerHTML=`<article class="content-card"><h2>No choices stacked yet</h2><p>Try today’s choice, save a reflection, or pick a choice from Explore.</p></article>`;return}
  timeline.innerHTML=stack.map(item=>`<article class="content-card"><span class="badge">${escapeHTML(item.category)}</span><h2>${escapeHTML(item.title)}</h2><p><strong>${escapeHTML(item.date)}</strong> — ${escapeHTML(item.tryThis)}</p>${item.reflection?`<p>${escapeHTML(item.reflection)}</p>`:""}</article>`).join("");
}

function coachResponse(input){
  const lower=input.toLowerCase(), match=coachRules.find(r=>r.terms.some(t=>lower.includes(t)));
  return match || {title:"Make it smaller, clearer, and repeatable.",better:"Choose one part of the situation to improve instead of trying to fix everything at once.",repeat:"Repeat that same small improvement tomorrow or the next time the situation shows up.",reflection:"What made this choice hard, and what would make it 10% easier?"};
}

function renderCoachResult(result,input){
  document.querySelector("#coachResult").innerHTML=`<p><strong>${escapeHTML(result.title)}</strong></p><p>You entered: “${escapeHTML(input)}”</p><div class="coach-step"><strong>One better choice</strong><p>${escapeHTML(result.better)}</p></div><div class="coach-step"><strong>How to repeat it</strong><p>${escapeHTML(result.repeat)}</p></div><div class="coach-step"><strong>Reflection</strong><p>${escapeHTML(result.reflection)}</p></div>`;
}

function setupCoach(){
  const input=document.querySelector("#coachInput");
  document.querySelectorAll(".chip").forEach(btn=>btn.addEventListener("click",()=>{input.value=btn.dataset.fill;input.focus()}));
  document.querySelector("#coachButton").addEventListener("click",()=>{const value=input.value.trim();if(!value){renderCoachResult({title:"Start with the real situation.",better:"Name the choice you are actually facing.",repeat:"Keep it specific enough that you could try it today.",reflection:"What is the smallest part of this situation you can improve?"},"nothing yet");return}renderCoachResult(coachResponse(value),value)});
}

function setupTodayActions(){
  document.querySelector("#triedTodayButton").addEventListener("click",()=>{markTried(choiceOfTheDay(),"");alert("Stacked. One better choice counts.")});
  document.querySelector("#newChoiceButton").addEventListener("click",()=>{const current=choiceOfTheDay(), index=choices.findIndex(c=>c.id===current.id), next=choices[(index+1)%choices.length], s=getSettings();s.todayChoiceId=next.id;saveSettings(s);renderToday()});
  document.querySelector("#momentDetailsButton").addEventListener("click",()=>document.querySelector("#momentDetailCard").classList.toggle("open"));
  document.querySelector("#useMomentButton").addEventListener("click",()=>{const m=momentOfTheDay();document.querySelector("#reflectionInput").value=`Inspired by ${m.person}: ${m.tryToday}`;document.querySelector("#reflectionInput").focus();window.scrollTo({top:document.querySelector("#reflectionInput").getBoundingClientRect().top+window.scrollY-120,behavior:"smooth"})});
  document.querySelector("#saveReflectionButton").addEventListener("click",()=>{const text=document.querySelector("#reflectionInput").value.trim();if(!text){alert("Add a short reflection first.");return}markTried(choiceOfTheDay(),text);document.querySelector("#reflectionInput").value="";alert("Reflection saved. That is part of the change.")});
}

function routeTo(route){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  const target=document.querySelector(`#screen-${route}`); if(target) target.classList.add("active");
  document.querySelectorAll(".bottom-nav button").forEach(btn=>btn.classList.toggle("active",btn.dataset.route===route));
  window.scrollTo({top:0,behavior:"smooth"});
}

function setupNavigation(){document.querySelectorAll("[data-route]").forEach(btn=>btn.addEventListener("click",()=>routeTo(btn.dataset.route)))}
function setupDataControls(){document.querySelector("#clearDataButton").addEventListener("click",()=>{if(confirm("Clear local Choice...Repeat test data on this device?")){localStorage.removeItem(storageKey);localStorage.removeItem(settingsKey);renderToday();renderStack();renderCategories();renderInspirationLibrary();renderMomentCarousel()}})}
function setupInstallPrompt(){let deferredPrompt;const installButton=document.querySelector("#installButton");window.addEventListener("beforeinstallprompt",event=>{event.preventDefault();deferredPrompt=event;installButton.hidden=false});installButton.addEventListener("click",async()=>{if(!deferredPrompt)return;deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;installButton.hidden=true})}
async function registerServiceWorker(){if("serviceWorker" in navigator){try{await navigator.serviceWorker.register("./sw.js")}catch(error){console.warn("Service worker registration failed:",error)}}}

renderMomentCarousel();renderToday();renderCategories();renderInspirationLibrary();renderStack();setupTodayActions();setupCoach();setupNavigation();setupDataControls();setupInstallPrompt();registerServiceWorker();
