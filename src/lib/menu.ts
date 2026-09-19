/**
 * Menu data transcribed from the Sea Pebbles printed menus (July 2026 edition).
 * Prices are in GBP and include VAT. Keep this file in step with the PDFs in /public/menus.
 */

export type Dietary = "vegetarian" | "vegan-option" | "gluten-free-option";

export type MenuItem = {
  name: string;
  price?: number;
  /** Alternative price points, e.g. glass / bottle */
  prices?: { label: string; price: number }[];
  description?: string;
  dietary?: Dietary[];
  popular?: boolean;
};

export type MenuSection = {
  id: string;
  title: string;
  note?: string;
  items: MenuItem[];
};

export type MenuDocument = {
  slug: "main" | "lunch-deal" | "desserts" | "drinks";
  title: string;
  heading: string;
  intro: string;
  sections: MenuSection[];
  footnotes?: string[];
};

export const allergenNotice =
  "Our battered products and chips contain fish and gluten (wheat). Grilled fish contains fish and gluten (wheat) unless you ask us not to coat it in flour. Matzo meal products contain fish, gluten (wheat) and egg. Our mayonnaise and tartare sauce contain egg. All desserts contain milk; cheesecakes contain gluten (wheat) and milk. Please tell a member of the team about any allergy or intolerance before ordering.";

