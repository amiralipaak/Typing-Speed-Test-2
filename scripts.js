const typingDiv = document.getElementById("typing");
const text = `In both the East and the West`;

const characters = text.split("").map((char) => {
  const span = document.createElement("span");
  span.innerText = char;
  typingDiv.appendChild(span);
  return span;
});

let cursorIndex = 0;
let cursorCharacter = characters[cursorIndex];
cursorCharacter.classList.add("cursor");

let startTime = null;
let endTime = null;

const keyListener = document.addEventListener("keydown", ({ key }) => {
  console.log(key);
  if (!startTime) {
    startTime = new Date();
  }
  if (key === cursorCharacter.innerText) {
    cursorCharacter.classList.remove("cursor");
    cursorCharacter.classList.add("done");
    cursorCharacter = characters[++cursorIndex];
  }
  if (cursorIndex >= characters.length) {
    endTime = new Date();
    const delta = endTime - startTime;
    const seconds = delta / 1000;
    const minutes = seconds / 60;
    const numberOfWords = text.split(" ").length;
    const wps = numberOfWords / seconds;
    const wpm = wps * 60.0;
    document.getElementById("stats").innerText = `wpm = ${parseInt(wpm)}`;
    document.removeEventListener("keydown", keyListener);
    return;
  }
  cursorCharacter.classList.add("cursor");
});
