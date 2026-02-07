import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, MapPin, Users, Bed, Utensils, Building, Eye } from "lucide-react";

interface GalleryItem {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  seoAlt: string;
  category: "room" | "facility";
  tags?: string[];
}

const galleryItems: GalleryItem[] = [
  {
    id: "front-elevation",
    image: "/gallery/front-elevation.jpeg",
    title: "Mount View Hotel Skardu",
    subtitle: "Hotel Exterior with Rooftop View Point",
    description: "The grand front elevation of Mount View Hotel Skardu featuring a rooftop view point, in-house restaurant, and ample car parking. Centrally located near Skardu Airport and city attractions.",
    seoAlt: "Mount View Hotel Skardu front elevation exterior view best hotel in Skardu with rooftop view point and car parking",
    category: "facility",
    tags: ["View Point", "Restaurant", "Car Parking"],
  },
  {
    id: "room-family-suite",
    image: "/gallery/lobby.jpeg",
    title: "Room 114 - Family Suite",
    subtitle: "Spacious Group Accommodation",
    description: "Extra-spacious family suite designed for larger groups and families. Multiple beds with a comfortable living area, ideal for families visiting Skardu's tourist destinations together.",
    seoAlt: "Family suite Room 114 Mount View Hotel Skardu spacious group accommodation best family-friendly hotel Skardu",
    category: "room",
    tags: ["Family Room", "Multiple Beds", "Spacious"],
  },
  {
    id: "room-executive",
    image: "/gallery/room-elegant.jpeg",
    title: "Room 201 - Executive",
    subtitle: "Elegant Decor with Scenic Garden Views",
    description: "Elegantly furnished executive rooms featuring plush velvet seating, premium bedding with decorative runners, and natural light flooding through large windows overlooking lush greenery.",
    seoAlt: "Executive Room 201 Mount View Hotel Skardu elegant furnished room with scenic views clean comfortable rooms",
    category: "room",
    tags: ["Executive", "Garden View", "Premium"],
  },
  {
    id: "room-mountain-view",
    image: "/gallery/room-scenic.jpeg",
    title: "Room 207 - Mountain View",
    subtitle: "Panoramic Karakoram Vistas",
    description: "Serene rooms with panoramic views of Skardu's pine forests and mountain ridges. Wooden flooring and designer ceilings create a warm, luxurious ambiance.",
    seoAlt: "Room 207 Mount View Hotel Skardu panoramic mountain view clean modern rooms best hotel Skardu",
    category: "room",
    tags: ["Panoramic View", "Wood Floor", "Designer Ceiling"],
  },
  {
    id: "room-grand-suite",
    image: "/gallery/room-suite-large.jpeg",
    title: "Room 209 - Grand Suite",
    subtitle: "Premium Living with Lounge Area",
    description: "Our most spacious accommodation featuring a full lounge area with sofa seating, elegant coffee table, king-size bed, and rich decor. Perfect for guests seeking extra comfort and luxury in Skardu.",
    seoAlt: "Grand suite Room 209 Mount View Hotel Skardu spacious luxury room with lounge area best accommodation in Skardu",
    category: "room",
    tags: ["Lounge Area", "King Bed", "Premium Decor"],
  },
  {
    id: "restaurant",
    image: "/gallery/restaurant.jpeg",
    title: "In-House Restaurant",
    subtitle: "24/7 Authentic Cuisine & Sky Dining",
    description: "Our elegant restaurant with polished wooden floors and designer ceiling serves authentic Pakistani and Skardu cuisine around the clock. Enjoy sky dining on the rooftop with mountain views.",
    seoAlt: "Mount View Hotel Skardu restaurant 24/7 dining authentic cuisine sky dining clean family-friendly restaurant",
    category: "facility",
    tags: ["24/7 Service", "Sky Dining", "Authentic Cuisine"],
  },
];

