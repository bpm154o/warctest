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
  const [ward, setWord] = useState<string | null>(null);
  useEffect(() => {
    setWord(words[Math.floor(Math.random() * words.length)].toLowerCase());
  }, []);
  const [input, setInput] = useState(""); //文字入力
  const [guesses, setGuesses] = useState<String[]>([]); //入力履歴

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
    setInput(""); //入力欄をクリア
  };

  return (
    <div>
      <h1>単語あてゲーム</h1>
      <div>
        <input
          type="text"
          maxLength={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border"
          placeholder="ここに入力"
        ></input>
        <button onClick={handleGuess}>決定</button>
      </div>
      <p>入力した文字: {guesses.join(",")}</p>
    </div>
  );
}
