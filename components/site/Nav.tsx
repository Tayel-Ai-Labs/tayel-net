"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { Logo } from "@/components/site/Logo";

/**
 * Top navigation.
 *
 * The DS navigation page was not usable, 18-navigation-bar.jpg is a duplicate
 * of the tooltip page, so Sidebar(2) / TopNav(4) / Mobile(4) are all unseen.
 * This is built from the DS primitives (Label/md, radius-lg, Elevation/sm,
 * semantic surface + line) and should be reconciled once that page is
 * re-exported. See DESIGN-SYSTEM.md section 10, item 1.
 */

const links = [
  { href: "/", label: "Home" },
  { href: "/#products", label: "Products" },
  { href: "/#models", label: "Models" },
  { href: "/#who-we-are", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [flipping, setFlipping] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/90 backdrop-blur-sm">
      <Container>
        <div className="flex h-18 items-center justify-between">
          <Link
            href="/"
            aria-label="Tayel AI Labs, home"
            className="flex items-center gap-3"
            onClick={() => setFlipping(true)}
          >
            <Logo
              className="h-9 w-9"
              spinning={flipping}
              onAnimationEnd={() => setFlipping(false)}
            />
            <span className="text-label-lg font-display text-ink">Tayel AI Labs</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-label-md text-ink-soft transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-ink-soft md:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="flex flex-col gap-1 pb-4 md:hidden">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-label-md text-ink-soft transition-colors hover:bg-subtle hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </Container>
    </header>
  );
}
