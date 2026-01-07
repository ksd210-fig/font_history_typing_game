// 입력창 포커스 관리 훅: 조건 충족 시 ref 요소로 포커스 복원
import { DependencyList, RefObject, useEffect } from "react";

export const useInputFocus = (
  ref: RefObject<HTMLElement | null>,
  shouldFocus: boolean,
  deps: DependencyList = []
) => {
  useEffect(() => {
    if (!shouldFocus) return;
    requestAnimationFrame(() => {
      ref.current?.focus();
    });
  }, [shouldFocus, ref, ...deps]);
};

