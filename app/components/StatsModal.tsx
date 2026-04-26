import { fontSubstituteMap } from "../fonts";
import type { FontKey } from "../database";

interface StatsModalProps {
  open: boolean;
  cpm: number;
  accuracy: number;
  durationMs: number;
  sampleText: string;
  fontClass?: string;
  fontName: string;
  fontKey: FontKey;
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
  fontKey,
  designer,
  year,
  onRestart,
  onSelectFont,
}: StatsModalProps) {
  if (!open) return null;

  const seconds = Math.max(0, durationMs) / 1000;

  return (
    <div className="print-area fixed inset-0 flex items-center justify-center z-50 bg-black/80">
      <div className="print-receipt w-[640px] p-12 rounded-xl text-center bg-[var(--bg)] border border-[var(--border-subtle)]">
        <div className="mb-6">
          <div className="print-receipt-title">
            <span className={`text-4xl text-[var(--text-correct)] ${fontClass ?? ""}`}>{fontName}</span>
          </div>
          <div className="print-receipt-meta mt-1 flex items-center justify-center gap-1 text-sm text-[var(--text-muted)]">
            <span>{designer ?? "Unknown"}</span>
            <span>·</span>
            <span>{year}</span>
            <span>·</span>
            <span>{fontSubstituteMap[fontKey]}</span>
          </div>
        </div>

        <div className={`print-receipt-body text-left text-lg leading-7 mb-8 whitespace-pre-wrap text-[var(--text-correct)] ${fontClass ?? ""}`}>
          {sampleText}
        </div>

        <div className="print-receipt-stats">
          <hr className="border-[var(--border-subtle)] print:hidden" />
          <div className="flex justify-center gap-5 py-4 text-sm text-[var(--text-correct)]">
            <p>CPM: {cpm}</p>
            <p>Accuracy: {accuracy}%</p>
            <p>Time: {seconds.toFixed(2)}s</p>
          </div>
          <hr className="border-[var(--border-subtle)] print:hidden" />
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

