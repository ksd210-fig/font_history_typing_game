"use client";

import { useState } from "react";
import { Data } from "../database";

interface HamburgerMenuProps {
    onSelectData: (index: number) => void;
}

export default function HamburgerMenu({ onSelectData }: HamburgerMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleItemClick = (index: number) => {
        onSelectData(index);
        setIsOpen(false);
    };

    return (
        <>
            <button
                id="hamburger-menu-button"
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-8 right-8 z-50 text-white text-2xl"
            >
                {isOpen ? "✕" : "☰"}
            </button>

            {isOpen && (
                <div className="fixed top-0 right-0 h-full w-64 bg-black border-l border-white/20 z-40 p-8 pt-24">
                    <nav className="flex flex-col gap-4 text-white">
                        {Data.map((item, index) => (
                            <button
                                key={item.id}
                                onClick={() => handleItemClick(index)}
                                className="text-left hover:text-gray-400"
                            >
                                {item.name} ({item.year})
                            </button>
                        ))}
                    </nav>
                </div>
            )}
        </>
    );
}
