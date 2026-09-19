import { isWithinOpeningHours, weekdayOf } from "@/lib/hours";
import { business, openingHours } from "@/lib/site";

export type ReservationFields = {
  name: string;
  people: string;
  date: string;
  time: string;
  email: string;
  phone: string;
  notes: string;
};

export type ReservationState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<keyof ReservationFields, string>>;
  values?: Partial<ReservationFields>;
};

export const MAX_PARTY_ONLINE = 12;

export function todayInLondon(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/London",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function validateReservation(values: ReservationFields, now = new Date()) {
  const errors: NonNullable<ReservationState["errors"]> = {};

  if (values.name.length < 2) errors.name = "Please tell us your name.";
  if (values.name.length > 80) errors.name = "That name looks a bit long.";

  const people = Number(values.people);
  if (!Number.isInteger(people) || people < 1) {
    errors.people = "How many people are coming?";
  } else if (people > MAX_PARTY_ONLINE) {
    errors.people = `For parties over ${MAX_PARTY_ONLINE}, please call us on ${business.phone}.`;
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(values.date)) {
    errors.date = "Please pick a date.";
  } else {
    const today = todayInLondon(now);
    if (values.date < today) {
      errors.date = "That date has already passed.";
    } else {
      const day = weekdayOf(values.date);
      if (openingHours[day].length === 0) {
        errors.date = `We're closed on ${day}s. We're open Tuesday to Saturday.`;
      }
    }
  }

  if (!/^\d{2}:\d{2}$/.test(values.time)) {
    errors.time = "Please pick a time.";
  } else if (!errors.date) {
    const day = weekdayOf(values.date);
    if (!isWithinOpeningHours(day, values.time)) {
      const periods = openingHours[day].map((p) => `${p.opens} to ${p.closes}`).join(" and ");
      errors.time = `On ${day}s we serve ${periods}. Last bookings are 30 minutes before closing.`;
    }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) || values.email.length > 120) {
    errors.email = "Please enter a valid email address.";
  }

  const digits = values.phone.replace(/[^\d+]/g, "");
  if (digits.length < 10 || digits.length > 16) {
    errors.phone = "Please enter a phone number we can reach you on.";
  }

  if (values.notes.length > 500) errors.notes = "Please keep notes under 500 characters.";

  return errors;
}
