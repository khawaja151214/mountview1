// Real hotel images
import heroImg from "@assets/IMG_5559_1767339383873_1767431374218.jpeg";
import room1Img from "@assets/IMG_5538_1767190348861_1767431623667.webp";
import room2Img from "@assets/9915fd4f-0815-41eb-823b-9bc600418b7f_1767134676800_1767431573088.jpeg";
import room3Img from "@assets/8b348f38-191f-4e69-a431-646d2a178d13_1767192367480_1767430882671.jpeg";
import room4Img from "@assets/8b348f38-191f-4e69-a431-646d2a178d13_1767190096659_1767430882671.jpeg";
import restaurantImg from "@assets/2a1dc8c8-4aa8-4de5-9c1d-2da88889250c_1767264342786_1767430882670.jpeg";
import receptionImg from "@assets/2a1dc8c8-4aa8-4de5-9c1d-2da88889250c_1767264342786_1767430882670.jpeg";
import hotelNightImg from "@assets/4dcfdcf6-5ed3-4e15-b6f1-787f54359e89_1767134676800_1767431505194.jpeg";
import staffImg from "@assets/3e68b7d6-7bcb-4856-b4e8-674215b4cc36_1767134676800_1767430882670.jpeg";

// Destination images
import sarfarangaImg from "@assets/IMG_5479_1767134676800_1767430705648.jpeg";
import deosaiImg from "@assets/IMG_5478_1767134676800_1767430705647.jpeg";
import kachuraImg from "@assets/IMG_5477_1767134676800_1767432246177.jpeg";
import satparaImg from "@assets/IMG_5476_1767134676800_1767432234450.jpeg";
import kharposhoImg from "@assets/IMG_5475_1767134676800_1767432215898.jpeg";
import airportImg from "@assets/IMG_5547_1767204620841_1767430705651.jpeg";
import zeroPointImg from "@assets/IMG_5474_1767134676800_1767432221861.jpeg";
import diningImg from "@assets/23b35ea0-4b04-4121-9d26-eda6b23c1750_1767134676800_1767430882672.jpeg";
import shangraImg from "@assets/IMG_5536_1767189804737_1767430705648.jpeg";
import execRoom1Img from "@assets/IMG_5539_1767191984491_1767430705651.jpeg";
const deluxeRoomImg = "/attached_assets/2a1dc8c8-4aa8-4de5-9c1d-2da88889250c_1767264342786_1767430882670.jpeg";
const stdRoomImg = "/attached_assets/2a1dc8c8-4aa8-4de5-9c1d-2da88889250c_1767264342786_1767430882670.jpeg";
import suiteRoomImg from "@assets/IMG_5537_1767192232998_1767430705649.jpeg";
import familySuiteImg from "@assets/93d95d20-db74-4f5b-bb7c-96fa23570315_1767264342786_1767430802894.jpeg";
const homeSecImageImg = "/attached_assets/interior-room.jpeg";
import heroImageImg from "@assets/IMG_5559_1767339383873_1767431374218.jpeg";

export interface Room {
  id: string;
  number: string;
  seoName: string; // SEO-optimized room name
  seoUrl: string; // SEO-friendly URL slug
  type: "Standard" | "Deluxe" | "Executive" | "Family Suite" | "King Room";
  price: number;
  status: "Available" | "Booked" | "Occupied";
  floor: "1st Floor" | "2nd Floor" | "Top Floor";
  description: string;
  seoDescription: string; // Enhanced SEO description
  capacity: string; // Guest capacity
  amenities: string[];
  image: string;
  imageAlt: string; // SEO alt text
}

