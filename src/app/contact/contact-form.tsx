"use client";

import { useActionState, useEffect, useRef } from "react";
import { contactTopics, type ContactState } from "@/lib/contact";
import { submitContact } from "./actions";

const initialState: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialState);
  const alertRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.status === "error") alertRef.current?.focus();
  }, [state]);

  const v = state.values ?? {};
  const e = state.errors ?? {};

  return (
    <form action={formAction} noValidate className="card p-6 sm:p-8">
      <h2 className="text-2xl">Send us a message</h2>
      <p className="mt-2 text-sm text-pebble-600">
        We reply within a day or so. For a table today, please phone instead.
      </p>

      {state.status === "error" && state.message && (
        <div
          ref={alertRef}
          tabIndex={-1}
          role="alert"
          className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 outline-none"
        >
          {state.message}
        </div>
      )}

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="field-label">
            Your name
          </label>
          <input
            id="c-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            defaultValue={v.name}
            aria-invalid={Boolean(e.name)}
            aria-describedby={e.name ? "c-name-error" : undefined}
            className="field"
          />
          {e.name && (
            <p id="c-name-error" className="field-error">
              {e.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="c-email" className="field-label">
            Email address
          </label>
          <input
            id="c-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={v.email}
            aria-invalid={Boolean(e.email)}
            aria-describedby={e.email ? "c-email-error" : undefined}
            className="field"
          />
          {e.email && (
            <p id="c-email-error" className="field-error">
              {e.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="c-phone" className="field-label">
            Phone <span className="font-normal text-pebble-600">(optional)</span>
          </label>
          <input
            id="c-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            defaultValue={v.phone}
            aria-invalid={Boolean(e.phone)}
            aria-describedby={e.phone ? "c-phone-error" : undefined}
            className="field"
          />
          {e.phone && (
            <p id="c-phone-error" className="field-error">
              {e.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="c-topic" className="field-label">
            What&rsquo;s it about?
          </label>
          <select
            id="c-topic"
            name="topic"
            required
            defaultValue={v.topic ?? "general"}
            aria-invalid={Boolean(e.topic)}
            aria-describedby={e.topic ? "c-topic-error" : undefined}
            className="field"
          >
            {contactTopics.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          {e.topic && (
            <p id="c-topic-error" className="field-error">
              {e.topic}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="c-message" className="field-label">
            Your message
          </label>
          <textarea
            id="c-message"
            name="message"
            rows={5}
            maxLength={2000}
            required
            defaultValue={v.message}
            placeholder="Tell us how we can help..."
            aria-invalid={Boolean(e.message)}
            aria-describedby={e.message ? "c-message-error" : undefined}
            className="field resize-y"
          />
          {e.message && (
            <p id="c-message-error" className="field-error">
              {e.message}
            </p>
          )}
        </div>

        {/* Honeypot; hidden from people, tempting to bots */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="c-website">Website</label>
          <input id="c-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-pebble-600">
          We only use these details to reply to you. See our{" "}
          <a href="/privacy-policy" className="underline underline-offset-2">
            privacy policy
          </a>
          .
        </p>
        <button type="submit" disabled={pending} className="btn-primary disabled:opacity-60">
          {pending ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
