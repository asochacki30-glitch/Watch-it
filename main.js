// ==============================
// Page navigation
// ==============================

const navButtons = document.querySelectorAll(".nav-btn");
const pages = document.querySelectorAll(".page");

navButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetId = "page-" + btn.dataset.page;
    pages.forEach((page) => page.classList.toggle("hidden-page", page.id !== targetId));
    navButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

// ==============================
// Brand data — used ONLY for Discover (names + links) and Daily
// Recommendations. Wishlist/Watch Log entries are typed in by hand.
// ==============================

const brands = [
  { name: "Casio", url: "https://www.casio.com/us/watches/gshock/" },
  { name: "Timex", url: "https://www.timex.com/" },
  { name: "Orient", url: "https://www.orientwatchusa.com/" },
  { name: "Seiko", url: "https://www.seikousa.com/" },
  { name: "Citizen", url: "https://www.citizenwatch.com/" },
  { name: "Bulova", url: "https://www.bulova.com/" },
  { name: "Fossil", url: "https://www.fossil.com/" },
  { name: "Nixon", url: "https://www.nixon.com/" },
  { name: "Invicta", url: "https://www.invictawatch.com/" },
  { name: "WatchDives", url: "https://www.watchdives.com/" },
  { name: "San Martin", url: "https://sanmartinwatch.com/" },
  { name: "Islander", url: "https://www.islanderwatches.com/" },
  { name: "Maen", url: "https://maenwatches.com/" },
  { name: "Farer", url: "https://www.farer.com/" },
  { name: "Yema", url: "https://www.yema.com/" },
  { name: "Autodromo", url: "https://www.autodromo.com/" },
  { name: "Doxa", url: "https://www.doxawatches.com/" },
  { name: "Undone", url: "https://www.undone.com/" },
  { name: "Marathon", url: "https://www.marathonwatch.com/" },
  { name: "Zelos", url: "https://www.zelos-watches.com/" },
  { name: "Baltic", url: "https://baltic-watches.com/" },
  { name: "Traska", url: "https://www.traskawatches.com/" },
  { name: "Halios", url: "https://www.halioswatches.com/" },
  { name: "Boldr", url: "https://boldrsupply.co/" },
  { name: "Vaer", url: "https://vaerwatches.com/" },
  { name: "Nodus", url: "https://nodusgroup.com/" },
  { name: "Lorier", url: "https://lorierwatch.com/" },
  { name: "Monta", url: "https://montawatch.com/" },
  { name: "Formex", url: "https://www.formexwatch.com/" },
  { name: "Christopher Ward", url: "https://www.christopherward.com/" },
  { name: "Kurono Tokyo", url: "https://www.kuronotokyo.com/" },
  { name: "Tissot", url: "https://www.tissotwatches.com/" },
  { name: "Hamilton", url: "https://www.hamiltonwatch.com/" },
  { name: "Longines", url: "https://www.longines.com/" },
  { name: "Grand Seiko", url: "https://www.grand-seiko.com/us-en" },
  { name: "Tudor", url: "https://www.tudorwatch.com/" },
  { name: "Omega", url: "https://www.omegawatches.com/" },
  { name: "Zenith", url: "https://www.zenith-watches.com/" },
  { name: "IWC", url: "https://www.iwc.com/" },
  { name: "Cartier", url: "https://www.cartier.com/" },
  { name: "Breitling", url: "https://www.breitling.com/" },
  { name: "TAG Heuer", url: "https://www.tagheuer.com/" },
  { name: "Rolex", url: "https://www.rolex.com/" },
];

// Suggested watches for the Daily Recommendations feed (brand + a
// representative model/price, so it's still useful as a feed)
const sampleWatches = [
  { id: 1, brand: "Casio", model: "G-Shock DW5600", price: 60 },
  { id: 2, brand: "Seiko", model: "5 Sports SNK", price: 100 },
  { id: 3, brand: "Orient", model: "Bambino", price: 150 },
  { id: 4, brand: "Maen", model: "Hudson", price: 795 },
  { id: 5, brand: "Baltic", model: "Aquascaphe", price: 650 },
  { id: 6, brand: "Doxa", model: "Sub 200", price: 1590 },
  { id: 7, brand: "Tudor", model: "Black Bay 58", price: 3900 },
  { id: 8, brand: "Rolex", model: "Submariner", price: 10500 },
  { id: 9, brand: "Christopher Ward", model: "C60 Trident", price: 900 },
  { id: 10, brand: "Marathon", model: "GSAR Quartz", price: 750 },
];

// ==============================
// Render Discover — literally just names
// ==============================

const brandDirectory = document.getElementById("brandDirectory");

