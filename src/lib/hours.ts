import { openingHours, type DayOfWeek, type OpeningPeriod } from "@/lib/site";

const DAYS: DayOfWeek[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/** Returns { day, minutes } for `date` in the Europe/London time zone. */
export function londonNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const weekday = parts.find((p) => p.type === "weekday")?.value as DayOfWeek;
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0) % 24;
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  return { day: weekday, minutes: hour * 60 + minute };
}

export function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export function formatTime12h(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${hour12}${suffix}` : `${hour12}:${String(m).padStart(2, "0")}${suffix}`;
}

export type OpenStatus =
  | { open: true; closesAt: string }
  | { open: false; opensAt: string; opensDay: DayOfWeek | "today" };

/** Whether the restaurant is open at the given instant, and the next change. */
export function getOpenStatus(date = new Date()): OpenStatus {
  const { day, minutes } = londonNow(date);
  const todayPeriods = openingHours[day];

  for (const p of todayPeriods) {
    if (minutes >= toMinutes(p.opens) && minutes < toMinutes(p.closes)) {
      return { open: true, closesAt: p.closes };
    }
  }

  const later = todayPeriods.find((p) => toMinutes(p.opens) > minutes);
  if (later) return { open: false, opensAt: later.opens, opensDay: "today" };

  // Look ahead up to a week for the next opening.
  let index = DAYS.indexOf(day);
  for (let i = 1; i <= 7; i++) {
    index = (index + 1) % 7;
    const next = DAYS[index];
    const first: OpeningPeriod | undefined = openingHours[next][0];
    if (first) return { open: false, opensAt: first.opens, opensDay: next };
  }
  return { open: false, opensAt: "11:30", opensDay: "Tuesday" };
}

/** Is a given weekday + "HH:MM" time inside opening hours? Used to validate bookings. */
export function isWithinOpeningHours(day: DayOfWeek, hhmm: string) {
  const t = toMinutes(hhmm);
  return openingHours[day].some((p) => t >= toMinutes(p.opens) && t <= toMinutes(p.closes) - 30);
}

export function weekdayOf(isoDate: string): DayOfWeek {
  // isoDate is YYYY-MM-DD; construct at noon UTC to avoid DST edge cases.
  const d = new Date(`${isoDate}T12:00:00Z`);
  return DAYS[d.getUTCDay()];
}
