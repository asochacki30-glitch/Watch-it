// ---- Sample watch data (stand-in for a real search source) ----
const sampleWatches = [
  { id: 1, brand: "Seiko", model: "SKX007", price: 250 },
  { id: 2, brand: "Seiko", model: "Alpinist", price: 500 },
  { id: 3, brand: "Omega", model: "Speedmaster", price: 6500 },
  { id: 4, brand: "Omega", model: "Seamaster", price: 5200 },
  { id: 5, brand: "Rolex", model: "Submariner", price: 10500 },
  { id: 6, brand: "Tudor", model: "Black Bay 58", price: 3900 },
  { id: 7, brand: "Casio", model: "G-Shock DW5600", price: 60 },
  { id: 8, brand: "Grand Seiko", model: "SBGA211", price: 5800 },
];

// ---- The reflections shown when the want list exceeds budget ----
// This is the actual "hammer" moment — the point where the tool
// stops being invisible and makes itself known.
const reflections = [
  "Looking at a nice watch gives you a little dopamine hit. But wanting something new every week can mean you've lost track of why you got into this.",
  "You can collect watches as an investment, or to resell — that's a real reason. But if you want a watch for yourself, it only means something once you've actually worn it enough times to build a real bond with it.",
  "This list keeps growing. Worth asking: are you adding watches you'd actually wear for years, or just chasing the next new thing?",
  "A watch you own and never wear isn't really yours yet. It's just an idea you paid for.",
];

// ---- Load saved state (or start fresh) ----
let wantList = JSON.parse(localStorage.getItem("wantList")) || [];
let haveList = JSON.parse(localStorage.getItem("haveList")) || [];
let budget = Number(localStorage.getItem("budget")) || 0;

// ---- Element references ----
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const wantListEl = document.getElementById("wantList");
const haveListEl = document.getElementById("haveList");
const wantTotalEl = document.getElementById("wantTotal");
const budgetInput = document.getElementById("budgetInput");
const overlay = document.getElementById("interruptOverlay");
const interruptQuote = document.getElementById("interruptQuote");
const dismissBtn = document.getElementById("dismissBtn");

budgetInput.value = budget || "";

// ---- Saving helpers ----
function saveState() {
  localStorage.setItem("wantList", JSON.stringify(wantList));
  localStorage.setItem("haveList", JSON.stringify(haveList));
  localStorage.setItem("budget", budget);
}

// ---- Rendering ----
function renderWatchCard(watch, listType) {
  const card = document.createElement("div");
  card.className = "watch-card";
  card.innerHTML = `
    <h4>${watch.brand} ${watch.model}</h4>
    <p>$${watch.price.toLocaleString()}</p>
  `;

  if (listType === "search") {
    const wantBtn = document.createElement("button");
    wantBtn.textContent = "+ Want";
    wantBtn.onclick = () => addToList(watch, "want");
    card.appendChild(wantBtn);

    const haveBtn = document.createElement("button");
    haveBtn.textContent = "+ Have";
    haveBtn.onclick = () => addToList(watch, "have");
    card.appendChild(haveBtn);
  } else {
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.onclick = () => removeFromList(watch.id, listType);
    card.appendChild(removeBtn);
  }

  return card;
}

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

function renderLists() {
  wantListEl.innerHTML = "";
  wantList.forEach((watch) => wantListEl.appendChild(renderWatchCard(watch, "want")));

  haveListEl.innerHTML = "";
  haveList.forEach((watch) => haveListEl.appendChild(renderWatchCard(watch, "have")));

  const total = wantList.reduce((sum, w) => sum + w.price, 0);
  wantTotalEl.textContent = `$${total.toLocaleString()}`;

  checkBudget(total);
}

// ---- List management ----
function addToList(watch, listType) {
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
  } else {
    haveList = haveList.filter((w) => w.id !== id);
  }
  saveState();
  renderLists();
}

// ---- The core behavioral mechanic ----
function checkBudget(total) {
  if (budget > 0 && total > budget) {
    const quote = reflections[Math.floor(Math.random() * reflections.length)];
    interruptQuote.textContent = quote;
    overlay.classList.remove("hidden");
  }
}

dismissBtn.addEventListener("click", () => {
  overlay.classList.add("hidden");
});

// ---- Wiring up events ----
searchInput.addEventListener("input", (e) => renderSearch(e.target.value));

budgetInput.addEventListener("change", (e) => {
  budget = Number(e.target.value) || 0;
  saveState();
  renderLists();
});

// ---- Initial render ----
renderLists();