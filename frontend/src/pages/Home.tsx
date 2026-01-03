import { hotelInfo, rooms, destinations } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Wifi, Coffee, Mountain, Car } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Reviews } from "@/components/Reviews";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={hotelInfo.heroImage}
            alt="Mount View Hotel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="container relative z-10 text-center text-white space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-5xl md:text-7xl font-bold tracking-tight"
          >
            Luxury Amidst <br/> The Giants
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl font-light max-w-2xl mx-auto text-white/90"
          >
            Experience the finest hospitality in Skardu with breathtaking views of the Karakoram range.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/book">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white text-lg px-8 py-6 rounded-none">
                Book Your Stay
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 bg-background">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-accent font-semibold tracking-wider text-sm uppercase">Welcome to Mount View</span>
            <h2 className="font-serif text-4xl font-bold text-primary">Your Home in the Mountains</h2>
            <p className="text-muted-foreground leading-relaxed">
              Located in the heart of Skardu, Mount View Hotel offers a perfect blend of modern luxury and traditional hospitality. Whether you are here for adventure or relaxation, our premium rooms and exceptional service ensure a memorable stay.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/5 rounded-full text-primary"><Wifi className="h-5 w-5"/></div>
                <span className="text-sm font-medium">High-Speed Wi-Fi</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/5 rounded-full text-primary"><Coffee className="h-5 w-5"/></div>
                <span className="text-sm font-medium">Fine Dining</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/5 rounded-full text-primary"><Mountain className="h-5 w-5"/></div>
                <span className="text-sm font-medium">Scenic Views</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/5 rounded-full text-primary"><Car className="h-5 w-5"/></div>
                <span className="text-sm font-medium">Ample Parking</span>
              </div>
            </div>
          </div>
          <div className="relative h-[400px]">
             <img 
               src={hotelInfo.roomImage} 
               alt="Interior" 
               className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-2xl"
             />
             <div className="absolute -bottom-6 -left-6 bg-accent p-8 rounded-lg shadow-lg text-white hidden md:block">
                <p className="font-serif text-3xl font-bold">4.8</p>
                <p className="text-sm opacity-90">Guest Rating</p>
             </div>
          </div>
        </div>
      </section>

      {/* Room Categories */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
             <span className="text-accent font-semibold tracking-wider text-sm uppercase">Room Types</span>
             <h2 className="font-serif text-4xl font-bold text-primary mt-2">Our Room Categories</h2>
             <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">Choose the perfect room for your stay in Skardu</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { type: "Standard", price: 4000, image: rooms.find(r => r.type === "Standard")?.image },
              { type: "Deluxe", price: 6000, image: rooms.find(r => r.type === "Deluxe")?.image },
              { type: "Executive", price: 7000, image: rooms.find(r => r.type === "Executive")?.image },
              { type: "Family Suite", price: 10000, image: rooms.find(r => r.type === "Family Suite")?.image },
            ].map((category) => (
              <Card key={category.type} className="border-none shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group cursor-pointer" data-testid={`card-roomtype-${category.type.toLowerCase()}`}>
                <div className="h-64 overflow-hidden bg-muted relative">
                  {category.image && (
                    <img src={category.image} alt={category.type} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  )}
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="font-serif text-2xl font-bold text-primary mb-2">{category.type}</h3>
                  <p className="text-accent font-semibold text-lg mb-4">PKR {category.price.toLocaleString()}</p>
                  <Link href={`/book?room=${category.type}`}>
                    <Button className="w-full bg-primary/90 hover:bg-primary" data-testid={`button-book-${category.type.toLowerCase()}`}>Book Now</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
             <Link href="/rooms">
               <Button variant="outline" size="lg" className="gap-2">View All Rooms <ArrowRight className="h-4 w-4"/></Button>
             </Link>
          </div>
        </div>
      </section>
      
      {/* Guest Reviews Section */}
      <Reviews />

      {/* Explore Skardu Teaser */}
      <section className="py-24">
        <div className="container text-center mb-16">
          <h2 className="font-serif text-4xl font-bold text-primary">Explore Skardu</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">Skardu is the gateway to some of the world's highest peaks and most beautiful landscapes. Let us be your base camp.</p>
        </div>
        
        <div className="container grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {destinations.slice(0, 4).map((dest, i) => (
            <div key={i} className="group relative h-80 overflow-hidden rounded-lg">
              <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 text-white">
                <h3 className="font-bold text-lg">{dest.name}</h3>
                <p className="text-sm opacity-80">{dest.distance} away</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/explore">
            <Button variant="outline" size="lg">Discover More Destinations</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
