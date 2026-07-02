export type Product = {
  id: string;
  slug: string;
  name: string;
  collection: string;
  gender: "Feminine" | "Masculine" | "Unisex";
  price: number;
  size: string;
  inventory: number;
  bestseller?: boolean;
  notes: string[];
  mood: string;
  description: string;
  color: string;
};

export type Order = {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  items: Array<{ productId: string; quantity: number }>;
  total: number;
  status: "New" | "Confirmed" | "Packed" | "Delivered";
  createdAt: string;
};

export const whatsappNumber =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2348012345678";

export const products: Product[] = [
  {
    id: "prd-001",
    slug: "velvet-oud",
    name: "Velvet Oud",
    collection: "Nocturne Reserve",
    gender: "Unisex",
    price: 78000,
    size: "100ml",
    inventory: 18,
    bestseller: true,
    notes: ["Saffron", "Rosewood", "Smoked Oud"],
    mood: "Warm, confident, evening-ready",
    description:
      "A plush oud profile with saffron brightness and a smoked amber finish for statement nights.",
    color: "#b5374e",
  },
  {
    id: "prd-002",
    slug: "citrus-muse",
    name: "Citrus Muse",
    collection: "Daylight Atelier",
    gender: "Feminine",
    price: 52000,
    size: "75ml",
    inventory: 26,
    bestseller: true,
    notes: ["Bergamot", "Neroli", "White Musk"],
    mood: "Fresh, polished, magnetic",
    description:
      "Sparkling bergamot and neroli sit on clean musk for daily wear that still feels premium.",
    color: "#e3a11f",
  },
  {
    id: "prd-003",
    slug: "amber-noir",
    name: "Amber Noir",
    collection: "Nocturne Reserve",
    gender: "Masculine",
    price: 64000,
    size: "100ml",
    inventory: 12,
    notes: ["Black Pepper", "Amber", "Leather"],
    mood: "Deep, textured, assertive",
    description:
      "A leathered amber scent with peppered lift and lasting projection for formal occasions.",
    color: "#5b5f97",
  },
  {
    id: "prd-004",
    slug: "rose-signal",
    name: "Rose Signal",
    collection: "Bloom Circuit",
    gender: "Feminine",
    price: 59000,
    size: "75ml",
    inventory: 21,
    notes: ["Lychee", "Damask Rose", "Cashmere Wood"],
    mood: "Romantic, vivid, modern",
    description:
      "Juicy lychee gives a modern pulse to damask rose and cashmere woods.",
    color: "#d94f70",
  },
  {
    id: "prd-005",
    slug: "marine-code",
    name: "Marine Code",
    collection: "Daylight Atelier",
    gender: "Masculine",
    price: 48000,
    size: "100ml",
    inventory: 34,
    notes: ["Sea Salt", "Mint", "Cedar"],
    mood: "Clean, active, breezy",
    description:
      "Cool mint and mineral salt over cedar, built for heat, movement, and easy compliments.",
    color: "#1f9ab8",
  },
  {
    id: "prd-006",
    slug: "vanilla-static",
    name: "Vanilla Static",
    collection: "Bloom Circuit",
    gender: "Unisex",
    price: 69000,
    size: "100ml",
    inventory: 15,
    notes: ["Pink Pepper", "Vanilla Bean", "Tonka"],
    mood: "Creamy, playful, addictive",
    description:
      "Spiced vanilla and tonka with a bright pink pepper opening that refuses to feel basic.",
    color: "#c56a2d",
  },
];

export const team = [
  {
    name: "Client Concierge",
    role: "Orders, delivery updates, and scent matching",
    whatsapp: `https://wa.me/${whatsappNumber}?text=Hello%20L'Essence%2C%20I%20need%20help%20choosing%20a%20perfume.`,
  },
  {
    name: "Wholesale Desk",
    role: "Bulk purchase, vendor pricing, and partnerships",
    whatsapp: `https://wa.me/${whatsappNumber}?text=Hello%20L'Essence%2C%20I%20want%20to%20discuss%20wholesale%20perfumes.`,
  },
  {
    name: "Aftercare Support",
    role: "Returns, authenticity checks, and gift packaging",
    whatsapp: `https://wa.me/${whatsappNumber}?text=Hello%20L'Essence%2C%20I%20need%20aftercare%20support.`,
  },
];

export function formatNaira(value: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function whatsappProductLink(product: Product) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hello L'Essence, I want to order ${product.name} (${product.size}) for ${formatNaira(product.price)}.`
  )}`;
}
