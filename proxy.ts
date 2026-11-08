import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { GATE_COOKIE, UNLOCK_PATH, VERIFY_PATH, isUnlocked, safeNextPath } from "@/lib/gate";

/**
 * Site-wide password gate. Every request to every host this deployment serves
 * (tayel.net, www, the division subdomains, Vercel previews) passes through
 * here, and only a valid unlock cookie lets it reach a page. See lib/gate.ts.
 *
 * Next 16 renamed middleware.ts to proxy.ts; the behaviour is the same.
 */

/** What /unlock needs to render and submit, reachable without the cookie. */
const OPEN_PATHS = new Set([UNLOCK_PATH, VERIFY_PATH, "/icon.svg", "/favicon.ico"]);

/** Locked responses must never be stored by a shared cache or indexed. */
function lockedHeaders(response: NextResponse): NextResponse {
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const unlocked = await isUnlocked(request.cookies.get(GATE_COOKIE)?.value);

  if (pathname === UNLOCK_PATH || pathname === VERIFY_PATH) {
    // Already in: skip the form and go where they were headed.
    if (unlocked && pathname === UNLOCK_PATH) {
      const target = safeNextPath(request.nextUrl.searchParams.get("next"));
      return NextResponse.redirect(new URL(target, request.url), 307);
    }
    return lockedHeaders(NextResponse.next());
  }

  if (unlocked || OPEN_PATHS.has(pathname)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = UNLOCK_PATH;
  url.search = "";
  const next = safeNextPath(`${pathname}${search}`);
  if (next !== "/") url.searchParams.set("next", next);

  // 307 keeps GET/HEAD as they are; anything else lands on the form as a GET.
  const status = request.method === "GET" || request.method === "HEAD" ? 307 : 303;
  return lockedHeaders(NextResponse.redirect(url, status));
}

export const config = {
  matcher: [
    /*
     * Everything except built static assets, which carry no content of their
     * own and which /unlock needs for its CSS, fonts and scripts.
     */
    "/((?!_next/static/).*)",
  ],
};
