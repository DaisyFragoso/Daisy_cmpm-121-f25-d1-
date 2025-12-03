//Live share who was here
// Jayden Ramirez
// Diego Tiscareno

import cookiebuttonImgUrl from "./cookie.png";
import "./style.css";

//initial stuff
document.body.innerHTML = `
  <p>🍪 <span id="counter">0</span> Cookies collected! </p>
`;

//inital button
const button = document.createElement("button");
button.innerHTML =
  `<img src="${cookiebuttonImgUrl}" alt="button icon" style="width:40px; height:40px;" />`;
button.style.padding = "0.5rem 1rem";
document.body.appendChild(button);

//milk purchase button
const upgradeButton = document.createElement("button");
upgradeButton.textContent = "🥛 want milk? (Cost 10) (+1 per second)";
upgradeButton.disabled = true;
document.body.appendChild(upgradeButton);

let count = 0;

let growthRate = 0;

const counter = document.getElementById("counter") as HTMLSpanElement;

//update display
function updatecounterDisplayHelper() {
  counter.textContent = count.toFixed(1);
}

//inital button increase
button.addEventListener("click", () => {
  if (!counter) return;
  count++;
  updatecounterDisplayHelper();
});

//milk upgrade button
upgradeButton.addEventListener("click", () => {
  if (count >= 10) {
    count -= 10;
    growthRate += 1;
    updatecounterDisplayHelper();
    upgradeEnableDisableHelper();
  }
});

//enables and disables the upgrade button
function upgradeEnableDisableHelper() {
  upgradeButton.disabled = count < 10;
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
  }

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
