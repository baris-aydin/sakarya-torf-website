"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cx } from "@/lib/cx";
import type { NavItem } from "@/lib/site";

type NavDropdownProps = NavItem & {
  items: readonly NavItem[];
  active: boolean;
};

/**
 * Desktop dropdown. The label stays a normal link to its page; the menu opens
 * on hover, or from the chevron button for keyboard and touch users.
 */
export default function NavDropdown({ label, href, items, active }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuId = useId();

  // While opened by click: close on an outside press or Esc.
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      // Full header height, so the hover area runs unbroken into the menu.
      className="group relative flex h-full items-center"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={cx(
          "text-[0.95rem] whitespace-nowrap transition-colors hover:text-moss",
          active ? "font-medium text-moss" : "text-ink/75",
        )}
      >
        {label}
      </Link>

      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`${label} alt menüsü`}
        className="ml-0.5 flex size-6 items-center justify-center rounded text-ink/60 transition-colors hover:text-moss"
      >
        <ChevronDown
          className={cx(
            "size-4 transition-transform group-hover:rotate-180",
            open ? "rotate-180" : null,
          )}
          aria-hidden="true"
        />
      </button>

      {/* The top padding is a transparent bridge, so moving the pointer from
          the label down to the menu never leaves the hover area. */}
      <div
        className={cx(
          "absolute top-full left-1/2 z-50 -translate-x-1/2 pt-1 transition-[opacity,visibility] duration-150",
          open
            ? "visible opacity-100"
            : "invisible opacity-0 group-hover:visible group-hover:opacity-100",
        )}
      >
        <ul
          id={menuId}
          className="min-w-44 rounded-lg border border-line bg-white p-1.5 shadow-[0_8px_24px_rgba(18,61,42,0.12)]"
        >
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3.5 py-2 text-[0.95rem] whitespace-nowrap text-ink/80 transition-colors hover:bg-mist hover:text-moss"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
