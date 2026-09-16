import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  createSessionValue,
  getAuthState,
  isEmailAllowed,
  sessionCookie,
  SESSION_MAX_AGE,
} from "@/lib/auth";

export const revalidate = 0;

const STATE_COOKIE = "tt_oauth_state";

function deny(request: NextRequest, reason: string) {
  const url = new URL("/login", request.url);
  url.searchParams.set("error", reason);
  const res = NextResponse.redirect(url);
  res.headers.append("Set-Cookie", `${STATE_COOKIE}=; Path=/; HttpOnly; Secure; Max-Age=0`);
  return res;
}

export async function GET(request: NextRequest) {
  const auth = getAuthState();
  if (auth.mode !== "enforced") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const expectedState = request.cookies.get(STATE_COOKIE)?.value;

  if (!code) return deny(request, "no_code");
  if (!state || !expectedState || state !== expectedState) {
    return deny(request, "bad_state");
  }

  try {
    const redirectUri = new URL("/api/auth/callback", request.nextUrl.origin).toString();

    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: auth.config.clientId,
        client_secret: auth.config.clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenRes.ok) return deny(request, "token_exchange_failed");
    const tokens = (await tokenRes.json()) as { access_token?: string };
    if (!tokens.access_token) return deny(request, "no_access_token");

    // Ask Google directly rather than decoding the id_token locally: this
    // avoids hand-rolling JWT signature verification, and the answer comes
    // over TLS from the issuer itself.
    const userRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    if (!userRes.ok) return deny(request, "userinfo_failed");

    const user = (await userRes.json()) as { email?: string; email_verified?: boolean };
    if (!user.email || user.email_verified === false) return deny(request, "unverified_email");
    if (!isEmailAllowed(user.email, auth.config.allowList)) return deny(request, "not_allowed");

    const value = await createSessionValue(user.email.toLowerCase(), auth.config.secret);
    const res = NextResponse.redirect(new URL("/", request.url));
    res.headers.append("Set-Cookie", sessionCookie(value, SESSION_MAX_AGE));
    res.headers.append("Set-Cookie", `${STATE_COOKIE}=; Path=/; HttpOnly; Secure; Max-Age=0`);
    return res;
  } catch {
    return deny(request, "callback_failed");
  }
}
