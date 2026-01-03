import { destinations, hotelInfo } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Explore() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-primary py-20 text-center text-white">
        <h1 className="font-serif text-4xl md:text-5xl font-bold">Explore Skardu</h1>
        <p className="mt-4 text-white/80">Discover the wonders of Gilgit-Baltistan</p>
      </div>

      <div className="container mt-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-xl overflow-hidden shadow-lg h-[400px] md:h-auto bg-muted flex items-center justify-center text-muted-foreground">
             <img src={hotelInfo.heroImage} alt="Hotel location" className="w-full h-full object-cover" />
          </div>
          
          <div className="space-y-6">
            <h2 className="font-serif text-3xl font-bold text-primary mb-6">Nearby Destinations</h2>
            <div className="space-y-4">
              {destinations.map((dest) => (
                <Card key={dest.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="flex gap-4 p-4">
                    <img src={dest.image} alt={dest.name} className="w-24 h-24 object-cover rounded-md flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-primary">{dest.name}</h3>
                        <span className="text-xs bg-accent/10 text-accent-foreground px-2 py-1 rounded-full font-medium whitespace-nowrap">
                          {dest.distance}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{dest.description}</p>
                      <a href={dest.mapLink} target="_blank" rel="noreferrer" className="flex items-center text-xs text-primary font-medium mt-3 hover:underline">
                        View on Map <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
