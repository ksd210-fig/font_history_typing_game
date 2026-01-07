// 타이핑 채점/통계 계산 유틸: 자모 단위 비교, 정확도·CPM·진행도 계산
import Hangul from "hangul-js";

// 1. 자모 단위 비교 (입력 중인 것도 맞음 처리)
export const isCharCorrect = (typed: string, target: string): boolean => {
  if (!target) return false;
  if (typed === target) return true;

  const typedJamo = Hangul.disassemble(typed);
  const targetJamo = Hangul.disassemble(target);

  if (typedJamo.length > targetJamo.length) return false;

  for (let i = 0; i < typedJamo.length; i++) {
    if (typedJamo[i] !== targetJamo[i]) return false;
  }
  return true;
};

// 2. 받침이 다음 글자로 넘어가는 경우 처리
export const isCorrectWithNextChar = (
  typed: string,
  target: string,
  nextTarget: string
): boolean => {
  if (!target) return false;
  if (isCharCorrect(typed, target)) return true;
  if (!nextTarget) return false;

  const typedJamo = Hangul.disassemble(typed);
  const targetJamo = Hangul.disassemble(target);
  const nextTargetJamo = Hangul.disassemble(nextTarget);

  if (typedJamo.length === targetJamo.length + 1) {
    for (let i = 0; i < targetJamo.length; i++) {
      if (typedJamo[i] !== targetJamo[i]) return false;
    }
    const extraJamo = typedJamo[typedJamo.length - 1];
    if (nextTargetJamo.length > 0 && extraJamo === nextTargetJamo[0]) {
      return true;
    }
  }
  return false;
};

// 글자 상태 확인
export const checkChar = (
  typedText: string,
  originalText: string,
  index: number
): boolean => {
  const typed = typedText[index];
  const target = originalText[index];
  const nextTarget = originalText[index + 1] || "";

  if (index === typedText.length - 1) {
    return isCorrectWithNextChar(typed, target, nextTarget);
  }
  return typed === target;
};

export const calcAccuracy = (typed: string, original: string): number => {
  if (!typed.length || !original.length) return 0;
  let correct = 0;
  const compareLen = Math.min(typed.length, original.length);
  for (let i = 0; i < compareLen; i++) {
    if (typed[i] === original[i]) correct++;
  }
  const extraChars = Math.max(0, typed.length - original.length);
  const errors = original.length - correct + extraChars;
  const acc = ((original.length - errors) / original.length) * 100;
  return Math.max(0, Math.round(acc));
};

export const calcProgress = (
  typedLength: number,
  originalLength: number
): number => {
  if (!originalLength) return 0;
  return Math.min((typedLength / originalLength) * 100, 100);
};

export const calcCpm = (
  startTime: number | null,
  endTime: number,
  length: number
): number => {
  if (!startTime) return 0;
  const minutes = (endTime - startTime) / 60000;
  return minutes > 0 ? Math.round(length / minutes) : 0;
};

