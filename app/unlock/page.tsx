import type { Metadata } from "next";
import { ArrowRight, CircleAlert, LockKeyhole } from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";
import { VERIFY_PATH, safeNextPath } from "@/lib/gate";

/**
 * The only page a visitor without the unlock cookie can reach. proxy.ts sends
 * every other request here with the original path in ?next=.
 *
 * Auth screens are not in the DS file (DESIGN-SYSTEM.md section 10, item 5),
 * so this is assembled from what is: Form (single column, radius/xl card),
 * Input (label above, violet focus, red border + helper on error) and
 * Alert/Error. It is a plain form POST, so it works with JavaScript off.
 */

export const metadata: Metadata = {
  title: "Private preview",
  description: `${site.name} is being rebuilt.`,
  robots: { index: false, follow: false },
};

export default async function UnlockPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const next = safeNextPath(typeof params.next === "string" ? params.next : null);
  const hasError = params.error === "1";

  return (
    <main className="relative grid min-h-dvh place-items-center bg-page px-4 py-16">
      <div className="absolute end-4 top-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-[420px]">
        <div className="rounded-2xl border border-line bg-surface p-8 shadow-lg md:p-10">
          <div className="flex flex-col items-center text-center">
            <Logo className="h-20 w-20" spinning />
            <p className="mt-4 text-overline text-ink-muted">{site.name}</p>
            <h1 className="mt-3 text-h4 text-ink">We are rebuilding.</h1>
            <p className="mt-3 text-balance text-body-md text-ink-soft">
              The new site is taking shape behind this door. If you have the
              password, come on in.
            </p>
            <p dir="rtl" lang="ar" className="mt-2 text-body-md text-ink-soft">
              نعيد بناء الموقع حاليًا. أدخل كلمة المرور للمتابعة.
            </p>
          </div>

          <form method="post" action={VERIFY_PATH} className="mt-8">
            <input type="hidden" name="next" value={next} />

            {hasError && (
              <div
                id="unlock-error"
                role="alert"
                className="mb-5 flex items-start gap-3 rounded-xl border border-line-error-subtle bg-ground-error p-4"
              >
                <CircleAlert size={20} aria-hidden className="mt-px shrink-0 text-ink-error" />
                <div>
                  <p className="text-label-md text-ink-error">Wrong password</p>
                  <p className="mt-1 text-body-sm text-ink-soft">
                    That did not match. Check it and try again.
                  </p>
                </div>
              </div>
            )}

            <label htmlFor="password" className="block text-label-md text-ink">
              Password
            </label>
            <div className="relative mt-2">
              <LockKeyhole
                size={18}
                aria-hidden
                className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-ink-muted"
              />
              <input
                id="password"
                name="password"
                type="password"
                required
                autoFocus
                autoComplete="current-password"
                aria-invalid={hasError || undefined}
                aria-describedby={hasError ? "unlock-error" : undefined}
                className={`h-12 w-full rounded-lg border bg-surface ps-11 pe-4 text-body-lg text-ink transition-colors placeholder:text-ink-muted hover:border-line-strong focus:border-focus ${
                  hasError ? "border-line-error" : "border-line"
                }`}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="mt-6 w-full"
              trailing={<ArrowRight size={18} aria-hidden />}
            >
              Unlock
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-body-sm text-ink-muted">
          Need access?{" "}
          <a href={`mailto:${site.email}`} className="text-ink-soft underline underline-offset-4 hover:text-ink">
            {site.email}
          </a>
        </p>
      </div>
    </main>
  );
}
