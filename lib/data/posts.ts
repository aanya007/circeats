export interface Post {
  slug: string;
  tag: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  body: string[];
}

export const posts: Post[] = [
  {
    slug: "755000-tonnes",
    tag: "The Problem",
    date: "2026-07-10",
    readTime: "4 min read",
    title: "755,000 tonnes a year. What does that actually look like?",
    excerpt:
      "Singapore's food waste number is so big it stops meaning anything. Let's make it concrete.",
    body: [
      "Singapore throws away 755,000 tonnes of food a year. Numbers that size stop meaning anything, so let's make it concrete.",
      "Fruits and vegetables alone account for around 167,000 tonnes of that — roughly 5,901 twenty-foot shipping containers of produce, every year, most of it perfectly edible when it was binned. Stack those containers end to end and you have a wall of wasted food running the length of the island.",
      "It isn't just an environmental cost. Household food waste alone costs Singapore an estimated $342 million a year — money spent on groceries that go straight from the fridge to the bin.",
      "And the clock is running: our landfill capacity is projected to be reached by 2035. Every tonne we divert now buys time we don't otherwise have.",
      "That's the problem CircEats exists to solve — not with charity, but with a market: near-expiry groceries sold at 30–70% off, before the clock runs out.",
    ],
  },
  {
    slug: "no-mystery-bags",
    tag: "Product",
    date: "2026-07-02",
    readTime: "3 min read",
    title: "Why we don't do mystery bags",
    excerpt:
      "Surprise bags make waste convenient for the store, not the shopper. We think transparency rescues more food.",
    body: [
      "The best-known surplus food apps sell mystery bags: you pay a few dollars, you get whatever the store didn't sell. It's a clever model — for the store.",
      "For the shopper, it's a gamble. You can't plan a meal around a surprise. You can't avoid the items your family won't eat. And when the bag disappoints, you stop buying — which means the food stops moving.",
      "CircEats shows you every item before you reserve it: photo, price, condition, expiry date. Item-level transparency, not surprise boxes. You reserve exactly what you want and skip what you don't.",
      "We think that's not just a nicer experience — it's the only model that scales. Food moves when shoppers trust what they're getting. Trust comes from seeing the item, not guessing at a bag.",
    ],
  },
  {
    slug: "the-case-for-pickup-only",
    tag: "Product",
    date: "2026-06-24",
    readTime: "3 min read",
    title: "The case for pickup-only",
    excerpt:
      "Delivery has killed more than one surplus food startup. Here's why CircEats will never put discounted groceries in a van.",
    body: [
      "Surplus food is a thin-margin business by definition — the whole point is selling at 30–70% off. Add delivery, and the economics collapse: vans, drivers, cold chain, failed drop-offs. The discount that made the food attractive gets eaten by logistics.",
      "That's why CircEats is pickup-only. You reserve online, you collect in-store, on your schedule.",
      "Zero logistics overhead means the discounts stay deep. It means supermarkets don't need new workflows or packing stations. And it means the freshest possible handover — the food goes from the shelf to your hands, not into a van idling in traffic.",
      "It also does something quieter: it brings shoppers into the store, where rescued groceries sit alongside full-price ones. Rescue becomes a normal part of the weekly shop — which is exactly where it needs to be to make a dent in 755,000 tonnes.",
    ],
  },
  {
    slug: "shrink-is-revenue",
    tag: "Business",
    date: "2026-06-15",
    readTime: "3 min read",
    title: "For supermarkets: shrink isn't a cost. It's unsold revenue.",
    excerpt:
      "Near-expiry stock is written off as a fact of life. It's actually a pricing problem — and pricing problems are solvable.",
    body: [
      "Every supermarket carries a line item for shrink — stock that expires on the shelf and gets written off. It's treated as a fact of life, like rent.",
      "But near-expiry stock isn't waste yet. It's inventory with a deadline. The reason it becomes waste is that there's no system to reprice it and find a buyer before the clock runs out — doing that manually, SKU by SKU, costs more than the stock is worth.",
      "That's the system CircEats provides. Flag near-expiry items with a photo and condition, let the AI discount engine price them by expiry window, and nearby shoppers reserve and collect in-store. No repacking, no delivery prep, no new workflows.",
      "The same dashboard tracks what you've diverted — keeping you RSA-compliant and giving your ESG reporting numbers that are measured, not estimated.",
      "Shrink is the only revenue line most supermarkets have already given up on. We'd like to give it back.",
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatPostDate(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-SG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
