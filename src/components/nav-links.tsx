"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/site";

export function NavLinks({
  orientation = "horizontal",
  onNavigate,
}: {
  orientation?: "horizontal" | "vertical";
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <ul
      className={
        orientation === "horizontal"
          ? "flex items-center gap-1"
          : "flex flex-col gap-1"
      }
    >
      {navigation.map((item) => {
        const isActive =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={isActive ? "page" : undefined}
              className={
                orientation === "horizontal"
                  ? `rounded-full px-3.5 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                      isActive
                        ? "bg-sea-900/5 text-sea-900"
                        : "text-pebble-600 hover:bg-sea-900/5 hover:text-sea-900"
                    }`
                  : `block rounded-xl px-4 py-3 text-lg font-medium transition-colors ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`
              }
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
