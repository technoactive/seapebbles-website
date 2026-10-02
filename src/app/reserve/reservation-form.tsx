"use client";

import { useActionState, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { formatTime12h, weekdayOf } from "@/lib/hours";
import {
  MAX_PARTY_ONLINE,
  bookingTimeSlots,
  todayInLondon,
  type ReservationState,
} from "@/lib/reservation";
import { openingHours } from "@/lib/site";
import { submitReservation } from "./actions";

const initialState: ReservationState = { status: "idle" };

const subscribeNoop = () => () => {};

const partySizes = Array.from({ length: MAX_PARTY_ONLINE }, (_, i) => i + 1);

export function ReservationForm() {
  const [state, formAction, pending] = useActionState(submitReservation, initialState);
  const statusRef = useRef<HTMLDivElement>(null);

  const v = state.values ?? {};
  const e = state.errors ?? {};

  // The page is prerendered, so "today" has to be worked out in the browser.
  const minDate = useSyncExternalStore(
    subscribeNoop,
    () => todayInLondon(),
    () => undefined,
  );

  // Controlled so the time picker can follow the chosen day; the value
  // survives a failed submit because the component is not remounted.
  const [date, setDate] = useState(v.date ?? "");

  useEffect(() => {
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state]);

  const day = /^\d{4}-\d{2}-\d{2}$/.test(date) ? weekdayOf(date) : null;
  const closedDay = day !== null && openingHours[day].length === 0;
  const slotGroups = useMemo(() => bookingTimeSlots(closedDay ? null : day), [day, closedDay]);

  return (
    <form action={formAction} noValidate className="card p-5 sm:p-8">
      <div className="mb-6">
        <h2 className="text-2xl">Request a table</h2>
        <p className="mt-1.5 text-sm text-pebble-600">
          Takes under a minute. We confirm by phone or email.
        </p>
      </div>

      {state.status === "error" && state.message && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 outline-none"
        >
          {state.message}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="name" className="field-label">
            Your name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            autoCapitalize="words"
            required
            defaultValue={v.name}
            aria-invalid={Boolean(e.name)}
            aria-describedby={e.name ? "name-error" : undefined}
            className="field"
          />
          {e.name && (
            <p id="name-error" className="field-error">
              {e.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="people" className="field-label">
            Number of people
          </label>
          <select
            id="people"
            name="people"
            required
            defaultValue={v.people ?? "2"}
            aria-invalid={Boolean(e.people)}
            aria-describedby={e.people ? "people-error" : "people-hint"}
            className="field field-select"
          >
            {partySizes.map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "person" : "people"}
              </option>
            ))}
          </select>
          {e.people ? (
            <p id="people-error" className="field-error">
              {e.people}
            </p>
          ) : (
            <p id="people-hint" className="field-hint">
              Groups over {MAX_PARTY_ONLINE}? Please call us.
            </p>
          )}
        </div>

        <div>
          <label htmlFor="date" className="field-label">
            Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            required
            min={minDate}
            value={date}
            onChange={(event) => setDate(event.target.value)}
            aria-invalid={Boolean(e.date) || closedDay}
            aria-describedby={e.date ? "date-error" : "date-hint"}
            className="field field-date"
          />
          {e.date ? (
            <p id="date-error" className="field-error">
              {e.date}
            </p>
          ) : closedDay ? (
            <p id="date-hint" className="field-error">
              We&rsquo;re closed on {day}s. We&rsquo;re open Tuesday to Saturday.
            </p>
          ) : (
            <p id="date-hint" className="field-hint">
              {day ? `${day}: ${describeDay(day)}.` : "We\u2019re open Tuesday to Saturday."}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="time" className="field-label">
            Time
          </label>
          <select
            id="time"
            name="time"
            required
            defaultValue={v.time ?? ""}
            aria-invalid={Boolean(e.time)}
            aria-describedby={e.time ? "time-error" : "time-hint"}
            className="field field-select"
          >
            <option value="">Choose a time</option>
            {slotGroups.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.slots.map((slot) => (
                  <option key={slot.value} value={slot.value}>
                    {slot.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          {e.time ? (
            <p id="time-error" className="field-error">
              {e.time}
            </p>
          ) : (
            <p id="time-hint" className="field-hint">
              Last bookings 30 minutes before closing.
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="field-label">
            Phone number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            required
            defaultValue={v.phone}
            aria-invalid={Boolean(e.phone)}
            aria-describedby={e.phone ? "phone-error" : undefined}
            className="field"
          />
          {e.phone && (
            <p id="phone-error" className="field-error">
              {e.phone}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="email" className="field-label">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            autoCapitalize="none"
            spellCheck={false}
            required
            defaultValue={v.email}
            aria-invalid={Boolean(e.email)}
            aria-describedby={e.email ? "email-error" : undefined}
            className="field"
          />
          {e.email && (
            <p id="email-error" className="field-error">
              {e.email}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="notes" className="field-label">
            Anything we should know? <span className="font-normal text-pebble-600">(optional)</span>
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            maxLength={500}
            defaultValue={v.notes}
            placeholder="High chair, birthday, wheelchair access, allergies..."
            aria-invalid={Boolean(e.notes)}
            aria-describedby={e.notes ? "notes-error" : undefined}
            className="field resize-y"
          />
          {e.notes && (
            <p id="notes-error" className="field-error">
              {e.notes}
            </p>
          )}
        </div>

        {/* Honeypot; hidden from people, tempting to bots */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      <div className="mt-8 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-pebble-600">
          We only use these details to manage your booking. See our{" "}
          <a href="/privacy-policy" className="underline underline-offset-2">
            privacy policy
          </a>
          .
        </p>
        <button
          type="submit"
          disabled={pending}
          className="btn-primary w-full disabled:opacity-60 sm:w-auto"
        >
          {pending ? "Sending…" : "Request a table"}
        </button>
      </div>
    </form>
  );
}

function describeDay(day: keyof typeof openingHours) {
  return openingHours[day]
    .map((p) => `${formatTime12h(p.opens)} to ${formatTime12h(p.closes)}`)
    .join(" and ");
}
