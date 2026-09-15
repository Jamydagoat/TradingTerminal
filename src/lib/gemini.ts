/**
 * Gemini model ids move quickly. The id is configurable so a deprecation is a
 * env var change rather than a redeploy of code, and failures surface the real
 * API message instead of being swallowed — a wrong model id should be obvious.
 */
const DEFAULT_MODEL = "gemini-3.6-flash";

export function hasGeminiKey() {
  return Boolean(process.env.GEMINI_API_KEY);
}

export type GeminiResult =
  | { ok: true; text: string }
  | { ok: false; error: string };

export async function generateJson(prompt: string): Promise<GeminiResult> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return { ok: false, error: "GEMINI_API_KEY is not set" };

  const model = process.env.GEMINI_MODEL || DEFAULT_MODEL;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-goog-api-key": key,
      },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          // Generous headroom: the 3.x models reason by default and those
          // tokens draw from the same budget, so a tight cap gets spent on
          // thinking and returns an empty candidate.
          maxOutputTokens: 2048,
          responseMimeType: "application/json",
        },
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      const body = await res.text();
      return { ok: false, error: `Gemini ${res.status}: ${body.slice(0, 300)}` };
    }

    const json = (await res.json()) as {
      candidates?: {
        content?: { parts?: { text?: string }[] };
        finishReason?: string;
      }[];
      promptFeedback?: { blockReason?: string };
    };

    const candidate = json.candidates?.[0];
    const text = candidate?.content?.parts?.map((p) => p.text ?? "").join("") || "";

    if (!text) {
      // Name the reason — an empty candidate is usually MAX_TOKENS (budget
      // spent on reasoning) or a safety block, and those need different fixes.
      const reason =
        json.promptFeedback?.blockReason ?? candidate?.finishReason ?? "unknown";
      return { ok: false, error: `Gemini returned no content (${reason})` };
    }

    return { ok: true, text };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Request failed" };
  }
}
