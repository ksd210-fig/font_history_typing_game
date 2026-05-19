// 타이핑 오버레이: 원본/입력 텍스트를 겹쳐서 정오 색상/애니메이션 표시
import { Fragment, useEffect, useRef } from "react";
import { checkChar } from "../lib/typing";

interface TypingOverlayProps {
  originalText: string;
  typedText: string;
  fontClass?: string;
  fontSizeClass?: string;
  caseInsensitive?: boolean;
}

export default function TypingOverlay({
  originalText,
  typedText,
  fontClass,
  fontSizeClass = "text-base leading-7 sm:text-lg sm:leading-8 md:text-xl md:leading-9",
  caseInsensitive = false,
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

  // 단어/공백 단위 세그먼트 분리: 단어는 white-space:nowrap으로 감싸 글자 단위 줄바꿈 방지
  const segments: { text: string; start: number; isSpace: boolean }[] = [];
  let si = 0;
  while (si < originalText.length) {
    const isSpace = originalText[si] === " " || originalText[si] === "\n";
    let ei = si;
    while (ei < originalText.length && (originalText[ei] === " " || originalText[ei] === "\n") === isSpace) {
      ei++;
    }
    segments.push({ text: originalText.slice(si, ei), start: si, isSpace });
    si = ei;
  }

  const renderChar = (char: string, index: number) => {
    if (index < typedText.length) {
      const typedChar = typedText[index];
      const correct = checkChar(typedText, originalText, index, caseInsensitive);
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
  };

  return (
    <div className="relative w-full">
      <p className={`${fontSizeClass} ${fontClass ?? ""}`}>
        {segments.map((seg) =>
          seg.isSpace ? (
            seg.text.split("").map((char, i) => renderChar(char, seg.start + i))
          ) : (
            <span key={seg.start} style={{ whiteSpace: "nowrap" }}>
              {seg.text.split("").map((char, i) => renderChar(char, seg.start + i))}
            </span>
          )
        )}
        {typedText.length >= originalText.length && (
          <span className="typing-caret" ref={caretRef} />
        )}
      </p>
    </div>
  );
}

