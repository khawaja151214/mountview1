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
    <div className="flex flex-col min-h-screen">
      
      {/* Premium Hero Section */}
      <section className="relative h-[95vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={hotelInfo.heroImage}
            alt="Best Hotel in Skardu - Mount View Hotel with Karakoram Mountain Views"
            className="w-full h-full object-cover scale-105 animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0E2F2F]/70 via-[#0E2F2F]/40 to-[#0E2F2F]/80" />
        </div>

        {/* Hero Content */}
        <div className="container relative z-10 max-w-6xl px-6">
          <div className="text-center space-y-8">
            
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-[#C4A24C]/40"
            >
              <Star className="w-4 h-4 text-[#C4A24C]" />
              <span className="text-white text-sm font-medium tracking-wide">Top Rated Luxury Hotel in Skardu</span>
            </motion.div>

            {/* SEO H1 */}
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight"
            >
              Best Hotel in Skardu<br/>
              <span className="text-[#C4A24C]">
                Luxury 3 Star &amp; 5 Star Comfort
              </span>
            </motion.h1>

            {/* SEO Subheadline with keywords in first 100 words */}
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl font-light max-w-3xl mx-auto text-white/95 leading-relaxed"
            >
              Mount View Hotel is the best hotel in Skardu, offering luxury accommodation near Skardu Airport 
              and top tourist destinations. Experience 5 star comfort with stunning Karakoram mountain views, 
              24/7 restaurant, and warm hospitality.
            </motion.p>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center items-center gap-6 text-white/90"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#C4A24C]" />
                <span className="text-sm font-medium">Near Skardu Airport</span>
              </div>
              <div className="w-px h-6 bg-white/30" />
              <div className="flex items-center gap-2">
                <Mountain className="w-5 h-5 text-[#C4A24C]" />
                <span className="text-sm font-medium">Near Deosai &amp; Lakes</span>
              </div>
              <div className="w-px h-6 bg-white/30" />
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#C4A24C]" />
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
                  className="group btn-glow bg-[#C4A24C] hover:bg-[#d4b65e] text-white px-10 py-7 text-lg font-semibold rounded-xl shadow-2xl transition-all duration-300 hover:scale-105"
                  data-testid="hero-book-btn"
                >
                  Book the Best Hotel in Skardu
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <a href={`https://wa.me/${hotelInfo.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">
                <Button 
                  size="lg"
                  variant="outline"
                  className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 hover:border-[#C4A24C] px-10 py-7 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <MessageCircle className="mr-2 w-5 h-5" />
                  WhatsApp Us
                </Button>
              </a>

              <a href={`tel:${hotelInfo.phone}`}>
                <Button 
                  size="lg"
                  variant="outline"
                  className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 hover:border-[#C4A24C] px-10 py-7 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
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
            <div className="w-px h-16 bg-gradient-to-b from-[#C4A24C]/60 to-transparent animate-pulse" />
          </div>
        </motion.div>
      </section>

      {/* Why Choose Mount View - SEO Section */}
      <section className="py-24 bg-[#FAF6EE]">
        <div className="container max-w-7xl px-6">
          <motion.div {...fadeInUp} className="text-center mb-16 space-y-4">
            <span className="inline-block text-[#C4A24C] font-semibold tracking-wider text-sm uppercase">Why Choose Us</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#0E2F2F]">
              Why Mountview is the Best Hotel in Skardu
            </h2>
            <p className="text-lg text-[#0E2F2F]/70 max-w-2xl mx-auto leading-relaxed">
              As the top rated hotel in Skardu, we offer luxury 3 star accommodation with 5 star comfort, clean rooms, and unmatched hospitality near all major tourist destinations
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
                title: "Hotel Near Skardu Airport",
                description: "Just 10 minutes from Skardu Airport with complimentary transfers. The most conveniently located luxury hotel near Skardu Airport for easy access to the city and tourist destinations."
              },
              {
                icon: <Shield className="w-10 h-10" />,
                title: "Cleanest Hotel in Skardu",
                description: "Meticulously maintained rooms with the highest hygiene standards. Recognized as the cleanest hotel in Skardu with family-friendly atmosphere and 24/7 security."
              },
              {
                icon: <Mountain className="w-10 h-10" />,
                title: "Luxury Mountain View Hotel",
                description: "Wake up to stunning Karakoram mountain vistas. Every room at this luxury hotel in Skardu offers breathtaking views of the valley and surrounding peaks."
              },
              {
                icon: <Utensils className="w-10 h-10" />,
                title: "24/7 In-House Restaurant",
                description: "Authentic Pakistani and Skardu cuisine served around the clock. Sky dining on our rooftop with panoramic mountain views — the best hotel restaurant in Skardu."
              },
              {
                icon: <Car className="w-10 h-10" />,
                title: "Free Parking & Transport",
                description: "Complimentary basement parking and transport assistance for Deosai National Park, Satpara Lake, Upper Kachura Lake, and Shangrila Resort tours."
              },
              {
                icon: <Heart className="w-10 h-10" />,
                title: "Best Family Hotel in Skardu",
                description: "Spacious family suites, warm Skardu hospitality, and kid-friendly environment make us the best family hotel in Skardu for groups and families."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group"
              >
                <Card className="h-full border-2 border-[#C4A24C]/10 hover:border-[#C4A24C]/40 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white">
                  <CardContent className="p-8 space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-[#0E2F2F]/5 flex items-center justify-center text-[#C4A24C] group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-[#0E2F2F]">{feature.title}</h3>
                    <p className="text-[#0E2F2F]/60 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Rooms Preview */}
      <section className="py-24 bg-white">
        <div className="container max-w-7xl px-6">
          <motion.div {...fadeInUp} className="text-center mb-16 space-y-4">
            <span className="inline-block text-[#C4A24C] font-semibold tracking-wider text-sm uppercase">Our Accommodations</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#0E2F2F]">
              Premium 3 Star Hotel in Skardu with 5 Star Comfort
            </h2>
            <p className="text-lg text-[#0E2F2F]/70 max-w-2xl mx-auto leading-relaxed">
              From affordable standard rooms to luxury suites — every room at the best hotel in Skardu offers mountain views and modern amenities
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
                <Card className="overflow-hidden border-2 border-[#C4A24C]/10 hover:border-[#C4A24C]/40 hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={room.image} 
                      alt={room.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm">
                      <span className="text-sm font-bold text-[#0E2F2F]">From PKR {room.price.toLocaleString()}</span>
                    </div>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#0E2F2F] mb-2">{room.type} Room</h3>
                      <p className="text-[#0E2F2F]/60 text-sm mb-3">{room.capacity}</p>
                      <p className="text-[#0E2F2F]/60 line-clamp-2">{room.seoDescription}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.slice(0, 3).map((amenity, i) => (
                        <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-[#F2E8D5] text-[#0E2F2F] font-medium">
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
                className="group bg-[#0E2F2F] hover:bg-[#1a4a4a] text-white px-8 py-6 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                View All Rooms &amp; Rates
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Premium Photo Gallery */}
      <PremiumGallery />

      {/* Location - Hotel Near Deosai & Tourist Destinations */}
      <section className="py-24 bg-[#FAF6EE]">
        <div className="container max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp} className="space-y-6">
              <span className="inline-block text-[#C4A24C] font-semibold tracking-wider text-sm uppercase">Strategic Location</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#0E2F2F] leading-tight">
                Hotel Near Deosai &amp; Top Tourist Destinations in Skardu
              </h2>
              <p className="text-lg text-[#0E2F2F]/70 leading-relaxed">
                Mount View Hotel is ideally located near Skardu Airport and all major tourist attractions. As the best hotel near Deosai, Satpara Lake, and Shangrila Resort, we are your perfect base for exploring Gilgit-Baltistan.
              </p>

              <div className="space-y-4">
                {[
                  { place: "Skardu Airport", time: "10 minutes", desc: "Hotel near Skardu Airport — convenient transfers" },
                  { place: "Skardu City Center & Bazar", time: "5 minutes", desc: "Hotel near city center — shopping and dining" },
                  { place: "Deosai National Park", time: "1.5 hours", desc: "Hotel near Deosai — Land of Giants" },
                  { place: "Shangrila Resort (Upper Kachura)", time: "30 minutes", desc: "Hotel near Shangrila Resort — Paradise on Earth" },
                  { place: "Satpara Lake", time: "20 minutes", desc: "Hotel near Satpara Lake — crystal clear waters" },
                  { place: "Shigar Valley & Fort", time: "45 minutes", desc: "Historic fort and scenic valley" }
                ].map((location, index) => (
                  <motion.div
                    key={index}
                    {...fadeInUp}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-white transition-colors duration-300"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#C4A24C]/10 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-[#C4A24C]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#0E2F2F] text-lg">{location.place}</h4>
                      <p className="text-sm text-[#C4A24C] font-medium">{location.time}</p>
                      <p className="text-sm text-[#0E2F2F]/60">{location.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeInUp} className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={hotelInfo.roomImage}
                  alt="Best hotel in Skardu near tourist spots Deosai Satpara Lake Shangrila"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-[#C4A24C]/20 rounded-2xl -z-10" />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#0E2F2F]/10 rounded-2xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Animated Counters Section */}
      <section className="py-20 bg-[#0E2F2F] text-white" data-testid="counters-section">
        <div className="container max-w-7xl px-6">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { value: "5000+", label: "Happy Guests", icon: <Users className="w-8 h-8" /> },
              { value: "20+", label: "Luxury Rooms", icon: <HomeIcon className="w-8 h-8" /> },
              { value: "8+", label: "Years of Service", icon: <Award className="w-8 h-8" /> },
              { value: "4.8", label: "Guest Rating", icon: <Star className="w-8 h-8" /> },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="space-y-3"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-[#C4A24C]/10 flex items-center justify-center text-[#C4A24C]">
                  {stat.icon}
                </div>
                <div className="font-serif text-4xl md:text-5xl font-bold text-[#C4A24C]">{stat.value}</div>
                <div className="text-white/70 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Facilities - Best Amenities */}
      <section className="py-24 bg-[#0E2F2F] text-white">
        <div className="container max-w-7xl px-6">
          <motion.div {...fadeInUp} className="text-center mb-16 space-y-4">
            <span className="inline-block text-[#C4A24C] font-semibold tracking-wider text-sm uppercase">Our Facilities</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold">
              Best Family Hotel in Skardu with Modern Amenities
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
              { icon: <Coffee />, title: "24/7 Restaurant", desc: "Authentic cuisine" },
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
                className="group p-6 rounded-xl bg-white/5 hover:bg-white/10 border border-[#C4A24C]/10 hover:border-[#C4A24C]/30 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-[#C4A24C]/10 flex items-center justify-center text-[#C4A24C] mb-4 group-hover:scale-110 transition-transform duration-300">
                  {React.cloneElement(facility.icon, { className: "w-7 h-7" })}
                </div>
                <h3 className="font-semibold text-lg mb-2">{facility.title}</h3>
                <p className="text-sm text-white/60">{facility.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-24 bg-white" data-testid="video-section">
        <div className="container max-w-5xl px-6">
          <motion.div {...fadeInUp} className="text-center mb-12 space-y-4">
            <span className="inline-block text-[#C4A24C] font-semibold tracking-wider text-sm uppercase">Virtual Tour</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#0E2F2F]">
              Experience Luxury at Mount View Hotel Skardu
            </h2>
            <p className="text-lg text-[#0E2F2F]/70 max-w-2xl mx-auto">
              Take a virtual tour of the top rated hotel in Skardu and see why guests choose us
            </p>
          </motion.div>
          <motion.div {...fadeInUp} className="rounded-2xl overflow-hidden shadow-2xl">
            <video
              controls
              poster="/gallery/front-elevation.jpeg"
              className="w-full aspect-video bg-black"
              preload="metadata"
              data-testid="hotel-video"
            >
              <source src="https://customer-assets.emergentagent.com/job_c42dbb56-a5a0-4fbe-900e-55f1f85c15cf/artifacts/is2aw3gk_HeyGen%20-%20Video%20Agent.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>
      </section>

      {/* Guest Reviews Section */}
      <section className="py-24 bg-[#FAF6EE]" data-testid="reviews-section">
        <div className="container max-w-7xl px-6">
          <motion.div {...fadeInUp} className="text-center mb-16 space-y-4">
            <span className="inline-block text-[#C4A24C] font-semibold tracking-wider text-sm uppercase">Guest Reviews</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#0E2F2F]">
              Affordable Yet Top Rated Hotel in Skardu
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Ahmed Khan", from: "Islamabad", rating: 5, text: "The best hotel in Skardu without a doubt! Clean rooms, amazing mountain views, and the staff treated us like family. We booked for 3 nights and extended to 5." },
              { name: "Sarah & Family", from: "Lahore", rating: 5, text: "We were looking for a family hotel in Skardu and Mount View exceeded all expectations. Kids loved it. So close to Deosai and Satpara Lake. The restaurant food was outstanding!" },
              { name: "James Wilson", from: "London, UK", rating: 5, text: "Best hotel near Skardu Airport! The luxury rooms rival any 5 star hotel. Perfect location for visiting Shangrila Resort and Upper Kachura Lake. Highly recommend!" }
            ].map((review, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-white border-2 border-[#C4A24C]/10 hover:border-[#C4A24C]/30 transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-8 space-y-4">
                    <div className="flex gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-[#C4A24C] text-[#C4A24C]" />
                      ))}
                    </div>
                    <p className="text-[#0E2F2F]/70 leading-relaxed italic">"{review.text}"</p>
                    <div className="pt-4 border-t border-[#C4A24C]/10">
                      <p className="font-semibold text-[#0E2F2F]">{review.name}</p>
                      <p className="text-sm text-[#0E2F2F]/50">{review.from}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white" data-testid="faq-section">
        <div className="container max-w-4xl px-6">
          <motion.div {...fadeInUp} className="text-center mb-16 space-y-4">
            <span className="inline-block text-[#C4A24C] font-semibold tracking-wider text-sm uppercase">FAQs</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#0E2F2F]">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <motion.div {...fadeInUp} className="space-y-4">
            {[
              { q: "Is Mount View Hotel the best hotel in Skardu?", a: "Mount View Hotel is consistently rated as one of the best hotels in Skardu, offering luxury 3 star comfort with 5 star amenities including mountain views, 24/7 restaurant, free parking, and proximity to Skardu Airport and all major tourist destinations." },
              { q: "How far is Mount View Hotel from Skardu Airport?", a: "Mount View Hotel is just 10 minutes drive from Skardu Airport, making it one of the most conveniently located hotels near Skardu Airport. We offer complimentary airport transfer services." },
              { q: "Is Mount View Hotel near Deosai National Park?", a: "Yes! Mount View Hotel is the ideal base for visiting Deosai National Park (1.5 hours), Satpara Lake (20 min), Upper Kachura Lake and Shangrila Resort (30 min)." },
              { q: "What are the room rates at Mount View Hotel?", a: "Room rates start from PKR 4,000 for Standard rooms, PKR 6,000 for Deluxe, PKR 7,000 for Executive, and PKR 10,000-15,000 for Family Suites and King Rooms. All rooms include free Wi-Fi, parking, and mountain views." },
              { q: "Is Mount View Hotel suitable for families?", a: "Absolutely! As the best family hotel in Skardu, we offer spacious family suites, kid-friendly environment, in-house restaurant, and tour assistance for family-friendly destinations." }
            ].map((faq, index) => (
              <details
                key={index}
                className="group bg-[#FAF6EE] rounded-xl border border-[#C4A24C]/10 hover:border-[#C4A24C]/30 transition-colors"
              >
                <summary className="cursor-pointer p-6 font-serif text-lg font-bold text-[#0E2F2F] list-none flex justify-between items-center">
                  {faq.q}
                  <ChevronDown className="w-5 h-5 text-[#C4A24C] group-open:rotate-180 transition-transform duration-300" />
                </summary>
                <div className="px-6 pb-6 text-[#0E2F2F]/70 leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Google Map Section */}
      <section className="py-24 bg-[#FAF6EE]" data-testid="map-section">
        <div className="container max-w-7xl px-6">
          <motion.div {...fadeInUp} className="text-center mb-12 space-y-4">
            <span className="inline-block text-[#C4A24C] font-semibold tracking-wider text-sm uppercase">Find Us</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#0E2F2F]">
              Hotel Near Skardu Airport &amp; City Center
            </h2>
            <p className="text-lg text-[#0E2F2F]/70">College Road, Skardu, Gilgit-Baltistan, Pakistan</p>
          </motion.div>
          <motion.div {...fadeInUp} className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3308.5!2d75.633!3d35.297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCollege%20Road%2C%20Skardu%2C%20Gilgit-Baltistan!5e0!3m2!1sen!2spk!4v1706000000000"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mount View Hotel Skardu Location - College Road, Skardu"
              className="w-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-[#0E2F2F] text-white relative overflow-hidden">
        <div className="container max-w-4xl px-6 relative z-10">
          <motion.div {...fadeInUp} className="text-center space-y-8">
            <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight">
              Book the Best Hotel in Skardu Today
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Experience luxury near Skardu's top attractions. Join thousands of happy guests who chose Mount View Hotel — the top rated affordable hotel in Skardu.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Link href="/book">
                <Button 
                  size="lg"
                  className="btn-glow bg-[#C4A24C] hover:bg-[#d4b65e] text-white px-10 py-7 text-lg font-semibold rounded-xl shadow-2xl transition-all duration-300 hover:scale-105"
                  data-testid="cta-book-btn"
                >
                  Book Your Room Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>

              <a href={`https://wa.me/${hotelInfo.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">
                <Button 
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-2 border-[#C4A24C] hover:bg-[#C4A24C]/10 text-white px-10 py-7 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <MessageCircle className="mr-2 w-5 h-5" />
                  WhatsApp Booking
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sticky Floating Book Now Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3" data-testid="sticky-buttons">
        <a href={`https://wa.me/${hotelInfo.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">
          <div className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center shadow-2xl cursor-pointer transition-all duration-300 hover:scale-110">
            <MessageCircle className="w-7 h-7 text-white" />
          </div>
        </a>
        <Link href="/book">
          <div className="btn-glow px-5 py-3 rounded-full bg-[#C4A24C] hover:bg-[#d4b65e] text-white font-semibold shadow-2xl cursor-pointer transition-all duration-300 hover:scale-105 text-center text-sm">
            Book Now
          </div>
        </Link>
      </div>
    </div>
  );
}
