// 완료 모달: CPM/정확도/시간/샘플 문장 표기, 재시작/폰트 선택 버튼 제공
interface StatsModalProps {
  open: boolean;
  cpm: number;
  accuracy: number;
  durationMs: number;
  sampleText: string;
  fontClass?: string;
  fontName: string;
  designer?: string;
  year: number;
  onRestart: () => void;
  onSelectFont: () => void;
}

export default function StatsModal({
  open,
  cpm,
  accuracy,
  durationMs,
  sampleText,
  fontClass,
  fontName,
  designer,
  year,
  onRestart,
  onSelectFont,
}: StatsModalProps) {
  if (!open) return null;

  const seconds = Math.max(0, durationMs) / 1000;

  return (
    <div className="print-area fixed inset-0 flex items-center justify-center z-50 bg-black/80">
      <div className="w-[640px] p-12 rounded-xl text-center bg-[var(--bg)] border border-[var(--border-subtle)] print:border-none print:rounded-none">
        <div className="mb-6">
          <span className={`text-4xl text-[var(--text-correct)] ${fontClass ?? ""}`}>{fontName}</span>
          <div className="mt-1 flex items-center justify-center gap-1 text-sm text-[var(--text-muted)]">
            <span>{designer ?? "Unknown"}</span>
            <span>·</span>
            <span>{year}</span>
          </div>
        </div>

        <div className={`text-left text-lg leading-7 mb-8 whitespace-pre-wrap text-[var(--text-correct)] ${fontClass ?? ""}`}>
          {sampleText}
        </div>

        <div className="print:hidden">
          <hr className="border-[var(--border-subtle)]" />
          <div className="flex justify-center gap-5 py-4 text-sm text-[var(--text-correct)]">
            <p>Characters Per Minute: {cpm}</p>
            <p>Accuracy: {accuracy}%</p>
            <p>Time: {seconds.toFixed(2)}s</p>
          </div>
          <hr className="border-[var(--border-subtle)]" />
        </div>

        <div className="mt-4 flex gap-3 justify-center print:hidden">
          <button
            onClick={onRestart}
            className="px-6 py-2 rounded text-sm font-medium bg-[var(--accent)] text-[var(--bg)]"
          >
            Retry
          </button>
          <button
            onClick={onSelectFont}
            className="px-6 py-2 rounded text-sm font-medium bg-transparent text-[var(--text-correct)] border border-[var(--border-subtle)]"
          >
            Select Font
          </button>
          <button
            onClick={() => window.print()}
            className="px-6 py-2 rounded text-sm font-medium bg-transparent text-[var(--text-correct)] border border-[var(--border-subtle)]"
          >
            Print
          </button>
        </div>
      </div>
    </div>
  );
}

