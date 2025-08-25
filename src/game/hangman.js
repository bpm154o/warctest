const readline = require("readline");

const words = [
  "dog",
  "sun",
  "apple",
  "house",
  "train",
  "garden",
  "teacher",
  "airport",
  "bicycle",
  "hospital",
];
let word, guesses, attempts;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function initGame() {
  word = words[Math.floor(Math.random() * words.length)].toLowerCase();
  guesses = [];
  attempts = 5;
  console.log("単語あてゲーム");
  askGuess();
}

function getDisplayWord() {
  return word
    .split("")
    .map((letter) => (guesses.includes(letter) ? letter : "_"))
    .join(" ");
}

function checkGameOver() {
  // 勝ちのとき
  if (!getDisplayWord().includes("_")) {
    console.log("\n 勝ち！ 正解は " + word + "です");
    rl.close();
    return true;
  }

  // 負け、残り回数が0のとき
  if (attempts <= 0) {
    console.log("\n 負け… 正解は " + word + "です");
    rl.close();
    return true;
  }

  return false;
}

function askGuess() {
  console.log("\n単語: " + getDisplayWord());
  console.log("残りミス回数：" + attempts);

  rl.question("1文字を入力してください：", (input) => {
    const guess = input.toLowerCase();

    // 入力チェック
    if (!/^[a-z]$/.test(guess)) {
      console.log("アルファベット1文字で入力してください");
    } else if (guesses.includes(guess)) {
      console.log("その文字はすでに入力済みです");
    } else {
      guesses.push(guess);
      // 入力が単語に含まれるかをチェック
      if (word.includes(guess)) {
        console.log("正解");
      } else {
        console.log("不正解");
        attempts--;
      }
    }

    // 勝ち負けの判定
    if (!checkGameOver()) {
      askGuess();
    }
  });
}

initGame();
