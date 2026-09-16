import { getAuthState } from "@/lib/auth";

const ERRORS: Record<string, string> = {
  not_allowed: "That account is not on the access list.",
  bad_state: "Sign-in request expired. Please try again.",
  unverified_email: "That Google account has no verified email address.",
  no_code: "Google did not return an authorization code.",
  token_exchange_failed: "Could not complete sign-in with Google.",
  no_access_token: "Could not complete sign-in with Google.",
  userinfo_failed: "Could not read your Google account details.",
  callback_failed: "Sign-in failed. Please try again.",
};

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const params = await searchParams;
  const raw = params?.error;
  const errorKey = Array.isArray(raw) ? raw[0] : raw;
  const message = errorKey ? (ERRORS[errorKey] ?? "Sign-in failed.") : null;
  const auth = getAuthState();

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-md border border-border bg-surface p-6">
        <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
          Trading Terminal
        </div>
        <h1 className="mt-1 text-lg font-semibold tracking-tight">Sign in</h1>
        <p className="mt-2 text-[13px] leading-relaxed text-muted">
          This dashboard is private. Sign in with an approved Google account to
          continue.
        </p>

        {message && (
          <div className="mt-4 rounded border border-down/40 bg-down/10 px-3 py-2 text-[12px] text-down">
            {message}
          </div>
        )}

        {auth.mode === "enforced" ? (
          <a
            href="/api/auth/login"
            className="mt-5 flex h-9 items-center justify-center rounded border border-accent/50 bg-accent/10 text-xs font-semibold uppercase tracking-[0.08em] text-accent transition-colors hover:bg-accent/20"
          >
            Continue with Google
          </a>
        ) : (
          <div className="mt-5 text-[12px] text-faint">
            Google sign-in is not configured on this deployment.
          </div>
        )}
      </div>
    </div>
  );
}
