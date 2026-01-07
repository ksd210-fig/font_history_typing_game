// 진행도 막대 컴포넌트: %를 받아 길이로 표시
interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full px-8">
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

