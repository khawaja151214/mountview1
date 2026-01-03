// Real hotel images
import heroImg from "@assets/c1d9db4f-cf89-4fbd-a48c-18e96042c396_1767134676800_1767430765600.jpeg";
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
  type: "Standard" | "Deluxe" | "Executive" | "Family Suite" | "King Room";
  price: number;
  status: "Available" | "Booked" | "Occupied";
  floor: "1st Floor" | "2nd Floor" | "Top Floor";
  description: string;
  amenities: string[];
  image: string;
}

export const rooms: Room[] = [
  // 1st Floor - 14 Rooms (MV 101 - MV 114)
  ...Array.from({ length: 14 }, (_, i) => ({
    id: `mv-10${i + 1}`,
    number: `MV ${101 + i}`,
    type: (101 + i) <= 107 ? "Standard" : "Deluxe" as any,
    price: (101 + i) <= 107 ? 4000 : 6000,
    status: "Available" as const,
    floor: "1st Floor" as const,
    description: "Elegant room with essential amenities and mountain views.",
    amenities: ["Free Wi-Fi", "Hot Water", "Basic TV"],
    image: (101 + i) <= 107 ? room1Img : room2Img,
  })),
  // 2nd Floor - 11 Rooms (MV 201 - MV 211)
  ...Array.from({ length: 11 }, (_, i) => ({
    id: `mv-20${i + 1}`,
    number: `MV ${201 + i}`,
    type: (201 + i) <= 206 ? "Executive" : "Family Suite" as any,
    price: (201 + i) <= 206 ? 7000 : 10000,
    status: "Available" as const,
    floor: "2nd Floor" as const,
    description: "Spacious room with premium comfort and mountain vistas.",
    amenities: ["King Bed", "Living Area", "Free Wi-Fi", "Mountain View"],
    image: (201 + i) <= 206 ? room1Img : familySuiteImg,
  })),
  // Top Floor - King Room
  {
    id: "mv-401",
    number: "King 401",
    type: "King Room",
    price: 15000,
    status: "Available",
    floor: "Top Floor",
    description: "Exclusive top-floor suite with panoramic views of the Skardu valley.",
    amenities: ["King Bed", "Private Terrace", "Premium Wi-Fi", "Luxury Bath"],
    image: suiteRoomImg,
  }
];

export const hotelInfo = {
  name: "Mount View Hotel Skardu",
  address: "Main Road, Skardu, Gilgit-Baltistan",
  phone: "+92 346 8484849",
  email: "info@mountviewskardu.com",
  heroImage: heroImageImg,
  roomImage: homeSecImageImg,
  restaurantImage: restaurantImg,
  receptionImage: receptionImg,
  staffImage: staffImg,
  hotelNightImage: hotelNightImg,
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
