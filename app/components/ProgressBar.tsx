// 진행도 막대 컴포넌트: 1px 트랙 + 진행선 + 끝 눈금 표시
interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="progress-bar w-full">
      <div className="progress-track" />
      <div className="progress-fill" style={{ width: `${progress}%` }} />
      {progress > 0 && progress < 100 && (
        <div className="progress-tick" style={{ left: `${progress}%` }} />
      )}
    </div>
  );
}

