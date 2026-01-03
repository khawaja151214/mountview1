import { menu } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Minus, Trash2, Printer, CreditCard, Receipt } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

export default function RestaurantPOS() {
  const { toast } = useToast();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [tableNo, setTableNo] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "DRINKS", "BREAKFAST", "LOCAL SIDES", "SOUPS", "SPECIAL LOCAL", "PAKISTANI", "CHINESE", "CHICKEN", "MUTTON", "SNACKS", "TAKEAWAY"];
  const filteredMenu = selectedCategory === "All" 
    ? menu 
    : menu.filter(item => item.category === selectedCategory);

  const addToCart = (item: any) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, qty: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id === id) {
        return { ...i, qty: Math.max(1, i.qty + delta) };
      }
      return i;
    }));
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const tax = Math.round(total * 0.16);
  const grandTotal = total + tax;

  const handleKOT = () => {
    if (!tableNo) {
      toast({ title: "Table Required", description: "Please enter a table or room number", variant: "destructive" });
      return;
    }
    toast({
      title: "KOT Printed",
      description: `Kitchen Order Token for Table ${tableNo} sent to thermal printer.`,
    });
  };

  const handleCharge = (type: "Direct" | "Room") => {
    if (!tableNo) {
      toast({ title: "Information Required", description: "Please enter Table/Room number", variant: "destructive" });
      return;
    }
    
    // Simulate Thermal Print
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <div style="font-family: monospace; width: 300px; padding: 20px;">
          <h2 style="text-align: center;">MOUNT VIEW HOTEL</h2>
          <p style="text-align: center;">RESTAURANT INVOICE</p>
          <hr/>
          <p>Table/Room: ${tableNo}</p>
          <p>Date: ${new Date().toLocaleString()}</p>
          <hr/>
          <table style="width: 100%;">
            ${cart.map(item => `
              <tr>
                <td>${item.qty} x ${item.name}</td>
                <td style="text-align: right;">${item.price * item.qty}</td>
              </tr>
            `).join('')}
          </table>
          <hr/>
          <div style="display: flex; justify-content: space-between;">
            <span>Subtotal:</span>
            <span>PKR ${total}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>Tax (16%):</span>
            <span>PKR ${tax}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1.2em; margin-top: 10px;">
            <span>TOTAL:</span>
            <span>PKR ${grandTotal}</span>
          </div>
          <hr/>
          <p style="text-align: center; margin-top: 20px;">THANK YOU FOR VISITING!</p>
        </div>
      `);
      printWindow.document.close();
      printWindow.print();
    }

    toast({
      title: type === "Room" ? "Charged to Room" : "Invoice Generated",
      description: `Bill of PKR ${grandTotal} ${type === "Room" ? `posted to Room ${tableNo}` : "printed successfully"}.`,
    });
    setCart([]);
    setTableNo("");
  };

  return (
    <div className="h-[calc(100vh-6rem)] grid grid-cols-12 gap-6 p-4">
      {/* Menu Grid */}
      <div className="col-span-8 flex flex-col h-full bg-white rounded-xl shadow-sm border p-4">
         <div className="mb-6 flex justify-between items-center">
           <div>
             <h1 className="text-2xl font-bold text-slate-900">Restaurant POS</h1>
             <p className="text-slate-500">Fast order taking & thermal billing</p>
           </div>
           <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
             <TabsList className="bg-slate-100 p-1 w-full flex overflow-x-auto justify-start">
               {categories.map(cat => (
                 <TabsTrigger key={cat} value={cat} className="px-4 py-2 rounded-md transition-all whitespace-nowrap">
                   {cat}
                 </TabsTrigger>
               ))}
             </TabsList>
           </Tabs>
         </div>
         
         <ScrollArea className="flex-1 pr-4">
           <div className="grid grid-cols-3 xl:grid-cols-4 gap-4 pb-4">
              {filteredMenu.map(item => (
                <Card 
                  key={item.id} 
                  className="cursor-pointer hover:border-primary transition-all hover:shadow-md group active:scale-95 border-slate-200"
                  onClick={() => addToCart(item)}
                >
                  <CardContent className="p-4 flex flex-col items-center justify-between min-h-[120px]">
                     <div className="bg-slate-50 w-full rounded-lg p-2 mb-2 text-center group-hover:bg-primary/5 transition-colors">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{item.category}</span>
                        <div className="font-bold text-sm text-slate-700 line-clamp-2 mt-1">{item.name}</div>
                     </div>
                     <div className="text-primary font-bold text-lg">PKR {item.price}</div>
                  </CardContent>
                </Card>
              ))}
           </div>
         </ScrollArea>
      </div>

      {/* Cart / Bill */}
      <div className="col-span-4 bg-white border rounded-xl shadow-sm flex flex-col h-full overflow-hidden">
        <div className="p-4 border-b bg-slate-50/50">
           <div className="flex items-center gap-3 mb-4">
             <div className="bg-primary/10 p-2 rounded-lg">
                <Receipt className="h-5 w-5 text-primary" />
             </div>
             <div>
                <div className="font-bold text-lg leading-tight">Current Order</div>
                <div className="text-xs text-slate-500 font-mono uppercase">#{Math.floor(Math.random() * 9000) + 1000}</div>
             </div>
           </div>
           <Input 
             placeholder="Table # / Room #" 
             className="bg-white border-slate-200 focus:ring-primary h-12 text-lg font-medium"
             value={tableNo} 
             onChange={(e) => setTableNo(e.target.value)}
           />
        </div>

        <ScrollArea className="flex-1 p-4">
           {cart.length === 0 ? (
             <div className="flex flex-col items-center justify-center h-full text-slate-400 py-20 opacity-50">
               <Receipt className="h-12 w-12 mb-2" />
               <p className="font-medium">No items in cart</p>
             </div>
           ) : (
             <div className="space-y-4">
               {cart.map(item => (
                 <div key={item.id} className="flex flex-col gap-2 p-3 bg-slate-50 rounded-lg group">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="font-bold text-sm text-slate-900">{item.name}</div>
                        <div className="text-xs text-slate-500">PKR {item.price} per unit</div>
                      </div>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-50" onClick={() => removeFromCart(item.id)}><Trash2 className="h-4 w-4"/></Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1 bg-white border rounded-lg p-1">
                        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => updateQty(item.id, -1)}><Minus className="h-4 w-4"/></Button>
                        <span className="w-8 text-center font-bold text-sm">{item.qty}</span>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-primary" onClick={() => updateQty(item.id, 1)}><Plus className="h-4 w-4"/></Button>
                      </div>
                      <div className="font-bold text-primary">
                        PKR {item.price * item.qty}
                      </div>
                    </div>
                 </div>
               ))}
             </div>
           )}
        </ScrollArea>

        <div className="p-4 border-t bg-slate-50 space-y-4 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
           <div className="space-y-2 text-sm font-medium">
             <div className="flex justify-between text-slate-500">
               <span>Subtotal</span>
               <span>PKR {total}</span>
             </div>
             <div className="flex justify-between text-slate-500">
               <span>Tax (16%)</span>
               <span>PKR {tax}</span>
             </div>
             <Separator className="bg-slate-200" />
             <div className="flex justify-between font-bold text-xl text-slate-900 pt-1">
               <span>Net Total</span>
               <span>PKR {grandTotal}</span>
             </div>
           </div>
           
           <div className="grid grid-cols-1 gap-3">
             <Button variant="outline" className="w-full h-12 gap-2 border-slate-300 font-bold hover:bg-slate-100" onClick={handleKOT} disabled={cart.length === 0}>
               <Printer className="h-5 w-5"/> Print KOT
             </Button>
             <div className="grid grid-cols-2 gap-3">
                <Button className="w-full h-12 gap-2 bg-slate-800 hover:bg-slate-900 font-bold" onClick={() => handleCharge("Direct")} disabled={cart.length === 0}>
                   <CreditCard className="h-5 w-5"/> Direct Pay
                </Button>
                <Button className="w-full h-12 gap-2 bg-primary hover:bg-primary/90 font-bold" onClick={() => handleCharge("Room")} disabled={cart.length === 0}>
                   <Receipt className="h-5 w-5"/> Add to Room
                </Button>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
