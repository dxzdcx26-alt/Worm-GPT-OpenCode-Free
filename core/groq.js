const fetch = globalThis.fetch
  ? globalThis.fetch.bind(globalThis)
  : (...args) =>
      import("node-fetch").then(({ default: fetch }) => fetch(...args));

// OpenCode Zen (free models)
const BASE_URL = "https://opencode.ai/zen/v1";
const DEFAULT_MODEL = "big-pickle";

async function askGroq(messages, apiKey, model = DEFAULT_MODEL) {
  const res = await fetch(`${BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.7
    })
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const detail = data && data.error && data.error.message;
    throw new Error(detail || `OpenCode Zen API error (${res.status})`);
  }

  const content = data && data.choices && data.choices[0] && data.choices[0].message
    ? data.choices[0].message.content
    : null;
  if (!content) throw new Error("OpenCode Zen API returned no content");

  return content;
}

async function testGroqKey(apiKey) {
  const res = await fetch(`${BASE_URL}/models`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${apiKey}`
    }
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const detail = data && data.error && data.error.message;
    return {
      ok: false,
      status: res.status,
      message: detail || `OpenCode Zen API error (${res.status})`
    };
  }

  return { ok: true, status: res.status };
}

module.exports = { askGroq, testGroqKey, DEFAULT_MODEL };
