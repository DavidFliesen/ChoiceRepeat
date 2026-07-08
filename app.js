const storageKey = "choicerepeat.stack.v4";
const settingsKey = "choicerepeat.settings.v4";

const choices = [
  {
    id: "drink-swap",
    category: "Eat",
    title: "Change the drink, not the whole meal.",
    why: "A small drink swap can reduce extra sugar without making the meal feel like a punishment.",
    tryThis: "At one meal today, keep the food normal and choose water, sparkling water, or unsweet tea.",
    tags: ["food", "simple", "low-friction"]
  },
  {
    id: "protein-first",
    category: "Eat",
    title: "Put protein first.",
    why: "Protein can make meals feel more satisfying and may reduce grazing later.",
    tryThis: "At one meal, start with eggs, fish, chicken, Greek yogurt, beans, cottage cheese, or another protein you like.",
    tags: ["food", "cravings", "fullness"]
  },
  {
    id: "ten-minute-walk",
    category: "Move",
    title: "Walk for 10 minutes after one meal.",
    why: "A short walk is small enough to repeat and can help turn movement into a normal rhythm.",
    tryThis: "After lunch or dinner, walk for 10 minutes. Slow counts. Easy counts.",
    tags: ["movement", "gentle", "repeatable"]
  },
  {
    id: "pause-before-snack",
    category: "Reset",
    title: "Pause before the snack.",
    why: "A pause creates space between the urge and the action. That is where choice lives.",
    tryThis: "Before an unplanned snack, wait five minutes and ask: am I hungry, tired, stressed, or bored?",
    tags: ["cravings", "mindset", "self-control"]
  },
  {
    id: "plate-before-seconds",
    category: "Eat",
    title: "Wait before seconds.",
    why: "Your body often needs a few minutes to catch up with your plate.",
    tryThis: "After your first plate, wait 10 minutes before deciding whether you want more.",
    tags: ["portions", "food", "awareness"]
  },
  {
    id: "screen-down",
    category: "Rest",
    title: "Give sleep a small head start.",
    why: "Better sleep can make better choices easier the next day.",
    tryThis: "Put the phone down 15 minutes earlier than usual tonight, or dim the screen and stop scrolling in bed.",
    tags: ["sleep", "routine", "energy"]
  },
  {
    id: "water-before-coffee",
    category: "Drink",
    title: "Drink water before the next refill.",
    why: "Hydration is a simple choice that supports energy and can reduce mindless sipping or snacking.",
    tryThis: "Before your next coffee, soda, or sweet drink, drink one glass of water first.",
    tags: ["hydration", "simple", "energy"]
  },
  {
    id: "kind-reset",
    category: "Reflect",
    title: "Reset without beating yourself up.",
    why: "Shame makes people quit. Reflection helps people continue.",
    tryThis: "If a choice did not go the way you wanted, write one sentence: “Next time, I can try…”",
    tags: ["mindset", "reflection", "confidence"]
  },
  {
    id: "comfort-upgrade",
    category: "Reset",
    title: "Upgrade comfort food by one step.",
    why: "Comfort matters. The goal is not to erase comfort; it is to make the choice a little more supportive.",
    tryThis: "Keep the comforting food, but reduce one extra: smaller portion, no sweet drink, or add protein.",
    tags: ["real life", "food", "stress"]
  },
  {
    id: "grateful-breath",
    category: "Reflect",
    title: "Take one grateful breath.",
    why: "A brief moment of gratitude can slow the rush and reconnect choices to meaning.",
    tryThis: "Before one meal or snack, pause for one breath and name one thing you are thankful for.",
    tags: ["reflection", "calm", "meaning"]
  }
];

const coachRules = [
  {
    terms: ["fast food", "burger", "fries", "combo", "drive"],
    title: "Keep it normal. Improve one part.",
    better: "Keep the main item, but change the drink to water or unsweet tea.",
    repeat: "Try that same drink swap the next time you eat fast food.",
    reflection: "Did changing one part feel doable?"
  },
  {
    terms: ["snack", "chips", "cookies", "ice cream", "late", "night"],
    title: "Create a pause, then choose.",
    better: "Wait five minutes, then choose a single portion or a planned snack with protein or fiber.",
    repeat: "Repeat the pause before the snack. The pause is the win.",
    reflection: "Were you hungry, tired, stressed, or bored?"
  },
  {
    terms: ["exercise", "tired", "movement", "walk", "pain", "sore"],
    title: "Make movement small enough to repeat.",
    better: "Do 5–10 minutes of gentle movement: slow walk, stretching, chair movement, or light house movement.",
    repeat: "Repeat the small movement tomorrow before increasing it.",
    reflection: "Did it leave you feeling better or worse?"
  },
  {
    terms: ["sleep", "bed", "scroll", "phone"],
    title: "Give tomorrow a better start tonight.",
    better: "Stop one screen habit 15 minutes earlier or put the phone across the room.",
    repeat: "Repeat the same bedtime cue for three nights before changing anything else.",
    reflection: "What kept you up tonight?"
  },
  {
    terms: ["stress", "rough", "comfort", "angry", "sad", "anxious"],
    title: "Support the feeling without surrendering the choice.",
    better: "Name the feeling, then make one supportive choice: water first, smaller portion, walk, prayer, breath, or text someone.",
    repeat: "Repeat the naming step. Awareness is part of the habit.",
    reflection: "What did the feeling really need?"
  }
];

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function prettyDate() {
  return new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric" }).format(new Date());
}

