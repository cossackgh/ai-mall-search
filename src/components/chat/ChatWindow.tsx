"use client";

import { useState, useCallback } from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { Message, ApiMessage } from "@/types";

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Привет! Я ассистент ТРЦ «Галактика» 🌌\n\nЯ знаю всё о нашем торговом центре: магазины, рестораны, кинотеатр, акции, парковку и многое другое. Чем могу помочь?",
  timestamp: new Date(),
};

export default function ChatWindow({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: text.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      // Build history: skip welcome message, include all real messages
      const apiMessages: ApiMessage[] = [
        ...messages
          .filter((m) => m.id !== "welcome")
          .map((m) => ({ role: m.role, content: m.content })),
        { role: "user", content: text.trim() },
      ];

      // Placeholder for streaming response
      const assistantId = `a-${Date.now()}`;
      setMessages((prev) => [
        ...prev,
        {
          id: assistantId,
          role: "assistant",
          content: "",
          timestamp: new Date(),
        },
      ]);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: apiMessages }),
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const reader = response.body!.getReader();
        const decoder = new TextDecoder();
        let fullText = "";
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const data = line.slice(6).trim();
            if (data === "[DONE]") continue;
            try {
              const parsed = JSON.parse(data);
              if (parsed.text) {
                fullText += parsed.text;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantId ? { ...m, content: fullText } : m
                  )
                );
              }
            } catch {
              // skip malformed
            }
          }
        }

        // If empty response
        if (!fullText) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? {
                    ...m,
                    content:
                      "Извините, не удалось получить ответ. Попробуйте ещё раз.",
                  }
                : m
            )
          );
        }
      } catch {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content:
                    "Извините, произошла ошибка соединения. Попробуйте ещё раз.",
                }
              : m
          )
        );
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading]
  );

  return (
    <div className="w-[calc(100vw-2rem)] sm:w-[380px] h-[70vh] sm:h-[560px] max-h-[600px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="gradient-primary px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 gradient-card rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm font-bold">Г</span>
          </div>
          <div>
            <p className="text-white font-semibold text-sm">
              Ассистент Галактики
            </p>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <p className="text-white/70 text-xs">Онлайн</p>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white/70 hover:text-white transition-colors p-1"
          aria-label="Закрыть чат"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <ChatMessages messages={messages} isLoading={isLoading} />
      <ChatInput onSend={sendMessage} isLoading={isLoading} />
    </div>
  );
}
