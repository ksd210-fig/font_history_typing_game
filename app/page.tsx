"use client";

import { useState } from "react";
import { Data } from "./database";
import Hangul from "hangul-js";

// 1. 자모 단위 비교 (입력 중인 것도 맞음 처리)
const isCharCorrect = (typed: string, target: string): boolean => {
  if (typed === target) return true;

  const typedJamo = Hangul.disassemble(typed);
  const targetJamo = Hangul.disassemble(target);

  // 입력이 더 길면 틀림
  if (typedJamo.length > targetJamo.length) return false;

  // 자모 하나씩 비교 (앞부분만 일치해도 OK)
  for (let i = 0; i < typedJamo.length; i++) {
    if (typedJamo[i] !== targetJamo[i]) return false;
  }
  return true;
};

// 2. 받침이 다음 글자로 넘어가는 경우 처리
const isCorrectWithNextChar = (
  typed: string,
  target: string,
  nextTarget: string
): boolean => {
  if (isCharCorrect(typed, target)) return true;
  if (!nextTarget) return false;

  const typedJamo = Hangul.disassemble(typed);
  const targetJamo = Hangul.disassemble(target);
  const nextTargetJamo = Hangul.disassemble(nextTarget);

  // 받침이 1개 더 붙은 경우 (ex: '숟' vs '수')
  if (typedJamo.length === targetJamo.length + 1) {
    for (let i = 0; i < targetJamo.length; i++) {
      if (typedJamo[i] !== targetJamo[i]) return false;
    }
    // 남은 자모가 다음 글자의 초성과 일치하면 OK
    const extraJamo = typedJamo[typedJamo.length - 1];
    if (nextTargetJamo.length > 0 && extraJamo === nextTargetJamo[0]) {
      return true;
    }
  }
  return false;
};

// 글자 상태 확인
const checkChar = (
  typedText: string,
  originalText: string,
  index: number
): boolean => {
  const typed = typedText[index];
  const target = originalText[index];
  const nextTarget = originalText[index + 1] || "";

  // 마지막 글자는 받침 넘어가는 경우 체크
  if (index === typedText.length - 1) {
    return isCorrectWithNextChar(typed, target, nextTarget);
  }
  // 이전 글자는 완전 일치만
  return typed === target;
};

export default function Home() {
  const [typedText, setTypedText] = useState("");
  const originalText = Data[0].history;

  return (
    <div className="w-[800px] h-[1280px] mx-auto flex items-center justify-center">
      <div className="relative">
        {/* 원본 텍스트 (아래 레이어) */}
        <p className="text-gray-500 text-2xl">{originalText}</p>

        {/* 입력된 텍스트 */}
        <p className="absolute top-0 left-0 text-2xl">
          {typedText.split("").map((char, index) => (
            <span
              key={index}
              className={
                checkChar(typedText, originalText, index)
                  ? "text-white"
                  : "text-red-500"
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