function getStack() {
  return JSON.parse(localStorage.getItem(storageKey) || "[]");
}

function saveStack(stack) {
  localStorage.setItem(storageKey, JSON.stringify(stack));
}

function getSettings() {
  return JSON.parse(localStorage.getItem(settingsKey) || "{}");
}

function saveSettings(settings) {
  localStorage.setItem(settingsKey, JSON.stringify(settings));
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function dailyChoice() {
  const settings = getSettings();
  const overrideId = settings.todayChoiceId;
  if (overrideId) return choices.find(choice => choice.id === overrideId) || choices[0];

  const start = new Date("2026-01-01T00:00:00");
  const now = new Date();
  const dayNumber = Math.floor((now - start) / 86400000);
  return choices[Math.abs(dayNumber) % choices.length];
}

function setDailyChoice(choice) {
  document.querySelector("#dailyCategory").textContent = choice.category;
  document.querySelector("#dailyTitle").textContent = choice.title;
  document.querySelector("#dailyWhy").textContent = choice.why;
  document.querySelector("#dailyTry").textContent = choice.tryThis;
}

function renderToday() {
  document.querySelector("#todayDate").textContent = prettyDate();
  setDailyChoice(dailyChoice());

  const stack = getStack();
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 6);
  const weekly = stack.filter(item => new Date(item.date) >= new Date(weekAgo.toISOString().slice(0,10))).length;

  document.querySelector("#stackCount").textContent = stack.length;
  document.querySelector("#weekCount").textContent = weekly;
}

function renderCategories() {
  const categories = ["All", ...new Set(choices.map(choice => choice.category))];
  const filters = document.querySelector("#categoryFilters");
  filters.innerHTML = categories.map((cat, idx) => `
    <button class="category-pill ${idx === 0 ? "active" : ""}" data-category="${escapeHTML(cat)}">${escapeHTML(cat)}</button>
  `).join("");

  filters.querySelectorAll(".category-pill").forEach(button => {
    button.addEventListener("click", () => {
      filters.querySelectorAll(".category-pill").forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      renderChoiceLibrary(button.dataset.category);
    });
  });

  renderChoiceLibrary("All");
}

function renderChoiceLibrary(category = "All") {
  const list = document.querySelector("#choiceLibrary");
  const filtered = category === "All" ? choices : choices.filter(choice => choice.category === category);
  list.innerHTML = filtered.map(choice => `
    <article class="library-card">
      <span class="category-badge">${escapeHTML(choice.category)}</span>
      <h2>${escapeHTML(choice.title)}</h2>
      <p>${escapeHTML(choice.why)}</p>
      <div class="gentle-box">
        <strong>Try it this way</strong>
        <p>${escapeHTML(choice.tryThis)}</p>
      </div>
      <button class="secondary-button" data-set-choice="${escapeHTML(choice.id)}">Make this today’s choice</button>
      <div class="tag-row">
        ${choice.tags.map(tag => `<span class="small-tag">${escapeHTML(tag)}</span>`).join("")}
      </div>
    </article>
  `).join("");

  list.querySelectorAll("[data-set-choice]").forEach(button => {
    button.addEventListener("click", () => {
      const settings = getSettings();
      settings.todayChoiceId = button.dataset.setChoice;
      saveSettings(settings);
      renderToday();
      routeTo("today");
    });
  });
}

function markTried(choice, reflection = "") {
  const stack = getStack();
  const entry = {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    choiceId: choice.id,
    title: choice.title,
    category: choice.category,
    tryThis: choice.tryThis,
    reflection,
    date: todayISO()
  };
  saveStack([entry, ...stack]);
  renderToday();
  renderStack();
}

