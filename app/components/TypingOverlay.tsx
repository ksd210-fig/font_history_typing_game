// 타이핑 오버레이: 원본/입력 텍스트를 겹쳐서 정오 색상/애니메이션 표시
import { checkChar } from "../lib/typing";

interface TypingOverlayProps {
  originalText: string;
  typedText: string;
  fontClass?: string;
}

export default function TypingOverlay({
  originalText,
  typedText,
  fontClass,
}: TypingOverlayProps) {
  return (
    <div className="relative w-full">
      {/* 원본 텍스트 (아래 레이어) */}
      <p
        className={`text-xl leading-9 ${fontClass ?? ""}`}
        style={{ color: "var(--text-not-yet)" }}
      >
        {originalText}
      </p>

      {/* 입력된 텍스트 + 캐럿 */}
      <p className={`absolute top-0 left-0 w-full text-xl leading-9 ${fontClass ?? ""}`}>
        {typedText.split("").map((char, index) => {
          const correct = checkChar(typedText, originalText, index);
          return (
            <span
              key={index}
              className={correct ? "" : "shake"}
              style={{ color: correct ? "var(--text-correct)" : "var(--text-incorrect)" }}
            >
              {char}
            </span>
          );
        })}
        <span className="typing-caret" />
      </p>
    </div>
  );
}

