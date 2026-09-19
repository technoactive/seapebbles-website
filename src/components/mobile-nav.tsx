"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CloseIcon, MenuIcon, PhoneIcon } from "@/components/icons";
import { NavLinks } from "@/components/nav-links";
import { business } from "@/lib/site";

/**
 * Full-screen navigation for phones and tablets.
 *
 * Uses a native <dialog> opened with showModal() so the panel lives in the
 * browser's top layer. That matters here: the sticky header uses
 * backdrop-filter, which makes it the containing block for any fixed-position
 * descendant, so a plain `position: fixed` overlay would be clipped to the
 * header's height. The top layer is immune to that, and we get focus
 * trapping, Escape-to-close and inert background for free.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full text-sea-900 hover:bg-sea-900/5"
      >
        <MenuIcon className="h-6 w-6" />
        <span className="sr-only">Open menu</span>
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Site navigation"
        onClose={close}
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-sea-900 p-0 text-white backdrop:bg-transparent open:flex open:flex-col"
      >
        <div className="flex h-[4.5rem] shrink-0 items-center justify-between px-5 sm:h-20 sm:px-8">
          <Link href="/" onClick={close} className="flex items-center gap-3" aria-label={`${business.name} home`}>
            <Image src="/images/logo-white.png" alt="" width={80} height={60} className="h-12 w-auto" />
            <span className="font-display text-xl font-semibold">Sea Pebbles</span>
          </Link>
          <button
            type="button"
            onClick={close}
            autoFocus
            className="inline-flex h-11 w-11 items-center justify-center rounded-full outline-none hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <CloseIcon className="h-6 w-6" />
            <span className="sr-only">Close menu</span>
          </button>
        </div>

        <nav aria-label="Primary" className="flex-1 overflow-y-auto px-5 py-4 sm:px-8">
          <NavLinks orientation="vertical" onNavigate={close} />
        </nav>

        <div className="shrink-0 space-y-3 border-t border-white/10 px-5 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-8">
          <Link href="/reserve" onClick={close} className="btn-light w-full">
            Book a table
          </Link>
          <a href={`tel:${business.phoneIntl}`} className="btn-outline-light w-full">
            <PhoneIcon className="h-4 w-4" />
            Call {business.phone}
          </a>
        </div>
      </dialog>
    </div>
  );
}
