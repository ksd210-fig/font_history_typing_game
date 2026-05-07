// 타이핑 오버레이: 원본/입력 텍스트를 겹쳐서 정오 색상/애니메이션 표시
import { Fragment, useEffect, useRef } from "react";
import { checkChar } from "../lib/typing";

interface TypingOverlayProps {
  originalText: string;
  typedText: string;
  fontClass?: string;
  fontSizeClass?: string;
}

export default function TypingOverlay({
  originalText,
  typedText,
  fontClass,
  fontSizeClass = "text-base leading-7 sm:text-lg sm:leading-8 md:text-xl md:leading-9",
}: TypingOverlayProps) {
  const caretRef = useRef<HTMLSpanElement>(null);

  const scrollCaret = () => {
    caretRef.current?.scrollIntoView({ block: "nearest", inline: "nearest" });
  };

  useEffect(() => {
    scrollCaret();
  }, [typedText]);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    vv.addEventListener("resize", scrollCaret);
    return () => vv.removeEventListener("resize", scrollCaret);
  }, []);

  return (
    <div className="relative w-full">
      {/* 단일 레이어: 글자별 색상 제어로 오버레이 정렬 문제 원천 제거 */}
      <p className={`${fontSizeClass} ${fontClass ?? ""}`}>
        {originalText.split("").map((char, index) => {
          if (index < typedText.length) {
            const typedChar = typedText[index];
            const correct = checkChar(typedText, originalText, index);
            return (
              <span
                key={index}
                className={correct ? "" : "shake"}
                style={{ color: correct ? "var(--text-correct)" : "var(--text-incorrect)" }}
              >
                {!correct && typedChar === " " ? "_" : typedChar}
              </span>
            );
          }
          if (index === typedText.length) {
            return (
              <Fragment key={index}>
                <span className="typing-caret" ref={caretRef} />
                <span style={{ color: "var(--text-not-yet)" }}>{char}</span>
              </Fragment>
            );
          }
          return <span key={index} style={{ color: "var(--text-not-yet)" }}>{char}</span>;
        })}
        {typedText.length >= originalText.length && (
          <span className="typing-caret" ref={caretRef} />
        )}
      </p>
    </div>
  );
}

