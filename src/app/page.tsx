/* eslint-disable react/display-name */
"use client";

import { useState, useEffect } from "react";

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

export default function HOME() {
  const [word, setWord] = useState<string>("");

  // ページロード時にランダム単語を選ぶ
  useEffect(() => {
    setWord(words[Math.floor(Math.random() * words.length)].toLowerCase());
  }, []);
  const [input, setInput] = useState(""); //文字入力
  const [guesses, setGuesses] = useState<String[]>([]); //入力履歴
  const [attempts, setAttempts] = useState(5); //残り失敗回数
  const [gameOver, setGameOver] =useState(false); //ゲーム終了判定

  const handleGuess = () => {
    if (!/^[a-zA-Z]$/.test(input)) {
      alert("アルファベット1文字を入力してください");
      return;
    }
    const letter = input.toLowerCase();

    if (guesses.includes(letter)) {
      alert("すでに入力されています");
      setInput("");
      return;
    }

    //入力履歴に追加
    setGuesses([...guesses, letter]);

    // 失敗の場合は残り回数を減らす
    if (!word.includes(letter)) {
      setAttempts(attempts - 1);
      if (attempts - 1 <= 0) setGameOver(true);
    } else {
      //勝利
      const allLetterGuessed = word
        .split("")
        .every((l) => [...guesses, letter].includes(l));
      if (allLetterGuessed) setGameOver(true);
    }

    setInput(""); //入力欄をクリア
  };

  // 表示用の文字列を作る
  const getDisplayWord = () => {
    return word
      .split("")
      .map((letter) => (guesses.includes(letter) ? letter : "_"))
      .join(" ");
  };

  // ゲームリセット
  const resetGame =()=> {
    const randomWord =words[Math.floor(Math.random() * words.length)]toLowerCase();
    setWord(randomWord);
    setGuesses([])
    setAttempts(5);
    setGameOver(false);
    setInput("");
  };
  if (!word) return <p>Loading...</p>;

  return (
    <div>
      <h1>単語あてゲーム</h1>

      {!gameOver ? (
        <div className="">
          <input
            type="text"
            maxLength={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border p-2"
            placeholder="ここに入力"
          />
          <button
            onClick={handleGuess}
            className=""
          >
            決定
          </button>
        </div>
      ) : (
        <div className="">
          <p>{attempts > 0 ? "勝ち！" : `負け… 正解は "${word}"`}</p>
          <button
            onClick={resetGame}
            className=""
          >
            もう一度プレイ
          </button>
        </div>
      )}

      <p>入力した文字: {guesses.join(",")}</p>
      <p>{getDisplayWord()}</p>
    </div>
  );
}
