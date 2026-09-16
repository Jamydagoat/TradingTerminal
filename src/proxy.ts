import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, getAuthState, verifySessionValue } from "@/lib/auth";

/**
 * Next 16 renamed the `middleware` convention to `proxy`; the export name
 * matters, an exported `middleware` here is simply never invoked.
 *
 * Guarding here rather than per-route means the API routes are covered too, so
 * nobody outside the allow-list can burn the Finnhub or Gemini quota by
 * hitting /api/* directly.
 */
export async function proxy(request: NextRequest) {
  const auth = getAuthState();

  if (auth.mode === "disabled") return NextResponse.next();

  if (auth.mode === "misconfigured") {
    // Partial config is an operator mistake, so fail closed — an owner who
    // believes the dashboard is private should never find it open because one
    // variable failed to load.
    return new NextResponse(
      `Auth is partially configured. Missing: ${auth.missing.join(", ")}`,
      { status: 500, headers: { "content-type": "text/plain" } }
    );
  }

  const email = await verifySessionValue(
    request.cookies.get(SESSION_COOKIE)?.value,
    auth.config.secret
  );
  if (email) return NextResponse.next();

  // API callers get a status they can act on; humans get the sign-in page.
  if (request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const url = new URL("/login", request.url);
  return NextResponse.redirect(url);
}

export const config = {
  // Everything except the auth endpoints themselves, the sign-in page, and
  // Next's static output — those must stay reachable while signed out.
  matcher: ["/((?!api/auth|login|_next/static|_next/image|favicon.ico).*)"],
};
