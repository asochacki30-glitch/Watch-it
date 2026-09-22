// ==============================
// Page navigation — wired up FIRST, before anything that could
// possibly throw an error, so navigation and search never break
// even if a later feature has a bug.
// ==============================

const navButtons = document.querySelectorAll(".nav-btn");
const pages = document.querySelectorAll(".page");

navButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetId = "page-" + btn.dataset.page;

    pages.forEach((page) => {
      page.classList.toggle("hidden-page", page.id !== targetId);
    });

    navButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

// ==============================
// Search — wired up early too, independent of everything below
// ==============================

const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

function renderSearch(query) {
  searchResults.innerHTML = "";
  if (!query) return;

  const matches = sampleWatches.filter((w) =>
    `${w.brand} ${w.model}`.toLowerCase().includes(query.toLowerCase())
  );

  matches.forEach((watch) => {
    searchResults.appendChild(renderWatchCard(watch, "search"));
  });
}

searchInput.addEventListener("input", (e) => renderSearch(e.target.value));

// ==============================
// Watch database — many brands, mainstream and microbrand,
// a wide price range from budget to high-end
// ==============================

const sampleWatches = [
  // Budget / everyday
  { id: 1, brand: "Casio", model: "G-Shock DW5600", price: 60 },
  { id: 2, brand: "Casio", model: "Duro Diver", price: 55 },
  { id: 3, brand: "Casio", model: "Edifice EQB", price: 180 },
  { id: 4, brand: "Timex", model: "Weekender", price: 45 },
  { id: 5, brand: "Timex", model: "Marlin Automatic", price: 230 },
  { id: 6, brand: "Orient", model: "Bambino", price: 150 },
  { id: 7, brand: "Orient", model: "Kamasu", price: 220 },
  { id: 8, brand: "Seiko", model: "SKX007", price: 250 },
  { id: 9, brand: "Seiko", model: "5 Sports SNK", price: 100 },
  { id: 10, brand: "Seiko", model: "Alpinist", price: 500 },

  // Budget dive-watch microbrands
  { id: 11, brand: "WatchDives", model: "WD SUB Homage", price: 130 },
  { id: 12, brand: "Steeldive", model: "SD1953", price: 90 },
  { id: 13, brand: "San Martin", model: "SN0121 Diver", price: 220 },
  { id: 14, brand: "Islander", model: "Automatic Diver", price: 210 },

  // Mid-range microbrands / enthusiast favorites
  { id: 15, brand: "Baltic", model: "Aquascaphe", price: 650 },
  { id: 16, brand: "Traska", model: "Freediver", price: 700 },
  { id: 17, brand: "Halios", model: "Seaforth", price: 750 },
  { id: 18, brand: "Boldr", model: "Odyssey Diver", price: 400 },
  { id: 19, brand: "Monta", model: "Oceanking", price: 2200 },
  { id: 20, brand: "Christopher Ward", model: "C60 Trident", price: 900 },
  { id: 21, brand: "Nodus", model: "Retrospect", price: 600 },
  { id: 22, brand: "Formex", model: "Essence Leggera", price: 1600 },
  { id: 23, brand: "Lorier", model: "Neptune", price: 550 },
  { id: 24, brand: "Kurono Tokyo", model: "Anemone", price: 3800 },

  // Established / higher-end brands
  { id: 25, brand: "Grand Seiko", model: "SBGA211", price: 5800 },
  { id: 26, brand: "Tudor", model: "Black Bay 58", price: 3900 },
  { id: 27, brand: "Tudor", model: "Pelagos", price: 4500 },
  { id: 28, brand: "Omega", model: "Speedmaster", price: 6500 },
  { id: 29, brand: "Omega", model: "Seamaster", price: 5200 },
  { id: 30, brand: "Zenith", model: "Chronomaster", price: 8900 },
  { id: 31, brand: "IWC", model: "Mark XX", price: 7300 },
  { id: 32, brand: "Cartier", model: "Tank Must", price: 3200 },
  { id: 33, brand: "Rolex", model: "Submariner", price: 10500 },
  { id: 34, brand: "Rolex", model: "Datejust", price: 9200 },
];

// ==============================
// State
// ==============================

let wantList = JSON.parse(localStorage.getItem("wantList")) || [];
let haveList = JSON.parse(localStorage.getItem("haveList")) || [];
let budget = Number(localStorage.getItem("budget")) || 0;
let commitment = JSON.parse(localStorage.getItem("commitment")) || null;
let currentDay = Number(localStorage.getItem("currentDay")) || 0;

// ==============================
// Element references
// ==============================

const wantListEl = document.getElementById("wantList");
const haveListEl = document.getElementById("haveList");
const wantTotalEl = document.getElementById("wantTotal");
const budgetInput = document.getElementById("budgetInput");

const vFace = document.getElementById("vFace");
const vMessage = document.getElementById("vMessage");
const lockedNotice = document.getElementById("lockedNotice");

