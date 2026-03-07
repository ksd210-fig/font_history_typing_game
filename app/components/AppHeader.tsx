"use client";

import { Data } from "../database";
import { fontClassMap } from "../fonts";

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
      <nav className="flex items-center justify-between px-20 h-[79px] bg-[var(--bg)] border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-[17px] text-[var(--text-correct)]">
            Font History
          </span>
        </div>
        <span className="font-semibold text-[14px] text-[var(--text-correct)]">
          History archive
        </span>
      </nav>

      {/* 폰트 선택 헤더 */}
      <header className="flex items-stretch px-20 h-[80px] bg-[var(--bg)] border-b border-[var(--border-subtle)]">
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
            <div className="absolute top-full left-0 min-w-full bg-[var(--bg)] border border-[var(--border-subtle)]">
              {Data.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(index)}
                  className={`w-full px-8 py-3 text-left text-sm text-[var(--text-correct)] transition-opacity hover:opacity-60 ${
                    index === selectedIndex ? "bg-[var(--border-subtle)]" : "bg-transparent"
                  }`}
                >
                  <span className={fontClassMap[item.fontKey]}>{item.name}</span>
                  <span className="ml-2 text-[var(--text-muted)]">
                    {item.year}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 폰트 정보 */}
        <div className="flex items-center ml-[30px] text-[16px] gap-1 text-[var(--text-correct)]">
          <span>{selected.designer ?? "Unknown"}</span>
          <span className="text-[var(--text-muted)]">·</span>
          <span>{selected.year}</span>
        </div>
      </header>
    </div>
  );
}
