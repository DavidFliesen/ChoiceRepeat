const storageKey = "choicerepeat.checkins.v2";

const starterSwaps = [
  {
    from: "Burger, fries, and sweet tea",
    to: "Keep the burger, switch to water or unsweet tea, and choose a small fry or fruit side.",
    why: "This keeps the meal normal while trimming the easiest extra calories."
  },
  {
    from: "Pizza night",
    to: "Start with salad or vegetables, eat 2 slices slowly, and save the rest.",
    why: "You keep the family meal without turning it into an all-or-nothing event."
  },
  {
    from: "Late-night chips",
    to: "Try portioned popcorn, Greek yogurt, fruit, or a planned protein snack.",
    why: "A planned snack beats grazing from a bag."
  },
  {
    from: "Big breakfast biscuit combo",
    to: "Choose protein first, skip the sweet drink, and take a 10-minute walk later.",
    why: "Protein plus a short walk often makes the rest of the day easier."
  },
  {
    from: "Mexican restaurant",
    to: "Choose fajitas, grilled protein, beans, salsa, and limit chips to one small plate.",
    why: "You get flavor and fullness without accidentally eating a meal before the meal."
  }
];

const genericSuggestions = {
  better: "Keep the main food, reduce the easiest extra: sugary drink, large fries, second serving, or late-night snack.",
  betterStill: "Add protein or fiber first, choose water or unsweet tea, and make the portion smaller without skipping the meal.",
  best: "Build a plate around lean protein, vegetables or fruit, and a reasonable starch portion.",
  dontPanic: "One meal does not ruin anything. Make the next choice better and take a 10-minute walk if you can."
};

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function getCheckins() {
  return JSON.parse(localStorage.getItem(storageKey) || "[]");
}

