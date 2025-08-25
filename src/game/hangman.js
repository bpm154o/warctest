const words = ["apple", "dog"];
const word = words[Math.floor(Math.random() * words.length)].toLowerCase();

let guesses = [];
function getDisplayWord() {
  return word
    .split("")
    .map((letter) => (guesses.includes(letter) ? letter : "_"))
    .join("");
}

console.log("単語あてゲーム");
console.log(getDisplayWord());
