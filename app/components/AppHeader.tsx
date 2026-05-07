"use client";

import { Data } from "../database";
import { fontClassMap, fontSubstituteMap } from "../fonts";

interface AppHeaderProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectData: (index: number) => void;
  selectedIndex: number;
}

export default function AppHeader({ isOpen, onOpenChange, onSelectData, selectedIndex }: AppHeaderProps) {
  const selected = Data[selectedIndex];

  const handleItemClick = (index: number) => {
    onSelectData(index);
    onOpenChange(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-40">
      {/* GNB */}
      <nav className="flex items-center justify-between px-8 h-[60px] bg-[var(--bg)] border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-[var(--text-correct)]">
            <line x1="7" y1="0" x2="7" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="0" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="2" y1="2" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="12" y1="2" x2="2" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span className="font-semibold text-[16px] text-[var(--text-correct)]">Font History</span>
        </div>
        <span className="text-[14px] font-semibold text-[var(--text-correct)]">History archive</span>
      </nav>

      {/* 폰트 선택 헤더 */}
      <header className="flex items-stretch px-8 h-[80px] bg-[var(--bg)] border-b border-[var(--border-subtle)]">
        {/* 폰트 선택 드롭다운 버튼 */}
        <div className="relative flex items-stretch">
          <button
            onClick={() => onOpenChange(!isOpen)}
            className="flex items-center gap-3 px-8 h-full bg-[var(--accent)] text-[var(--bg)]"
          >
            <span className={`text-3xl ${fontClassMap[selected.fontKey]}`}>{selected.name}</span>
            <svg
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            >
              <path d="M1 1L6 7L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 min-w-full bg-[var(--bg)] border border-[var(--border-subtle)] max-h-[60vh] overflow-y-auto">
              {Data.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(index)}
                  className={`w-full px-8 py-3 text-left text-sm text-[var(--text-correct)] transition-opacity hover:opacity-60 ${
                    index === selectedIndex ? "bg-[var(--border-subtle)]" : "bg-transparent"
                  }`}
                >
                  <span className={fontClassMap[item.fontKey]}>{item.name}</span>
                  <span className="ml-2 text-[var(--text-muted)]">{item.year}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 폰트 정보 */}
        <div className="flex items-center ml-[30px] text-[15px] text-[var(--text-muted)] gap-2">
          <span>{selected.designer ?? "Unknown"}</span>
          <span>·</span>
          <span>{selected.year}</span>
          <span>·</span>
          <span>{fontSubstituteMap[selected.fontKey]}</span>
        </div>
      </header>
    </div>
  );
}
