/**
 * Gemini model ids move quickly. The id is configurable so a deprecation is a
 * env var change rather than a redeploy of code, and failures surface the real
 * API message instead of being swallowed — a wrong model id should be obvious.
 */
const DEFAULT_MODEL = "gemini-2.5-flash";

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
          maxOutputTokens: 900,
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
      candidates?: { content?: { parts?: { text?: string }[] } }[];
    };
    const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return { ok: false, error: "Gemini returned no content" };

    return { ok: true, text };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Request failed" };
  }
}
