const typingDiv = document.getElementById("typing");
const statsDiv = document.getElementById("stats");
const startGameBtn = document.getElementById("startGame");
const header = document.getElementById("header");

const pharagraphs = [
  `The Internet has revolutionized the computer and communications world like nothing before.`,
  `The invention of the telegraph, telephone, radio, and computer set the stage for this unprecedented integration of capabilities.`,
  `In both the East and the West, coinage proper was preceded by more primitive currencies, nonmonetary or semi-monetary`,
  `which survived into the historic age of true coins, and may have derived originally from the barter of cattle, implements, and the like.`,
];

const startGame = () => {
  startGameBtn.classList.add("hidden");
  header.classList.add("hidden");
  typingDiv.innerHTML = "";
  statsDiv.innerHTML = "";

  const text = pharagraphs[parseInt(Math.random() * pharagraphs.length)];

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
      const endTime = new Date();
      const delta = endTime - startTime;
      const seconds = delta / 1000;
      const minutes = seconds / 60;
      const numberOfWords = text.split(" ").length;
      const wps = numberOfWords / seconds;
      const wpm = wps * 60.0;
      document.getElementById("stats").innerText = `wpm = ${parseInt(wpm)}`;
      document.removeEventListener("keydown", keyListener);
      startGameBtn.classList.remove("hidden");
      return;
    }
    cursorCharacter.classList.add("cursor");
  });
};
