export interface MenuItem {
  id: string;
  name: string;
  urduName?: string;
  category: 'biryani' | 'starters' | 'breakfast' | 'curries' | 'chai' | 'desserts';
  price: number;
  description: string;
  image: string;
  isBestseller?: boolean;
  isSignature?: boolean;
  isBreakfastSpecial?: boolean;
  spiceLevel?: 'Mild' | 'Medium' | 'Spicy' | 'Fiery';
  portions?: { name: string; price: number }[];
  tags: string[];
}

export interface Review {
  id: string;
  author: string;
  authorTitle: string;
  rating: number;
  date: string;
  comment: string;
  avatarBg: string;
  likes?: number;
  highlightDish?: string;
  photosCount?: number;
  verified?: boolean;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  category: 'biryani' | 'breakfast' | 'chai' | 'ambiance' | 'starters';
  author: string;
  caption: string;
}

export const RESTAURANT_INFO = {
  name: "Hotel Firdous",
  teluguName: "హోటల్ ఫిర్దౌస్",
  urduName: "ہوٹل فردوس",
  tagline: "Authentic Hyderabadi Cuisine & Iconic 5 AM Paya Breakfast Since 2002",
  rating: 4.0,
  reviewCount: 5038,
  photosCount: 498,
  address: "Shop No. 16-7-383/3, Sahifa Masjid Rd, Near Sahifa Masjid, Azampura, Malakpet, Chaderghat, Hyderabad, Telangana 500024",
  shortAddress: "Sahifa Masjid Rd, Azampura, Malakpet, Hyderabad",
  phone: "093911 76439",
  internationalPhone: "+91 93911 76439",
  plusCode: "9FGR+MR Hyderabad, Telangana",
  hoursText: "Open Daily: 5:00 AM – 11:30 PM",
  breakfastHours: "5:00 AM – 10:30 AM (Famous Paya, Nihari & Khichdi Khatta)",
  lunchDinnerHours: "11:30 AM – 11:30 PM (Biryani, Tala Hua Gosht & Curries)",
  coordinates: {
    lat: 17.3789,
    lng: 78.4902,
  },
  landmarks: [
    { name: "Kachiguda Railway Station", distance: "1.2 km", time: "4 mins drive / 12 mins walk" },
    { name: "Malakpet Metro Station", distance: "1.4 km", time: "5 mins drive" },
    { name: "Sahifa Masjid (Azampura)", distance: "50 meters", time: "1 min walk" },
    { name: "Charminar & Laad Bazaar", distance: "2.8 km", time: "10 mins drive" },
    { name: "Mahatma Gandhi Bus Station (MGBS)", distance: "1.6 km", time: "6 mins drive" },
  ]
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "mutton-dum-biryani",
    name: "Special Hyderabadi Mutton Dum Biryani",
    urduName: "حیدرآبادی مٹن دم بریانی",
    category: "biryani",
    price: 290,
    description: "The crown jewel of Hyderabad. Aged long-grain basmati layered with tender baby goat meat marinated in potli spices, saffron-infused milk and desi ghee, cooked in sealed handi. Served with Mirchi Ka Salan and Dahi Ki Chutney.",
    image: "/src/assets/images/firdous_mutton_biryani_1793377437168.jpg",
    isBestseller: true,
    isSignature: true,
    spiceLevel: "Spicy",
    portions: [
      { name: "Single (1 Person)", price: 210 },
      { name: "Regular Full (2 Persons)", price: 290 },
      { name: "Family Pack Handi (4 Persons)", price: 680 },
      { name: "Jumbo Handi Deg (7 Persons)", price: 1190 }
    ],
    tags: ["Authentic Dum", "Mutton", "House Special", "Nizam's Recipe"]
  },
  {
    id: "tala-hua-gosht",
    name: "Firdous Signature Tala Hua Gosht",
    urduName: "تلا ہوا گوشت",
    category: "starters",
    price: 260,
    description: "Our famed crispy spicy Hyderabadi pan-fried mutton chunks, slow-roasted with green chillies, curry leaves, crushed black pepper, and toasted cumin. Ateeq's review favorite: 'Crispy and full of authentic taste.' Best paired with Khatti Dal and rice.",
    image: "/src/assets/images/firdous_tala_hua_gosht_1793377437650.jpg",
    isBestseller: true,
    isSignature: true,
    spiceLevel: "Fiery",
    portions: [
      { name: "Half Plate", price: 160 },
      { name: "Full Plate", price: 260 },
      { name: "Special Boneless Full", price: 310 }
    ],
    tags: ["Must Try", "Crispy Mutton", "Local Legend", "Spicy"]
  },
  {
    id: "hyderabadi-paya-soup",
    name: "Dawn Hyderabadi Paya Soup with Char Koni Naan",
    urduName: "حیدرآبادی پایا شوربہ",
    category: "breakfast",
    price: 180,
    description: "Famous early morning dish served fresh from 5:00 AM! Tender goat trotters simmered overnight for 10 hours in a fragrant potli broth rich in collagen and herbs, garnished with fresh ginger slivers, mint, and lemon. Served with traditional square Char Koni Naan.",
    image: "/src/assets/images/firdous_paya_soup_breakfast_1793377439332.jpg",
    isBestseller: true,
    isSignature: true,
    isBreakfastSpecial: true,
    spiceLevel: "Medium",
    portions: [
      { name: "Single Paya with 1 Naan", price: 180 },
      { name: "Double Paya Bowl with 2 Naan", price: 270 }
    ],
    tags: ["5 AM Special", "Slow Simmered", "Winter Favorite", "Breakfast"]
  },
  {
    id: "khichdi-khatta-kheema",
    name: "Authentic Khichdi Khatta Kheema",
    urduName: "کھچڑی کھٹا قیمہ",
    category: "breakfast",
    price: 190,
    description: "Classic old-Hyderabad breakfast combination: aromatic yellow moong dal rice (Khichdi) served with tangy roasted sesame & tamarind gravy (Til Khatta) and spicy minced mutton fry (Kheema). Simple, nostalgic, and deeply satisfying.",
    image: "/src/assets/images/firdous_restaurant_hero_1793377437164.jpg",
    isBestseller: true,
    isBreakfastSpecial: true,
    spiceLevel: "Medium",
    portions: [
      { name: "Full Breakfast Platter", price: 190 },
      { name: "Khichdi Kheema Double Meat", price: 250 }
    ],
    tags: ["Traditional Breakfast", "Old Malakpet Style", "Tangy & Savoury"]
  },
  {
    id: "nalli-nihari",
    name: "Slow-Cooked Nalli Nihari",
    urduName: "نلی نہاری",
    category: "breakfast",
    price: 240,
    description: "Velvety spiced mutton shank stew cooked overnight in a sealed degh, packed with rich buttery bone marrow. Served with warm tandoori roti and a squeeze of fresh lime.",
    image: "/src/assets/images/firdous_paya_soup_breakfast_1793377439332.jpg",
    isBreakfastSpecial: true,
    spiceLevel: "Medium",
    portions: [
      { name: "Regular Shank Bowl", price: 240 },
      { name: "Special Nalli Double Marrow", price: 320 }
    ],
    tags: ["Bone Marrow", "Mughlai Heritage", "Breakfast & Lunch"]
  },
  {
    id: "chicken-dum-biryani",
    name: "Hyderabadi Chicken Dum Biryani",
    urduName: "مرغ دم بریانی",
    category: "biryani",
    price: 220,
    description: "Tender farm chicken cuts marinated in spiced yogurt, brown onions, and mint, cooked on dum with long grain basmati rice. Served with spicy salan and raita.",
    image: "/src/assets/images/firdous_mutton_biryani_1793377437168.jpg",
    isBestseller: true,
    spiceLevel: "Spicy",
    portions: [
      { name: "Single Portion", price: 150 },
      { name: "Full Portion", price: 220 },
      { name: "Family Pack Handi", price: 530 }
    ],
    tags: ["Chicken Biryani", "Juicy", "Classic"]
  },
  {
    id: "hyderabadi-marag",
    name: "Royal Hyderabadi Marag (Mutton Broth)",
    urduName: "حیدرآبادی مرق",
    category: "breakfast",
    price: 190,
    description: "Rich, creamy, white-peppery mutton shorba prepared with cashew-pistachio paste, green cardamom, and fresh malai. A royal wedding feast starter available daily at Firdous.",
    image: "/src/assets/images/firdous_paya_soup_breakfast_1793377439332.jpg",
    spiceLevel: "Mild",
    tags: ["Creamy Broth", "Nizam's Royal Feast", "Nourishing"]
  },
  {
    id: "irani-dum-chai",
    name: "Kadak Irani Dum Chai & Osmania Biscuits",
    urduName: "ایرانی چائے اور عثمانیہ بسکٹ",
    category: "chai",
    price: 35,
    description: "The soul of Hyderabad cafe culture. Golden strong black tea decoction combined with slow-simmered, condensed creamy buffalo milk over a low coal flame. Served with 2 melt-in-mouth sweet & salty Osmania biscuits.",
    image: "/src/assets/images/firdous_irani_chai_table_1793377439400.jpg",
    isBestseller: true,
    isSignature: true,
    portions: [
      { name: "1 Cup Irani Chai + 2 Osmania Biscuits", price: 35 },
      { name: "Zafrani Irani Chai (Saffron Infused)", price: 50 },
      { name: "Irani Chai + Fresh Mutton Lukhmi Combo", price: 75 }
    ],
    tags: ["Chai Counter", "All Day", "Hyderabad Icon"]
  },
  {
    id: "mutton-lukhmi",
    name: "Hyderabadi Mutton Lukhmi (2 Pcs)",
    urduName: "لقمی قیمہ",
    category: "chai",
    price: 50,
    description: "Flaky, crisp square pastry crust stuffed with spicy seasoned minced mutton, fried golden. Traditional tea-time companion.",
    image: "/src/assets/images/firdous_irani_chai_table_1793377439400.jpg",
    isBestseller: true,
    spiceLevel: "Medium",
    tags: ["Tea Snack", "Crispy Pastry", "Old City Special"]
  },
  {
    id: "chicken-65-hyderabad",
    name: "Spicy Red Chicken 65",
    urduName: "چکن ۶۵ حیدرآبادی",
    category: "starters",
    price: 210,
    description: "Crispy boneless chicken bites tossed with curd, mustard seeds, curry leaves, ginger, and crushed red chillies in authentic Hyderabadi street style.",
    image: "/src/assets/images/firdous_tala_hua_gosht_1793377437650.jpg",
    spiceLevel: "Spicy",
    tags: ["Crispy", "Popular Starter", "Indo-Chinese & Hyderabad"]
  },
  {
    id: "dum-ka-chicken",
    name: "Nizami Dum Ka Chicken",
    urduName: "دم کا مرغ",
    category: "curries",
    price: 230,
    description: "Tender chicken cooked in a rich, slow-simmered gravy of roasted poppy seeds, coconut, fried onions, and whole spices.",
    image: "/src/assets/images/firdous_restaurant_hero_1793377437164.jpg",
    spiceLevel: "Medium",
    tags: ["Rich Gravy", "Best with Rumali Roti"]
  },
  {
    id: "bagara-baingan",
    name: "Authentic Bagara Baingan",
    urduName: "بگھارے بینگن",
    category: "curries",
    price: 150,
    description: "Tender baby brinjals simmered in a nutty, tangy sauce made of roasted peanuts, sesame seeds, coconut, and tamarind.",
    image: "/src/assets/images/firdous_restaurant_hero_1793377437164.jpg",
    spiceLevel: "Medium",
    tags: ["Vegetarian Special", "Peanut & Tamarind", "Biryani Accompaniment"]
  },
  {
    id: "double-ka-meetha",
    name: "Shahi Double Ka Meetha",
    urduName: "شاہی ڈبل کا میٹھا",
    category: "desserts",
    price: 90,
    description: "Pure desi ghee toasted milk bread soaked in saffron-cardamom flavored thickened milk (Rabri), garnished with toasted almonds and pistachios.",
    image: "/src/assets/images/firdous_mutton_biryani_1793377437168.jpg",
    isBestseller: true,
    spiceLevel: "Mild",
    tags: ["Royal Dessert", "Ghee Rich", "Hyderabad Classic"]
  },
  {
    id: "qubani-ka-meetha",
    name: "Qubani Ka Meetha with Fresh Malai",
    urduName: "خوبانی کا میٹھا",
    category: "desserts",
    price: 110,
    description: "Sun-dried Turkish apricots simmered to a lush compote with crushed apricot kernels, topped with generous spoonfuls of fresh thick clotted cream (Malai).",
    image: "/src/assets/images/firdous_irani_chai_table_1793377439400.jpg",
    isBestseller: true,
    tags: ["Apricot Compote", "Malai Topping", "Authentic"]
  }
];

