"use client";

import { useActionState, useEffect, useRef } from "react";
import { CheckIcon } from "@/components/icons";
import { MAX_PARTY_ONLINE, type ReservationState } from "@/lib/reservation";
import { business } from "@/lib/site";
import { submitReservation } from "./actions";

const initialState: ReservationState = { status: "idle" };

export function ReservationForm() {
  const [state, formAction, pending] = useActionState(submitReservation, initialState);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="card p-8 outline-none"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <CheckIcon className="h-6 w-6" />
        </div>
        <h2 className="mt-5 text-2xl">Request received</h2>
        <p className="mt-3 leading-relaxed text-pebble-800">{state.message}</p>
        <p className="mt-4 text-sm text-pebble-600">
          Need to change anything? Call {business.phone}.
        </p>
      </div>
    );
  }

  const v = state.values ?? {};
  const e = state.errors ?? {};

  return (
    <form action={formAction} noValidate className="card p-6 sm:p-8">
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
          <input
            id="people"
            name="people"
            type="number"
            inputMode="numeric"
            min={1}
            max={MAX_PARTY_ONLINE}
            required
            defaultValue={v.people ?? "2"}
            aria-invalid={Boolean(e.people)}
            aria-describedby={e.people ? "people-error" : "people-hint"}
            className="field"
          />
          {e.people ? (
            <p id="people-error" className="field-error">
              {e.people}
            </p>
          ) : (
            <p id="people-hint" className="mt-1.5 text-xs text-pebble-600">
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
            defaultValue={v.date}
            aria-invalid={Boolean(e.date)}
            aria-describedby={e.date ? "date-error" : "date-hint"}
            className="field"
          />
          {e.date ? (
            <p id="date-error" className="field-error">
              {e.date}
            </p>
          ) : (
            <p id="date-hint" className="mt-1.5 text-xs text-pebble-600">
              We&rsquo;re open Tuesday to Saturday.
            </p>
          )}
        </div>

        <div>
          <label htmlFor="time" className="field-label">
            Time
          </label>
          <input
            id="time"
            name="time"
            type="time"
            step={900}
            min="11:30"
            max="21:30"
            required
            defaultValue={v.time}
            aria-invalid={Boolean(e.time)}
            aria-describedby={e.time ? "time-error" : "time-hint"}
            className="field"
          />
          {e.time ? (
            <p id="time-error" className="field-error">
              {e.time}
            </p>
          ) : (
            <p id="time-hint" className="mt-1.5 text-xs text-pebble-600">
              Tue to Thu: 11:30 to 14:30 and 17:00 to 22:00. Fri and Sat: 11:30 to 22:00.
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

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-pebble-600">
          We only use these details to manage your booking. See our{" "}
          <a href="/privacy-policy" className="underline underline-offset-2">
            privacy policy
          </a>
          .
        </p>
        <button type="submit" disabled={pending} className="btn-primary disabled:opacity-60">
          {pending ? "Sending…" : "Request a table"}
        </button>
      </div>
    </form>
  );
}
