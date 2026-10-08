"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import BrandMark from "@/components/BrandMark";
import Container from "@/components/Container";
import NavDropdown from "@/components/NavDropdown";
import { cx } from "@/lib/cx";
import { navLinks, site } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  /** href of the expanded mobile group, if any. */
  const [expanded, setExpanded] = useState<string | null>(null);
  const [lastPathname, setLastPathname] = useState(pathname);

  // Close the mobile sheet whenever the route changes, including on back/forward.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
    setExpanded(null);
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
            className="hidden items-center gap-8 self-stretch lg:flex"
          >
            {navLinks.map((link) =>
              link.children ? (
                <NavDropdown
                  key={link.href}
                  label={link.label}
                  href={link.href}
                  items={link.children}
                  active={isActive(link.href)}
                />
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cx(
                    "text-[0.95rem] whitespace-nowrap transition-colors hover:text-moss",
                    isActive(link.href)
                      ? "font-medium text-moss"
                      : "text-ink/75",
                  )}
                >
                  {link.label}
                </Link>
              ),
            )}
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
              {navLinks.map((link) =>
                link.children ? (
                  // No hover on touch: the label navigates, the chevron
                  // expands the nested links.
                  <div key={link.href} className="border-b border-line/70">
                    <div className="flex items-center justify-between gap-4">
                      <Link
                        href={link.href}
                        aria-current={isActive(link.href) ? "page" : undefined}
                        onClick={() => setOpen(false)}
                        className={cx(
                          "flex-1 py-3.5 text-base",
                          isActive(link.href)
                            ? "font-medium text-moss"
                            : "text-ink/80",
                        )}
                      >
                        {link.label}
                      </Link>
                      <button
                        type="button"
                        onClick={() =>
                          setExpanded((value) =>
                            value === link.href ? null : link.href,
                          )
                        }
                        aria-expanded={expanded === link.href}
                        aria-controls={`mobile-nav-${link.href.slice(1)}`}
                        aria-label={`${link.label} alt menüsü`}
                        className="-mr-2 flex size-10 items-center justify-center rounded-md text-ink/70 transition-colors hover:bg-mist"
                      >
                        <ChevronDown
                          className={cx(
                            "size-5 transition-transform",
                            expanded === link.href ? "rotate-180" : null,
                          )}
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                    <ul
                      id={`mobile-nav-${link.href.slice(1)}`}
                      hidden={expanded !== link.href}
                      className="mb-3 ml-1 border-l border-line pl-4"
                    >
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => setOpen(false)}
                            className="block py-2.5 text-[0.95rem] text-ink/70 transition-colors hover:text-moss"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
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
                ),
              )}
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
