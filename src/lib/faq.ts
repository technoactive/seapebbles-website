export type FaqItem = {
  question: string;
  answer: string;
};

/**
 * Plain-text answers are used for FAQPage structured data and llms.txt, so keep
 * them free of markup. The FAQ page renders links separately where useful.
 */
export const faqs: FaqItem[] = [
  {
    question: "Do you take reservations?",
    answer:
      "Yes. You can book a table online through our reservations page or call us on 020 8428 0203 during opening hours. We confirm every booking by phone or email.",
  },
  {
    question: "What are your opening hours?",
    answer:
      "Tuesday to Thursday we are open 11:30am to 2:30pm and 5:00pm to 10:00pm. Friday and Saturday we are open all day from 11:30am to 10:00pm. We are closed on Sunday and Monday. Bank holiday and seasonal hours are posted on the website and on Google Maps nearer the time.",
  },
  {
    question: "Where are you?",
    answer:
      "348-352 Uxbridge Road, Hatch End, Pinner, HA5 4HR. We are on the main road through Hatch End, a few minutes' walk from Hatch End station.",
  },
  {
    question: "Is there parking nearby?",
    answer:
      "There is local parking on and around Uxbridge Road, and Hatch End is well served by buses. Hatch End station on the Overground (Watford DC line) is a short walk away.",
  },
  {
    question: "Can I order takeaway or delivery?",
    answer:
      "Yes. You can collect from the shop, order directly through our own online ordering system or the Sea Pebbles app, or have food delivered via Uber Eats or Deliveroo.",
  },
  {
    question: "Do you have vegetarian, vegan or gluten-free options?",
    answer:
      "We have a full vegetarian section on the menu, including falafel, halloumi burgers, vegetable spring rolls and a vegetarian omelette. If you have a specific dietary need, speak to a member of the team before ordering and we will tell you exactly what we can do.",
  },
  {
    question: "I have a food allergy. What should I do?",
    answer:
      "Please tell a member of the team about any allergy or intolerance before you order, whether you are eating in, collecting or ordering online. Our battered products and chips contain fish and gluten (wheat), our matzo meal products contain egg, and our mayonnaise and tartare sauce contain egg. All desserts contain milk.",
  },
  {
    question: "How is the fish cooked?",
    answer:
      "You can have it fried in traditional batter, fried in egg and matzo meal, or grilled. Grilled fish takes a little longer. Every main comes with chips, boiled new potatoes, rice or a small mixed salad, plus homemade tartare sauce.",
  },
  {
    question: "Are children welcome?",
    answer:
      "Very much so. We have high chairs and a kids menu, and every kids meal includes a fruit juice and vanilla ice cream.",
  },
  {
    question: "Are you licensed?",
    answer:
      "Yes, we have a full bar with wine, beer, cider, spirits and soft drinks. There is a Cypriot lager on the list, and a Prosecco if you are celebrating.",
  },
  {
    question: "How do I cancel or change a reservation?",
    answer:
      "Plans change, and we understand. Please call us on 020 8428 0203 as early as you can so we can offer the table to someone else.",
  },
  {
    question: "Are you on social media?",
    answer:
      "Yes. Follow @seapebblesofficial on Instagram and Sea Pebbles Hatch End on Facebook for seasonal menus, opening hour changes and news from the restaurant.",
  },
];