function renderBrandDirectory() {
  brandDirectory.innerHTML = "";
  brands.forEach((brand) => {
    const link = document.createElement("a");
    link.className = "brand-name-link";
    link.href = brand.url;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = brand.name;
    brandDirectory.appendChild(link);
  });
}

// ==============================
// State
// ==============================

let wantList = JSON.parse(localStorage.getItem("wantList")) || [];
let haveList = JSON.parse(localStorage.getItem("haveList")) || [];
let budget = Number(localStorage.getItem("budget")) || 0;
let commitment = JSON.parse(localStorage.getItem("commitment")) || null;
let currentDay = Number(localStorage.getItem("currentDay")) || 0;
let nextId = Number(localStorage.getItem("nextId")) || 1000;

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

const wantBrandInput = document.getElementById("wantBrandInput");
const wantModelInput = document.getElementById("wantModelInput");
const wantPriceInput = document.getElementById("wantPriceInput");
const addWantBtn = document.getElementById("addWantBtn");

const haveBrandInput = document.getElementById("haveBrandInput");
const haveModelInput = document.getElementById("haveModelInput");
const havePriceInput = document.getElementById("havePriceInput");
const addHaveBtn = document.getElementById("addHaveBtn");

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
  localStorage.setItem("nextId", nextId);
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

function vThinkThenSay(state, message, delayMs = 1400) {
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
    wantBtn.onclick = () => addWatchToList({ ...watch, id: nextId++ }, "want");
    card.appendChild(wantBtn);

    const haveBtn = document.createElement("button");
    haveBtn.textContent = "+ Have";
    haveBtn.onclick = () => addWatchToList({ ...watch, id: nextId++ }, "have");
    card.appendChild(haveBtn);
  } else if (listType === "want") {
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.onclick = () => removeFromList(watch.id, "want");
    card.appendChild(removeBtn);

    const isThisCommitted = commitment && commitment.watch.id === watch.id;
    const commitBtn = document.createElement("button");
    commitBtn.textContent = isThisCommitted ? "Saving for this" : "Start Saving";
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
  renderDailyRecs();

  dayCounterLabel.textContent = `Day ${currentDay}`;

  // Keep the add-to-wishlist form disabled while locked, same rule
  // as the +Want buttons elsewhere
  addWantBtn.disabled = isLocked();
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

function renderDailyRecs() {
  dailyRecsGrid.innerHTML = "";
  const shuffled = [...sampleWatches].sort(() => Math.random() - 0.5);
  const picks = shuffled.slice(0, 3 + Math.floor(Math.random() * 3));
  picks.forEach((watch) => dailyRecsGrid.appendChild(renderWatchCard(watch, "search")));
}

// ==============================
// List management
// ==============================

function addWatchToList(watch, listType) {
  if (listType === "want" && isLocked()) return;
  if (listType === "want") {
    wantList.push(watch);
  } else {
    haveList.push(watch);
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
// Manual "add a watch" forms (Wishlist / Watch Log)
// ==============================

addWantBtn.addEventListener("click", () => {
  const brand = wantBrandInput.value.trim();
  const model = wantModelInput.value.trim();
  const price = Number(wantPriceInput.value);

  if (!brand || !model || !price || price <= 0) return;
  if (isLocked()) return;

  addWatchToList({ id: nextId++, brand, model, price }, "want");

  wantBrandInput.value = "";
  wantModelInput.value = "";
  wantPriceInput.value = "";
});

addHaveBtn.addEventListener("click", () => {
  const brand = haveBrandInput.value.trim();
  const model = haveModelInput.value.trim();
  const price = Number(havePriceInput.value) || 0;

  if (!brand || !model) return;

  addWatchToList({ id: nextId++, brand, model, price }, "have");

  haveBrandInput.value = "";
  haveModelInput.value = "";
  havePriceInput.value = "";
});

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
    1400
  );

  if (finished) {
    haveList.push(commitment.watch);
    wantList = wantList.filter((w) => w.id !== commitment.watch.id);
    commitment = null;
    saveState();
  }

  setTimeout(renderLists, 1500);
});

giveUpBtn.addEventListener("click", () => {
  vThinkThenSay("sad", "That's okay. Not every watch is the right one right now. Let's find one that actually fits.", 1400);
  commitment = null;
  saveState();
  setTimeout(renderLists, 1500);
});

// ==============================
// Day simulation (testing only)
// ==============================

nextDayBtn.addEventListener("click", () => {
  currentDay++;

  if (commitment) {
    if (!commitment.depositedToday) {
      commitment.missedDays++;
      vThinkThenSay("sad", "You didn't deposit yesterday. No judgment — just noticing.", 1200);
    } else {
      vThinkThenSay("happy", "New day. Ready to keep going?", 1200);
    }
    commitment.depositedToday = false;
  }

  saveState();
  setTimeout(renderLists, 1300);
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

renderBrandDirectory();
renderLists();