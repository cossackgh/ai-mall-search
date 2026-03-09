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

  if (!isOpen) return null;

  return (
    <ChatWindow
      onClose={handleClose}
      pendingMessage={pendingMessage}
    />
  );
}
