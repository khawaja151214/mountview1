import { motion } from "framer-motion";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight, MapPin, Users, Bed, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Premium Gallery Data with SEO-optimized content
const galleryData = {
  rooms: [
    {
      id: "room-104-103",
      image: "/attached_assets/room-104-103.jpeg",
      title: "Deluxe Room 104 & 103",
      subtitle: "First Floor | Skardu City View",
      description: "Spacious and clean deluxe rooms with modern amenities, perfect for families visiting Skardu. Features comfortable bedding, mountain views, and premium facilities.",
      capacity: "2-4 Guests",
      amenities: ["Free Wi-Fi", "Hot Water", "LED TV", "Mountain View"],
      seoAlt: "Deluxe family room in Mount View Hotel Skardu with city views",
      category: "Deluxe Rooms"
    },
    {
      id: "room-201-202",
      image: "/attached_assets/room-201-202.jpeg",
      title: "Executive Room 201 & 202",
      subtitle: "Second Floor | Karakoram View",
      description: "Premium executive rooms with stunning Karakoram mountain views. Ideal for couples and business travelers seeking comfort and scenic beauty in Skardu.",
      capacity: "2 Guests",
      amenities: ["King Bed", "Premium Wi-Fi", "Work Desk", "Valley View"],
      seoAlt: "Executive hotel room in Skardu with Karakoram mountain views",
      category: "Executive Rooms"
    },
    {
      id: "room-207-209",
      image: "/attached_assets/room-207-209.jpeg",
      title: "Family Suite 207 & 209",
      subtitle: "Second Floor | Panoramic Views",
      description: "Luxurious family suites offering panoramic mountain vistas and extra space for large families or groups traveling to Skardu's tourist destinations.",
      capacity: "4-6 Guests",
      amenities: ["Multiple Beds", "Living Area", "Family Dining", "Premium View"],
      seoAlt: "Family suite accommodation in Skardu hotel near tourist spots",
      category: "Family Suites"
    }
  ],
  facilities: [
    {
      id: "lobby",
      image: "/attached_assets/lobby-restaurant.jpeg",
      title: "Hotel Lobby & Restaurant",
      subtitle: "Warm Welcome | Authentic Dining",
      description: "Elegant lobby with 24/7 reception and in-house restaurant serving authentic Skardu and Pakistani cuisine. Clean, comfortable, and family-friendly environment.",
      features: ["24/7 Reception", "In-house Restaurant", "Complimentary Tea"],
      seoAlt: "Mount View Hotel Skardu lobby and restaurant area with traditional dining",
      category: "Dining & Reception"
    },
    {
      id: "washroom",
      image: "/attached_assets/washroom.jpeg",
      title: "Premium Washrooms",
      subtitle: "Clean & Modern",
      description: "Spotlessly clean, modern washrooms with hot water facilities and premium fixtures. Maintained to the highest hygiene standards for guest comfort.",
      features: ["Hot Water 24/7", "Modern Fixtures", "Daily Cleaning"],
      seoAlt: "Clean and modern washroom facilities in best hotel in Skardu",
      category: "Facilities"
    }
  ]
};

export default function PremiumGallery() {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const allImages = [...galleryData.rooms, ...galleryData.facilities];

  const openLightbox = (image: any, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? (currentIndex - 1 + allImages.length) % allImages.length
      : (currentIndex + 1) % allImages.length;
    setCurrentIndex(newIndex);
    setSelectedImage(allImages[newIndex]);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="py-24 bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="container max-w-7xl px-6">
        
        {/* Section Header */}
        <motion.div {...fadeInUp} className="text-center mb-16 space-y-4">
          <span className="inline-block text-amber-600 font-semibold tracking-wider text-sm uppercase">Photo Gallery</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900">
            Discover Our Premium Accommodations
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Explore our clean, comfortable rooms and modern facilities at Mount View Hotel Skardu - 
            your perfect base for discovering the beauty of Gilgit-Baltistan
          </p>
        </motion.div>

        {/* Rooms Showcase */}
        <motion.div {...fadeInUp} className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Bed className="w-6 h-6 text-amber-600" />
            <h3 className="font-serif text-3xl font-bold text-slate-900">Our Rooms</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {galleryData.rooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => openLightbox(room, index)}
              >
                <Card className="overflow-hidden border-2 hover:border-amber-200 hover:shadow-2xl transition-all duration-500">
                  <div className="relative h-72 overflow-hidden">
                    <img 
                      src={room.image}
                      alt={room.seoAlt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm">
                      <span className="text-sm font-bold text-slate-900">{room.category}</span>
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-white text-center">
                        <Sparkles className="w-12 h-12 mx-auto mb-2" />
                        <p className="text-sm font-medium">Click to view details</p>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h4 className="font-serif text-xl font-bold text-slate-900 mb-1">{room.title}</h4>
                      <p className="text-sm text-amber-600 font-medium flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {room.subtitle}
                      </p>
                    </div>
                    
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                      {room.description}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Users className="w-4 h-4" />
                        <span>{room.capacity}</span>
                      </div>
                      <div className="flex gap-2">
                        {room.amenities.slice(0, 2).map((amenity, i) => (
                          <span key={i} className="text-xs px-2 py-1 rounded-full bg-amber-50 text-amber-700">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Facilities Showcase */}
        <motion.div {...fadeInUp}>
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="w-6 h-6 text-amber-600" />
            <h3 className="font-serif text-3xl font-bold text-slate-900">Hotel Facilities</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {galleryData.facilities.map((facility, index) => (
              <motion.div
                key={facility.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => openLightbox(facility, galleryData.rooms.length + index)}
              >
                <Card className="overflow-hidden border-2 hover:border-amber-200 hover:shadow-2xl transition-all duration-500">
                  <div className="relative h-80 overflow-hidden">
                    <img 
                      src={facility.image}
                      alt={facility.seoAlt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm">
                      <span className="text-sm font-bold text-slate-900">{facility.category}</span>
                    </div>
                    
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-white text-center">
                        <Sparkles className="w-12 h-12 mx-auto mb-2" />
                        <p className="text-sm font-medium">Click to enlarge</p>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h4 className="font-serif text-2xl font-bold text-slate-900 mb-1">{facility.title}</h4>
                      <p className="text-sm text-amber-600 font-medium">{facility.subtitle}</p>
                    </div>
                    
                    <p className="text-slate-600 leading-relaxed">
                      {facility.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
                      {facility.features.map((feature, i) => (
                        <span key={i} className="text-sm px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 font-medium">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div {...fadeInUp} className="mt-20 text-center">
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-12 text-white">
            <h3 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Ready to Experience Skardu's Best Hotel?
            </h3>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Book your stay at Mount View Hotel Skardu and enjoy clean, comfortable accommodations 
              near all major tourist destinations
            </p>
            <Button 
              size="lg"
              className="bg-white text-amber-600 hover:bg-slate-50 px-10 py-7 text-lg font-semibold rounded-xl shadow-2xl"
            >
              Book Your Room Now
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
            className="absolute left-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
            className="absolute right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={selectedImage.image}
              alt={selectedImage.seoAlt}
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
            />
            <div className="mt-6 text-center text-white">
              <h3 className="font-serif text-2xl font-bold mb-2">{selectedImage.title}</h3>
              <p className="text-white/80">{selectedImage.subtitle}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