const commitmentPanel = document.getElementById("commitmentPanel");
const commitWatchName = document.getElementById("commitWatchName");
const commitSaved = document.getElementById("commitSaved");
const commitTotal = document.getElementById("commitTotal");
const commitProgressFill = document.getElementById("commitProgressFill");
const depositBtn = document.getElementById("depositBtn");
const dailyAmountLabel = document.getElementById("dailyAmountLabel");
const commitStatusMsg = document.getElementById("commitStatusMsg");
const giveUpBtn = document.getElementById("giveUpBtn");

const setupOverlay = document.getElementById("setupOverlay");
const setupWatchName = document.getElementById("setupWatchName");
const dailyDepositInput = document.getElementById("dailyDepositInput");
const setupDaysEstimate = document.getElementById("setupDaysEstimate");
const confirmCommitBtn = document.getElementById("confirmCommitBtn");
const cancelSetupBtn = document.getElementById("cancelSetupBtn");

const nextDayBtn = document.getElementById("nextDayBtn");
const dayCounterLabel = document.getElementById("dayCounterLabel");

const dailyRecsGrid = document.getElementById("dailyRecsGrid");

budgetInput.value = budget || "";

let watchBeingCommitted = null;

// ==============================
// Saving
// ==============================

function saveState() {
  localStorage.setItem("wantList", JSON.stringify(wantList));
  localStorage.setItem("haveList", JSON.stringify(haveList));
  localStorage.setItem("budget", budget);
  localStorage.setItem("commitment", JSON.stringify(commitment));
  localStorage.setItem("currentDay", currentDay);
}

// ==============================
// Budget lock logic
// ==============================

function getUncommittedWantTotal() {
  return wantList
    .filter((w) => !commitment || w.id !== commitment.watch.id)
    .reduce((sum, w) => sum + w.price, 0);
}

function isLocked() {
  if (budget <= 0) return false;
  return getUncommittedWantTotal() > budget;
}

// ==============================
// V (the companion)
// ==============================

function setVState(state, message) {
  vFace.classList.remove("happy", "sad", "thinking");
  if (state) vFace.classList.add(state);
  vMessage.textContent = message;
}

function vThinkThenSay(state, message, delayMs = 3000) {
  setVState("thinking", "V is thinking...");
  depositBtn.disabled = true;
  setTimeout(() => {
    setVState(state, message);
    depositBtn.disabled = false;
  }, delayMs);
}

// ==============================
// Rendering
// ==============================

function renderWatchCard(watch, listType) {
  const card = document.createElement("div");
  card.className = "watch-card";
  card.innerHTML = `
    <p class="brand-tag">${watch.brand}</p>
    <h4>${watch.model}</h4>
    <p>$${watch.price.toLocaleString()}</p>
  `;

  if (listType === "search") {
    const wantBtn = document.createElement("button");
    wantBtn.textContent = "+ Want";
    wantBtn.disabled = isLocked();
    wantBtn.onclick = () => addToList(watch, "want");
    card.appendChild(wantBtn);

    const haveBtn = document.createElement("button");
    haveBtn.textContent = "+ Have";
    haveBtn.onclick = () => addToList(watch, "have");
    card.appendChild(haveBtn);
  } else if (listType === "want") {
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.onclick = () => removeFromList(watch.id, "want");
    card.appendChild(removeBtn);

    const isThisCommitted = commitment && commitment.watch.id === watch.id;
    const commitBtn = document.createElement("button");
    commitBtn.textContent = isThisCommitted ? "Saving for this" : "Commit & save toward this";
    commitBtn.disabled = isThisCommitted || (commitment && !isThisCommitted);
    commitBtn.onclick = () => openSetupModal(watch);
    card.appendChild(commitBtn);
  } else if (listType === "have") {
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.onclick = () => removeFromList(watch.id, "have");
    card.appendChild(removeBtn);
  }

  return card;
}

function renderLists() {
  wantListEl.innerHTML = "";
  wantList.forEach((watch) => wantListEl.appendChild(renderWatchCard(watch, "want")));

  haveListEl.innerHTML = "";
  haveList.forEach((watch) => haveListEl.appendChild(renderWatchCard(watch, "have")));

  const total = wantList.reduce((sum, w) => sum + w.price, 0);
  wantTotalEl.textContent = `$${total.toLocaleString()}`;

  lockedNotice.classList.toggle("hidden", !isLocked());
  renderCommitmentPanel();
  renderSearch(searchInput.value);
  renderDailyRecs();

  dayCounterLabel.textContent = `Day ${currentDay}`;
}

