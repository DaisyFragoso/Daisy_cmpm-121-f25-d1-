//Live share who was here
// Jayden Ramirez
// Diego Tiscareno

import cookiebuttonImgUrl from "./cookie.png";
import "./style.css";

document.body.innerHTML = `
  <p>🍪 <span id="counter">0</span> Cookies clicked! </p>
`;

const button = document.createElement("button");
button.innerHTML =
  `<img src="${cookiebuttonImgUrl}" alt="button icon" style="width:40px; height:40px;" />`;
button.style.padding = "0.5rem 1rem";

document.body.appendChild(button);

let count = 0;
const counter = document.getElementById("counter") as HTMLSpanElement | null;

button.addEventListener("click", () => {
  if (!counter) return;
  count++;
  counter.textContent = count.toString();
});
