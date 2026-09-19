/**
 * Renders a JSON-LD script tag. The payload is serialised with `<` escaped so
 * user-facing strings can never break out of the script element.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
       
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
