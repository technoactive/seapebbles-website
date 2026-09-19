"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { CloseIcon } from "@/components/icons";
import type { GalleryImage } from "@/lib/gallery";

type Filter = "all" | GalleryImage["category"];

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "Everything" },
  { value: "food", label: "Food" },
  { value: "desserts", label: "Desserts & drinks" },
  { value: "restaurant", label: "The restaurant" },
];

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const visible = filter === "all" ? images : images.filter((i) => i.category === filter);

  const close = useCallback(() => {
    dialogRef.current?.close();
    setActive(null);
  }, []);

  const step = useCallback(
    (delta: number) => {
      setActive((current) => {
        if (current === null) return current;
        return (current + delta + visible.length) % visible.length;
      });
    },
    [visible.length],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (active !== null && !dialog.open) dialog.showModal();
    if (active === null && dialog.open) dialog.close();
  }, [active]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, step]);

  const current = active !== null ? visible[active] : null;

  return (
    <div>
      <div role="group" aria-label="Filter photos" className="mb-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            aria-pressed={filter === f.value}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              filter === f.value
                ? "bg-sea-900 text-white"
                : "bg-white text-sea-900 ring-1 ring-sea-900/10 hover:bg-sand-100"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
        {visible.map((img, index) => (
          <li key={img.src} className="break-inside-avoid">
            <button
              type="button"
              onClick={() => setActive(index)}
              className="group block w-full overflow-hidden rounded-2xl bg-pebble-100 shadow-soft ring-1 ring-sea-900/5"
              aria-label={`Open photo: ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
                loading={index < 6 ? "eager" : "lazy"}
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={() => setActive(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        className="m-auto max-h-[100dvh] max-w-[100vw] bg-transparent p-0 backdrop:bg-sea-950/90 backdrop:backdrop-blur-sm"
        aria-label="Photo viewer"
      >
        {current && (
          <div className="relative flex h-[100dvh] w-[100vw] flex-col items-center justify-center p-4 sm:p-10">
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <CloseIcon className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </button>
            <figure className="flex max-h-full max-w-5xl flex-col items-center">
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                width={current.width}
                height={current.height}
                sizes="100vw"
                className="max-h-[80dvh] w-auto rounded-xl object-contain"
                priority
              />
              <figcaption className="mt-4 text-center text-sm text-white/80">{current.alt}</figcaption>
            </figure>
            <div className="mt-4 flex gap-3">
              <button type="button" onClick={() => step(-1)} className="btn-outline-light">
                Previous
              </button>
              <button type="button" onClick={() => step(1)} className="btn-outline-light">
                Next
              </button>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
