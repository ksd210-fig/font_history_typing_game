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

  const { typedText, progress, cpm, accuracy, complete, durationMs, handleInputChange, resetTyping, forceComplete } =
    useTyping(originalText);

  useInputFocus(inputRef, !complete, [selectedDataIndex]);

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
            onChange={(e) => handleTextInputChange(e.target.value)}
            onKeyDown={handleTypingKeyDown}
            autoFocus
            disabled={complete}
            ref={inputRef}
            className="absolute opacity-0 w-px h-px"
          />
        </main>

        {/* 프로그레스 바 + 버튼: 푸터 바로 위 고정 */}
        <div className="fixed left-1/2 -translate-x-1/2 w-[780px] px-4 bottom-[140px]">
          <div className="pointer-events-none">
            <ProgressBar progress={progress} />
          </div>
          <div className="flex justify-between mt-2 text-[12px] text-[var(--text-muted)]">
            <span>
              <span>Progress: </span> 
              <span className="font-semibold">{Math.round(progress)}%</span>
            </span>
            <span>
              <span>Remaining: </span> 
              <span className="font-semibold">{originalText.slice(typedText.length).trim().split(/\s+/).filter(w => w.length > 0).length} words</span>
            </span>
          </div>
          <div className="flex justify-center mt-3">
            <button
              onClick={() => { forceComplete(); setShowModal(true); }}
              className="px-10 py-2 text-[13px] bg-[var(--accent)] text-[var(--bg)] hover:opacity-80 transition-opacity"
            >
              Finish & View Results
            </button>
          </div>
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
        designer={designer}
        year={year}
        onRestart={handleRestart}
        onSelectFont={handleSelectFont}
      />
    </>
  );
}