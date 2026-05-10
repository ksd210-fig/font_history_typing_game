"use client";
// 메인 페이지: 데이터 선택, 타이핑 흐름, 폰트 적용, 완료 모달을 조합한 UI 컨테이너

import { useCallback, useEffect, useRef, useState } from "react";
import { Data } from "./database";
import AppHeader from "./components/AppHeader";
import TypingOverlay from "./components/TypingOverlay";
import ProgressBar from "./components/ProgressBar";
import StatsModal from "./components/StatsModal";
import { fontClassMap, fontCaseInsensitiveMap, fontSizeMap } from "./fonts";
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
  const [viewportHeight, setViewportHeight] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const update = () => setViewportHeight(vv.height);
    update();
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
    };
  }, []);

  const { history: originalText, fontKey, name: fontName, designer, year } = Data[selectedDataIndex];
  const currentFontClass = fontKey ? fontClassMap[fontKey] : undefined;
  const currentFontSizeClass = fontKey ? fontSizeMap[fontKey] : undefined;
  const caseInsensitive = fontKey ? fontCaseInsensitiveMap[fontKey] : false;

  const { typedText, progress, cpm, accuracy, complete, durationMs, handleInputChange, resetTyping, forceComplete } =
    useTyping(originalText, caseInsensitive);

  const remainingWords = (() => {
    const remaining = originalText.slice(typedText.length).trim();
    return remaining ? remaining.split(/\s+/).length : 0;
  })();

  useInputFocus(inputRef, !complete, selectedDataIndex);

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
        if (checkChar(value, originalText, i, caseInsensitive)) {
          playKeystrokeSound();
        } else {
          playWrongSound();
        }
      }
    },
    [typedText, originalText, handleInputChange, caseInsensitive]
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

      {/* GNB(60px) + 폰트 선택 헤더(80px) = 140px, 전체 높이 고정 */}
      <div
        className="flex flex-col pt-[140px] print:hidden"
        style={{ height: viewportHeight ? `${viewportHeight}px` : "100dvh" }}
      >
        {/* 텍스트 영역만 내부 스크롤 */}
        <div
          className="flex-1 overflow-y-auto cursor-text"
          onClick={() => inputRef.current?.focus()}
        >
          <main className="w-full max-w-[780px] mt-10 sm:mt-16 md:mt-20 mx-auto px-5 sm:px-8 lg:px-0">
            <TypingOverlay
              originalText={originalText}
              typedText={typedText}
              fontClass={currentFontClass}
              fontSizeClass={currentFontSizeClass}
              caseInsensitive={caseInsensitive}
            />

            <input
              type="text"
              value={typedText}
              onChange={(e) => handleTextInputChange(e.target.value)}
              onKeyDown={handleTypingKeyDown}
              autoFocus
              disabled={complete}
              ref={inputRef}
              className="fixed bottom-0 left-0 opacity-0 w-px h-px pointer-events-none"
            />
          </main>
        </div>

        {/* 프로그레스바: 배경 있는 고정 영역 */}
        <div className="shrink-0 bg-[var(--bg)] pt-5 pb-4">
          <div className="w-full max-w-[780px] mx-auto px-5 sm:px-8 lg:px-0">
            <ProgressBar progress={progress} />
            <div className="flex justify-between mt-2 text-[13px]">
              <span className="text-[var(--text-muted)]">
                Progress: <strong className="text-[var(--text-correct)]">{Math.round(progress)}%</strong>
              </span>
              <span className="text-[var(--text-muted)]">
                Remaining: <strong className="text-[var(--text-correct)]">{remainingWords} words</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Finish 버튼 */}
        {!complete && (
          <div className="shrink-0 bg-[var(--bg)] pb-4 flex justify-center">
            <button
              onClick={forceComplete}
              className="px-7 py-3 text-[14px] font-medium bg-[var(--accent)] text-[var(--bg)] rounded-sm hover:opacity-80 transition-opacity"
            >
              Finish &amp; View Results
            </button>
          </div>
        )}

        <footer className="shrink-0 flex items-center justify-center h-[50px] border-t border-[var(--border-subtle)]">
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