import { buildSystemPrompt } from "@/lib/systemPrompt";
import { NextRequest } from "next/server";

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL ?? "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL ?? "deepseek-v3.1:671b-cloud";
const OLLAMA_API_KEY = process.env.OLLAMA_API_KEY ?? "";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid request" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const ollamaMessages = [
      { role: "system", content: buildSystemPrompt() },
      ...messages.map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
    ];

    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (OLLAMA_API_KEY) headers["Authorization"] = `Bearer ${OLLAMA_API_KEY}`;

    const ollamaResponse = await fetch(`${OLLAMA_BASE_URL}/v1/chat/completions`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages: ollamaMessages,
        stream: true,
      }),
    });

    if (!ollamaResponse.ok) {
      const errText = await ollamaResponse.text();
      console.error(`Ollama error [${ollamaResponse.status}]:`, errText);
      console.error(`Request URL: ${OLLAMA_BASE_URL}/v1/chat/completions`);
      console.error(`Model: ${OLLAMA_MODEL}`);
      return new Response(
        JSON.stringify({
          error: "Model API error",
          status: ollamaResponse.status,
          detail: errText,
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    // Forward the SSE stream from Ollama, filtering out <think>...</think> blocks
    const readableStream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        const decoder = new TextDecoder();
        const reader = ollamaResponse.body!.getReader();
        let buffer = "";
        // State for filtering <think> blocks across chunks
        let thinkDepth = 0;
        let carry = ""; // leftover partial tag

        function filterThink(raw: string): string {
          let out = "";
          let s = carry + raw;
          carry = "";

          while (s.length > 0) {
            if (thinkDepth === 0) {
              const open = s.indexOf("<think>");
              if (open === -1) {
                // No opening tag — check for partial tag at end
                const partialMatch = s.match(/<t?h?i?n?k?>?$/);
                if (partialMatch) {
                  carry = partialMatch[0];
                  out += s.slice(0, s.length - carry.length);
                } else {
                  out += s;
                }
                break;
              }
              out += s.slice(0, open);
              s = s.slice(open + "<think>".length);
              thinkDepth = 1;
            } else {
              const close = s.indexOf("</think>");
              if (close === -1) {
                // Still inside <think>, swallow everything
                const partialClose = s.match(/<\/t?h?i?n?k?>?$/);
                if (partialClose) carry = partialClose[0];
                break;
              }
              s = s.slice(close + "</think>".length);
              thinkDepth = 0;
            }
          }
          return out;
        }

        try {
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
                const raw = parsed.choices?.[0]?.delta?.content;
                if (raw) {
                  const text = filterThink(raw);
                  if (text) {
                    controller.enqueue(
                      encoder.encode(`data: ${JSON.stringify({ text })}\n\n`)
                    );
                  }
                }
              } catch {
                // skip malformed chunks
              }
            }
          }
        } finally {
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
