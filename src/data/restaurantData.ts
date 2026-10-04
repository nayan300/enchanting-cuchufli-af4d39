export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: 'biryani' | 'rice' | 'noodles' | 'momos' | 'starters' | 'drinks' | 'combos';
  categoryLabel: string;
  hasPortions: boolean;
  halfPrice?: number;
  fullPrice: number;
  isVeg: boolean;
  badge?: 'BESTSELLER' | 'POPULAR' | 'STANDOUT' | 'CHEF SPECIAL' | 'TODAY SPECIAL' | 'MUST TRY';
  rating: number;
  reviewsCount: number;
  image: string;
  highlight?: string;
  pieces?: number;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  dishRecommended: string;
}

export const RESTAURANT_INFO = {
  name: "Shekhar's Food Club",
  tagline: "Fresh, flavourful food with less oil",
  owner: "Shekhar",
  phone: "093957 75599",
  phoneFormatted: "+91 93957 75599",
  whatsappNumber: "919395775599",
  address: "NH115, opposite Sadiya Police Station, Chariali, Chapakhowa, Lakhimi Pathar, Assam 786157",
  landmark: "Opposite Sadiya Police Station, Chariali",
  city: "Sadiya, Chapakhowa",
  state: "Assam",
  pinCode: "786157",
  hours: "11:00 AM - 10:00 PM",
  days: "Monday - Sunday (7 Days Open)",
  status: "Open Now",
  rating: 4.8,
  totalReviews: 34,
  yearsInBusiness: "Opening Week Debut",
  healthyFact: "Prepared with up to 40% less oil without sacrificing authentic spice aromas and juicy tenderness.",
  googleMapsUrl: "https://maps.google.com/?q=Sadiya+Police+Station+Chapakhowa+Assam",
  deliveryChargeUnder1Km: 40,
  minDeliveryOrder: 299,
  storefrontNightImage: "/src/assets/images/shekhar_storefront_night_1791082211949.jpg",
  interiorDiningImage: "/src/assets/images/shekhar_interior_dining_1791082223291.jpg",
  realBiryaniImage: "/src/assets/images/shekhar_real_biryani_serve_1791082236636.jpg",
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "chicken-biryani",
    name: "Special Chicken Biryani",
    description: "Our signature standout! Aromatic long-grain basmati cooked dum-style with secret whole spices, juicy tender chicken, whole boiled egg, and side aromatic salan, with 40% less oil.",
    category: "biryani",
    categoryLabel: "Biryani & Mains",
    hasPortions: true,
    halfPrice: 100,
    fullPrice: 180,
    isVeg: false,
    badge: "STANDOUT",
    rating: 4.9,
    reviewsCount: 28,
    image: "/src/assets/images/shekhar_real_biryani_serve_1791082236636.jpg",
    highlight: "Standout Choice · Less Oil Recipe",
  },
  {
    id: "chicken-fried-rice",
    name: "Chicken Fried Rice",
    description: "Wok-tossed steamed rice with tender chicken shreds, farm egg, scallions, and light seasoning with minimal oil.",
    category: "rice",
    categoryLabel: "Fried Rice",
    hasPortions: true,
    halfPrice: 70,
    fullPrice: 130,
    isVeg: false,
    badge: "POPULAR",
    rating: 4.8,
    reviewsCount: 19,
    image: "/src/assets/images/shekhar_fried_rice_chilly_1791080805054.jpg",
    highlight: "Wok-Tossed · Light & Fresh",
  },
  {
    id: "egg-fried-rice",
    name: "Egg Fried Rice",
    description: "Fluffy rice grains tossed with freshly scrambled eggs, crunchy cabbage, carrots, and subtle fragrant garlic.",
    category: "rice",
    categoryLabel: "Fried Rice",
    hasPortions: true,
    halfPrice: 60,
    fullPrice: 110,
    isVeg: false,
    rating: 4.7,
    reviewsCount: 14,
    image: "/src/assets/images/shekhar_fried_rice_chilly_1791080805054.jpg",
    highlight: "Double Farm Egg Toss",
  },
  {
    id: "veg-fried-rice",
    name: "Veg Fried Rice",
    description: "Fresh farm beans, carrots, and sweet bell peppers tossed in fragrant basmati with light olive-sesame blend.",
    category: "rice",
    categoryLabel: "Fried Rice",
    hasPortions: true,
    halfPrice: 50,
    fullPrice: 90,
    isVeg: true,
    rating: 4.6,
    reviewsCount: 11,
    image: "/src/assets/images/shekhar_fried_rice_chilly_1791080805054.jpg",
    highlight: "100% Pure Veg · Crisp Veggies",
  },
  {
    id: "paneer-fried-rice",
    name: "Paneer Fried Rice",
    description: "Soft golden cubes of fresh cottage paneer sauteed with garden vegetables and aromatic wok-fried rice.",
    category: "rice",
    categoryLabel: "Fried Rice",
    hasPortions: true,
    halfPrice: 70,
    fullPrice: 130,
    isVeg: true,
    badge: "MUST TRY",
    rating: 4.8,
    reviewsCount: 12,
    image: "/src/assets/images/shekhar_fried_rice_chilly_1791080805054.jpg",
    highlight: "Rich Fresh Paneer",
  },
  {
    id: "chicken-noodles",
    name: "Chicken Hakka Noodles",
    description: "Freshly made noodles stir-fried with juicy seasoned chicken strips, spring onions, capsicum, and oriental spices.",
    category: "noodles",
    categoryLabel: "Noodles",
    hasPortions: true,
    halfPrice: 60,
    fullPrice: 110,
    isVeg: false,
    badge: "POPULAR",
    rating: 4.7,
    reviewsCount: 16,
    image: "/src/assets/images/shekhar_fried_rice_chilly_1791080805054.jpg",
    highlight: "Non-Greasy · Slurpy Delight",
  },
  {
    id: "veg-noodles",
    name: "Veg Hakka Noodles",
    description: "Tossed noodles with shredded cabbage, bell peppers, carrots, and homemade garlic-soy reduction with low oil.",
    category: "noodles",
    categoryLabel: "Noodles",
    hasPortions: true,
    halfPrice: 50,
    fullPrice: 90,
    isVeg: true,
    rating: 4.6,
    reviewsCount: 10,
    image: "/src/assets/images/shekhar_fried_rice_chilly_1791080805054.jpg",
    highlight: "Light & Crunchy",
  },
  {
    id: "chicken-momo",
    name: "Chicken Momo (Steamed / Fried)",
    description: "Handcrafted thin wrapper momos packed with minced chicken, ginger, and fresh herbs. Served with spicy fire red chili dip.",
    category: "momos",
    categoryLabel: "Momos & Starters",
    hasPortions: true,
    halfPrice: 60,
    fullPrice: 120,
    isVeg: false,
    badge: "BESTSELLER",
    rating: 4.9,
    reviewsCount: 24,
    image: "/src/assets/images/shekhar_chicken_momo_1791080793334.jpg",
    highlight: "Juicy Filling · Fiery Dip",
  },
  {
    id: "chilly-chicken",
    name: "Chilly Chicken (7 pcs)",
    description: "7 tender chicken bites wok-charred with green chilies, bell peppers, and savoury Chinese glaze with minimal oil.",
    category: "starters",
    categoryLabel: "Momos & Starters",
    hasPortions: false,
    fullPrice: 150,
    pieces: 7,
    isVeg: false,
    badge: "POPULAR",
    rating: 4.8,
    reviewsCount: 21,
    image: "/src/assets/images/shekhar_fried_rice_chilly_1791080805054.jpg",
    highlight: "7 Pieces · Sizzling Glaze",
  },
  {
    id: "chicken-65",
    name: "Chicken 65 (7 pcs)",
    description: "7 pieces of succulent chicken marinated in south-style roasted spices, curry leaves, and green chili temper.",
    category: "starters",
    categoryLabel: "Momos & Starters",
    hasPortions: false,
    fullPrice: 160,
    pieces: 7,
    isVeg: false,
    badge: "CHEF SPECIAL",
    rating: 4.9,
    reviewsCount: 18,
    image: "/src/assets/images/shekhar_fried_rice_chilly_1791080805054.jpg",
    highlight: "7 Pieces · Curry Leaf Temper",
  },
  {
    id: "french-fries",
    name: "Crispy French Fries",
    description: "Golden fried potato batons seasoned with rock salt and light chatpata seasoning. Hot, crisp, and oil-drained.",
    category: "starters",
    categoryLabel: "Momos & Starters",
    hasPortions: false,
    fullPrice: 50,
    isVeg: true,
    rating: 4.6,
    reviewsCount: 13,
    image: "/src/assets/images/shekhar_blue_lagoon_combo_1791080815344.jpg",
    highlight: "Crispy & Non-Oily",
  },
  {
    id: "blue-lagoon",
    name: "Blue Lagoon Mocktail",
    description: "Ice-cold refreshing cooler crafted with blue curacao notes, squeezed fresh lime, mint leaves, and effervescent soda.",
    category: "drinks",
    categoryLabel: "Beverages & Combos",
    hasPortions: false,
    fullPrice: 60,
    isVeg: true,
    rating: 4.8,
    reviewsCount: 15,
    image: "/src/assets/images/shekhar_blue_lagoon_combo_1791080815344.jpg",
    highlight: "Chilled & Refreshing",
  },
  {
    id: "fries-blue-lagoon-combo",
    name: "French Fries + Blue Lagoon",
    description: "Opening week signature deal! Crispy golden salted french fries paired with a chilled tall glass of Blue Lagoon.",
    category: "combos",
    categoryLabel: "Beverages & Combos",
    hasPortions: false,
    fullPrice: 100,
    isVeg: true,
    badge: "TODAY SPECIAL",
    rating: 5.0,
    reviewsCount: 22,
    image: "/src/assets/images/shekhar_blue_lagoon_combo_1791080815344.jpg",
    highlight: "Special Combo · Save ₹10",
  }
];

