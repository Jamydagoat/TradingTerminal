import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuthState } from "@/lib/auth";

export const revalidate = 0;

const STATE_COOKIE = "tt_oauth_state";

export async function GET(request: NextRequest) {
  const auth = getAuthState();
  if (auth.mode !== "enforced") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Random state, echoed back by Google and compared on the callback — this is
  // what stops a third party from replaying a callback against this session.
  const state = crypto.randomUUID();
  const redirectUri = new URL("/api/auth/callback", request.nextUrl.origin).toString();

  const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authUrl.searchParams.set("client_id", auth.config.clientId);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", "openid email profile");
  authUrl.searchParams.set("state", state);
  authUrl.searchParams.set("prompt", "select_account");

  const res = NextResponse.redirect(authUrl.toString());
  res.headers.append(
    "Set-Cookie",
    `${STATE_COOKIE}=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`
  );
  return res;
}
