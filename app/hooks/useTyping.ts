// 타이핑 상태/통계 관리 훅: 입력, 진행도, 정확도, CPM, 완료 여부 관리
import { useCallback, useEffect, useRef, useState } from "react";
import { calcAccuracy, calcCpm, calcProgress } from "../lib/typing";

export const useTyping = (originalText: string, caseInsensitive = false) => {
  const [typedText, setTypedText] = useState("");
  const typedTextRef = useRef("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [cpm, setCpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [complete, setComplete] = useState(false);
  const [durationMs, setDurationMs] = useState(0);

  const progress = calcProgress(typedText.length, originalText.length);

  const resetTyping = useCallback(() => {
    typedTextRef.current = "";
    setTypedText("");
    setStartTime(null);
    setCpm(0);
    setAccuracy(0);
    setComplete(false);
    setDurationMs(0);
  }, []);

  const handleInputChange = useCallback((value: string) => {
    setStartTime((prev: number | null) => (prev === null && value.length > 0 ? Date.now() : prev));
    typedTextRef.current = value;
    setTypedText(value);
  }, []);

  const forceComplete = useCallback(() => {
    if (complete) return;
    const endTime = Date.now();
    const current = typedTextRef.current;
    setCpm(calcCpm(startTime, endTime, current.length));
    setAccuracy(calcAccuracy(current, originalText, caseInsensitive));
    if (startTime) setDurationMs(endTime - startTime);
    setComplete(true);
  }, [complete, startTime, originalText, caseInsensitive]);

  // 완료 체크
  useEffect(() => {
    if (complete || !originalText) return;
    if (typedText.length >= originalText.length) {
      const endTime = Date.now();
      setCpm(calcCpm(startTime, endTime, originalText.length));
      setAccuracy(calcAccuracy(typedText, originalText, caseInsensitive));
      if (startTime) setDurationMs(endTime - startTime);
      setComplete(true);
    }
  }, [typedText, originalText, startTime, complete]);

  // 텍스트 변경 시 상태 초기화
  useEffect(() => {
    resetTyping();
  }, [originalText, resetTyping]);

  return { typedText, progress, cpm, accuracy, complete, durationMs, handleInputChange, resetTyping, forceComplete };
};

