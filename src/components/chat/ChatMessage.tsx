import { Message } from "@/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import BookingCard from "./BookingCard";

const BOOKING_RE = /<!--BOOKING:(\{[\s\S]*?\})-->/;

type BookingData = { restaurant: string; slots: string[] };

function parseContent(content: string): { text: string; booking: BookingData | null } {
  const match = content.match(BOOKING_RE);
  if (!match) return { text: content, booking: null };
  try {
    return {
      text: content.replace(BOOKING_RE, "").trimEnd(),
      booking: JSON.parse(match[1]) as BookingData,
    };
  } catch {
    return { text: content, booking: null };
  }
}

export default function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === "user";

  if (!message.content) return null;

  const { text, booking } = isUser
    ? { text: message.content, booking: null }
    : parseContent(message.content);

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} animate-fade-in`}
    >
      {!isUser && (
        <div className="w-7 h-7 gradient-card rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-1">
          <span className="text-white text-xs font-bold">Г</span>
        </div>
      )}
      <div
        className={`max-w-[88%] sm:max-w-[78%] px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? "bg-primary text-white rounded-br-md"
            : "bg-white text-gray-800 rounded-bl-md shadow-sm border border-gray-100"
        }`}
      >
        {isUser ? (
          text
        ) : (
          <>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                strong: ({ children }) => (
                  <strong className="font-semibold">{children}</strong>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside space-y-0.5 mb-2 last:mb-0">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside space-y-0.5 mb-2 last:mb-0">
                    {children}
                  </ol>
                ),
                li: ({ children }) => <li className="leading-snug">{children}</li>,
                h3: ({ children }) => (
                  <h3 className="font-bold mt-2 mb-1">{children}</h3>
                ),
                h4: ({ children }) => (
                  <h4 className="font-semibold mt-1.5 mb-0.5">{children}</h4>
                ),
                code: ({ children }) => (
                  <code className="bg-gray-100 px-1 rounded text-xs font-mono">
                    {children}
                  </code>
                ),
              }}
            >
              {text}
            </ReactMarkdown>
            {booking && (
              <BookingCard restaurant={booking.restaurant} slots={booking.slots} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
