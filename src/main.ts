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
// Constants sound
// ==================
const eatSound = new Audio(biteSoundUrl);
eatSound.volume = 0.7;

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
let lastTimestamp: number | null = null;

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
// Background layer
// ====================
const bgDiv = document.createElement("div");
bgDiv.className = "app-bg";

// ====================
// Status of elements
// ====================
const counter = document.getElementById("counter") as HTMLSpanElement;
const rateSpan = document.getElementById("rate") as HTMLSpanElement;
const milkCountSpan = document.getElementById("milkCount") as HTMLSpanElement;
const juiceCountSpan = document.getElementById("juiceCount") as HTMLSpanElement;
const foodCountSpan = document.getElementById("foodCount") as HTMLSpanElement;

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
const upgradeMilkButton = document.createElement("button");
upgradeMilkButton.textContent = "🥛 want milk? (Cost 10.0) (+0.1 per second)";
upgradeMilkButton.disabled = true;
document.body.appendChild(document.createElement("br"));
document.body.appendChild(document.createElement("br"));
document.body.appendChild(upgradeMilkButton);

// ====================
// Orange Juice button
// ====================
const upgradeJuiceButton = document.createElement("button");
upgradeJuiceButton.textContent =
  "🍊 Orange Juice: (Cost 100.0) (+2 per second)";
upgradeJuiceButton.disabled = true;
document.body.appendChild(document.createElement("br"));
document.body.appendChild(upgradeJuiceButton);

// ====================
// Food purchase button
// ====================
const upgradeFoodButton = document.createElement("button");
upgradeFoodButton.textContent = "🍔 Food: (Cost 1000.0) (+50 per second)";
upgradeFoodButton.disabled = true;
document.body.appendChild(document.createElement("br"));
document.body.appendChild(upgradeFoodButton);

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
  upgradeMilkButton.disabled = count < milkCost;
  upgradeJuiceButton.disabled = count < juiceCost;
  upgradeFoodButton.disabled = count < foodCost;
}
function updateUpgradeButtonText() {
  upgradeMilkButton.textContent = `🥛 want milk?: (Cost ${
    milkCost.toFixed(1)
  }) (+0.1 per second)`;
  upgradeJuiceButton.textContent = `🍊 Orange Juice: (Cost ${
    juiceCost.toFixed(1)
  }) (+2 per second)`;
  upgradeFoodButton.textContent = `🍔 Food: (Cost ${
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

function checkBackground() {
  // milk >=1, juice = 0, food = 0
  if (milkCount >= 1 && juiceCount === 0 && foodCount === 0) {
    bgDiv.style.backgroundImage = `url(${greekImg})`;
    document.body.appendChild(bgDiv);
  } // milk >=1, juice >=1, food = 0
  else if (milkCount >= 1 && juiceCount >= 1 && foodCount === 0) {
    bgDiv.style.backgroundImage = `url(${pinkDinning})`;
    document.body.appendChild(bgDiv);
  } // milk >=1, juice >=1, food >=1
  else if (milkCount >= 1 && juiceCount >= 1 && foodCount >= 1) {
    bgDiv.style.backgroundImage = `url(${redDinning})`;
    document.body.appendChild(bgDiv);
  } else {
    bgDiv.style.backgroundImage = "";
  }
}

// =============================
// Upgrade buttom handlers
// =============================
upgradeMilkButton.addEventListener("click", () => {
  if (count >= milkCost) {
    eatSound.currentTime = 0;
    eatSound.play();

    count -= milkCost;
    growthRate += milkRate;
    milkCount += 1;

    milkCost *= 1.15;

    updatecounterDisplayHelper();
    updateRateDisplay();
    updateUpgradeCountsDisplay();
    updateUpgradeButtonsEnabled();
    updateUpgradeButtonText();
    checkBackground();
  }
});
upgradeJuiceButton.addEventListener("click", () => {
  if (count >= juiceCost) {
    eatSound.currentTime = 0;
    eatSound.play();

    count -= juiceCost;
    growthRate += juiceRate;
    juiceCount += 1;

    juiceCost *= 1.15;

    updatecounterDisplayHelper();
    updateRateDisplay();
    updateUpgradeCountsDisplay();
    updateUpgradeButtonsEnabled();
    updateUpgradeButtonText();
    checkBackground();
  }
});
upgradeFoodButton.addEventListener("click", () => {
  if (count >= foodCost) {
    eatSound.currentTime = 0;
    eatSound.play();

    count -= foodCost;
    growthRate += foodRate;
    foodCount += 1;

    foodCost *= 1.15;

    updatecounterDisplayHelper();
    updateRateDisplay();
    updateUpgradeCountsDisplay();
    updateUpgradeButtonsEnabled();
    updateUpgradeButtonText();
    checkBackground();
  }
});

// ==========================================
// Enables and disables the upgrade button
// ==========================================
function upgradeEnableDisableHelper() {
  upgradeMilkButton.disabled = count < 10;
}

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
