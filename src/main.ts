//Live share who was here
// Jayden Ramirez
// Diego Tiscareno

import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML = `
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
  <p>Counter: <span id="counter">0</span></p>

`;

// const button = document.getElementById('myButton') as HTMLButtonElement;

const button = document.createElement("button");
document.body.appendChild(button);
button.textContent = "🍪";
// button.style.backgroundColor = 'white';
button.style.color = "white";
