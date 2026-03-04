//Live share who was here
// Jayden Ramirez
// Diego Tiscareno

import cookiebuttonImgUrl from "./dude.png";
import "./style.css";

// ====================
// Initial setup
// ====================
document.body.innerHTML = `
  <p>🍪 <span id="counter">0</span> Oscar the Grouch growth (cms)!</p>
  <p>Rate: <span id="rate">0.0</span> growth/sec (in cms)</p>
  <p>
    Upgrades owned:<br>
    Milk: <span id="milkCount">0</span><br>
    Orange Juice: <span id="juiceCount">0</span><br>
    Food: <span id="foodCount">0</span>
  </p>
`;

// ====================
// Initial button
// ====================
const button = document.createElement("button");
button.innerHTML =
  `<img src="${cookiebuttonImgUrl}" alt="button icon" style="width:200px; height:200px;" />`;
button.style.padding = "0.5rem 1rem";
document.body.appendChild(button);

// ====================
// Milk purchase button
// ====================
const upgradeAButton = document.createElement("button");
upgradeAButton.textContent = "🥛 want milk? (Cost 10.0) (+0.1 per second)";
upgradeAButton.disabled = true;
document.body.appendChild(document.createElement("br"));
document.body.appendChild(document.createElement("br"));
document.body.appendChild(upgradeAButton);

// ====================
// Orange Juice button
// ====================
const upgradeBButton = document.createElement("button");
upgradeBButton.textContent = "🍊 Orange Juice: (Cost 100.0) (+2 per second)";
upgradeBButton.disabled = true;
document.body.appendChild(document.createElement("br"));
document.body.appendChild(upgradeBButton);

// ====================
// Food purchase button
// ====================
const upgradeCButton = document.createElement("button");
upgradeCButton.textContent = "🍔 Food: (Cost 1000.0) (+50 per second)";
upgradeCButton.disabled = true;
document.body.appendChild(document.createElement("br"));
document.body.appendChild(upgradeCButton);


// ================================
// Constants count and growth rate
// ================================
let count = 0;
let growthRate = 0;

// ================================
// Constants game variable
// ================================
let milkCount = 0;
let juiceCount = 0;
let foodCount = 0;

// ================================
// Constants game cost
// ================================
let milkCost = 10;
let juiceCost = 100;
let foodCost = 1000;

// ====================
// Rates of upgrade
// ====================
const milkRate = 0.1;
const juiceRate = 2.0;
const foodRate = 50.0;

// ====================
// Status of elements
// ====================
const counter = document.getElementById("counter") as HTMLSpanElement;
const rateSpan = document.getElementById("rate") as HTMLSpanElement;
const milkCountSpan = document.getElementById("milkCount") as HTMLSpanElement;
const juiceCountSpan = document.getElementById("juiceCount") as HTMLSpanElement;
const foodCountSpan = document.getElementById("foodCount") as HTMLSpanElement;

// ====================
// Update displays
// ====================
function updatecounterDisplayHelper() {
  counter.textContent = count.toFixed(1);
}
function updateRateDisplay() {
  rateSpan.textContent = growthRate.toFixed(1);
}
function updateUpgradeCountsDisplay() {
  milkCountSpan.textContent = milkCount.toString();
  juiceCountSpan.textContent = juiceCount.toString();
  foodCountSpan.textContent = foodCount.toString();
}
function updateUpgradeButtonsEnabled() {
  upgradeAButton.disabled = count < milkCost;
  upgradeBButton.disabled = count < juiceCost;
  upgradeCButton.disabled = count < foodCost;
}
function updateUpgradeButtonText() {
  upgradeAButton.textContent = `🥛 want milk?: (Cost ${
    milkCost.toFixed(1)
  }) (+0.1 per second)`;
  upgradeBButton.textContent = `🍊 Orange Juice: (Cost ${
    juiceCost.toFixed(1)
  }) (+2 per second)`;
  upgradeCButton.textContent = `🍔 Food: (Cost ${
    foodCost.toFixed(1)
  }) (+50 per second)`;
}

// =============================
// Inital image button increase
// =============================
button.addEventListener("click", () => {
  if (!counter) return;
  count++;
  updatecounterDisplayHelper();
  updateUpgradeButtonsEnabled();
});

// =============================
// Upgrade buttom handlers
// =============================
upgradeAButton.addEventListener("click", () => {
  if (count >= milkCost) {
    count -= milkCost;
    growthRate += milkRate;
    milkCount += 1;

    milkCost *= 1.15;

    updatecounterDisplayHelper();
    updateRateDisplay();
    updateUpgradeCountsDisplay();
    updateUpgradeButtonsEnabled();
    updateUpgradeButtonText();
  }
});
upgradeBButton.addEventListener("click", () => {
  if (count >= juiceCost) {
    count -= juiceCost;
    growthRate += juiceRate;
    juiceCount += 1;

    juiceCost *= 1.15;

    updatecounterDisplayHelper();
    updateRateDisplay();
    updateUpgradeCountsDisplay();
    updateUpgradeButtonsEnabled();
    updateUpgradeButtonText();
  }
});
upgradeCButton.addEventListener("click", () => {
  if (count >= foodCost) {
    count -= foodCost;
    growthRate += foodRate;
    foodCount += 1;

    foodCost *= 1.15;

    updatecounterDisplayHelper();
    updateRateDisplay();
    updateUpgradeCountsDisplay();
    updateUpgradeButtonsEnabled();
    updateUpgradeButtonText();
  }
});

// ==========================================
// enables and disables the upgrade button
// ==========================================
function upgradeEnableDisableHelper() {
  upgradeAButton.disabled = count < 10;
}

let lastTimestamp: number | null = null;

function animate(timestamp: number) {
  if (lastTimestamp === null) {
    lastTimestamp = timestamp;
  } else {
    const deltaMs = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    const deltaSeconds = deltaMs / 1000;

    count += growthRate * deltaSeconds;

    updatecounterDisplayHelper();
    upgradeEnableDisableHelper();
    updateRateDisplay();
    updateUpgradeCountsDisplay();
    updateUpgradeButtonsEnabled();
  }

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