export const rooms: Room[] = [
  // 1st Floor - Standard Rooms (MV 101-107) - Budget & Family Friendly
  ...Array.from({ length: 7 }, (_, i) => ({
    id: `mv-10${i + 1}`,
    number: `MV ${101 + i}`,
    seoName: `Skardu City View Budget Room ${101 + i}`,
    seoUrl: `skardu-city-view-budget-room-${101 + i}`,
    type: "Standard" as const,
    price: 4000,
    status: "Available" as const,
    floor: "1st Floor" as const,
    description: "Comfortable budget-friendly room perfect for families visiting Skardu city.",
    seoDescription: "Affordable family room in Skardu city center. Ideal for budget travelers, families, and groups visiting Skardu. Conveniently located near Skardu airport and city attractions.",
    capacity: "2-3 Guests (Family Suitable)",
    amenities: ["Free Wi-Fi", "Hot Water", "Basic TV", "City View", "Free Parking"],
    image: stdRoomImg,
    imageAlt: "budget family room in Skardu city with mountain views",
  })),
  // 1st Floor - Deluxe Rooms (MV 108-114) - Family & Group
  ...Array.from({ length: 7 }, (_, i) => ({
    id: `mv-10${i + 8}`,
    number: `MV ${108 + i}`,
    seoName: `Skardu Family Deluxe Room ${108 + i}`,
    seoUrl: `skardu-family-deluxe-room-${108 + i}`,
    type: "Deluxe" as const,
    price: 6000,
    status: "Available" as const,
    floor: "1st Floor" as const,
    description: "Spacious room ideal for families and groups visiting Skardu.",
    seoDescription: "Family-friendly deluxe room in Skardu city. Perfect for families, couples, and small groups. Near Skardu airport with easy access to tourist destinations. Includes free parking and Wi-Fi.",
    capacity: "3-4 Guests (Family/Group)",
    amenities: ["Free Wi-Fi", "Hot Water", "LED TV", "Mountain View", "Free Parking", "Room Service"],
    image: deluxeRoomImg,
    imageAlt: "family accommodation deluxe room near Skardu airport",
  })),
  // 2nd Floor - Executive Rooms (MV 201-206) - Corporate & Couples
  ...Array.from({ length: 6 }, (_, i) => ({
    id: `mv-20${i + 1}`,
    number: `MV ${201 + i}`,
    seoName: `Skardu Central Executive Room ${201 + i}`,
    seoUrl: `skardu-central-executive-room-${201 + i}`,
    type: "Executive" as const,
    price: 7000,
    status: "Available" as const,
    floor: "2nd Floor" as const,
    description: "Executive room with Karakoram mountain views, perfect for couples and business travelers.",
    seoDescription: "Executive hotel room in Skardu city center with Karakoram views. Ideal for couples, corporate stays, and travelers seeking comfort. Located near Skardu Bazar and airport with modern amenities.",
    capacity: "2 Guests (Couple/Corporate)",
    amenities: ["King Bed", "Living Area", "Premium Wi-Fi", "Mountain View", "Work Desk", "Mini Fridge"],
    image: execRoom1Img,
    imageAlt: "executive hotel room Skardu city with Karakoram mountain views",
  })),
  // 2nd Floor - Family Suites (MV 207-211) - Large Families & Groups
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `mv-20${i + 7}`,
    number: `MV ${207 + i}`,
    seoName: `Karakoram View Family Suite ${207 + i}`,
    seoUrl: `karakoram-view-family-suite-${207 + i}`,
    type: "Family Suite" as const,
    price: 10000,
    status: "Available" as const,
    floor: "2nd Floor" as const,
    description: "Spacious family suite with stunning Karakoram views, perfect for large families and groups.",
    seoDescription: "Spacious family suite in Skardu with panoramic Karakoram mountain views. Perfect for large families, groups, and friends traveling to Skardu. Near major tourist destinations with parking and dining facilities.",
    capacity: "4-6 Guests (Large Family/Group)",
    amenities: ["Multiple Beds", "Living Area", "Premium Wi-Fi", "Karakoram View", "Family Dining Area", "Extra Space"],
    image: familySuiteImg,
    imageAlt: "family suite accommodation Skardu with Karakoram mountain views",
  })),
  // Top Floor - King Suite (401) - Special Couples & Families
  {
    id: "mv-401",
    number: "King 401",
    seoName: "Skardu Valley View King Suite 401",
    seoUrl: "skardu-valley-view-king-suite",
    type: "King Room",
    price: 15000,
    status: "Available",
    floor: "Top Floor",
    description: "Top-floor king suite with panoramic Skardu valley and mountain views.",
    seoDescription: "Exclusive top-floor king suite in Skardu with 360-degree valley and mountain views. Ideal for special occasions, honeymoons, and travelers seeking the best views in Skardu city. Features private terrace and premium amenities.",
    capacity: "2-4 Guests (Couple/Small Family)",
    amenities: ["King Bed", "Private Terrace", "Premium Wi-Fi", "Panoramic Valley View", "Luxury Bath", "Premium Service"],
    image: suiteRoomImg,
    imageAlt: "king suite Skardu with panoramic valley and mountain views",
  }
];

