//Live share who was here
// Jayden Ramirez
// Diego Tiscareno

//note last commit step 6 

import cookiebuttonImgUrl from "./cookie.png";
import "./style.css";

//initial stuff
document.body.innerHTML = `
  <p>🍪 <span id="counter">0</span> Cookies collected!</p>
  <p>Rate: <span id="rate">0.0</span> cookies/sec</p>
  <p>
    Upgrades owned:<br>
    Milk: <span id="countA">0</span><br>
    Orange Juice: <span id="countB">0</span><br>
    Food: <span id="countC">0</span>
  </p>
`;

//inital button
const button = document.createElement("button");
button.innerHTML =
  `<img src="${cookiebuttonImgUrl}" alt="button icon" style="width:40px; height:40px;" />`;
button.style.padding = "0.5rem 1rem";
document.body.appendChild(button);

//A: milk purchase button
const upgradeAButton = document.createElement("button");
upgradeAButton.textContent = "🥛 want milk? (Cost 10) (+1 per second)";
upgradeAButton.disabled = true;
document.body.appendChild(upgradeAButton);

//B: Orange Juice
const upgradeBButton = document.createElement("button");
upgradeBButton.textContent = " want Orange Juice? (Cost 100) (+2 per second)";
upgradeBButton.disabled = true;
document.body.appendChild(upgradeBButton);

//C: Food
const upgradeCButton = document.createElement("button");
upgradeCButton.textContent = "Upgrade C: Cost 1000 (+50/sec)";
upgradeCButton.disabled = true;
document.body.appendChild(upgradeCButton);

let count = 0;

let growthRate = 0;

let countA = 0;
let countB = 0;
let countC = 0;

//amount of times items been ordered
const COST_A = 10;
const COST_B = 100;
const COST_C = 1000;

//rates of upgrade
const RATE_A = 0.1;
const RATE_B = 2.0;
const RATE_C = 50.0;

//status of elements
const counter = document.getElementById("counter") as HTMLSpanElement;
const rateSpan = document.getElementById("rate") as HTMLSpanElement;
const countASpan = document.getElementById("countA") as HTMLSpanElement;
const countBSpan = document.getElementById("countB") as HTMLSpanElement;
const countCSpan = document.getElementById("countC") as HTMLSpanElement;

//update display
function updatecounterDisplayHelper() {
  counter.textContent = count.toFixed(1);
}

function updateRateDisplay() {
  rateSpan.textContent = growthRate.toFixed(1);
}

function updateUpgradeCountsDisplay() {
  countASpan.textContent = countA.toString();
  countBSpan.textContent = countB.toString();
  countCSpan.textContent = countC.toString();
}

function updateUpgradeButtonsEnabled() {
  upgradeAButton.disabled = count < COST_A;
  upgradeBButton.disabled = count < COST_B;
  upgradeCButton.disabled = count < COST_C;
}

//inital button increase
button.addEventListener("click", () => {
  if (!counter) return;
  count++;
  updatecounterDisplayHelper();
  updateUpgradeButtonsEnabled();
});

//upgrade buttom handlers
upgradeAButton.addEventListener("click", () => {
  if (count >= COST_A) {
    count -= COST_A;
    growthRate += RATE_A;
    countA += 1;

    updatecounterDisplayHelper();
    updateRateDisplay();
    updateUpgradeCountsDisplay();
    updateUpgradeButtonsEnabled();
  }
});

upgradeBButton.addEventListener("click", () => {
  if (count >= COST_B) {
    count -= COST_B;
    growthRate += RATE_B;
    countB += 1;

    updatecounterDisplayHelper();
    updateRateDisplay();
    updateUpgradeCountsDisplay();
    updateUpgradeButtonsEnabled();
  }
});

upgradeCButton.addEventListener("click", () => {
  if (count >= COST_C) {
    count -= COST_C;
    growthRate += RATE_C;
    countC += 1;

    updatecounterDisplayHelper();
    updateRateDisplay();
    updateUpgradeCountsDisplay();
    updateUpgradeButtonsEnabled();
  }
});

//enables and disables the upgrade button
function upgradeEnableDisableHelper() {
  upgradeAButton.disabled = count < 10;
}

//step 4
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