export const mainMenu: MenuDocument = {
  slug: "main",
  title: "Main Menu",
  heading: "Restaurant & Takeaway Menu",
  intro:
    "Every main course comes with your choice of chips, boiled new potatoes, rice or a small mixed salad, plus our homemade tartare sauce. Fish can be fried in traditional batter, in egg and matzo meal, or grilled. Grilled fish takes a little longer, so please allow for it.",
  sections: [
    {
      id: "cold-starters",
      title: "Cold Starters",
      items: [
        { name: "Smoked Salmon", price: 8.45 },
        { name: "Avocado with Prawns", price: 8.45 },
        { name: "Prawn Cocktail", price: 7.95, popular: true },
        { name: "Avocado Vinaigrette", price: 4.95, dietary: ["vegetarian"] },
        { name: "Duo of Greek Dips and Pitta", price: 6.95, dietary: ["vegetarian"] },
        { name: "Avocado with Smoked Salmon", price: 8.95 },
      ],
    },
    {
      id: "hot-starters",
      title: "Hot Starters",
      items: [
        { name: "Homemade Minestrone Soup", price: 5.45, dietary: ["vegetarian"] },
        { name: "Heinz Tomato Soup", price: 5.45, dietary: ["vegetarian"] },
        { name: "Vegetable Spring Roll", price: 5.95, dietary: ["vegetarian"] },
        { name: "Garlic Breaded Mushrooms", price: 5.95, dietary: ["vegetarian"] },
        { name: "Vegetarian Falafel", price: 6.95, dietary: ["vegetarian"] },
        { name: "Halloumi Sticks", price: 7.45, dietary: ["vegetarian"] },
        { name: "Cod's Roe", price: 6.95 },
        { name: "Homemade Fish Cake", price: 7.95 },
        { name: "Breaded Whole-tail Scampi", price: 7.95 },
        { name: "Breaded Torpedo Prawns", price: 7.95 },
        { name: "Whitebait", price: 9.95 },
        { name: "Calamari", price: 9.95, popular: true },
        { name: "Salt and Pepper Squid", price: 9.95 },
      ],
    },
    {
      id: "main-courses",
      title: "Fish Main Courses",
      note: "Fried in batter or egg and matzo meal, or grilled. Fish fillets may contain small bones.",
      items: [
        { name: "Cod Fillet", price: 20.95, popular: true },
        { name: "Haddock Fillet", price: 21.95, popular: true },
        { name: "Plaice Fillet", price: 21.95 },
        { name: "Rock", price: 21.95 },
        { name: "Skate", price: 21.95 },
        { name: "Plaice on the Bone", price: 23.95 },
        { name: "Cajun Cod, grilled", price: 20.95 },
        { name: "Cajun Haddock, grilled", price: 21.95 },
        { name: "Scottish Salmon Fillet", price: 23.95 },
        { name: "Sea Bass, whole", price: 24.95 },
        { name: "Breaded Whole-tail Scampi", price: 14.95 },
        { name: "Breaded Torpedo Prawns", price: 14.95 },
        { name: "Goujons of Cod (4)", price: 14.95 },
        { name: "Homemade Fishcakes (2)", price: 14.95 },
        { name: "Cod's Roe (2)", price: 13.95 },
      ],
    },
    {
      id: "more-mains",
      title: "Salads, Grills & Other Mains",
      items: [
        { name: "Avocado Salad with Smoked Salmon", price: 14.95 },
        { name: "Avocado Salad with Prawns", price: 14.95 },
        { name: "Smoked Salmon Salad", price: 13.95 },
        { name: "Tuna Salad", price: 12.95 },
        { name: "Half Chicken, fried", price: 14.95 },
        { name: "Chicken Burger", price: 8.95 },
        { name: "Chicken Nuggets", price: 8.25 },
        { name: "Fish Burger", price: 10.95 },
        { name: "Selection of Pies", price: 12.95 },
        { name: "Sausage, Battered Sausage or Saveloy", price: 9.95 },
      ],
    },
    {
      id: "vegetarian-mains",
      title: "Vegetarian Main Courses",
      items: [
        { name: "Vegetable Spring Rolls", price: 10.95, dietary: ["vegetarian"] },
        { name: "Vegetable Burger", price: 10.95, dietary: ["vegetarian"] },
        { name: "Garlic Breaded Mushrooms", price: 10.95, dietary: ["vegetarian"] },
        { name: "Cheese & Onion Pastie", price: 10.95, dietary: ["vegetarian"] },
        { name: "Vegetarian Omelette", price: 10.95, dietary: ["vegetarian"] },
        {
          name: "Vegetarian Falafel with Houmous and Pitta Bread",
          price: 10.95,
          dietary: ["vegetarian"],
        },
        { name: "Halloumi Burger", price: 10.95, dietary: ["vegetarian"] },
      ],
    },
    {
      id: "kids",
      title: "Kids",
      note: "All kids meals include a fruit juice and vanilla ice cream.",
      items: [
        { name: "Goujons of Cod", price: 8.95 },
        { name: "Homemade Fishcake", price: 8.95 },
        { name: "Chicken Nuggets", price: 8.45 },
        { name: "Sausage", price: 8.45 },
        { name: "Scampi", price: 8.45 },
      ],
    },
    {
      id: "sides",
      title: "Side Dishes",
      items: [
        { name: "Chips", price: 5.0, dietary: ["vegetarian"] },
        { name: "Greek Side Salad", price: 6.95, dietary: ["vegetarian"] },
        { name: "Mixed Side Salad", price: 6.45, dietary: ["vegetarian"] },
        { name: "Tomato & Onion Salad", price: 5.95, dietary: ["vegetarian"] },
        { name: "Onion Rings", price: 3.95, dietary: ["vegetarian"] },
        { name: "Coleslaw", price: 2.95, dietary: ["vegetarian"] },
        { name: "Mushy Peas", price: 2.95, dietary: ["vegetarian"] },
        { name: "Curry Sauce", price: 2.95, dietary: ["vegetarian"] },
        { name: "Baked Beans", price: 2.95, dietary: ["vegetarian"] },
        { name: "Petit Pois", price: 2.45, dietary: ["vegetarian"] },
        { name: "Mixed Olives", price: 2.95, dietary: ["vegetarian"] },
        { name: "Hot Pitta Bread (2)", price: 1.5, dietary: ["vegetarian"] },
        { name: "Sweet & Sour Gherkin", price: 1.5, dietary: ["vegetarian"] },
        { name: "Pickled Onions (2)", price: 1.3, dietary: ["vegetarian"] },
        { name: "Bread & Butter", price: 1.25, dietary: ["vegetarian"] },
      ],
    },
  ],
  footnotes: [
    "All prices include VAT at the current rate.",
    "Service charge is at the discretion of the customer.",
  ],
};

