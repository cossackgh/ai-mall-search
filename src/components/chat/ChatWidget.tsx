"use client";

import { useState, useEffect } from "react";
import ChatWindow from "./ChatWindow";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingMessage, setPendingMessage] = useState<string | undefined>();

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ message?: string } | undefined>).detail;
      const msg = detail?.message?.trim() || undefined;
      setPendingMessage(msg);
      setIsOpen(true);
    };
    window.addEventListener("open-chat", handler);
    return () => window.removeEventListener("open-chat", handler);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setPendingMessage(undefined);
  };

  return (
    <>
      {/* Mobile FAB — bottom-right, hidden on desktop */}
      {!isOpen && (
        <div className="lg:hidden fixed bottom-6 right-4 z-40">
          {/* Soft glow ring */}
          <span className="absolute inset-[-4px] rounded-full bg-violet-400/30 animate-ping" style={{ animationDuration: "2.5s" }} />

          <button
            onClick={() => setIsOpen(true)}
            className="relative w-14 h-14 rounded-full overflow-hidden shadow-2xl active:scale-95 transition-transform ring-2 ring-white/10"
            aria-label="Открыть чат-ассистент"
          >
            <svg viewBox="0 0 56 56" width="56" height="56" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <clipPath id="fab-clip">
                  <circle cx="28" cy="28" r="28" />
                </clipPath>
                {/* Gooey merge filter */}
                <filter id="fab-goo" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                  <feColorMatrix in="blur" mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"
                    result="goo" />
                </filter>
              </defs>

              {/* Violet background ~80% */}
              <circle cx="28" cy="28" r="28" fill="#4c1d95" fillOpacity="0.8" />

              {/* Blobs */}
              <g clipPath="url(#fab-clip)" filter="url(#fab-goo)">
                {/* Violet */}
                <circle cx="22" cy="24" r="17" fill="#7C3AED">
                  <animate attributeName="cx" values="22;32;20;22" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1" />
                  <animate attributeName="cy" values="24;20;34;24" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1" />
                  <animate attributeName="r" values="17;14;19;17" dur="4s" repeatCount="indefinite" />
                </circle>
                {/* Gold */}
                <circle cx="36" cy="22" r="13" fill="#F59E0B">
                  <animate attributeName="cx" values="36;22;38;36" dur="3.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1" />
                  <animate attributeName="cy" values="22;34;18;22" dur="3.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1" />
                  <animate attributeName="r" values="13;16;11;13" dur="3.6s" repeatCount="indefinite" />
                </circle>
                {/* Pink */}
                <circle cx="28" cy="37" r="12" fill="#DB2777">
                  <animate attributeName="cx" values="28;18;36;28" dur="5s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1" />
                  <animate attributeName="cy" values="37;26;40;37" dur="5s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1" />
                  <animate attributeName="r" values="12;15;10;12" dur="5s" repeatCount="indefinite" />
                </circle>
              </g>
            </svg>
          </button>
        </div>
      )}

      {isOpen && (
        <ChatWindow
          onClose={handleClose}
          pendingMessage={pendingMessage}
        />
      )}
    </>
  );
}
