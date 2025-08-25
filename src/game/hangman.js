const readline = require("readline");

const words = ["apple", "dog"];
const word = words[Math.floor(Math.random() * words.length)].toLowerCase();
let guesses = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function getDisplayWord() {
  return word
    .split("")
    .map((letter) => (guesses.includes(letter) ? letter : "_"))
    .join("");
}

function askGuess() {
  console.log("\n単語: " + getDisplayWord());
  rl.question("1文字を入力してください：", (input) => {
    const guess = input.toLowerCase();

    // 入力チェック
    if (!/^[a-z]$/.test(guess)) {
      console.log("アルファベット1文字で入力してください");
    } else if (guesses.includes(guess)) {
      console.log("その文字はすでに入力済みです");
    } else {
      guesses.push(guess);
    }

    // 次の入力
    askGuess();
  });
}

console.log("単語あてゲーム");
askGuess();
