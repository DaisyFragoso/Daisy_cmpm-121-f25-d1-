//Live share who was here
// Jayden Ramirez
// Diego Tiscareno

import cookiebuttonImgUrl from "./cookie.png";
import "./style.css";

document.body.innerHTML = `
  <p>🍪 <span id="counter">0</span> Cookies collected! </p>
`;

const button = document.createElement("button");
button.innerHTML =
  `<img src="${cookiebuttonImgUrl}" alt="button icon" style="width:40px; height:40px;" />`;
button.style.padding = "0.5rem 1rem";

document.body.appendChild(button);

let count = 0;
const counter = document.getElementById("counter") as HTMLSpanElement;

function updatecounterDisplayHelper() {
  counter.textContent = count.toFixed(1);
}

button.addEventListener("click", () => {
  if (!counter) return;
  count++;
  updatecounterDisplayHelper();
});

//step 4
let lastTimestamp: number | null = null;

function animate(timestamp: number) {
  if (lastTimestamp === null) {
    lastTimestamp = timestamp;
  } else {
    const deltaMs = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    const deltaSeconds = deltaMs / 1000;

    count += deltaSeconds;
    updatecounterDisplayHelper();
  }

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