export interface ComboDeal {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  itemsIncluded: string[];
  originalPrice: number;
  comboPrice: number;
  savings: number;
  badgeText: string;
  image: string;
  isVeg: boolean;
}

export const PRESET_COMBOS: ComboDeal[] = [
  {
    id: "fries-blue-lagoon-combo",
    title: "French Fries + Blue Lagoon",
    subtitle: "Crispy Golden Fries & Iced Blue Lagoon Mocktail",
    description: "Opening week signature deal! Crispy golden salted french fries paired with a chilled tall glass of Blue Lagoon.",
    itemsIncluded: ["Crispy French Fries", "Blue Lagoon Mocktail"],
    originalPrice: 110,
    comboPrice: 100,
    savings: 10,
    badgeText: "TODAY'S SPECIAL",
    image: "/src/assets/images/shekhar_blue_lagoon_combo_1791080815344.jpg",
    isVeg: true,
  },
  {
    id: "biryani-blue-lagoon-combo",
    title: "Chicken Biryani + Blue Lagoon",
    subtitle: "Special Dum Biryani (Half) & Chilled Blue Lagoon",
    description: "Aromatic basmati chicken dum biryani prepared with 40% less oil, served with our signature citrus cooler.",
    itemsIncluded: ["Special Chicken Biryani (Half)", "Blue Lagoon Mocktail"],
    originalPrice: 160,
    comboPrice: 145,
    savings: 15,
    badgeText: "ROYAL COMBO",
    image: "/src/assets/images/shekhar_biryani_hero_1791080779217.jpg",
    isVeg: false,
  },
  {
    id: "momo-fries-combo",
    title: "Chicken Momo + French Fries",
    subtitle: "Steamed Chicken Momo (Half) & Golden Crispy Fries",
    description: "Juicy thin-crust chicken momos with spicy red chutney accompanied by hot salted french fries.",
    itemsIncluded: ["Chicken Momo (Half)", "Crispy French Fries"],
    originalPrice: 110,
    comboPrice: 100,
    savings: 10,
    badgeText: "EVENING FAVORITE",
    image: "/src/assets/images/shekhar_chicken_momo_1791080793334.jpg",
    isVeg: false,
  },
  {
    id: "wok-fried-rice-chilly-combo",
    title: "Chicken Fried Rice + Chilly Chicken",
    subtitle: "Chicken Fried Rice (Half) & Chilly Chicken (7 pcs)",
    description: "Wok-charred chicken fried rice paired with 7 pieces of succulent, spicy glazed chilly chicken.",
    itemsIncluded: ["Chicken Fried Rice (Half)", "Chilly Chicken (7 pcs)"],
    originalPrice: 220,
    comboPrice: 199,
    savings: 21,
    badgeText: "WOK SPECIAL",
    image: "/src/assets/images/shekhar_fried_rice_chilly_1791080805054.jpg",
    isVeg: false,
  },
  {
    id: "noodles-momo-combo",
    title: "Chicken Hakka Noodles + Momos",
    subtitle: "Chicken Noodles (Half) & Steamed Chicken Momos (Half)",
    description: "Non-greasy wok tossed noodles combined with delicate steamed momos for the ultimate Indo-Chinese feast.",
    itemsIncluded: ["Chicken Hakka Noodles (Half)", "Chicken Momo (Half)"],
    originalPrice: 120,
    comboPrice: 110,
    savings: 10,
    badgeText: "CHEF'S PAIRING",
    image: "/src/assets/images/shekhar_fried_rice_chilly_1791080805054.jpg",
    isVeg: false,
  },
];