function renderStack() {
  const stack = getStack();
  const stats = document.querySelector("#stackStats");
  const timeline = document.querySelector("#stackTimeline");

  const categories = stack.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});
  const topCategory = Object.entries(categories).sort((a, b) => b[1] - a[1])[0]?.[0] || "None yet";

  stats.innerHTML = `
    <article>
      <strong>${stack.length}</strong>
      <span>Total choices stacked</span>
    </article>
    <article>
      <strong>${escapeHTML(topCategory)}</strong>
      <span>Most repeated area</span>
    </article>
  `;

  if (!stack.length) {
    timeline.innerHTML = `
      <article class="timeline-card">
        <h2>No choices stacked yet</h2>
        <p>Try today’s choice, save a reflection, or pick a choice from Explore.</p>
      </article>
    `;
    return;
  }

  timeline.innerHTML = stack.map(item => `
    <article class="timeline-card">
      <span class="category-badge">${escapeHTML(item.category)}</span>
      <h2>${escapeHTML(item.title)}</h2>
      <p><strong>${escapeHTML(item.date)}</strong> — ${escapeHTML(item.tryThis)}</p>
      ${item.reflection ? `<p>${escapeHTML(item.reflection)}</p>` : ""}
    </article>
  `).join("");
}

function coachResponse(input) {
  const lower = input.toLowerCase();
  const match = coachRules.find(rule => rule.terms.some(term => lower.includes(term)));
  if (match) return match;

  return {
    title: "Make it smaller, clearer, and repeatable.",
    better: "Choose one part of the situation to improve instead of trying to fix everything at once.",
    repeat: "Repeat that same small improvement tomorrow or the next time the situation shows up.",
    reflection: "What made this choice hard, and what would make it 10% easier?"
  };
}

function renderCoachResult(result, input) {
  const panel = document.querySelector("#coachResult");
  panel.innerHTML = `
    <p><strong>${escapeHTML(result.title)}</strong></p>
    <p>You entered: “${escapeHTML(input)}”</p>
    <div class="coach-step"><strong>One better choice</strong><p>${escapeHTML(result.better)}</p></div>
    <div class="coach-step"><strong>How to repeat it</strong><p>${escapeHTML(result.repeat)}</p></div>
    <div class="coach-step"><strong>Reflection</strong><p>${escapeHTML(result.reflection)}</p></div>
  `;
}

function setupCoach() {
  const input = document.querySelector("#coachInput");
  document.querySelectorAll(".chip").forEach(button => {
    button.addEventListener("click", () => {
      input.value = button.dataset.fill;
      input.focus();
    });
  });

  document.querySelector("#coachButton").addEventListener("click", () => {
    const value = input.value.trim();
    if (!value) {
      renderCoachResult({
        title: "Start with the real situation.",
        better: "Name the choice you are actually facing.",
        repeat: "Keep it specific enough that you could try it today.",
        reflection: "What is the smallest part of this situation you can improve?"
      }, "nothing yet");
      return;
    }
    renderCoachResult(coachResponse(value), value);
  });
}

function setupTodayActions() {
  document.querySelector("#triedTodayButton").addEventListener("click", () => {
    markTried(dailyChoice(), "");
    alert("Stacked. One better choice counts.");
  });

  document.querySelector("#newChoiceButton").addEventListener("click", () => {
    const current = dailyChoice();
    const index = choices.findIndex(choice => choice.id === current.id);
    const next = choices[(index + 1) % choices.length];
    const settings = getSettings();
    settings.todayChoiceId = next.id;
    saveSettings(settings);
    renderToday();
  });

  document.querySelector("#saveReflectionButton").addEventListener("click", () => {
    const text = document.querySelector("#reflectionInput").value.trim();
    if (!text) {
      alert("Add a short reflection first.");
      return;
    }
    markTried(dailyChoice(), text);
    document.querySelector("#reflectionInput").value = "";
    alert("Reflection saved. That is part of the change.");
  });
}

function routeTo(route) {
  document.querySelectorAll(".screen").forEach(screen => screen.classList.remove("active"));
  const target = document.querySelector(`#screen-${route}`);
  if (target) target.classList.add("active");

  document.querySelectorAll(".bottom-nav button").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.route === route);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setupNavigation() {
  document.querySelectorAll("[data-route]").forEach(button => {
    button.addEventListener("click", () => routeTo(button.dataset.route));
  });
}

function setupDataControls() {
  document.querySelector("#clearDataButton").addEventListener("click", () => {
    if (confirm("Clear local Choice...Repeat test data on this device?")) {
      localStorage.removeItem(storageKey);
      localStorage.removeItem(settingsKey);
      renderToday();
      renderStack();
      renderCategories();
    }
  });
}

function setupInstallPrompt() {
  let deferredPrompt;
  const installButton = document.querySelector("#installButton");

  window.addEventListener("beforeinstallprompt", event => {
    event.preventDefault();
    deferredPrompt = event;
    installButton.hidden = false;
  });

  installButton.addEventListener("click", async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    installButton.hidden = true;
  });
}

async function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("./sw.js");
    } catch (error) {
      console.warn("Service worker registration failed:", error);
    }
  }
}

renderToday();
renderCategories();
renderStack();
setupTodayActions();
setupCoach();
setupNavigation();
setupDataControls();
setupInstallPrompt();
registerServiceWorker();
