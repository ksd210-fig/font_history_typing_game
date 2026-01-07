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
    <div className="relative w-[600px]">
      {/* 원본 텍스트 (아래 레이어) */}
      <p className={`text-gray-500 text-2xl ${fontClass ?? ""}`}>
        {originalText}
      </p>

      {/* 입력된 텍스트 */}
      <p className={`absolute top-0 left-0 w-full text-2xl ${fontClass ?? ""}`}>
        {typedText.split("").map((char, index) => (
          <span
            key={index}
            className={
              checkChar(typedText, originalText, index)
                ? "text-white"
                : "text-red-500 shake"
            }
          >
            {char}
          </span>
        ))}
      </p>
    </div>
  );
}

