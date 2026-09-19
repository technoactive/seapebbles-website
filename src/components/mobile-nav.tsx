"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { CloseIcon, MenuIcon, PhoneIcon } from "@/components/icons";
import { NavLinks } from "@/components/nav-links";
import { business } from "@/lib/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls={panelId}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full text-sea-900 hover:bg-sea-900/5"
      >
        <MenuIcon className="h-6 w-6" />
        <span className="sr-only">Open menu</span>
      </button>

      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-50 flex flex-col bg-sea-900 text-white"
        >
          <div className="flex h-16 items-center justify-between px-5 sm:h-20 sm:px-8">
            <span className="font-display text-xl font-semibold">Sea Pebbles</span>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10"
            >
              <CloseIcon className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>

          <nav aria-label="Primary" className="flex-1 overflow-y-auto px-5 py-4 sm:px-8">
            <NavLinks orientation="vertical" onNavigate={() => setOpen(false)} />
          </nav>

          <div className="space-y-3 border-t border-white/10 px-5 py-5 sm:px-8">
            <Link
              href="/reserve"
              onClick={() => setOpen(false)}
              className="btn-light w-full"
            >
              Book a table
            </Link>
            <a href={`tel:${business.phoneIntl}`} className="btn-outline-light w-full">
              <PhoneIcon className="h-4 w-4" />
              Call {business.phone}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
