"use client";

// Usage example:
// <SearchBar size="lg" placeholder="Найти магазин, ресторан, услугу..." />
// <SearchBar size="sm" placeholder="Поиск по ТРЦ..." className="w-full max-w-xs" />

import { useState, KeyboardEvent } from "react";

interface Props {
  placeholder?: string;
  size?: "sm" | "lg";
  className?: string;
}

export default function SearchBar({
  placeholder = "Спросите об ассистенте ТРЦ «Галактика»...",
  size = "lg",
  className = "",
}: Props) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    window.dispatchEvent(
      new CustomEvent("open-chat", { detail: { message: trimmed } })
    );
    setValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const isLg = size === "lg";

  return (
    <div
      className={`relative flex items-center w-full ${className}`}
      role="search"
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-label="Поиск по ТРЦ «Галактика»"
        className={`
          w-full rounded-full border border-white/20 bg-white/10 backdrop-blur-sm
          text-white placeholder-white/50
          focus:outline-none focus:border-white/50 focus:bg-white/15
          transition-all duration-200
          ${isLg ? "py-4 pl-6 pr-14 text-base" : "py-2 pl-4 pr-10 text-sm"}
        `}
      />
      <button
        onClick={handleSubmit}
        disabled={!value.trim()}
        aria-label="Отправить запрос"
        className={`
          absolute right-2 flex items-center justify-center rounded-full
          gradient-card text-white
          hover:opacity-90 active:scale-95 transition-all duration-150
          disabled:opacity-40 disabled:cursor-not-allowed
          ${isLg ? "w-10 h-10" : "w-7 h-7"}
        `}
      >
        {/* Paper plane SVG */}
        <svg
          className={isLg ? "w-5 h-5" : "w-3.5 h-3.5"}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </button>
    </div>
  );
}
