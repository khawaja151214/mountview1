import { rooms } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Users } from "lucide-react";
import { Link } from "wouter";

export default function Rooms() {
  // Group rooms by type to avoid listing every single room number
  const uniqueRoomTypes = ["Standard", "Deluxe", "Executive", "Family Suite", "King Room"];
  
  const displayRooms = uniqueRoomTypes.map(type => 
    rooms.find(r => r.type === type)
  ).filter(Boolean);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-primary py-20 text-center text-white">
        <h1 className="font-serif text-4xl md:text-5xl font-bold">Accommodation</h1>
        <p className="mt-4 text-white/80">Experience comfort and luxury in every detail</p>
      </div>

      <div className="container mt-12 space-y-12">
        {displayRooms.map((room) => (
          <div key={room?.type} className="grid md:grid-cols-2 gap-8 items-center bg-card rounded-xl shadow-sm border overflow-hidden">
            <div className="h-full min-h-[300px] md:min-h-[400px]">
              <img src={room?.image} alt={room?.type} className="w-full h-full object-cover" />
            </div>
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-serif text-3xl font-bold text-primary">{room?.type} Room</h2>
                  <div className="flex items-center gap-2 mt-2">
                     <Users className="h-4 w-4 text-muted-foreground"/>
                     <span className="text-sm text-muted-foreground">Max 2 Guests</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">PKR {room?.price.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">/ Night</p>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {room?.description} Designed for relaxation and comfort, featuring elegant decor and breathtaking views of the surrounding mountains.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {room?.amenities.map(amenity => (
                  <div key={amenity} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-accent" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link href={`/book?room=${room?.type}`}>
                  <Button className="w-full md:w-auto px-8 bg-primary text-white">Book {room?.type}</Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