export const CATEGORIES = [
  { id: 'all', label: 'All Dishes', icon: '🍽️', count: 13 },
  { id: 'biryani', label: 'Biryani', icon: '🍗', count: 1 },
  { id: 'rice', label: 'Fried Rice', icon: '🍚', count: 4 },
  { id: 'noodles', label: 'Noodles', icon: '🥢', count: 2 },
  { id: 'momos', label: 'Momos', icon: '🥟', count: 1 },
  { id: 'starters', label: 'Starters', icon: '🌶️', count: 3 },
  { id: 'drinks', label: 'Drinks & Combos', icon: '🍹', count: 2 },
];

export const CUSTOMER_REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Bikash Moran",
    location: "Chapakhowa, Sadiya",
    rating: 5,
    date: "2 days ago",
    comment: "Finally a place in Sadiya that makes biryani without feeling heavy or swimming in oil! The chicken was extremely soft and the rice had amazing aroma. Shekhar da is very humble and welcoming.",
    dishRecommended: "Special Chicken Biryani",
  },
  {
    id: "rev-2",
    author: "Pranab Jyoti Gogoi",
    location: "Lakhimi Pathar",
    rating: 5,
    date: "3 days ago",
    comment: "The French Fries + Blue Lagoon combo for ₹100 is great value. Loved the momo chutney too. Very clean kitchen right opposite the police station.",
    dishRecommended: "French Fries + Blue Lagoon Combo",
  },
  {
    id: "rev-3",
    author: "Anamika Baruah",
    location: "Sadiya Town",
    rating: 5,
    date: "4 days ago",
    comment: "Ordered Chicken Fried Rice and Chilly Chicken for takeaway. Ready in 15 minutes, hot and fresh. Real taste with visibly less oil. Will visit again regularly!",
    dishRecommended: "Chicken Fried Rice & Chilly Chicken",
  },
  {
    id: "rev-4",
    author: "Debojit Sonowal",
    location: "Chariali",
    rating: 4.8,
    date: "Opening Week",
    comment: "Saw their opening whiteboard outside and tried the Chicken Biryani. Hands down best biryani in Chapakhowa chariali area.",
    dishRecommended: "Chicken Biryani",
  }
];

export const OPENING_WEEK_WHITEBOARD_DATA = {
  title: "Shekhar's Food Club — Opening Week Specials!",
  dateNotice: "Opening Week Debut · Handcrafted Fresh Daily",
  note: "Welcome to Sadiya's new destination for flavourful food prepared with heart and 40% less oil!",
  chalkboardItems: [
    { name: "Special Chicken Dum Biryani", price: "₹100 (Half) / ₹180 (Full)", tag: "Chef's Standout" },
    { name: "Crispy French Fries + Blue Lagoon Mocktail", price: "₹100 Only", tag: "Today's Special Deal (Save ₹10)" },
    { name: "Steamed Chicken Momos + Red Fire Chutney", price: "₹60 (Half) / ₹120 (Full)", tag: "Customer Favorite" },
    { name: "Chilly Chicken (7 pcs) / Chicken 65 (7 pcs)", price: "₹150 / ₹160", tag: "Wok Specials" },
  ],
  footerNote: "📍 Opposite Sadiya Police Station, Chariali · Call or WhatsApp: 093957 75599",
};