export const hotelInfo = {
  name: "Mount View Hotel Skardu",
  tagline: "Family Hotel in Skardu City | Near Airport & Tourist Destinations",
  address: "Main Road, Skardu City, Gilgit-Baltistan, Pakistan",
  phone: "+92 346 8484849",
  whatsapp: "+92 346 8484849",
  email: "info@mountviewskardu.com",
  website: "https://www.mountviewskardu.com",
  heroImage: heroImageImg,
  roomImage: homeSecImageImg,
  restaurantImage: restaurantImg,
  receptionImage: receptionImg,
  staffImage: staffImg,
  hotelNightImage: hotelNightImg,
  // SEO Information
  seoDescription: "Mount View Hotel Skardu - Family-friendly hotel in Skardu city near airport. Budget accommodation, group stays, restaurant, free parking, and transport facility. Ideal for families visiting Skardu tourist destinations.",
  seoKeywords: "hotel in Skardu, family hotel Skardu, hotel near Skardu airport, budget hotel Skardu, group accommodation Skardu, hotel with restaurant, Skardu city hotel",
  // Location & Proximity
  location: {
    city: "Skardu",
    province: "Gilgit-Baltistan",
    country: "Pakistan",
    nearbyPlaces: [
      "Skardu Airport (10 minutes)",
      "Skardu City Center",
      "Skardu Bazar (5 minutes)",
      "Deosai National Park (accessible)",
      "Kachura Lake (30 minutes)",
      "Satpara Lake (20 minutes)",
      "Shigar Valley (accessible)"
    ]
  },
  // Facilities for SEO
  facilities: [
    "Family Accommodation",
    "Group & Friends Stay",
    "Budget Rooms Available",
    "Corporate Accommodation",
    "Free Car Parking",
    "Basement Parking",
    "In-House Restaurant",
    "Transport Assistance",
    "Free Wi-Fi",
    "24/7 Room Service"
  ]
};

export const masterAccount = {
  id: "master",
  username: "shehzad",
  password: "shehzad85",
  email: "shahzadgull@gmail.com",
  role: "admin",
  approved: true,
};

export const isUserApproved = (username: string) => {
  if (username === masterAccount.username) return true;
  const stored = localStorage.getItem("approvedAccounts");
  if (!stored) return false;
  const approved = JSON.parse(stored);
  return approved.includes(username);
};

export const requestApproval = (username: string, email: string, pass: string) => {
  const pending = JSON.parse(localStorage.getItem("pendingApprovals") || "[]");
  const newRequest = {
    id: Date.now().toString(),
    username,
    email,
    password: pass,
    status: "pending",
    requestedAt: new Date().toISOString()
  };
  localStorage.setItem("pendingApprovals", JSON.stringify([...pending, newRequest]));
  return true;
};

export const approveRequest = (requestId: string) => {
  const pending = JSON.parse(localStorage.getItem("pendingApprovals") || "[]");
  const request = pending.find((r: any) => r.id === requestId);
  if (request) {
    const approved = JSON.parse(localStorage.getItem("approvedAccounts") || "[]");
    localStorage.setItem("approvedAccounts", JSON.stringify([...approved, request.username]));
    
    const updatedPending = pending.map((r: any) => 
      r.id === requestId ? { ...r, status: "approved" } : r
    );
    localStorage.setItem("pendingApprovals", JSON.stringify(updatedPending));
  }
  return true;
};

export const rejectRequest = (requestId: string) => {
  console.log("Rejected request:", requestId);
  return true;
};

export const getPendingRequests = () => {
  return [];
};

