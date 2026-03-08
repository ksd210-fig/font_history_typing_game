"use client";
// 메인 페이지: 데이터 선택, 타이핑 흐름, 폰트 적용, 완료 모달을 조합한 UI 컨테이너

import { useRef, useState } from "react";
import { Data } from "./database";
import AppHeader from "./components/AppHeader";
import TypingOverlay from "./components/TypingOverlay";
import ProgressBar from "./components/ProgressBar";
import StatsModal from "./components/StatsModal";
import { fontClassMap, fontSizeMap } from "./fonts";
import { useTyping } from "./hooks/useTyping";
import { useInputFocus } from "./hooks/useInputFocus";

export default function Home() {
  const [selectedDataIndex, setSelectedDataIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { history: originalText, fontKey, name: fontName, designer, year } = Data[selectedDataIndex];
  const currentFontClass = fontKey ? fontClassMap[fontKey] : undefined;
  const currentFontSizeClass = fontKey ? fontSizeMap[fontKey] : undefined;

  const { typedText, progress, cpm, accuracy, complete, durationMs, handleInputChange, resetTyping, forceComplete } =
    useTyping(originalText);

  useInputFocus(inputRef, !complete, [selectedDataIndex]);

  const handleSelectFont = () => {
    resetTyping();
    setIsMenuOpen(true);
  };

  const handleRestart = () => {
    resetTyping();
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const handleSelectData = (index: number) => {
    setSelectedDataIndex(index);
    resetTyping();
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  return (
    <>
      <div className="print:hidden">
        <AppHeader
          isOpen={isMenuOpen}
          onOpenChange={setIsMenuOpen}
          onSelectData={handleSelectData}
          selectedIndex={selectedDataIndex}
        />
      </div>

      {/* GNB(79px) + 폰트 선택 헤더(80px) = 159px offset */}
      <div className="flex flex-col min-h-screen pt-[159px] print:hidden">
        <main
          className="flex-1 w-[780px] mt-10 mx-auto cursor-text"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="w-[780px] flex flex-col gap-10">
            <TypingOverlay
              originalText={originalText}
              typedText={typedText}
              fontClass={currentFontClass}
              fontSizeClass={currentFontSizeClass}
            />
          </div>

          <input
            type="text"
            value={typedText}
            onChange={(e) => handleInputChange(e.target.value)}
            autoFocus
            disabled={complete}
            ref={inputRef}
            className="absolute opacity-0 w-px h-px"
            onKeyDown={(e) => { if (e.key === "Enter") forceComplete(); }}
          />
        </main>

        {/* 프로그레스 바: 푸터 바로 위 고정, 클릭은 통과 */}
        <div className="fixed left-1/2 -translate-x-1/2 w-[780px] px-4 pointer-events-none bottom-[100px]">
          <ProgressBar progress={progress} />
        </div>

        <footer className="flex items-center justify-center h-[50px] border-t border-[var(--border-subtle)]">
          <p className="text-[12px] text-[var(--text-muted)]">©2026 Fig.1 Studio</p>
        </footer>
      </div>

      <StatsModal
        open={complete}
        cpm={cpm}
        accuracy={accuracy}
        durationMs={durationMs}
        sampleText={originalText}
        fontClass={currentFontClass}
        fontName={fontName}
        designer={designer}
        year={year}
        onRestart={handleRestart}
        onSelectFont={handleSelectFont}
      />
    </>
  );
}