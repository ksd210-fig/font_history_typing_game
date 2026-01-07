// 완료 모달: CPM/정확도/시간/샘플 문장 표기, 재시작/폰트 선택 버튼 제공
interface StatsModalProps {
  open: boolean;
  cpm: number;
  accuracy: number;
  durationMs: number;
  sampleText: string;
  fontClass?: string;
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
  onRestart,
  onSelectFont,
}: StatsModalProps) {
  if (!open) return null;

  const seconds = Math.max(0, durationMs) / 1000;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg text-center">
        <div className="text-gray-300 mt-2 mb-6 space-y-2">
          <p>CPM: {cpm}</p>
          <p>ACC: {accuracy}%</p>
          <p>Time: {seconds.toFixed(2)}s</p>
        </div>
        <div
          className={`text-gray-100 text-left text-base leading-7 mb-6 whitespace-pre-wrap ${fontClass ?? ""}`}
        >
          {sampleText}
        </div>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onRestart}
            className="bg-white text-black px-6 py-2 rounded"
          >
            다시 시작
          </button>
          <button
            onClick={onSelectFont}
            className="bg-gray-200 text-black px-6 py-2 rounded"
          >
            다른 폰트 선택
          </button>
        </div>
      </div>
    </div>
  );
}

