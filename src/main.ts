//Live share who was here
// Jayden Ramirez
// Diego Tiscareno

// ====================
// Imports
// ====================
import biteSoundUrl from "./biteSound.mp3";
import cookiebuttonImgUrl from "./dude.png";
import greekImg from "./greekDinning.jpg";
import pinkDinning from "./pinkDinning.webp";
import redDinning from "./redDinning.jpg";
import "./style.css";

// ==================
// Constants Sound
// ==================
const eatSound = new Audio(biteSoundUrl);
eatSound.volume = 0.7;

// ================================
// Main game state Count/GrowthRate
// ================================
let count = 0;
let growthRate = 0;

// ====================
// Rates of upgrade (Name, image, rate, cost, Currentowned)
// & button / countSpan display
// ====================
// item
type Item = {
  name: string;
  emoji: string;
  rate: number;
  cost: number;
  owned: number;
  button?: HTMLButtonElement;
  countSpan?: HTMLSpanElement;
};

const availableItems: Item[] = [
  { name: "Milk", emoji: "🥛", rate: 0.1, cost: 10, owned: 0 },
  { name: "Orange Juice", emoji: "🍊", rate: 2.0, cost: 100, owned: 0 },
  { name: "Food", emoji: "🍔", rate: 50.0, cost: 1000, owned: 0 },
];

// ====================
// Initial page content
// ====================
document.body.innerHTML = `
  <p>🍪 <span id="counter">0</span> Oscar the Grouch growth (cms)!</p>
  <p>Rate: <span id="rate">0.0</span> growth/sec (in cms)</p>
  <p id="ownedSection">Upgrades owned:</p>
`;

// =======================
// Create upgrade counters
// =======================
for (const item of availableItems) {
  const line = document.createElement("div");
  line.innerHTML = `${item.name}: <span>0</span>`;
  document.body.appendChild(line);
  item.countSpan = line.querySelector("span") as HTMLSpanElement;
}

// ====================
// Initial button - Oscar the Grouch
// ====================
const button = document.createElement("button");
button.innerHTML =
  `<img src="${cookiebuttonImgUrl}" alt="button icon" style="width:200px; height:200px;" />`;
button.style.padding = "0.5rem 1rem";
document.body.appendChild(button);

// ======================
// Create upgrade buttons
// ======================
for (const item of availableItems) {
  const button = document.createElement("button");
  item.button = button;
  document.body.appendChild(document.createElement("br"));
  document.body.appendChild(button);

  button.addEventListener("click", () => {
    if (count >= item.cost) {
      eatSound.currentTime = 0;
      eatSound.play();
      count -= item.cost;
      growthRate += item.rate;
      item.owned += 1;
      item.cost *= 1.15;

      updateDisplays();
      checkBackground();
    }
  });
}

// ====================
// Background layer
// ====================
const bgDiv = document.createElement("div");
bgDiv.className = "app-bg";

// ====================
// Status of elements
// ====================
const counter = document.getElementById("counter") as HTMLSpanElement;
const rateSpan = document.getElementById("rate") as HTMLSpanElement;

// ==================================
// Update displays UI text & buttons
// ==================================
function updateDisplays() {
  counter.textContent = count.toFixed(1);
  rateSpan.textContent = growthRate.toFixed(1);

  for (const item of availableItems) {
    if (item.countSpan) {
      item.countSpan.textContent = item.owned.toString();
    }
    if (item.button) {
      item.button.disabled = count < item.cost;
      item.button.textContent = `${item.emoji} ${item.name}: (Cost ${
        item.cost.toFixed(1)
      }) (+${item.rate} per second)`;
    }
  }
}

// ================
// Player clicker
//=================
button.addEventListener("click", () => {
  count++;
  updateDisplays();
});

// =========================
// Background Image changer
//==========================
function checkBackground() {
  const milk = availableItems.find((item) => item.name === "Milk")?.owned ?? 0;
  const juice =
    availableItems.find((item) => item.name === "Orange Juice")?.owned ?? 0;
  const food = availableItems.find((item) => item.name === "Food")?.owned ?? 0;

  if (milk >= 1 && juice === 0 && food === 0) {
    bgDiv.style.backgroundImage = `url(${greekImg})`;
    document.body.appendChild(bgDiv);
  } else if (milk >= 1 && juice >= 1 && food === 0) {
    bgDiv.style.backgroundImage = `url(${pinkDinning})`;
    document.body.appendChild(bgDiv);
  } else if (milk >= 1 && juice >= 1 && food >= 1) {
    bgDiv.style.backgroundImage = `url(${redDinning})`;
    document.body.appendChild(bgDiv);
  } else {
    bgDiv.style.backgroundImage = "";
  }
}

updateDisplays();
