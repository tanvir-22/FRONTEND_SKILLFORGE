const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Streams the assistant's reply over SSE, calling onDelta(text) as chunks
// arrive. `messages` is the plain {role, content} history — the backend
// prepends its own system prompt.
export async function streamChat(messages, { onDelta, signal } = {}) {
  const res = await fetch(`${BACKEND_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
    signal,
  });

  if (!res.ok || !res.body) {
    throw new Error("Failed to reach the AI assistant");
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const chunks = buffer.split("\n\n");
    buffer = chunks.pop() ?? "";

    for (const chunk of chunks) {
      const line = chunk.trim();
      if (!line.startsWith("data:")) continue;
      const payload = line.slice(5).trim();
      if (payload === "[DONE]") return;

      try {
        const parsed = JSON.parse(payload);
        if (parsed.delta) onDelta(parsed.delta);
      } catch {
        // Ignore a malformed/partial chunk — the stream continues.
      }
    }
  }
}

export async function getFollowUpSuggestions(lastUserMessage, lastAssistantMessage) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/chat/suggestions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lastUserMessage, lastAssistantMessage }),
    });
    if (!res.ok) return [];
    const data = await res.json().catch(() => null);
    return data?.suggestions ?? [];
  } catch {
    return [];
  }
}
