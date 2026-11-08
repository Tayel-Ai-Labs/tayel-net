/**
 * The site-wide password gate, shared by proxy.ts and the /unlock routes.
 *
 * While the redesign is in progress the whole site sits behind one shared
 * password. The password lives only in the SITE_PASSWORD environment variable,
 * set in Vercel; it is never written to the repo.
 *
 * The cookie never carries the password. It carries an HMAC-SHA-256 keyed by
 * the password over a fixed label, so it proves knowledge of the password
 * without revealing it, and changing SITE_PASSWORD invalidates every cookie
 * already issued, which logs everyone out.
 *
 * Fails closed: with SITE_PASSWORD unset or blank there is no valid token, so
 * every request stays locked and every unlock attempt fails.
 *
 * Web Crypto only, so this runs in the Node and the edge runtime alike.
 */

export const GATE_COOKIE = "tayel_gate";
export const UNLOCK_PATH = "/unlock";
export const VERIFY_PATH = "/unlock/verify";

/** 30 days. */
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

/** Bump the version to force everyone to re-enter the password. */
const TOKEN_LABEL = "tayel-site-gate:v1";

const encoder = new TextEncoder();

/**
 * The configured password, or null when the gate has nothing to compare
 * against. Surrounding whitespace is dropped on both sides of the comparison,
 * so a stray space pasted into Vercel or added by a phone keyboard does not
 * lock anyone out.
 */
function configuredPassword(): string | null {
  const value = process.env.SITE_PASSWORD?.trim();
  return value ? value : null;
}

async function tokenFor(password: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const mac = await crypto.subtle.sign("HMAC", key, encoder.encode(TOKEN_LABEL));
  return Array.from(new Uint8Array(mac), (b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Compares two strings without returning early on the first difference, so
 * response time does not reveal how much of a guess was right. Both inputs
 * here are fixed-length hex digests; a length mismatch is still handled.
 */
function constantTimeEqual(a: string, b: string): boolean {
  const length = Math.max(a.length, b.length);
  let diff = a.length ^ b.length;
  for (let i = 0; i < length; i++) {
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return diff === 0;
}

/** The cookie value a correct password earns, or null if the gate is unset. */
export async function expectedToken(): Promise<string | null> {
  const password = configuredPassword();
  return password ? tokenFor(password) : null;
}

/** True only when the cookie matches the current SITE_PASSWORD. */
export async function isUnlocked(cookieValue: string | undefined): Promise<boolean> {
  const expected = await expectedToken();
  if (!expected || !cookieValue) return false;
  return constantTimeEqual(cookieValue, expected);
}

/**
 * Checks a submitted password. Both sides are reduced to the same HMAC before
 * comparing, so the comparison is fixed-length and constant-time.
 */
export async function checkPassword(submitted: string): Promise<boolean> {
  const expected = await expectedToken();
  const guess = submitted.trim();
  if (!expected || !guess) return false;
  return constantTimeEqual(await tokenFor(guess), expected);
}

/**
 * Cookie attributes for a request. On tayel.net and any of its subdomains the
 * cookie is scoped to .tayel.net, so one unlock covers the front page and all
 * five divisions. Elsewhere (Vercel previews, localhost) it stays host-only.
 * Secure everywhere except plain-http localhost, where browsers would drop a
 * Secure cookie.
 *
 * The host comes from the Host header, the name the browser actually asked
 * for; request.nextUrl can report the server's own bind address instead.
 */
export function cookieOptions(request: { headers: Headers; nextUrl: URL }) {
  const hostHeader = request.headers.get("host") ?? request.nextUrl.host;
  const host = hostHeader.toLowerCase().replace(/:\d+$/, "");
  const onTayel = host === "tayel.net" || host.endsWith(".tayel.net");
  const isLocalHttp =
    request.nextUrl.protocol === "http:" &&
    (host === "localhost" || host === "127.0.0.1" || host === "[::1]");

  return {
    httpOnly: true,
    secure: !isLocalHttp,
    sameSite: "lax" as const,
    path: "/",
    maxAge: MAX_AGE_SECONDS,
    ...(onTayel ? { domain: ".tayel.net" } : {}),
  };
}

/**
 * Where to send the visitor after unlocking. Only a same-site path is
 * accepted; anything that could leave the site (absolute URLs,
 * protocol-relative //host, backslash tricks, control characters) falls back
 * to the home page, as does a loop back into /unlock itself.
 */
export function safeNextPath(raw: string | null | undefined): string {
  if (!raw || raw.length > 2048) return "/";
  if (!raw.startsWith("/") || raw.startsWith("//")) return "/";
  if (/[\\\u0000-\u001f\u007f]/.test(raw)) return "/";

  const base = "http://gate.invalid";
  let parsed: URL;
  try {
    parsed = new URL(raw, base);
  } catch {
    return "/";
  }
  if (parsed.origin !== base) return "/";
  if (parsed.pathname === UNLOCK_PATH || parsed.pathname.startsWith(`${UNLOCK_PATH}/`)) {
    return "/";
  }
  return `${parsed.pathname}${parsed.search}${parsed.hash}`;
}
