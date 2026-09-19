import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { graph, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { business, formatAddress } from "@/lib/site";

const description =
  "How Sea Pebbles handles the personal information you give us when you book a table, contact us or use this website.";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: "/privacy-policy",
            name: "Sea Pebbles privacy policy",
            description,
          }),
        )}
      />
      <PageHero
        eyebrow="Legal"
        title="Privacy policy"
        intro="We keep this short because we collect very little."
        crumbs={[{ name: "Privacy Policy", path: "/privacy-policy" }]}
      />

      <article className="container-site prose-site max-w-3xl">
        <h2 className="!mt-0">Who we are</h2>
        <p>
          {business.name}, {formatAddress()}. If you have a question about your data, email{" "}
          <a href={`mailto:${business.email}`}>{business.email}</a> or call{" "}
          <a href={`tel:${business.phoneIntl}`}>{business.phone}</a>.
        </p>

        <h2>What we collect and why</h2>
        <p>
          When you request a table through this website we ask for your name, the size of your party,
          the date and time, an email address and a phone number, plus any notes you choose to add.
          We use these only to manage your booking and to contact you about it. The legal basis is
          that the processing is necessary to take steps at your request before entering into a
          contract with you.
        </p>
        <p>
          If you email or call us, we use your details to reply. We do not add you to a marketing list
          and we do not send newsletters.
        </p>

        <h2>Who else sees it</h2>
        <p>
          Booking requests are delivered to us as email through a transactional email provider that
          acts as our processor. Nobody else receives your details, and we never sell or share them
          for marketing.
        </p>
        <p>
          Online ordering and delivery are handled by third parties (our direct ordering provider,
          Uber Eats, Deliveroo and the App Store). When you order through them, their privacy policies
          apply to the information you give them.
        </p>

        <h2>Cookies and analytics</h2>
        <p>
          This website does not set tracking cookies and does not use advertising or analytics
          scripts. The map on the contact page is embedded from Google Maps and Google may set its own
          cookies when that map loads; see Google&rsquo;s privacy policy for details.
        </p>

        <h2>How long we keep it</h2>
        <p>
          Booking emails are kept for up to twelve months so we can deal with any follow-up, then
          deleted. General enquiries are deleted once they have been dealt with.
        </p>

        <h2>Your rights</h2>
        <p>
          Under UK data protection law you can ask to see the personal information we hold about
          you, ask us to correct or delete it, or object to how we use it. Email{" "}
          <a href={`mailto:${business.email}`}>{business.email}</a> and we will respond within a
          month. If you are unhappy with our response you can complain to the Information
          Commissioner&rsquo;s Office at ico.org.uk.
        </p>

        <h2>Changes</h2>
        <p>
          If we change how we handle personal information we will update this page. It was last
          reviewed in September 2026.
        </p>
      </article>
    </>
  );
}
