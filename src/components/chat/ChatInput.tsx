"use client";

import { useState, KeyboardEvent, useRef, useEffect } from "react";

interface Props {
  onSend: (text: string) => void;
  isLoading: boolean;
}

export default function ChatInput({ onSend, isLoading }: Props) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-grow textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [value]);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setValue("");
    // Reset height after clearing
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-100 bg-white px-4 py-3">
      <div className="flex items-end gap-3">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          placeholder="Задайте вопрос о ТРЦ..."
          rows={1}
          aria-label="Введите сообщение"
          className="flex-1 resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm
                     text-gray-800 placeholder-gray-400
                     focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20
                     transition-colors disabled:bg-gray-50 overflow-hidden leading-relaxed"
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !value.trim()}
          aria-label="Отправить сообщение"
          className="w-10 h-10 gradient-card rounded-xl flex items-center justify-center text-white
                     disabled:opacity-40 disabled:cursor-not-allowed
                     hover:opacity-90 active:scale-95 transition-all duration-150
                     flex-shrink-0"
        >
          <svg
            className="w-4 h-4"
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
      <p className="text-xs text-gray-400 mt-2 px-1">
        Enter — отправить · Shift+Enter — новая строка
      </p>
    </div>
  );
}
