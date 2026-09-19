/**
 * Quotes from public Google reviews shown on the previous site.
 * These are displayed as plain testimonials only. Per Google's structured data
 * policy, self-serving Review or AggregateRating markup is not added for a
 * LocalBusiness, so nothing here is emitted as schema.
 */
export type Testimonial = {
  quote: string;
  author: string;
  date: string; // ISO date
  source: "Google";
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Delicious food as always! Thank you, Alexandra, and my favourite chef, Florin, who always knows exactly how I like my fish. Special respect to George and the whole team.",
    author: "Ioana T.",
    date: "2026-06-19",
    source: "Google",
  },
  {
    quote: "Best fish restaurant in the world! Amazing service. Can not say anything bad about this place. Family friendly too.",
    author: "Mohamed M.",
    date: "2026-06-20",
    source: "Google",
  },
  {
    quote: "Brilliant chippy, exceptional staff.",
    author: "Nimish K.",
    date: "2026-06-24",
    source: "Google",
  },
  {
    quote: "Every time we order from Sea Pebbles we have a great fish and chips.",
    author: "S. B.",
    date: "2026-07-05",
    source: "Google",
  },
  {
    quote: "Lovely dining experience yet again, with lovely staff and great atmosphere.",
    author: "Patrick B.",
    date: "2026-06-18",
    source: "Google",
  },
  {
    quote: "I've never been disappointed. The food is always good and so is the standard of service.",
    author: "Patricia C.",
    date: "2026-06-18",
    source: "Google",
  },
];
