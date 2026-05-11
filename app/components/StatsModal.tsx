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
}: StatsModalProps) {
  if (!open) return null;

  const seconds = Math.max(0, durationMs) / 1000;

  return (
    <div className="print-area fixed inset-0 z-50 bg-black/80 overflow-y-auto">
      <div className="min-h-full flex items-center justify-center p-4 sm:p-6">
      <div className="print-receipt w-full max-w-[640px] p-8 sm:p-12 text-center bg-[var(--bg)] border border-[var(--border-subtle)]">
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
            onClick={() => window.print()}
            className="px-12 py-2 text-sm font-medium bg-transparent text-[var(--text-correct)] border border-[var(--border-subtle)]"
          >
            Print
          </button>
          <button
            onClick={onRestart}
            className="px-12 py-2 text-sm font-medium bg-[var(--accent)] text-[var(--bg)]"
          >
            Retry
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}