export const CUSTOMER_REVIEWS: Review[] = [
  {
    id: "rev-ateeq",
    author: "Ateeq",
    authorTitle: "Local Guide · 25 reviews",
    rating: 5,
    date: "7 months ago",
    comment: "Visiting Hotel Firdous since 2002 and the taste is still as amazing as ever. Their biryani is one of the best—perfectly cooked, full of flavor, and always satisfying. The tala hua gosht is a must try, crispy and full of authentic taste.",
    avatarBg: "bg-amber-700",
    likes: 42,
    highlightDish: "Tala Hua Gosht & Mutton Biryani",
    verified: true
  },
  {
    id: "rev-gopinath",
    author: "Gopinath J.P",
    authorTitle: "Local Guide · 118 reviews · 454 photos",
    rating: 4,
    date: "3 weeks ago",
    comment: "I like a good paya soup as a breakfast food and have tried it many times at Bangalore, when I landed at Kachiguda morning 5 am and metro starts 6am wanted to eat some breakfast hence googled out this hotel. The paya soup here was piping hot with thick collagen, authentic spices, and the fresh square char koni naan was crisp right off the tandoor. Worth the walk!",
    avatarBg: "bg-emerald-700",
    likes: 29,
    highlightDish: "5 AM Paya Soup with Char Koni Naan",
    photosCount: 2,
    verified: true
  },
  {
    id: "rev-nadeem",
    author: "Mohd Nadeem (Nady)",
    authorTitle: "Local Guide · 153 reviews · 1,513 photos",
    rating: 4,
    date: "a year ago",
    comment: "Hotel Firdaus at Chadarghat has a good name when it comes to Hyderabadi food. The biryani and Khichdhi Khatta are tasty and the prices are reasonable. The service is decent though the place could be maintained better in terms of cleanliness. Still, it’s a nice option if you’re around Old Malakpet and craving local flavors.",
    avatarBg: "bg-blue-700",
    likes: 67,
    highlightDish: "Biryani & Khichdi Khatta",
    photosCount: 11,
    verified: true
  },
  {
    id: "rev-lakshmi",
    author: "Lakshmi Prasanna",
    authorTitle: "Local Guide · 42 reviews",
    rating: 5,
    date: "2 months ago",
    comment: "Nice place to eat with family and friends. Food quality is awesome! We ordered the Mutton Dum Biryani family pack and Chicken 65. The meat fell right off the bone and the masala balance was fragrant without being overwhelmingly greasy.",
    avatarBg: "bg-rose-700",
    likes: 18,
    highlightDish: "Mutton Dum Biryani",
    verified: true
  },
  {
    id: "rev-farhan",
    author: "Syed Farhan",
    authorTitle: "Hyderabad Foodie · 84 reviews",
    rating: 5,
    date: "4 months ago",
    comment: "Tasty Tea Snack & spicy Chinese & Hyderabadi Biryani. If you visit after 4 PM, grab a corner seat for hot Irani Dum Chai and fresh mutton lukhmi. The staff are generally polite and the service is satisfactory. Unmatched Old City vibe.",
    avatarBg: "bg-stone-700",
    likes: 31,
    highlightDish: "Irani Chai & Mutton Lukhmi",
    verified: true
  }
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "g1",
    url: "/src/assets/images/firdous_mutton_biryani_1793377437168.jpg",
    title: "Signature Mutton Dum Biryani Handi",
    category: "biryani",
    author: "Ateeq (Local Guide)",
    caption: "Slow-cooked on coal dum with golden saffron rice and boiled egg."
  },
  {
    id: "g2",
    url: "/src/assets/images/firdous_tala_hua_gosht_1793377437650.jpg",
    title: "Crispy Tala Hua Gosht with Curry Leaves",
    category: "starters",
    author: "Mohd Nadeem",
    caption: "Deep fried seasoned mutton chunks with toasted pepper, onions and green chillies."
  },
  {
    id: "g3",
    url: "/src/assets/images/firdous_paya_soup_breakfast_1793377439332.jpg",
    title: "Dawn 5 AM Paya Soup & Char Koni Naan",
    category: "breakfast",
    author: "Gopinath J.P",
    caption: "Steaming hot trotter soup simmering since midnight for early travellers from Kachiguda."
  },
  {
    id: "g4",
    url: "/src/assets/images/firdous_irani_chai_table_1793377439400.jpg",
    title: "Irani Dum Chai with Osmania Biscuits & Lukhmi",
    category: "chai",
    author: "Syed Farhan",
    caption: "Frothy malai cup of tea paired with salty sweet biscuits and warm mince pastry."
  },
  {
    id: "g5",
    url: "/src/assets/images/firdous_restaurant_hero_1793377437164.jpg",
    title: "Copper Handis & Bustling Dining Hall",
    category: "ambiance",
    author: "Hotel Firdous Archive",
    caption: "The live degh counter where biryani is scooped fresh directly for diners."
  }
];