export const menu = [
  // 🥤 DRINKS
  { id: "d1", name: "Tea", price: 200, category: "DRINKS", description: "Regular milk tea" },
  { id: "d2", name: "Coffee", price: 300, category: "DRINKS", description: "Instant coffee" },
  { id: "d3", name: "Green Tea", price: 200, category: "DRINKS", description: "Refreshing green tea" },
  { id: "d4", name: "Pharring Chhoo", price: 350, category: "DRINKS", description: "Apricot Juice" },
  { id: "d5", name: "Paya Cha", price: 250, category: "DRINKS", description: "Pink Tea" },
  { id: "d6", name: "Tumburu Cha", price: 200, category: "DRINKS", description: "Wild Herb Tea" },
  { id: "d7", name: "Folling Cha", price: 200, category: "DRINKS", description: "Thyme Tea" },

  // 🍳 BREAKFAST
  { id: "b1", name: "Paratha", price: 200, category: "BREAKFAST", description: "Freshly made paratha" },
  { id: "b2", name: "Toast, Butter & Jam", price: 300, category: "BREAKFAST", description: "Toasted bread with butter and jam" },
  { id: "b3", name: "Omelette / Half Fry", price: 350, category: "BREAKFAST", description: "Pakistani style omelette or half fried egg" },
  { id: "b4", name: "Fried Egg", price: 300, category: "BREAKFAST", description: "Sunny side up fried egg" },
  { id: "b5", name: "Boiled Egg", price: 250, category: "BREAKFAST", description: "Perfectly boiled egg" },
  { id: "b6", name: "Corn Flakes / Porridge", price: 300, category: "BREAKFAST", description: "Healthy cereal breakfast" },
  { id: "b7", name: "Juice (Seasonal)", price: 300, category: "BREAKFAST", description: "Fresh seasonal fruit juice" },
  { id: "b8", name: "Glass of Milk", price: 250, category: "BREAKFAST", description: "Fresh milk glass" },

  // 🍞 LOCAL SIDES / BREADS
  { id: "ls1", name: "Stramma Kisir", price: 250, category: "LOCAL SIDES", description: "Buckwheat Pancakes with Herbal Sauce" },
  { id: "ls2", name: "Anday Kisir", price: 500, category: "LOCAL SIDES", description: "Egg Pancakes with Butter & Honey" },
  { id: "ls3", name: "Azoq", price: 300, category: "LOCAL SIDES", description: "Local Deep Fried Bread" },
  { id: "ls4", name: "Zerchoong", price: 600, category: "LOCAL SIDES", description: "4 Fried Biscuits" },
  { id: "ls5", name: "Kulcha", price: 500, category: "LOCAL SIDES", description: "8 Baked Biscuits" },
  { id: "ls6", name: "Stapkhor", price: 1300, category: "LOCAL SIDES", description: "Brussels Sprouts Bread with Apricot Oil" },

  // 🍲 SOUPS
  { id: "s1", name: "Chicken Corn Soup", price: 650, category: "SOUPS", description: "Classic chicken corn soup" },
  { id: "s2", name: "Tomato Soup", price: 450, category: "SOUPS", description: "Rich tomato soup" },
  { id: "s3", name: "Vegetable Soup", price: 500, category: "SOUPS", description: "Mixed vegetable soup" },
  { id: "s4", name: "Hot & Sour Soup", price: 700, category: "SOUPS", description: "Spicy and tangy soup" },
  { id: "s5", name: "Family Bowl Soup", price: 1200, category: "SOUPS", description: "Large serving for family" },

  // ⭐ SPECIAL LOCAL
  { id: "sl1", name: "Mamtu", price: 990, category: "SPECIAL LOCAL", description: "18 Traditional Dumplings Filled with Chicken & Local Herbs" },
  { id: "sl2", name: "Marzan", price: 1760, category: "SPECIAL LOCAL", description: "Plate of Buckwheat Served with Local Butter & Apricot Oil" },
  { id: "sl3", name: "Prapu", price: 1760, category: "SPECIAL LOCAL", description: "Plate of Cubes of Cooked Wheat Served with Walnut Sauce" },
  { id: "sl4", name: "Stapkhoor", price: 1430, category: "SPECIAL LOCAL", description: "6 Brussels Sprouts Breads with Apricot Oil & Walnut Oil" },
  { id: "sl5", name: "Tras Balay", price: 990, category: "SPECIAL LOCAL", description: "Bowl of Hand Made Noodles in Soup Made with Local Herbs" },

  // 🍛 PAKISTANI DISHES
  { id: "p1", name: "Mix Vegetable", price: 500, category: "PAKISTANI", description: "Assorted seasonal vegetables" },
  { id: "p2", name: "Daal", price: 500, category: "PAKISTANI", description: "Traditional lentils" },
  { id: "p3", name: "Plain Rice", price: 600, category: "PAKISTANI", description: "Steamed basmati rice" },
  { id: "p4", name: "Brown Rice", price: 600, category: "PAKISTANI", description: "Healthy brown rice" },
  { id: "p5", name: "Zeera Rice", price: 800, category: "PAKISTANI", description: "Cumin flavored rice" },
  { id: "p6", name: "Vegetable Rice", price: 900, category: "PAKISTANI", description: "Rice cooked with vegetables" },
  { id: "p7", name: "Fresh Salad", price: 250, category: "PAKISTANI", description: "Seasonal fresh salad" },
  { id: "p8", name: "Russian Salad", price: 500, category: "PAKISTANI", description: "Classic creamy russian salad" },
  { id: "p9", name: "Yogurt / Raita", price: 200, category: "PAKISTANI", description: "Yogurt dip" },
  { id: "p10", name: "Nan", price: 120, category: "PAKISTANI", description: "Freshly baked tandoori nan" },
  { id: "p11", name: "Trout Fish (Local)", price: 4200, category: "PAKISTANI", description: "Fresh local trout fish" },

  // 🍜 CHINESE
  { id: "c1", name: "Chicken Manchurian", price: 1200, category: "CHINESE", description: "Indo-Chinese style chicken" },
  { id: "c2", name: "Chicken Chow Mein", price: 1200, category: "CHINESE", description: "Stir-fried noodles with chicken" },
  { id: "c3", name: "Vegetable Chow Mein", price: 1000, category: "CHINESE", description: "Stir-fried noodles with veggies" },
  { id: "c4", name: "Egg Fried Rice", price: 1000, category: "CHINESE", description: "Classic egg fried rice" },
  { id: "c5", name: "Chicken Fried Rice", price: 1200, category: "CHINESE", description: "Delicious chicken fried rice" },
  { id: "c6", name: "Chicken Ginger", price: 1200, category: "CHINESE", description: "Ginger flavored chicken" },

  // 🍗 CHICKEN
  { id: "ch1", name: "Chicken Steam Roast (Half)", price: 2200, category: "CHICKEN", description: "Half chicken steam roasted" },
  { id: "ch2", name: "Chicken Steam Roast (Full)", price: 3800, category: "CHICKEN", description: "Full chicken steam roasted" },
  { id: "ch3", name: "Chicken Karahi (Half)", price: 2200, category: "CHICKEN", description: "Spicy chicken karahi half" },
  { id: "ch4", name: "Chicken Karahi (Full)", price: 3800, category: "CHICKEN", description: "Spicy chicken karahi full" },
  { id: "ch5", name: "Chicken Handi (Half)", price: 2200, category: "CHICKEN", description: "Creamy chicken handi half" },
  { id: "ch6", name: "Chicken Handi (Full)", price: 3800, category: "CHICKEN", description: "Creamy chicken handi full" },
  { id: "ch7", name: "Chicken Jalfrezi (Half)", price: 2200, category: "CHICKEN", description: "Stir-fried chicken jalfrezi half" },
  { id: "ch8", name: "Chicken Jalfrezi (Full)", price: 3800, category: "CHICKEN", description: "Stir-fried chicken jalfrezi full" },
  { id: "ch9", name: "Chicken Boneless (Per Order)", price: 1200, category: "CHICKEN", description: "Boneless chicken dish" },

  // 🥩 MUTTON
  { id: "m1", name: "Mutton Karahi (Half)", price: 3800, category: "MUTTON", description: "Traditional mutton karahi half" },
  { id: "m2", name: "Mutton Karahi (Full)", price: 6500, category: "MUTTON", description: "Traditional mutton karahi full" },
  { id: "m3", name: "Mutton Handi (Half)", price: 3800, category: "MUTTON", description: "Slow cooked mutton handi half" },
  { id: "m4", name: "Mutton Handi (Full)", price: 6500, category: "MUTTON", description: "Slow cooked mutton handi full" },
  { id: "m5", name: "Mutton Qorma (Full)", price: 6800, category: "MUTTON", description: "Rich mutton qorma full" },
  { id: "m6", name: "Mutton (Per Order)", price: 3200, category: "MUTTON", description: "Mutton dish serving" },

  // 🥪 SNACKS
  { id: "sn1", name: "Chicken Sandwich (4 Pieces)", price: 600, category: "SNACKS", description: "4 pieces chicken sandwich" },
  { id: "sn2", name: "Club Sandwich (4 Pieces)", price: 800, category: "SNACKS", description: "4 pieces club sandwich" },
  { id: "sn3", name: "French Toast (4 Pieces)", price: 700, category: "SNACKS", description: "4 pieces french toast" },
  { id: "sn4", name: "Pakora", price: 500, category: "SNACKS", description: "Deep fried snacks" },
  { id: "sn5", name: "Potato Chips", price: 300, category: "SNACKS", description: "Crispy potato chips" },
  { id: "sn6", name: "Biscuits", price: 200, category: "SNACKS", description: "Assorted biscuits" },

  // 📦 TAKEAWAY
  { id: "t1", name: "Breakfast Box", price: 900, category: "TAKEAWAY", description: "Ready to eat breakfast box" },
  { id: "t2", name: "Lunch Box", price: 1800, category: "TAKEAWAY", description: "Ready to eat lunch box" },
  { id: "t3", name: "Pulao Box", price: 1000, category: "TAKEAWAY", description: "Traditional pulao box" },
  { id: "t4", name: "MV Special Rice (Takeaway)", price: 1200, category: "TAKEAWAY", description: "Mount View special rice takeaway" },
  { id: "t5", name: "Dinner Box", price: 2500, category: "TAKEAWAY", description: "Ready to eat dinner box" },
];