export const lunchDealMenu: MenuDocument = {
  slug: "lunch-deal",
  title: "Lunch Deal",
  heading: "Two-Course Lunch Deal, £19.95",
  intro:
    "Available Tuesday to Thursday from 11:30am to 2:30pm and on Friday until 3:00pm, excluding bank holidays. Pick a starter and a main, or a main and a dessert. Every main comes with your choice of chips, boiled new potatoes, rice or a small mixed salad, and homemade tartare sauce.",
  sections: [
    {
      id: "lunch-starters",
      title: "Starters",
      items: [
        { name: "Homemade Fish Cake" },
        { name: "Homemade Minestrone Soup", dietary: ["vegetarian"] },
        { name: "Garlic Mushrooms", dietary: ["vegetarian"] },
        { name: "Breaded Torpedo Prawns" },
      ],
    },
    {
      id: "lunch-mains",
      title: "Mains",
      items: [
        { name: "Cod, Haddock or Plaice", description: "Fried or grilled", popular: true },
        { name: "Goujons of Cod (3)" },
        { name: "Homemade Fish Cakes (2)" },
        { name: "Main Salad of your choice" },
        {
          name: "Vegetable Falafel with Houmous and Pitta Bread",
          dietary: ["vegetarian"],
        },
      ],
    },
    {
      id: "lunch-desserts",
      title: "Desserts",
      items: [
        { name: "Fruit Salad" },
        { name: "Vanilla Ice Cream" },
        { name: "Pineapple or Banana Fritters" },
        { name: "Bread & Butter Pudding" },
      ],
    },
  ],
  footnotes: [
    "The lunch deal cannot be combined with any other offer or discount.",
    "Side dishes are charged as a supplement.",
    "All prices include VAT at the current rate. Service charge is at the discretion of the customer.",
  ],
};

