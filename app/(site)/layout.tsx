import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

/**
 * Chrome for the public pages. Lives in the (site) route group so /unlock can
 * render without a nav full of links it is not allowed to follow yet. The
 * group does not change any URL.
 */
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-100 focus:rounded-lg focus:bg-action focus:px-4 focus:py-2 focus:text-label-md focus:text-ink-inverse"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
