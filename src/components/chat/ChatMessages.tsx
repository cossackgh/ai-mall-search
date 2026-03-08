"use client";

import { useEffect, useRef } from "react";
import { Message } from "@/types";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";

interface Props {
  messages: Message[];
  isLoading: boolean;
}

export default function ChatMessages({ messages, isLoading }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const showTyping =
    isLoading &&
    messages.length > 0 &&
    messages[messages.length - 1].content === "";

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-surface/50">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
      {showTyping && <TypingIndicator />}
      <div ref={bottomRef} />
    </div>
  );
}
