"use client";
// 메인 페이지: 데이터 선택, 타이핑 흐름, 폰트 적용, 완료 모달을 조합한 UI 컨테이너

import React, { useRef, useState } from "react";
import { Data } from "./database";
import HamburgerMenu from "./components/HamburgerMenu";
import TypingOverlay from "./components/TypingOverlay";
import ProgressBar from "./components/ProgressBar";
import StatsModal from "./components/StatsModal";
import { inter, unifraktur } from "./fonts";
import { useTyping } from "./hooks/useTyping";
import { useInputFocus } from "./hooks/useInputFocus";

export default function Home() {
  const [selectedDataIndex, setSelectedDataIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const originalText = Data[selectedDataIndex].history;
  const fontKey = Data[selectedDataIndex].fontKey;
  const fontClassMap: Record<string, string> = {
    inter: inter.className,
    unifraktur: unifraktur.className,
  };
  const currentFontClass = fontKey ? fontClassMap[fontKey] : undefined;

  const {
    typedText,
    progress,
    cpm,
    accuracy,
    complete,
    durationMs,
    handleInputChange,
    resetTyping,
  } = useTyping(originalText);

  useInputFocus(inputRef, !complete, [selectedDataIndex]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleSelectFont = () => {
    resetTyping();
    const btn = document.getElementById("hamburger-menu-button");
    if (btn) {
      (btn as HTMLButtonElement).focus();
      btn.click();
    }
  };

  const handleRestart = () => {
    resetTyping();
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  const handleSelectData = (index: number) => {
    setSelectedDataIndex(index);
    resetTyping();
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  return (
    <>
      <HamburgerMenu onSelectData={handleSelectData} />
      <div
        className="relative w-[800px] h-[1280px] mx-auto flex flex-col items-center justify-center gap-10"
        onClick={focusInput}
      >
        <ProgressBar progress={progress} />

        <TypingOverlay
          originalText={originalText}
          typedText={typedText}
          fontClass={currentFontClass}
        />

        <input
          type="text"
          value={typedText}
          onChange={(e) => handleInputChange(e.target.value)}
          autoFocus
          disabled={complete}
          ref={inputRef}
          className="absolute top-0 left-0 w-full opacity-0"
        />

        <StatsModal
          open={complete}
          cpm={cpm}
          accuracy={accuracy}
          durationMs={durationMs}
          sampleText={originalText}
          fontClass={currentFontClass}
          onRestart={handleRestart}
          onSelectFont={handleSelectFont}
        />
      </div>
    </>
  );
}