// 완료 모달: CPM/정확도 표기 및 재시작 버튼 제공
interface StatsModalProps {
  open: boolean;
  cpm: number;
  accuracy: number;
  onRestart: () => void;
}

export default function StatsModal({
  open,
  cpm,
  accuracy,
  onRestart,
}: StatsModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg text-center">
        <p className="text-gray-300 mt-3 mb-6">
          CPM: {cpm} / ACC: {accuracy}%
        </p>
        <button
          onClick={onRestart}
          className="bg-white text-black px-6 py-2 rounded"
        >
          다시 시작
        </button>
      </div>
    </div>
  );
}