function renderCommitmentPanel() {
  if (!commitment) {
    commitmentPanel.classList.add("hidden");
    if (!isLocked()) setVState(null, "Hey, I'm V. Set a budget and start browsing.");
    return;
  }

  commitmentPanel.classList.remove("hidden");
  commitWatchName.textContent = `${commitment.watch.brand} ${commitment.watch.model}`;
  commitSaved.textContent = `$${commitment.saved.toLocaleString()}`;
  commitTotal.textContent = `$${commitment.watch.price.toLocaleString()}`;
  dailyAmountLabel.textContent = commitment.dailyAmount;

  const percent = Math.min(100, (commitment.saved / commitment.watch.price) * 100);
  commitProgressFill.style.width = percent + "%";

  depositBtn.disabled = commitment.depositedToday;
  depositBtn.textContent = commitment.depositedToday
    ? "Already deposited today"
    : `Deposit today's $${commitment.dailyAmount}`;

  if (commitment.missedDays >= 10) {
    giveUpBtn.classList.remove("hidden");
    commitStatusMsg.textContent = `It's been 10 days without a deposit. No pressure — you can let this one go.`;
  } else if (commitment.missedDays > 0) {
    giveUpBtn.classList.add("hidden");
    commitStatusMsg.textContent = `Missed days: ${commitment.missedDays}. V isn't thrilled, but there's still time.`;
  } else {
    giveUpBtn.classList.add("hidden");
    commitStatusMsg.textContent = "";
  }
}

// A small, capped feed — 3 to 5 watches, deliberately not endless
function renderDailyRecs() {
  dailyRecsGrid.innerHTML = "";
  const shuffled = [...sampleWatches].sort(() => Math.random() - 0.5);
  const picks = shuffled.slice(0, 3 + Math.floor(Math.random() * 3)); // 3–5
  picks.forEach((watch) => {
    dailyRecsGrid.appendChild(renderWatchCard(watch, "search"));
  });
}

// ==============================
// List management
// ==============================

function addToList(watch, listType) {
  if (listType === "want" && isLocked()) return;
  if (listType === "want") {
    if (!wantList.find((w) => w.id === watch.id)) wantList.push(watch);
  } else {
    if (!haveList.find((w) => w.id === watch.id)) haveList.push(watch);
  }
  saveState();
  renderLists();
}

function removeFromList(id, listType) {
  if (listType === "want") {
    wantList = wantList.filter((w) => w.id !== id);
    if (commitment && commitment.watch.id === id) commitment = null;
  } else {
    haveList = haveList.filter((w) => w.id !== id);
  }
  saveState();
  renderLists();
}

// ==============================
// Commitment / deposit flow
// ==============================

function openSetupModal(watch) {
  watchBeingCommitted = watch;
  setupWatchName.textContent = `Saving toward: ${watch.brand} ${watch.model} ($${watch.price.toLocaleString()})`;
  dailyDepositInput.value = "";
  setupDaysEstimate.textContent = "";
  setupOverlay.classList.remove("hidden");
}

dailyDepositInput.addEventListener("input", () => {
  const amount = Number(dailyDepositInput.value);
  if (amount > 0 && watchBeingCommitted) {
    const days = Math.ceil(watchBeingCommitted.price / amount);
    setupDaysEstimate.textContent = `That's about ${days} day${days === 1 ? "" : "s"} to save it up.`;
  } else {
    setupDaysEstimate.textContent = "";
  }
});

confirmCommitBtn.addEventListener("click", () => {
  const amount = Number(dailyDepositInput.value);
  if (!amount || amount <= 0) return;

  commitment = {
    watch: watchBeingCommitted,
    dailyAmount: amount,
    saved: 0,
    missedDays: 0,
    depositedToday: false,
    dayStarted: currentDay,
  };

  setupOverlay.classList.add("hidden");
  saveState();
  renderLists();
});

cancelSetupBtn.addEventListener("click", () => {
  setupOverlay.classList.add("hidden");
  watchBeingCommitted = null;
});

depositBtn.addEventListener("click", () => {
  if (!commitment || commitment.depositedToday) return;

  commitment.saved += commitment.dailyAmount;
  commitment.depositedToday = true;
  commitment.missedDays = 0;

  const finished = commitment.saved >= commitment.watch.price;
  saveState();

  vThinkThenSay(
    "happy",
    finished
      ? `You did it! ${commitment.watch.brand} ${commitment.watch.model} is yours.`
      : "Nice — that's real progress. See you tomorrow.",
    3000
  );

  if (finished) {
    haveList.push(commitment.watch);
    wantList = wantList.filter((w) => w.id !== commitment.watch.id);
    commitment = null;
    saveState();
  }

  setTimeout(renderLists, 3100);
});

giveUpBtn.addEventListener("click", () => {
  vThinkThenSay("sad", "That's okay. Not every watch is the right one right now. Let's find one that actually fits.", 3000);
  commitment = null;
  saveState();
  setTimeout(renderLists, 3100);
});

// ==============================
// Day simulation (testing tool only)
// ==============================

nextDayBtn.addEventListener("click", () => {
  currentDay++;

  if (commitment) {
    if (!commitment.depositedToday) {
      commitment.missedDays++;
      vThinkThenSay("sad", "You didn't deposit yesterday. No judgment — just noticing.", 2500);
    } else {
      vThinkThenSay("happy", "New day. Ready to keep going?", 2500);
    }
    commitment.depositedToday = false;
  }

  saveState();
  setTimeout(renderLists, 2600);
});

// ==============================
// Other wiring
// ==============================

budgetInput.addEventListener("change", (e) => {
  budget = Number(e.target.value) || 0;
  saveState();
  renderLists();
});

// ==============================
// Initial render
// ==============================

renderLists();