export const dessertsMenu: MenuDocument = {
  slug: "desserts",
  title: "Desserts & Hot Drinks",
  heading: "Desserts & Hot Drinks",
  intro:
    "All desserts are £6.50. Most of them are made in our own kitchen, and the fritters in particular have been on the menu for as long as anyone can remember.",
  sections: [
    {
      id: "desserts",
      title: "Desserts",
      note: "All desserts £6.50 unless stated.",
      items: [
        {
          name: "Homemade Pineapple Fritter",
          price: 6.5,
          description: "Lightly battered pineapple rings, fried until golden and served warm with vanilla ice cream.",
          popular: true,
        },
        {
          name: "Homemade Banana Fritters",
          price: 6.5,
          description: "Crisp, golden fritters made with bananas, served warm with vanilla ice cream.",
        },
        {
          name: "Bread and Butter Pudding",
          price: 6.5,
          description: "Layers of buttered bread baked in a rich custard, served with vanilla ice cream or custard.",
        },
        {
          name: "Lattice Apple Pie",
          price: 6.5,
          description: "Deep-filled apple pie with a buttery lattice crust, served warm with vanilla ice cream or custard.",
        },
        {
          name: "Homemade Crème Caramel",
          price: 6.5,
          description: "A traditional baked custard dessert finished with a rich caramel topping.",
        },
        {
          name: "Cheesecake",
          price: 6.5,
          description: "Smooth baked vanilla cheesecake on a crunchy biscuit base.",
        },
        {
          name: "Strawberry Swirl Cheesecake",
          price: 6.5,
          description: "Creamy cheesecake with a delicate strawberry swirl, served chilled.",
        },
        {
          name: "Chocolate Fudge Cake",
          price: 6.5,
          description: "Two layers of soft chocolate sponge covered in a rich chocolate fudge fondant.",
        },
        {
          name: "Tiramisu",
          price: 6.5,
          description: "Velvety mascarpone layered with espresso-soaked sponge and a dusting of cocoa.",
        },
        {
          name: "Fruit Salad",
          price: 6.5,
          description: "A refreshing selection of fruit, served chilled.",
        },
        {
          name: "Lemon Ice Cream",
          price: 6.5,
          description: "A palate-cleansing ice cream served chilled in a real lemon skin.",
        },
        {
          name: "Mint Ice Cream",
          price: 6.5,
          description: "Smooth, creamy mint gelato studded with chocolate chips.",
        },
        {
          name: "Vanilla Ice Cream",
          prices: [
            { label: "1 scoop", price: 2.0 },
            { label: "2 scoops", price: 2.95 },
            { label: "3 scoops", price: 3.95 },
          ],
        },
      ],
    },
    {
      id: "hot-drinks",
      title: "Hot Drinks",
      items: [
        {
          name: "Espresso",
          prices: [
            { label: "Single", price: 2.25 },
            { label: "Double", price: 3.25 },
          ],
          description: "A short, invigorating shot of coffee.",
        },
        {
          name: "Americano",
          prices: [
            { label: "Regular", price: 3.25 },
            { label: "Large", price: 3.75 },
          ],
          description: "Espresso slowly infused with hot water for a long black coffee.",
        },
        { name: "Cappuccino", price: 3.25, description: "Espresso, steamed milk and velvety froth." },
        { name: "Caffè Latte", price: 3.25, description: "Espresso and steamed milk with a smooth layer of froth." },
        { name: "Latte Macchiato", price: 3.25, description: "Hot steamed milk stained with espresso." },
        { name: "Mochaccino", price: 3.25, description: "Espresso, steamed milk and chocolate." },
        { name: "Hot Chocolate", price: 3.25, description: "Chocolate and steamed milk topped with milk froth." },
        { name: "Floater Coffee", price: 3.25, description: "Long, sweet black coffee topped with floating double cream." },
        { name: "Liqueur Coffee", price: 6.95, description: "Long, sweet black coffee with a shot of liqueur and floating double cream." },
        { name: "Pot of Tea", price: 2.75, description: "Freshly brewed and served with milk. Extra tea bag £1." },
        { name: "Camomile, Peppermint or Green Tea", price: 2.75 },
        { name: "Lemon Tea", price: 2.75 },
      ],
    },
  ],
  footnotes: ["All desserts contain milk. Cheesecakes contain gluten (wheat) and milk."],
};

