"use client";

import { useState, KeyboardEvent, useRef, useEffect } from "react";

const QUICK_QUESTIONS = [
  "Где кинотеатр?",
  "Магазины со скидками",
  "Парковка",
  "Часы работы",
  "Как добраться?",
];

interface Props {
  onSend: (text: string) => void;
  isLoading: boolean;
}

export default function ChatInput({ onSend, isLoading }: Props) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 96)}px`;
    }
  }, [value]);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-100 bg-white">
      {/* Quick questions chips */}
      <div className="flex gap-2 px-3 pt-2 pb-1 overflow-x-auto scrollbar-hide">
        {QUICK_QUESTIONS.map((q) => (
          <button
            key={q}
            onClick={() => onSend(q)}
            disabled={isLoading}
            className="flex-shrink-0 text-xs text-primary border border-primary/30 hover:bg-primary/5
                       rounded-full px-3 py-1 transition-colors disabled:opacity-40 whitespace-nowrap"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input row */}
      <div className="flex items-end gap-2 px-3 pb-3 pt-1">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          placeholder="Задайте вопрос о ТРЦ..."
          rows={1}
          className="flex-1 resize-none rounded-xl border border-gray-200 px-3 py-2 text-sm
                     text-gray-800 placeholder-gray-400 focus:outline-none focus:border-primary
                     transition-colors disabled:bg-gray-50 overflow-hidden"
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !value.trim()}
          className="w-9 h-9 gradient-card rounded-xl flex items-center justify-center text-white
                     disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity
                     flex-shrink-0"
        >
          <svg
            className="w-4 h-4 rotate-90"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
