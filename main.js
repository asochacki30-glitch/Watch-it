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
// Discover / filter
// ==============================

const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

function renderSearch(query) {
  searchResults.innerHTML = "";
  const list = !query
    ? sampleWatches
    : sampleWatches.filter((w) =>
        `${w.brand} ${w.model}`.toLowerCase().includes(query.toLowerCase())
      );
  list.forEach((watch) => searchResults.appendChild(renderWatchCard(watch, "search")));
}

searchInput.addEventListener("input", (e) => renderSearch(e.target.value));

// ==============================
// Watch database
// ==============================

const sampleWatches = [
  { id: 1, brand: "Casio", model: "G-Shock DW5600", price: 60, url: "https://www.casio.com/us/watches/gshock/" },
  { id: 2, brand: "Casio", model: "Edifice EQB", price: 180, url: "https://www.casio.com/us/watches/edifice/" },
  { id: 3, brand: "Timex", model: "Weekender", price: 45, url: "https://www.timex.com/" },
  { id: 4, brand: "Timex", model: "Marlin Automatic", price: 230, url: "https://www.timex.com/" },
  { id: 5, brand: "Orient", model: "Bambino", price: 150, url: "https://www.orientwatchusa.com/" },
  { id: 6, brand: "Orient", model: "Kamasu", price: 220, url: "https://www.orientwatchusa.com/" },
  { id: 7, brand: "Seiko", model: "5 Sports SNK", price: 100, url: "https://www.seikousa.com/" },
  { id: 8, brand: "Seiko", model: "SKX-style Prospex", price: 300, url: "https://www.seikousa.com/" },
  { id: 9, brand: "Citizen", model: "Eco-Drive Chandler", price: 200, url: "https://www.citizenwatch.com/" },
  { id: 10, brand: "Bulova", model: "Marine Star", price: 300, url: "https://www.bulova.com/" },
  { id: 11, brand: "Fossil", model: "Grant Chronograph", price: 155, url: "https://www.fossil.com/" },
  { id: 12, brand: "Nixon", model: "51-30", price: 350, url: "https://www.nixon.com/" },
  { id: 13, brand: "Invicta", model: "Pro Diver", price: 90, url: "https://www.invictawatch.com/" },
  { id: 14, brand: "WatchDives", model: "WD1967 Diver", price: 160, url: "https://www.watchdives.com/" },
  { id: 15, brand: "San Martin", model: "SN0121 Diver", price: 220, url: "https://sanmartinwatch.com/" },
  { id: 16, brand: "Islander", model: "Automatic Diver", price: 210, url: "https://www.islanderwatches.com/" },
  { id: 41, brand: "Maen", model: "Hudson", price: 795, url: "https://maenwatches.com/" },
  { id: 42, brand: "Farer", model: "Aqua Compressor", price: 1450, url: "https://www.farer.com/" },
  { id: 43, brand: "Yema", model: "Superman Heritage", price: 750, url: "https://www.yema.com/" },
  { id: 44, brand: "Autodromo", model: "Group B", price: 895, url: "https://www.autodromo.com/" },
  { id: 45, brand: "Doxa", model: "Sub 200", price: 1590, url: "https://www.doxawatches.com/" },
  { id: 46, brand: "Undone", model: "Basecamp", price: 420, url: "https://www.undone.com/" },
  { id: 47, brand: "Marathon", model: "GSAR Quartz", price: 750, url: "https://www.marathonwatch.com/" },
  { id: 48, brand: "Zelos", model: "Mako", price: 550, url: "https://www.zelos-watches.com/" },
  { id: 17, brand: "Baltic", model: "Aquascaphe", price: 650, url: "https://baltic-watches.com/" },
  { id: 18, brand: "Traska", model: "Freediver", price: 700, url: "https://www.traskawatches.com/" },
  { id: 19, brand: "Halios", model: "Seaforth", price: 750, url: "https://www.halioswatches.com/" },
  { id: 20, brand: "Boldr", model: "Odyssey Diver", price: 400, url: "https://boldrsupply.co/" },
  { id: 21, brand: "Vaer", model: "D5 Field Diver", price: 300, url: "https://vaerwatches.com/" },
  { id: 22, brand: "Nodus", model: "Retrospect", price: 600, url: "https://nodusgroup.com/" },
  { id: 23, brand: "Lorier", model: "Neptune", price: 550, url: "https://lorierwatch.com/" },
  { id: 24, brand: "Monta", model: "Oceanking", price: 2200, url: "https://montawatch.com/" },
  { id: 25, brand: "Formex", model: "Essence Leggera", price: 1600, url: "https://www.formexwatch.com/" },
  { id: 26, brand: "Christopher Ward", model: "C60 Trident", price: 900, url: "https://www.christopherward.com/" },
  { id: 27, brand: "Kurono Tokyo", model: "Anemone", price: 3800, url: "https://www.kuronotokyo.com/" },
  { id: 28, brand: "Tissot", model: "PRX Powermatic 80", price: 495, url: "https://www.tissotwatches.com/" },
  { id: 29, brand: "Hamilton", model: "Khaki Field", price: 595, url: "https://www.hamiltonwatch.com/" },
  { id: 30, brand: "Longines", model: "Spirit", price: 2400, url: "https://www.longines.com/" },
  { id: 31, brand: "Grand Seiko", model: "SBGA211 Snowflake", price: 5800, url: "https://www.grand-seiko.com/us-en" },
  { id: 32, brand: "Tudor", model: "Black Bay 58", price: 3900, url: "https://www.tudorwatch.com/" },
  { id: 33, brand: "Omega", model: "Speedmaster Professional", price: 6500, url: "https://www.omegawatches.com/" },
  { id: 34, brand: "Zenith", model: "Chronomaster", price: 8900, url: "https://www.zenith-watches.com/" },
  { id: 35, brand: "IWC", model: "Mark XX", price: 7300, url: "https://www.iwc.com/" },
  { id: 36, brand: "Cartier", model: "Tank Must", price: 3200, url: "https://www.cartier.com/" },
  { id: 37, brand: "Breitling", model: "Navitimer", price: 8900, url: "https://www.breitling.com/" },
  { id: 38, brand: "TAG Heuer", model: "Carrera", price: 5300, url: "https://www.tagheuer.com/" },
  { id: 39, brand: "Rolex", model: "Submariner", price: 10500, url: "https://www.rolex.com/" },
  { id: 40, brand: "Rolex", model: "Datejust", price: 9200, url: "https://www.rolex.com/" },
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

function screenshotUrlFor(pageUrl) {
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(pageUrl)}?w=400&h=300`;
}

function renderWatchCard(watch, listType) {
  const card = document.createElement("div");
  card.className = "watch-card";

  card.innerHTML = `
    <img class="watch-photo" src="${screenshotUrlFor(watch.url)}" alt="${watch.brand} homepage" loading="lazy">
    <p class="brand-tag">${watch.brand}</p>
    <h4>${watch.model}</h4>
    <p>$${watch.price.toLocaleString()}</p>
    <a class="learn-more" href="${watch.url}" target="_blank" rel="noopener">Learn more &rarr;</a>
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

function renderDailyRecs() {
  dailyRecsGrid.innerHTML = "";
  const shuffled = [...sampleWatches].sort(() => Math.random() - 0.5);
  const picks = shuffled.slice(0, 3 + Math.floor(Math.random() * 3));
  picks.forEach((watch) => dailyRecsGrid.appendChild(renderWatchCard(watch, "search")));
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
// Day simulation (testing only)
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