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

//cost of items been ordered
let costA = 10;
let costB = 100;
let costC = 1000;

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
  upgradeAButton.disabled = count < costA;
  upgradeBButton.disabled = count < costB;
  upgradeCButton.disabled = count < costC;
}
function updateUpgradeButtonText() {
  upgradeAButton.textContent = `🥛 Milk: Cost ${costA.toFixed(1)} (+0.1/sec)`;
  upgradeBButton.textContent = `🍊 Orange Juice: Cost ${
    costB.toFixed(1)
  } (+2/sec)`;
  upgradeCButton.textContent = `🍔 Food: Cost ${costC.toFixed(1)} (+50/sec)`;
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
  if (count >= costA) {
    count -= costA;
    growthRate += RATE_A;
    countA += 1;

    costA *= 1.15;

    updatecounterDisplayHelper();
    updateRateDisplay();
    updateUpgradeCountsDisplay();
    updateUpgradeButtonsEnabled();
    updateUpgradeButtonText();
  }
});

upgradeBButton.addEventListener("click", () => {
  if (count >= costB) {
    count -= costB;
    growthRate += RATE_B;
    countB += 1;

    costB *= 1.15;

    updatecounterDisplayHelper();
    updateRateDisplay();
    updateUpgradeCountsDisplay();
    updateUpgradeButtonsEnabled();
    updateUpgradeButtonText();
  }
});

upgradeCButton.addEventListener("click", () => {
  if (count >= costC) {
    count -= costC;
    growthRate += RATE_C;
    countC += 1;

    costC *= 1.15;

    updatecounterDisplayHelper();
    updateRateDisplay();
    updateUpgradeCountsDisplay();
    updateUpgradeButtonsEnabled();
    updateUpgradeButtonText();
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
