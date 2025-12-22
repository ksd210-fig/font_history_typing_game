"use client";

import { useState } from "react";
import { Data } from "./database";

export default function Home() {
  const [typedText, setTypedText] = useState("");
  const originalText = Data[0].history;

  return (
    <div className="w-[800px] h-[1280px] mx-auto flex items-center justify-center">
      <div className="relative">
        {/* 원본 텍스트 (아래 레이어) */}
        <p className="text-gray-500">{originalText}</p>

        {/* 입력된 텍스트 */}
        <p className="absolute top-0 left-0">
          {typedText.split("").map((char, index) => (
            <span
              key={index}
              className={
                char === originalText[index] ? "text-white" : "text-red-500"
              }
            >
              {char}
            </span>
          ))}
        </p>

        {/* 숨겨진 입력창 */}
        <input
          type="text"
          value={typedText}
          onChange={(e) => setTypedText(e.target.value)}
          autoFocus
          className="absolute top-0 left-0 w-full opacity-0"
        />
      </div>
    </div>
  );
}
