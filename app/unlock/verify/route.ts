import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { GATE_COOKIE, UNLOCK_PATH, checkPassword, cookieOptions, expectedToken, safeNextPath } from "@/lib/gate";

/**
 * Receives the /unlock form. A plain form POST, so it works with JavaScript
 * off. Right password: set the cookie and 303 back to the page the visitor
 * asked for. Wrong password: 303 to /unlock with an error flag.
 */

/** Slows down guessing without bothering anyone who types it right. */
const FAILURE_DELAY_MS = 600;

/**
 * A 303 with a relative Location, so the browser stays on whichever host it
 * submitted from. Building an absolute URL from request.url can pick up the
 * server's bind address instead of the public host.
 */
function seeOther(location: string): NextResponse {
  return new NextResponse(null, {
    status: 303,
    headers: { Location: location, "Cache-Control": "private, no-store" },
  });
}

export async function POST(request: NextRequest) {
  let password = "";
  let nextRaw: string | null = null;
  try {
    const form = await request.formData();
    password = String(form.get("password") ?? "");
    nextRaw = form.get("next") ? String(form.get("next")) : null;
  } catch {
    /* not a form body, treated as a wrong password */
  }

  const next = safeNextPath(nextRaw);

  if (await checkPassword(password)) {
    const token = await expectedToken();
    const response = seeOther(next);
    response.cookies.set(GATE_COOKIE, token!, cookieOptions(request));
    return response;
  }

  if (!process.env.SITE_PASSWORD?.trim()) {
    console.warn("[gate] SITE_PASSWORD is not set; the site is locked for everyone.");
  }

  await new Promise((resolve) => setTimeout(resolve, FAILURE_DELAY_MS));

  const query = new URLSearchParams({ error: "1" });
  if (next !== "/") query.set("next", next);
  return seeOther(`${UNLOCK_PATH}?${query}`);
}

/** The form is the only way in; a GET here just goes back to it. */
export function GET() {
  return seeOther(UNLOCK_PATH);
}
