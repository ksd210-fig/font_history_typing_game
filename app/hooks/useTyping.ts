// 타이핑 상태/통계 관리 훅: 입력, 진행도, 정확도, CPM, 완료 여부 관리
import { useEffect, useState } from "react";
import {
  calcAccuracy,
  calcCpm,
  calcProgress,
} from "../lib/typing";

export const useTyping = (originalText: string) => {
  const [typedText, setTypedText] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [cpm, setCpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [complete, setComplete] = useState(false);

  const progress = calcProgress(typedText.length, originalText.length);

  const resetTyping = () => {
    setTypedText("");
    setStartTime(null);
    setCpm(0);
    setAccuracy(0);
    setComplete(false);
  };

  const handleInputChange = (value: string) => {
    if (!startTime && value.length > 0) {
      setStartTime(Date.now());
    }
    setTypedText(value);
  };

  // 완료 체크
  useEffect(() => {
    if (complete) return;
    if (!originalText) return;
    if (typedText.length >= originalText.length) {
      const endTime = Date.now();
      setCpm(calcCpm(startTime, endTime, originalText.length));
      setAccuracy(calcAccuracy(typedText, originalText));
      setComplete(true);
    }
  }, [typedText, originalText, startTime, complete]);

  // 텍스트 변경 시 상태 초기화
  useEffect(() => {
    resetTyping();
  }, [originalText]);

  return {
    typedText,
    progress,
    cpm,
    accuracy,
    complete,
    handleInputChange,
    resetTyping,
  };
};

