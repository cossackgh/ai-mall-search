"use client";

import { useState, useEffect } from "react";
import ChatWindow from "./ChatWindow";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener("open-chat", handler);
    return () => window.removeEventListener("open-chat", handler);
  }, []);

  // Stop pulsing after first open
  useEffect(() => {
    if (isOpen) setPulse(false);
  }, [isOpen]);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat window */}
      {isOpen && (
        <div className="animate-slide-up">
          <ChatWindow onClose={() => setIsOpen(false)} />
        </div>
      )}

      {/* FAB button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative w-16 h-16 gradient-card rounded-full shadow-2xl shadow-primary/40
                     flex items-center justify-center text-white
                     hover:scale-110 transition-all duration-300 group"
          aria-label="Открыть чат с ассистентом"
        >
          {/* Pulse ring */}
          {pulse && (
            <div className="absolute inset-0 rounded-full gradient-card animate-ping opacity-30" />
          )}

          {/* Chat icon */}
          <svg
            className="w-7 h-7 relative z-10"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
            <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
          </svg>

          {/* Notification dot */}
          {pulse && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-mall-dark">
              !
            </div>
          )}

          {/* Tooltip */}
          <div
            className="absolute right-full mr-3 bg-mall-dark text-white text-sm font-medium
                         px-3 py-2 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100
                         transition-opacity pointer-events-none"
          >
            Спросить ассистента
          </div>
        </button>
      )}
    </div>
  );
}
