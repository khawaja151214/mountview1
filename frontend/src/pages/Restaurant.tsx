import { menu, hotelInfo } from "@/lib/mock-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Restaurant() {
  const continental = menu.filter(m => m.category === "Continental");
  const chinese = menu.filter(m => m.category === "Chinese");

  return (
    <div className="min-h-screen bg-background pb-20">
       <div className="relative h-96 flex items-center justify-center overflow-hidden">
         <img 
           src={hotelInfo.restaurantImage}
           alt="Restaurant"
           className="absolute inset-0 w-full h-full object-cover"
         />
         <div className="absolute inset-0 bg-black/40" />
         <div className="relative z-10 text-center text-white">
           <h1 className="font-serif text-4xl md:text-5xl font-bold">Mount View Restaurant</h1>
           <p className="mt-4 text-white/80">Exquisite flavors with a view</p>
         </div>
      </div>

      <div className="container mt-12 max-w-4xl">
        <Tabs defaultValue="continental" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="bg-muted p-1">
              <TabsTrigger value="continental" className="px-8 py-2">Continental</TabsTrigger>
              <TabsTrigger value="chinese" className="px-8 py-2">Chinese</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="continental" className="space-y-6">
            {continental.map(item => (
              <MenuCard key={item.id} item={item} />
            ))}
          </TabsContent>

          <TabsContent value="chinese" className="space-y-6">
            {chinese.map(item => (
              <MenuCard key={item.id} item={item} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function MenuCard({ item }: { item: any }) {
  return (
    <Card className="flex flex-col md:flex-row overflow-hidden border-none shadow-sm bg-card/50 hover:bg-card transition-colors">
      <div className="w-full md:w-48 h-48 shrink-0">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
      </div>
      <CardContent className="p-6 flex-1 flex flex-col justify-center">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-serif text-xl font-bold text-primary">{item.name}</h3>
          <span className="font-bold text-accent">PKR {item.price}</span>
        </div>
        <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
        <Button variant="outline" size="sm" className="w-fit" disabled>
          Available for Dine-in
        </Button>
      </CardContent>
    </Card>
  );
}