function saveCheckins(checkins) {
  localStorage.setItem(storageKey, JSON.stringify(checkins));
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function analyzeMeal(input) {
  const text = input.toLowerCase();

  const rules = [
    {
      matches: ["burger", "fries", "sweet tea", "soda", "combo"],
      title: "Fast food / burger meal",
      better: "Keep the burger, switch the drink to water or unsweet tea, and choose small fries.",
      betterStill: "Choose grilled chicken or a smaller sandwich, add fruit or salad, and skip the sweet drink.",
      best: "Grilled protein, side salad or fruit, water/unsweet tea, and a 10-minute walk after.",
      dontPanic: "If you really want the burger, enjoy it slowly and make the drink or fries the place you improve."
    },
    {
      matches: ["pizza", "slice"],
      title: "Pizza",
      better: "Eat 2 slices slowly and add salad, vegetables, or fruit first.",
      betterStill: "Choose thin crust, protein toppings, extra vegetables, and save leftovers before you start eating.",
      best: "Pair 1–2 slices with a large salad or lean protein side and stop when satisfied.",
      dontPanic: "Pizza can fit. The repeatable win is deciding the portion before you start."
    },
    {
      matches: ["chips", "snack", "cookies", "ice cream", "late"],
      title: "Snack or craving",
      better: "Put a single portion in a bowl instead of eating from the package.",
      betterStill: "Choose a planned snack with protein or fiber: Greek yogurt, fruit, cottage cheese, popcorn, or nuts.",
      best: "Check whether you are hungry, tired, stressed, or bored. Pick food if hungry; pick a non-food reset if not.",
      dontPanic: "Cravings are normal. The goal is not perfection — it is repeating a better response."
    },
    {
      matches: ["mexican", "taco", "burrito", "queso"],
      title: "Mexican / Tex-Mex",
      better: "Limit chips to one small plate and choose water or unsweet tea.",
      betterStill: "Choose fajitas, grilled protein, beans, salsa, and vegetables. Go easy on queso and sour cream.",
      best: "Make it a bowl or plate: protein, beans, vegetables, salsa, and a modest rice/tortilla portion.",
      dontPanic: "The chips are usually the sneak attack. Decide the chip limit early."
    },
    {
      matches: ["breakfast", "biscuit", "pancake", "waffle", "cereal"],
      title: "Breakfast",
      better: "Add protein first: eggs, Greek yogurt, cottage cheese, turkey, or a protein shake.",
      betterStill: "Reduce sweet drinks and choose fruit or oatmeal instead of pastries or oversized starch portions.",
      best: "Build breakfast around protein plus fiber so cravings are easier later.",
      dontPanic: "A better breakfast often makes the whole day easier."
    }
  ];

  const match = rules.find(rule => rule.matches.some(term => text.includes(term)));
  return match || {
    title: "General better choice",
    ...genericSuggestions
  };
}

function renderCoachResult(result, input) {
  const panel = document.querySelector("#coachResult");
  panel.innerHTML = `
    <p><strong>${escapeHTML(result.title)}</strong></p>
    <p>You entered: “${escapeHTML(input)}”</p>
    <div class="choice-tier"><strong>Better</strong>${escapeHTML(result.better)}</div>
    <div class="choice-tier"><strong>Better still</strong>${escapeHTML(result.betterStill)}</div>
    <div class="choice-tier"><strong>Best realistic choice</strong>${escapeHTML(result.best)}</div>
    <div class="choice-tier"><strong>Don’t panic option</strong>${escapeHTML(result.dontPanic)}</div>
  `;
}

function renderSwaps() {
  const list = document.querySelector("#swapList");
  list.innerHTML = starterSwaps.map(swap => `
    <div class="swap-card">
      <strong>Instead of: ${escapeHTML(swap.from)}</strong>
      <p>Try: ${escapeHTML(swap.to)}</p>
      <small>${escapeHTML(swap.why)}</small>
    </div>
  `).join("");
}

function renderHistory() {
  const checkins = getCheckins().sort((a, b) => b.date.localeCompare(a.date));
  const history = document.querySelector("#historyList");
  const stats = document.querySelector("#statsCards");

  const betterChoices = checkins.filter(c => c.betterChoice).length;
  const totalWalk = checkins.reduce((sum, c) => sum + (Number(c.walk) || 0), 0);
  const lastWeight = checkins.find(c => c.weight)?.weight || "—";

  stats.innerHTML = `
    <article class="metric-card">
      <span class="metric-label">Check-ins</span>
      <span class="metric-value">${checkins.length}</span>
    </article>
    <article class="metric-card">
      <span class="metric-label">Better choices</span>
      <span class="metric-value">${betterChoices}</span>
    </article>
    <article class="metric-card">
      <span class="metric-label">Walk minutes</span>
      <span class="metric-value">${totalWalk}</span>
    </article>
  `;

  if (!checkins.length) {
    history.innerHTML = `
      <div class="history-card">
        <strong>No check-ins yet</strong>
        <p>Save your first daily check-in to start building momentum.</p>
      </div>
    `;
    return;
  }

  history.innerHTML = checkins.map(c => {
    const winLabels = [];
    if (c.protein) winLabels.push("Protein");
    if (c.fiber) winLabels.push("Fiber");
    if (c.noLateSnack) winLabels.push("No late snack");
    if (c.betterChoice) winLabels.push("Better choice");

    return `
      <div class="history-card">
        <strong>${escapeHTML(c.date)}</strong>
        <p>Weight: ${escapeHTML(c.weight || "—")} &nbsp;•&nbsp; Waist: ${escapeHTML(c.waist || "—")} &nbsp;•&nbsp; Walk: ${escapeHTML(c.walk || "0")} min</p>
        <div class="meta">
          ${winLabels.length ? winLabels.map(w => `<span class="meta-pill">${escapeHTML(w)}</span>`).join("") : `<span class="meta-pill">No wins checked</span>`}
        </div>
        ${c.notes ? `<p style="margin-top:0.6rem;"><small>${escapeHTML(c.notes)}</small></p>` : ""}
      </div>
    `;
  }).join("");
}

function setupCheckinForm() {
  const form = document.querySelector("#checkinForm");
  form.addEventListener("submit", event => {
    event.preventDefault();
    const formData = new FormData(form);
    const existing = getCheckins();

    const entry = {
      date: todayISO(),
      weight: formData.get("weight")?.trim() || "",
      waist: formData.get("waist")?.trim() || "",
      water: formData.get("water")?.trim() || "",
      walk: formData.get("walk")?.trim() || "",
      protein: formData.has("protein"),
      fiber: formData.has("fiber"),
      noLateSnack: formData.has("noLateSnack"),
      betterChoice: formData.has("betterChoice"),
      notes: formData.get("notes")?.trim() || ""
    };

    const withoutToday = existing.filter(item => item.date !== entry.date);
    saveCheckins([...withoutToday, entry]);
    form.reset();
    renderHistory();
    alert("Saved. That’s one repeatable win.");
  });
}

function setupCoach() {
  const button = document.querySelector("#coachButton");
  const input = document.querySelector("#mealInput");
  const chips = document.querySelectorAll(".chip");

  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      input.value = chip.dataset.fill || "";
      input.focus();
    });
  });

  button.addEventListener("click", () => {
    const value = input.value.trim();
    if (!value) {
      renderCoachResult({
        title: "Start with a real choice",
        better: "Type the meal or craving you are facing right now.",
        betterStill: "Be specific: restaurant, drink, side, snack, or portion.",
        best: "The app works best when it helps with a real decision, not a perfect imaginary meal.",
        dontPanic: "No judgment. The next better choice counts."
      }, "nothing yet");
      return;
    }
    renderCoachResult(analyzeMeal(value), value);
  });
}

function setupDataControls() {
  document.querySelector("#clearDataButton").addEventListener("click", () => {
    if (confirm("Clear local test check-in data on this device?")) {
      localStorage.removeItem(storageKey);
      renderHistory();
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

renderSwaps();
renderHistory();
setupCoach();
setupCheckinForm();
setupDataControls();
setupInstallPrompt();
registerServiceWorker();
