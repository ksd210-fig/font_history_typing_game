"use client";
// 메인 페이지: 데이터 선택, 타이핑 흐름, 폰트 적용, 완료 모달을 조합한 UI 컨테이너

import { useCallback, useEffect, useRef, useState } from "react";
import { Data } from "./database";
import AppHeader from "./components/AppHeader";
import TypingOverlay from "./components/TypingOverlay";
import ProgressBar from "./components/ProgressBar";
import StatsModal from "./components/StatsModal";
import { fontClassMap, fontSizeMap } from "./fonts";
import { useTyping } from "./hooks/useTyping";
import { useInputFocus } from "./hooks/useInputFocus";
import { playFinishSound } from "./lib/finishSound";
import { playKeystrokeSound } from "./lib/keystrokeSound";
import { checkChar } from "./lib/typing";
import { playWrongSound } from "./lib/wrongSound";

export default function Home() {
  const [selectedDataIndex, setSelectedDataIndex] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { history: originalText, fontKey, name: fontName, designer, year } = Data[selectedDataIndex];
  const currentFontClass = fontKey ? fontClassMap[fontKey] : undefined;
  const currentFontSizeClass = fontKey ? fontSizeMap[fontKey] : undefined;

  const { typedText, progress, cpm, accuracy, complete, durationMs, handleInputChange, resetTyping } =
    useTyping(originalText);

  useInputFocus(inputRef, !complete, [selectedDataIndex]);

  useEffect(() => {
    if (complete) setShowModal(true);
  }, [complete]);

  useEffect(() => {
    if (!showModal) return;
    playFinishSound();
  }, [showModal]);

  const handleTypingKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === "Backspace") {
      playKeystrokeSound();
    }
  }, []);

  /** 맞음/틀림은 실제 입력 문자 기준(onChange만). keydown 예측+skip은 예측과 실제가 어긋나 틀림 소리가 막히는 경우가 있음. */
  const handleTextInputChange = useCallback(
    (value: string) => {
      const prev = typedText;
      handleInputChange(value);
      if (value.length <= prev.length) return;

      for (let i = prev.length; i < value.length; i++) {
        if (checkChar(value, originalText, i)) {
          playKeystrokeSound();
        } else {
          playWrongSound();
        }
      }
    },
    [typedText, originalText, handleInputChange]
  );

  const handleSelectFont = () => {
    resetTyping();
    setShowModal(false);
    setIsMenuOpen(true);
  };

  const handleRestart = () => {
    resetTyping();
    setShowModal(false);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const handleSelectData = (index: number) => {
    setSelectedDataIndex(index);
    resetTyping();
    setShowModal(false);
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

      {/* GNB(60px) + 폰트 선택 헤더(80px) = 140px offset */}
      <div className="flex flex-col min-h-screen pt-[140px] print:hidden">
        <main
          className="flex-1 w-full max-w-[780px] mt-10 sm:mt-16 md:mt-20 mx-auto px-5 sm:px-8 lg:px-0 pb-[120px] cursor-text"
          onClick={() => inputRef.current?.focus()}
        >
          <TypingOverlay
            originalText={originalText}
            typedText={typedText}
            fontClass={currentFontClass}
            fontSizeClass={currentFontSizeClass}
          />

          <input
            type="text"
            value={typedText}
            onChange={(e) => handleTextInputChange(e.target.value)}
            onKeyDown={handleTypingKeyDown}
            autoFocus
            disabled={complete}
            ref={inputRef}
            className="absolute opacity-0 w-px h-px"
          />
        </main>

        {/* 프로그레스 바: 푸터 바로 위 고정 */}
        <div className="fixed left-1/2 -translate-x-1/2 w-full max-w-[780px] px-5 sm:px-8 lg:px-0 bottom-[60px] pointer-events-none">
          <ProgressBar progress={progress} />
        </div>

        <footer className="flex items-center justify-center h-[50px] border-t border-[var(--border-subtle)]">
          <p className="text-[12px] text-[var(--text-muted)]">©2026 Fig.1 Studio</p>
        </footer>
      </div>

      <StatsModal
        open={showModal}
        cpm={cpm}
        accuracy={accuracy}
        durationMs={durationMs}
        sampleText={originalText}
        fontClass={currentFontClass}
        fontName={fontName}
        fontKey={fontKey}
        designer={designer}
        year={year}
        onRestart={handleRestart}
        onSelectFont={handleSelectFont}
      />
    </>
  );
}