export const drinksMenu: MenuDocument = {
  slug: "drinks",
  title: "Drinks",
  heading: "Wine, Beer, Spirits & Soft Drinks",
  intro:
    "We are fully licensed. The house wines are chosen to go with fish, and there is a Cypriot lager on the list as a nod to the family's roots.",
  sections: [
    {
      id: "wine",
      title: "Wine",
      note: "Glass 125ml. Half carafe available on selected wines.",
      items: [
        {
          name: "House Red, White or Rosé",
          description: "A well-rounded wine with lots of fruit. Good with salad, fish and white meat. 12% vol.",
          prices: [
            { label: "Glass", price: 5.5 },
            { label: "Half carafe", price: 12.0 },
          ],
        },
        {
          name: "Sauvignon Blanc",
          description: "Mineral hints and refreshing floral fruit make this crisp dry white a natural partner for seafood. 12% vol.",
          prices: [
            { label: "Glass", price: 6.0 },
            { label: "Half carafe", price: 14.95 },
            { label: "Bottle", price: 21.95 },
          ],
        },
        {
          name: "Pinot Grigio",
          description: "Elegant, dry and subtle with a perfumed bouquet of peaches. 11.5% vol.",
          prices: [
            { label: "Glass", price: 6.0 },
            { label: "Half carafe", price: 14.95 },
            { label: "Bottle", price: 21.95 },
          ],
        },
        {
          name: "Chardonnay",
          description: "Ripe and juicy with tropical fruit and a soft, creamy, lightly oaked finish. 12.5% vol.",
          prices: [
            { label: "Glass", price: 6.0 },
            { label: "Half carafe", price: 14.95 },
            { label: "Bottle", price: 21.95 },
          ],
        },
        {
          name: "Chablis",
          description: "Fresh lemon flavours, crisp acidity and real depth of fruit. 13% vol.",
          prices: [{ label: "Bottle", price: 37.5 }],
        },
        {
          name: "Merlot",
          description: "Plump and full-flavoured with plums, vanilla and black cherries. 13% vol.",
          prices: [
            { label: "Glass", price: 6.0 },
            { label: "Bottle", price: 21.95 },
          ],
        },
        {
          name: "Shiraz",
          description: "Ripe and full-bodied, bursting with blackcurrant and spicy pepper, with a subtle oak finish. 12.5% vol.",
          prices: [
            { label: "Glass", price: 6.0 },
            { label: "Bottle", price: 21.95 },
          ],
        },
        {
          name: "Rosé",
          description: "Strawberries and raspberries in a balanced, light-bodied, easy-drinking wine. 12% vol.",
          prices: [
            { label: "Glass", price: 6.0 },
            { label: "Bottle", price: 21.95 },
          ],
        },
        {
          name: "Prosecco, White or Rosé",
          description: "Light and refreshing, ideal as an aperitif or to mark an occasion. 12% vol.",
          prices: [
            { label: "200ml bottle", price: 9.75 },
            { label: "700ml bottle", price: 32.5 },
          ],
        },
      ],
    },
    {
      id: "beer-cider",
      title: "Beer & Cider",
      items: [
        { name: "Keo", price: 4.5, description: "An exceptional Cypriot lager, matured and bottled fresh. 4.5% vol." },
        { name: "Stella Artois", price: 4.5, description: "Belgium's award-winning lager. 4.8% vol." },
        { name: "Magners Original Cider", price: 4.5, description: "4.5% vol." },
        { name: "Peroni Nastro Azzurro 0.0%", price: 4.5, description: "Alcohol-free, 330ml." },
      ],
    },
    {
      id: "spirits",
      title: "Spirits",
      note: "25ml measure, £5.00 each.",
      items: [
        { name: "Gin", price: 5.0 },
        { name: "Vodka", price: 5.0 },
        { name: "Whisky", price: 5.0 },
        { name: "Jack Daniel's", price: 5.0 },
        { name: "Brandy", price: 5.0 },
        { name: "Bacardi", price: 5.0 },
        { name: "Southern Comfort", price: 5.0 },
        { name: "Martini, dry or sweet", price: 5.0 },
        { name: "Ouzo", price: 5.0, description: "Greek aperitif." },
        { name: "Tia Maria", price: 5.0 },
        { name: "Baileys", price: 5.0 },
        { name: "Liqueur Wine", price: 5.0 },
      ],
    },
    {
      id: "soft-drinks",
      title: "Soft Drinks",
      items: [
        { name: "Coke, Diet Coke, Sprite or Fanta", price: 2.75, description: "330ml." },
        { name: "Mineral Water, still or sparkling", price: 2.75, description: "330ml bottle." },
        { name: "Lemonade Shandy", price: 3.5 },
        { name: "Orange, Apple, Tomato or Cranberry Juice", price: 2.75 },
        { name: "Tonic Water", price: 2.75, description: "200ml bottle." },
        { name: "Soda Water", price: 2.75, description: "200ml bottle." },
        { name: "Bitter Lemon", price: 2.75, description: "200ml bottle." },
        { name: "Ginger Ale", price: 2.75, description: "200ml bottle." },
      ],
    },
  ],
};

export const menus: MenuDocument[] = [mainMenu, lunchDealMenu, dessertsMenu, drinksMenu];

export function getMenu(slug: MenuDocument["slug"]) {
  return menus.find((m) => m.slug === slug);
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
  }).format(value);
}