const fadeIn = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function PremiumGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const navigate = useCallback(
    (dir: 1 | -1) =>
      setLightboxIndex((prev) =>
        prev !== null ? (prev + dir + galleryItems.length) % galleryItems.length : null
      ),
    []
  );

  const rooms = galleryItems.filter((i) => i.category === "room");
  const facilities = galleryItems.filter((i) => i.category === "facility");

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50" data-testid="premium-gallery-section">
      <div className="container max-w-7xl px-6">
        {/* Section Header */}
        <motion.div {...fadeIn} className="text-center mb-16 space-y-4">
          <span className="inline-block text-amber-600 font-semibold tracking-wider text-sm uppercase">
            Photo Gallery
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900">
            Explore Mount View Hotel
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Take a visual tour of our clean, comfortable rooms and modern facilities
            &mdash; your perfect base for discovering Skardu and Gilgit-Baltistan
          </p>
        </motion.div>

        {/* Hotel Exterior - Full Width Hero */}
        <motion.div {...fadeIn} className="mb-16">
          <div
            className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-shadow duration-500"
            onClick={() => openLightbox(0)}
            data-testid="gallery-front-elevation"
          >
            <div className="aspect-[21/9] sm:aspect-[21/8]">
              <img
                src={facilities[0].image}
                alt={facilities[0].seoAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
              <div className="flex flex-wrap gap-2 mb-3">
                {facilities[0].tags?.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-1">
                {facilities[0].title}
              </h3>
              <p className="text-white/80 text-sm sm:text-base max-w-xl">
                {facilities[0].subtitle}
              </p>
            </div>
            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Eye className="w-5 h-5" />
            </div>
          </div>
        </motion.div>

        {/* Rooms Grid */}
        <motion.div {...fadeIn} className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <Bed className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">Our Rooms</h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {rooms.map((room, idx) => {
              const globalIdx = galleryItems.indexOf(room);
              return (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => openLightbox(globalIdx)}
                  data-testid={`gallery-${room.id}`}
                >
                  <div className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500">
                    <div className="aspect-[4/3]">
                      <img
                        src={room.image}
                        alt={room.seoAlt}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Room Number Badge */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-amber-500/90 backdrop-blur-sm">
                      <span className="text-xs font-bold text-white tracking-wide">
                        {room.title.split(" - ")[0]}
                      </span>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center">
                        <Eye className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Bottom info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h4 className="font-serif text-lg font-bold text-white leading-tight mb-0.5">
                        {room.title}
                      </h4>
                      <p className="text-white/80 text-xs">{room.subtitle}</p>
                    </div>
                  </div>

                  {/* Tags below card */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {room.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Restaurant Section */}
        <motion.div {...fadeIn}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <Utensils className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Dining & Facilities
            </h3>
          </div>

          <div
            className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-shadow duration-500"
            onClick={() => openLightbox(galleryItems.indexOf(facilities[1]))}
            data-testid="gallery-restaurant"
          >
            <div className="grid md:grid-cols-2">
              {/* Image */}
              <div className="aspect-[4/3] md:aspect-auto">
                <img
                  src={facilities[1].image}
                  alt={facilities[1].seoAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              {/* Info Panel */}
              <div className="bg-slate-900 p-8 sm:p-10 flex flex-col justify-center">
                <div className="flex flex-wrap gap-2 mb-4">
                  {facilities[1].tags?.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h4 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3">
                  {facilities[1].title}
                </h4>
                <p className="text-slate-300 leading-relaxed mb-6">
                  {facilities[1].description}
                </p>
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Utensils className="w-4 h-4 text-amber-400" /> Pakistani &amp; Skardu Cuisine
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-amber-400" /> Family Friendly
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
          data-testid="gallery-lightbox"
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            data-testid="lightbox-close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Nav prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(-1);
            }}
            className="absolute left-3 sm:left-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            data-testid="lightbox-prev"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Nav next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(1);
            }}
            className="absolute right-3 sm:right-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            data-testid="lightbox-next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Image + Caption */}
          <div className="max-w-5xl w-full px-14" onClick={(e) => e.stopPropagation()}>
            <motion.img
              key={lightboxIndex}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25 }}
              src={galleryItems[lightboxIndex].image}
              alt={galleryItems[lightboxIndex].seoAlt}
              className="w-full max-h-[78vh] object-contain rounded-xl"
            />
            <div className="mt-4 text-center text-white">
              <h3 className="font-serif text-xl font-bold">{galleryItems[lightboxIndex].title}</h3>
              <p className="text-white/70 text-sm mt-1">{galleryItems[lightboxIndex].subtitle}</p>
              <p className="text-white/50 text-xs mt-1">
                {lightboxIndex + 1} / {galleryItems.length}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
