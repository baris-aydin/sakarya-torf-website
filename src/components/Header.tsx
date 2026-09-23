"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import BrandMark from "@/components/BrandMark";
import Container from "@/components/Container";
import { cx } from "@/lib/cx";
import { navLinks, site } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  // Close the mobile sheet whenever the route changes, including on back/forward.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  // Anchor links live on the homepage, so only the page routes get an active state.
  const isActive = (href: string) =>
    !href.includes("#") && pathname === href;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream/95 backdrop-blur-sm">
      <Container>
        <div className="flex h-[4.75rem] items-center justify-between gap-6">
          <Link href="/" aria-label={`${site.name} ana sayfa`}>
            <BrandMark />
          </Link>

          <nav
            aria-label="Ana menü"
            className="hidden items-center gap-8 lg:flex"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cx(
                  "text-[0.95rem] transition-colors hover:text-moss",
                  isActive(link.href)
                    ? "font-medium text-moss"
                    : "text-ink/75",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/satin-al"
              className="hidden rounded-md bg-moss px-7 py-2.5 text-[0.95rem] font-medium text-white transition-colors hover:bg-moss-dark sm:inline-flex"
            >
              Satın Al
            </Link>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
              className="flex size-10 items-center justify-center rounded-md border border-line text-ink transition-colors hover:bg-mist lg:hidden"
            >
              {open ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </Container>

      {open ? (
        <div id="mobile-nav" className="border-t border-line bg-cream lg:hidden">
          <Container>
            <nav aria-label="Mobil menü" className="flex flex-col py-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={cx(
                    "border-b border-line/70 py-3.5 text-base last:border-b-0",
                    isActive(link.href)
                      ? "font-medium text-moss"
                      : "text-ink/80",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/satin-al"
                onClick={() => setOpen(false)}
                className="mt-4 mb-2 rounded-md bg-moss px-6 py-3 text-center text-base font-medium text-white sm:hidden"
              >
                Satın Al
              </Link>
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
