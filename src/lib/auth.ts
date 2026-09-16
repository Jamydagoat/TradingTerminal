/**
 * Google OAuth with an email allow-list, backed by an HMAC-signed cookie.
 *
 * Deliberately dependency-free: the surface needed here (one provider, no user
 * store, no roles) is small enough that a well-understood 150 lines beats a
 * beta dependency that cannot be exercised against the Workers runtime.
 */

export const SESSION_COOKIE = "tt_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

export type AuthConfig = {
  clientId: string;
  clientSecret: string;
  secret: string;
  allowList: string[];
};

/**
 * Three states, deliberately: fully configured enforces auth, nothing
 * configured leaves the app open for local development, and a partial config
 * is treated as a mistake and fails closed rather than silently unlocking a
 * dashboard the owner believes is private.
 */
export type AuthState =
  | { mode: "enforced"; config: AuthConfig }
  | { mode: "disabled" }
  | { mode: "misconfigured"; missing: string[] };

export function getAuthState(): AuthState {
  const clientId = process.env.GOOGLE_CLIENT_ID ?? "";
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET ?? "";
  const secret = process.env.AUTH_SECRET ?? "";
  const allowRaw = process.env.AUTH_ALLOWED_EMAILS ?? "";

  const present = [clientId, clientSecret, secret].filter(Boolean).length;
  if (present === 0) return { mode: "disabled" };

  const missing: string[] = [];
  if (!clientId) missing.push("GOOGLE_CLIENT_ID");
  if (!clientSecret) missing.push("GOOGLE_CLIENT_SECRET");
  if (!secret) missing.push("AUTH_SECRET");
  if (missing.length > 0) return { mode: "misconfigured", missing };

  return {
    mode: "enforced",
    config: {
      clientId,
      clientSecret,
      secret,
      allowList: allowRaw
        .split(",")
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean),
    },
  };
}

export function isEmailAllowed(email: string, allowList: string[]): boolean {
  const normalized = email.trim().toLowerCase();
  if (allowList.length === 0) return false; // empty list allows nobody, never everybody
  return allowList.some((entry) =>
    entry.startsWith("@") ? normalized.endsWith(entry) : normalized === entry
  );
}

function base64url(bytes: ArrayBuffer | Uint8Array): string {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let bin = "";
  for (const b of arr) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function hmac(secret: string, payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return base64url(sig);
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function createSessionValue(email: string, secret: string): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = `${email}|${exp}`;
  const encoded = base64url(new TextEncoder().encode(payload));
  return `${encoded}.${await hmac(secret, encoded)}`;
}

export async function verifySessionValue(
  value: string | undefined,
  secret: string
): Promise<string | null> {
  if (!value) return null;
  const [encoded, signature] = value.split(".");
  if (!encoded || !signature) return null;

  const expected = await hmac(secret, encoded);
  if (!timingSafeEqual(signature, expected)) return null;

  let payload: string;
  try {
    const padded = encoded.replace(/-/g, "+").replace(/_/g, "/");
    payload = new TextDecoder().decode(
      Uint8Array.from(atob(padded), (c) => c.charCodeAt(0))
    );
  } catch {
    return null;
  }

  const [email, expRaw] = payload.split("|");
  const exp = Number(expRaw);
  if (!email || !Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return null;
  return email;
}

export function sessionCookie(value: string, maxAge: number): string {
  return [
    `${SESSION_COOKIE}=${value}`,
    "Path=/",
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
    `Max-Age=${maxAge}`,
  ].join("; ");
}

export const SESSION_MAX_AGE = SESSION_TTL_SECONDS;
