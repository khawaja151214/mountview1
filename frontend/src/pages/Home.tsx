import { hotelInfo, rooms, destinations } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import React from "react";
import { 
  ArrowRight, Wifi, Coffee, Mountain, Car, Shield, Heart, 
  MapPin, Phone, MessageCircle, Star, Check, Users, Utensils,
  Clock, Award, TrendingUp, Home as HomeIcon, Sparkles
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import PremiumGallery from "@/components/PremiumGallery";

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.1 } },
    viewport: { once: true }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      
      {/* Premium Hero Section */}
      <section className="relative h-[95vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={hotelInfo.heroImage}
            alt="Mount View Hotel Skardu - Premium Hotel with Karakoram Mountain Views"
            className="w-full h-full object-cover scale-105 animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          {/* Subtle Pattern Overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAgNGgtMnYyaDJ2LTJ6bTItMmgydjJoLTJ2LTJ6bTAtNGgydjJoLTJ2LTJ6bS0yLTJoLTJ2Mmgydi0yem0yLTJoMnYyaC0ydi0yem0tMi0yaC0ydjJoMnYtMnptMi0yaDJ2MmgtMnYtMnptLTItMmgtMnYyaDJ2LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
        </div>

        {/* Hero Content */}
        <div className="container relative z-10 max-w-6xl px-6">
          <div className="text-center space-y-8">
            
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span className="text-white text-sm font-medium tracking-wide">Premium Hotel in Skardu</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-tight"
            >
              Where Mountains<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-blue-100 to-amber-200">
                Meet Hospitality
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl font-light max-w-3xl mx-auto text-white/95 leading-relaxed"
            >
              Experience exceptional comfort and scenic Karakoram views at Mount View Hotel Skardu. 
              Your perfect escape in the heart of Skardu city.
            </motion.p>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center items-center gap-6 text-white/90"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-300" />
                <span className="text-sm font-medium">Near Skardu Airport</span>
              </div>
              <div className="w-px h-6 bg-white/30" />
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-amber-300" />
                <span className="text-sm font-medium">Clean & Safe</span>
              </div>
              <div className="w-px h-6 bg-white/30" />
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-300" />
                <span className="text-sm font-medium">Family Friendly</span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
            >
              <Link href="/book">
                <Button 
                  size="lg" 
                  className="group bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white px-10 py-7 text-lg font-semibold rounded-xl shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105"
                >
                  Book Your Stay
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <a href={`https://wa.me/${hotelInfo.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">
                <Button 
                  size="lg"
                  variant="outline"
                  className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 px-10 py-7 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <MessageCircle className="mr-2 w-5 h-5" />
                  WhatsApp Us
                </Button>
              </a>

              <a href={`tel:${hotelInfo.phone}`}>
                <Button 
                  size="lg"
                  variant="outline"
                  className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 px-10 py-7 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <Phone className="mr-2 w-5 h-5" />
                  Call Now
                </Button>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="flex flex-col items-center gap-2 text-white/60">
            <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
            <div className="w-px h-16 bg-gradient-to-b from-white/60 to-transparent animate-pulse" />
          </div>
        </motion.div>
      </section>

      {/* Why Choose Mount View - Premium Section */}
      <section className="py-24 bg-white">
        <div className="container max-w-7xl px-6">
          <motion.div {...fadeInUp} className="text-center mb-16 space-y-4">
            <span className="inline-block text-amber-600 font-semibold tracking-wider text-sm uppercase">Why Choose Us</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900">
              Experience the Mount View Difference
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Discover what makes Mount View Hotel Skardu the preferred choice for travelers seeking comfort, cleanliness, and authentic Skardu hospitality
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <MapPin className="w-10 h-10" />,
                title: "Prime Location",
                description: "Strategically located near Skardu Airport, Eidgah, and city center. Easy access to all major tourist destinations including Deosai, Kachura Lake, and Satpara."
              },
              {
                icon: <Shield className="w-10 h-10" />,
                title: "Clean & Safe Environment",
                description: "Meticulously maintained rooms with highest hygiene standards. Family-friendly atmosphere with 24/7 security for your peace of mind."
              },
              {
                icon: <Mountain className="w-10 h-10" />,
                title: "Breathtaking Mountain Views",
                description: "Wake up to stunning Karakoram mountain vistas from your room. Experience the serene beauty of Skardu valley right from your window."
              },
              {
                icon: <Utensils className="w-10 h-10" />,
                title: "Authentic Desi Cuisine",
                description: "Savor traditional Skardu and Pakistani flavors in our in-house restaurant. Fresh, homemade meals that feel like home."
              },
              {
                icon: <Car className="w-10 h-10" />,
                title: "Free Parking & Transport",
                description: "Complimentary basement parking for your vehicle. Transport assistance available for local sightseeing and airport transfers."
              },
              {
                icon: <Heart className="w-10 h-10" />,
                title: "Warm Hospitality",
                description: "Experience genuine Skardu hospitality with our attentive staff. We treat every guest like family, ensuring a memorable stay."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group"
              >
                <Card className="h-full border-2 hover:border-amber-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-slate-50">
                  <CardContent className="p-8 space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-slate-900">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Rooms Preview - Luxury Showcase */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="container max-w-7xl px-6">
          <motion.div {...fadeInUp} className="text-center mb-16 space-y-4">
            <span className="inline-block text-amber-600 font-semibold tracking-wider text-sm uppercase">Our Accommodations</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900">
              Comfort Meets Scenic Beauty
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Choose from our range of thoughtfully designed rooms, each offering mountain views and modern amenities for your perfect Skardu stay
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {rooms.slice(0, 3).map((room, index) => (
              <motion.div
                key={room.id}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="overflow-hidden border-2 hover:border-amber-200 hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={room.image} 
                      alt={room.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm">
                      <span className="text-sm font-bold text-slate-900">From PKR {room.price.toLocaleString()}</span>
                    </div>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">{room.type} Room</h3>
                      <p className="text-slate-600 text-sm mb-3">{room.capacity}</p>
                      <p className="text-slate-600 line-clamp-2">{room.seoDescription}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.slice(0, 3).map((amenity, i) => (
                        <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 font-medium">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeInUp} className="text-center">
            <Link href="/rooms">
              <Button 
                size="lg"
                className="group bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white px-8 py-6 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                View All Rooms
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Premium Photo Gallery */}
      <PremiumGallery />

      {/* Location Advantage - Tourism Focus */}
      <section className="py-24 bg-white">
        <div className="container max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp} className="space-y-6">
              <span className="inline-block text-amber-600 font-semibold tracking-wider text-sm uppercase">Strategic Location</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                Your Gateway to<br/>Skardu's Wonders
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Mount View Hotel Skardu is perfectly positioned for exploring the magnificent attractions of Gilgit-Baltistan. From our hotel, embark on unforgettable journeys to Pakistan's most stunning destinations.
              </p>

              <div className="space-y-4">
                {[
                  { place: "Skardu Airport", time: "10 minutes", desc: "Convenient airport transfers" },
                  { place: "Skardu City Center & Bazar", time: "5 minutes", desc: "Shopping and local culture" },
                  { place: "Deosai National Park", time: "1.5 hours", desc: "Land of Giants" },
                  { place: "Kachura Lake (Shangri-La)", time: "30 minutes", desc: "Paradise on Earth" },
                  { place: "Satpara Lake", time: "20 minutes", desc: "Crystal clear waters" },
                  { place: "Shigar Valley", time: "45 minutes", desc: "Historic fort and valley" }
                ].map((location, index) => (
                  <motion.div
                    key={index}
                    {...fadeInUp}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-amber-50 transition-colors duration-300"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 text-lg">{location.place}</h4>
                      <p className="text-sm text-amber-600 font-medium">{location.time}</p>
                      <p className="text-sm text-slate-600">{location.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeInUp} className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={hotelInfo.roomImage}
                  alt="Mount View Hotel location near Skardu tourist spots"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-amber-500 rounded-2xl -z-10" />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-500 rounded-2xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Facilities & Services */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container max-w-7xl px-6">
          <motion.div {...fadeInUp} className="text-center mb-16 space-y-4">
            <span className="inline-block text-amber-400 font-semibold tracking-wider text-sm uppercase">Our Facilities</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold">
              Everything You Need for a Perfect Stay
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { icon: <Wifi />, title: "Free Wi-Fi", desc: "High-speed internet" },
              { icon: <Coffee />, title: "Restaurant", desc: "In-house dining" },
              { icon: <Car />, title: "Free Parking", desc: "Basement available" },
              { icon: <Shield />, title: "24/7 Security", desc: "Safe environment" },
              { icon: <Clock />, title: "Room Service", desc: "Round the clock" },
              { icon: <Mountain />, title: "Mountain Views", desc: "Karakoram vistas" },
              { icon: <Users />, title: "Family Rooms", desc: "Spacious suites" },
              { icon: <Award />, title: "Tour Support", desc: "Travel assistance" }
            ].map((facility, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group p-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {React.cloneElement(facility.icon, { className: "w-7 h-7" })}
                </div>
                <h3 className="font-semibold text-lg mb-2">{facility.title}</h3>
                <p className="text-sm text-slate-400">{facility.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA - Booking Section */}
      <section className="py-24 bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAgNGgtMnYyaDJ2LTJ6bTItMmgydjJoLTJ2LTJ6bTAtNGgydjJoLTJ2LTJ6bS0yLTJoLTJ2Mmgydi0yem0yLTJoMnYyaC0ydi0yem0tMi0yaC0ydjJoMnYtMnptMi0yaDJ2MmgtMnYtMnptLTItMmgtMnYyaDJ2LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
        
        <div className="container max-w-4xl px-6 relative z-10">
          <motion.div {...fadeInUp} className="text-center space-y-8">
            <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight">
              Ready to Experience Skardu?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Book your stay at Mount View Hotel Skardu today and create unforgettable memories in the heart of the Karakoram mountains.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Link href="/book">
                <Button 
                  size="lg"
                  className="bg-white text-amber-600 hover:bg-slate-50 px-10 py-7 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-white/50 transition-all duration-300 hover:scale-105"
                >
                  Book Your Room Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>

              <a href={`tel:${hotelInfo.phone}`}>
                <Button 
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-10 py-7 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <Phone className="mr-2 w-5 h-5" />
                  {hotelInfo.phone}
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
