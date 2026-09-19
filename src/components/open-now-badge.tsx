"use client";

import { useEffect, useState } from "react";
import { formatTime12h, getOpenStatus, type OpenStatus } from "@/lib/hours";

/**
 * Computed on the client after mount so the page can be fully prerendered
 * and the badge still reflects the visitor's actual time.
 */
export function OpenNowBadge({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState<OpenStatus | null>(null);

  useEffect(() => {
    const update = () => setStatus(getOpenStatus());
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  if (!status) {
    return <span className={`inline-block h-6 w-40 rounded-full bg-white/10 ${className}`} aria-hidden />;
  }

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
        status.open ? "bg-emerald-500/15 text-emerald-100" : "bg-white/10 text-white/80"
      } ${className}`}
    >
      <span
        className={`h-2 w-2 rounded-full ${status.open ? "bg-emerald-400" : "bg-white/50"}`}
        aria-hidden
      />
      {status.open
        ? `Open now · closes ${formatTime12h(status.closesAt)}`
        : `Closed · opens ${status.opensDay === "today" ? "" : `${status.opensDay} `}${formatTime12h(status.opensAt)}`}
    </span>
  );
}