export const destinations = [
  {
    id: "dest-airport",
    name: "Skardu International Airport",
    distance: "11 km",
    description: "Your gateway to the majestic peaks of Baltistan. Just a short 20-minute drive from our hotel.",
    image: airportImg,
  },
  {
    id: "dest-7",
    name: "Kharpocho Fort",
    distance: "2 km (Walking)",
    description: "An ancient fort with panoramic views of the whole Skardu valley from the walking track.",
    image: kharposhoImg,
  },
  {
    id: "dest-1",
    name: "Skardu Zero Point (Yadgar)",
    distance: "2 km",
    description: "The main city center and a historical landmark of Skardu with magnificent mountain views.",
    image: zeroPointImg,
  },
  {
    id: "dest-2",
    name: "Satpara Lake",
    distance: "9 km",
    description: "A breathtaking turquoise lake that supplies water to Skardu Valley.",
    image: satparaImg,
  },
  {
    id: "dest-3",
    name: "Shangrila Resort (Lower Kachura Lake)",
    distance: "30 km",
    description: "Famous as 'Heaven on Earth', a must-visit resort with vibrant gardens and colorful boats.",
    image: shangraImg,
  },
  {
    id: "dest-4",
    name: "Upper Kachura Lake",
    distance: "32 km",
    description: "Crystal clear water surrounded by apricot trees and snow-capped peaks.",
    image: kachuraImg,
  },
  {
    id: "dest-5",
    name: "Deosai National Park",
    distance: "40 km",
    description: "The second highest plateau in the world, known as the Land of Giants.",
    image: deosaiImg,
  },
  {
    id: "dest-6",
    name: "Sarfaranga Desert",
    distance: "35 km",
    description: "A unique desert landscape in the Himalayas, famous for paragliding and adventure sports.",
    image: sarfarangaImg,
  },
];

export interface Review {
  id: string;
  author: string;
  role?: string;
  date: string;
  rating: number;
  text: string;
  type: string;
}

export const reviews: Review[] = [
  {
    id: "1",
    author: "Zeeshan Ahmed",
    date: "2025-12-15",
    rating: 5,
    text: "The mountain views from the family suite are absolutely breathtaking. The staff was incredibly helpful with our local tours.",
    type: "Google",
  },
  {
    id: "2",
    author: "Sarah Khan",
    date: "2025-11-20",
    rating: 5,
    text: "Excellent restaurant! The Mamtu (local dumplings) are a must-try. Clean rooms and great hospitality.",
    type: "Booking.com",
  },
  {
    id: "3",
    author: "Imran Raza",
    date: "2025-10-10",
    rating: 4,
    text: "Perfect location near the city center but peaceful. The Wi-Fi was strong, which helped since I was working remotely.",
    type: "TripAdvisor",
  }
];
