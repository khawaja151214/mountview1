import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Wifi, CheckCircle2, XCircle, Printer, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FrontDesk() {
  const { toast } = useToast();
  const [rooms, setRooms] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isWifiOpen, setIsWifiOpen] = useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [selectedRoomForInvoice, setSelectedRoomForInvoice] = useState<any>(null);
  const [wifiSettings, setWifiSettings] = useState({
    ground: "mvskardu00",
    floor1: "mv123456",
    floor2: "mv223344",
    top: "king401"
  });

  const [invoiceForm, setInvoiceForm] = useState({
    roomCharges: 0,
    foodCharges: 0,
    laundryCharges: 0,
    mineralWater: 0,
    roomService: 0,
    miscCharges: 0,
    discount: 0,
    advance: 0,
    tax: 0
  });

  const [newGuest, setNewGuest] = useState({
    name: "",
    phone: "",
    city: "",
    cnic: "",
    advance: "",
    checkIn: new Date().toISOString().split('T')[0],
    checkOut: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    roomType: "Standard",
    requests: "",
    rackRate: "5000",
    floorSelection: "",
    assignedRoom: ""
  });

  const [guestHistory, setGuestHistory] = useState<any[]>([]);

  useEffect(() => {
    const storedRooms = localStorage.getItem("mv_rooms");
    if (storedRooms) {
      setRooms(JSON.parse(storedRooms));
    } else {
      const initialRooms = [
        ...Array.from({ length: 14 }, (_, i) => ({ id: `1-${101+i}`, number: `MV ${101+i}`, floor: "1st Floor", type: "Standard", status: "Available", price: 5000 })),
        ...Array.from({ length: 11 }, (_, i) => ({ id: `2-${201+i}`, number: `MV ${201+i}`, floor: "2nd Floor", type: "Deluxe", status: "Available", price: 7000 })),
        { id: "top-401", number: "King 401", floor: "Top Floor", type: "Executive Suite", status: "Available", price: 15000 }
      ];
      setRooms(initialRooms);
      localStorage.setItem("mv_rooms", JSON.stringify(initialRooms));
    }

    const storedBookings = localStorage.getItem("mv_bookings");
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    }

    const storedWifi = localStorage.getItem("mv_wifi_settings");
    if (storedWifi) setWifiSettings(JSON.parse(storedWifi));

    const storedHistory = localStorage.getItem("mv_guest_history");
    if (storedHistory) setGuestHistory(JSON.parse(storedHistory));

    const handleStorageChange = () => {
      const b = localStorage.getItem("mv_bookings");
      if (b) setBookings(JSON.parse(b));
      const h = localStorage.getItem("mv_guest_history");
      if (h) setGuestHistory(JSON.parse(h));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const saveRoomsState = (updatedRooms: any[]) => {
    setRooms(updatedRooms);
    localStorage.setItem("mv_rooms", JSON.stringify(updatedRooms));
  };

  const isRoomAvailable = (roomNumber: string, checkIn: string, checkOut: string) => {
    const cin = new Date(checkIn).getTime();
    const cout = new Date(checkOut).getTime();
    
    return !bookings.some(b => {
      if (b.assignedRoom !== roomNumber || b.status === "Declined") return false;
      const bIn = new Date(b.checkIn).getTime();
      const bOut = new Date(b.checkOut).getTime();
      return cin < bOut && cout > bIn;
    });
  };

  const handleManualBooking = () => {
    if (!newGuest.name || !newGuest.assignedRoom) {
      toast({ title: "Error", description: "Please fill name and assign a room.", variant: "destructive" });
      return;
    }

    const bookingId = Math.random().toString(36).substr(2, 9);
    const booking = {
      ...newGuest,
      id: bookingId,
      status: "CONFIRMED",
      createdAt: new Date().toISOString()
    };

    const updatedBookings = [...bookings, booking];
    localStorage.setItem("mv_bookings", JSON.stringify(updatedBookings));
    setBookings(updatedBookings);

    const updatedRooms = rooms.map(r => r.number === newGuest.assignedRoom ? { ...r, status: "Booked" } : r);
    saveRoomsState(updatedRooms);

    setIsBookingOpen(false);
    printToken(booking);
    toast({ title: "Success", description: "Booking confirmed and room assigned." });
    
    setNewGuest({
      name: "", phone: "", city: "", cnic: "", advance: "",
      checkIn: new Date().toISOString().split('T')[0],
      checkOut: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      roomType: "Standard", requests: "", rackRate: "5000",
      floorSelection: "", assignedRoom: ""
    });
  };

  const printToken = (booking: any) => {
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(`
      <html>
        <head>
          <style>
            body { font-family: monospace; padding: 20px; width: 300px; }
            .header { text-align: center; border-bottom: 1px dashed #000; padding-bottom: 10px; margin-bottom: 10px; }
            .row { display: flex; justify-content: space-between; margin: 5px 0; font-size: 14px; }
            .bold { font-weight: bold; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; border-top: 1px dashed #000; padding-top: 10px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2 style="margin:0">MOUNT VIEW HOTEL</h2>
            <small>College Road Skardu</small><br/>
            <strong>RESERVATION TOKEN</strong>
          </div>
          <div class="row"><span class="bold">Guest:</span> <span>${booking.name}</span></div>
          <div class="row"><span class="bold">Room:</span> <span>${booking.assignedRoom}</span></div>
          <div class="row"><span class="bold">Check-in:</span> <span>${booking.checkIn}</span></div>
          <div class="row"><span class="bold">Check-out:</span> <span>${booking.checkOut}</span></div>
          <div class="row"><span class="bold">CNIC:</span> <span>${booking.cnic || 'N/A'}</span></div>
          <div class="row"><span class="bold">Advance:</span> <span>PKR ${booking.advance || '0'}</span></div>
          <div class="footer">
            Welcome to Skardu!<br/>
            WhatsApp: 0346 8484849
          </div>
        </body>
      </html>
    `);
    win.document.close();
    win.print();
  };

  const generateInvoice = (room: any, data: any) => {
    const subtotal = data.roomCharges + data.foodCharges + data.laundryCharges + data.mineralWater + data.roomService + data.miscCharges;
    const tax = data.tax || 0;
    const netTotal = subtotal + tax - data.discount - data.advance;

    const historyEntry = {
      id: Math.random().toString(36).substr(2, 9),
      name: bookings.find(b => b.assignedRoom === room.number && b.status !== "Declined")?.name || "Guest",
      assignedRoom: room.number,
      checkIn: bookings.find(b => b.assignedRoom === room.number && b.status !== "Declined")?.checkIn || "N/A",
      checkOut: bookings.find(b => b.assignedRoom === room.number && b.status !== "Declined")?.checkOut || "N/A",
      city: bookings.find(b => b.assignedRoom === room.number && b.status !== "Declined")?.city || "N/A",
      total: netTotal,
      date: new Date().toISOString()
    };
    
    const newHistory = [historyEntry, ...guestHistory];
    setGuestHistory(newHistory);
    localStorage.setItem("mv_guest_history", JSON.stringify(newHistory));

    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(`
      <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', sans-serif; padding: 40px; color: #333; }
            .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
            .title { font-size: 28px; font-weight: bold; text-transform: uppercase; margin: 5px 0; }
            .invoice-details { display: flex; justify-content: space-between; margin-bottom: 40px; background: #f9f9f9; padding: 20px; border-radius: 8px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
            th { text-align: left; border-bottom: 2px solid #333; padding: 12px; background: #eee; }
            td { padding: 12px; border-bottom: 1px solid #eee; }
            .totals { float: right; width: 300px; }
            .total-row { display: flex; justify-content: space-between; padding: 8px 0; }
            .grand-total { border-top: 2px solid #333; margin-top: 10px; padding-top: 10px; font-weight: bold; font-size: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">Mount View Hotel</div>
            <div class="address">College Road Skardu | WhatsApp: 0346 8484849</div>
          </div>
          <div class="invoice-details">
            <div><strong>GUEST:</strong> ${historyEntry.name}<br/>Room: ${room.number} (${room.type})</div>
            <div style="text-align: right;"><strong>INVOICE:</strong> MVH-${Date.now().toString().slice(-6)}<br/>Date: ${new Date().toLocaleDateString()}</div>
          </div>
          <table>
            <thead><tr><th>Description</th><th style="text-align: right;">Amount (PKR)</th></tr></thead>
            <tbody>
              ${data.roomCharges > 0 ? `<tr><td>Room Charges</td><td style="text-align: right;">${data.roomCharges.toLocaleString()}</td></tr>` : ''}
              ${data.foodCharges > 0 ? `<tr><td>Food & Beverages</td><td style="text-align: right;">${data.foodCharges.toLocaleString()}</td></tr>` : ''}
              ${data.laundryCharges > 0 ? `<tr><td>Laundry</td><td style="text-align: right;">${data.laundryCharges.toLocaleString()}</td></tr>` : ''}
              ${data.mineralWater > 0 ? `<tr><td>Mineral Water</td><td style="text-align: right;">${data.mineralWater.toLocaleString()}</td></tr>` : ''}
              ${data.roomService > 0 ? `<tr><td>Room Service</td><td style="text-align: right;">${data.roomService.toLocaleString()}</td></tr>` : ''}
              ${data.miscCharges > 0 ? `<tr><td>Miscellaneous</td><td style="text-align: right;">${data.miscCharges.toLocaleString()}</td></tr>` : ''}
              ${tax > 0 ? `<tr><td>Sales Tax</td><td style="text-align: right;">${tax.toLocaleString()}</td></tr>` : ''}
              ${data.discount > 0 ? `<tr style="color:red"><td>Discount</td><td style="text-align: right;">-${data.discount.toLocaleString()}</td></tr>` : ''}
            </tbody>
          </table>
          <div class="totals">
            <div class="total-row"><span>Advance Paid:</span><span>PKR ${data.advance.toLocaleString()}</span></div>
            <div class="grand-total"><span>NET TOTAL:</span><span>PKR ${netTotal.toLocaleString()}</span></div>
          </div>
          <div style="clear: both; margin-top: 50px; text-align: center; color: #999;">
            “Thank you for staying at Mount View Hotel Skardu!”
          </div>
        </body>
      </html>
    `);
    win.document.close();
    win.print();
  };

  const openInvoiceDialog = (room: any) => {
    const booking = bookings.find(b => b.assignedRoom === room.number && (b.status === "CONFIRMED" || b.status === "Occupied"));
    setSelectedRoomForInvoice(room);
    setInvoiceForm({
      roomCharges: room.price || 5000, foodCharges: 0, laundryCharges: 0,
      mineralWater: 0, roomService: 0, miscCharges: 0, discount: 0,
      advance: parseInt(booking?.advance || "0"), tax: 0
    });
    setIsInvoiceOpen(true);
  };

  const updateBookingStatus = (id: string, newStatus: string, assignedRoom?: string, updatedCNIC?: string) => {
    const storedBookings = JSON.parse(localStorage.getItem("mv_bookings") || "[]");
    const booking = storedBookings.find((b: any) => b.id === id);
    
    if (newStatus === "Approved" && assignedRoom && booking) {
      const updatedRooms = rooms.map((r: any) => r.number === assignedRoom ? { ...r, status: "Booked" } : r);
      saveRoomsState(updatedRooms);
      
      const allBookings = [...storedBookings.filter((b: any) => b.id !== id), { 
        ...booking, status: "CONFIRMED", assignedRoom, cnic: updatedCNIC || booking.cnic 
      }];
      localStorage.setItem("mv_bookings", JSON.stringify(allBookings));
      setBookings(allBookings);
    } else {
      const updated = storedBookings.filter((b: any) => b.id !== id);
      localStorage.setItem("mv_bookings", JSON.stringify(updated));
      setBookings(updated);
    }
    
    toast({
      title: newStatus === "Approved" ? "Booking Confirmed" : "Booking Declined",
      description: assignedRoom ? `Assigned to Room ${assignedRoom}` : "Reservation processed."
    });
  };

  const deleteFromHistory = (id: string) => {
    const updated = guestHistory.filter(g => g.id !== id);
    setGuestHistory(updated);
    localStorage.setItem("mv_guest_history", JSON.stringify(updated));
    toast({ title: "Deleted", description: "Record removed from history." });
  };

  const filteredRooms = rooms;
  const roomsByFloor = {
    "1st Floor": filteredRooms.filter((r: any) => r.floor === "1st Floor"),
    "2nd Floor": filteredRooms.filter((r: any) => r.floor === "2nd Floor"),
    "Top Floor": filteredRooms.filter((r: any) => r.floor === "Top Floor")
  };

  const getRoomBookings = (roomNumber: string) => {
    return bookings
      .filter(b => b.assignedRoom === roomNumber && (b.status === "CONFIRMED" || b.status === "Occupied"))
      .sort((a, b) => new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime());
  };

  const getRoomBookingInfo = (roomNumber: string) => {
    const activeBookings = getRoomBookings(roomNumber);
    if (activeBookings.length === 0) return null;
    
    return activeBookings.map(b => (
      <div key={b.id} className="text-slate-600 mb-1 last:mb-0 border-b border-slate-100 last:border-0 pb-1">
        <span className="font-semibold">{new Date(b.checkIn).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</span> to <span className="font-semibold">{new Date(b.checkOut).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</span>
        <div className="text-[8px] text-slate-400">{b.name}</div>
      </div>
    ));
  };

  const citySuggestions = Array.from(new Set(guestHistory.map(g => g.city).filter(Boolean)));
  const rateOptions = [3000, 4000, 5000, 6000, 7000, 8000, 10000];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Front Desk</h1>
          <p className="text-slate-500">Official Room Map & Management</p>
        </div>
        <div className="flex items-center gap-4">
           <Button variant="outline" className="gap-2" onClick={() => setIsWifiOpen(true)}>
             <Wifi className="h-4 w-4" /> Wi-Fi Settings
           </Button>
           <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
             <DialogTrigger asChild>
               <Button className="gap-2 bg-primary">
                 <Plus className="h-4 w-4" /> New Booking
               </Button>
             </DialogTrigger>
             <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
               <DialogHeader><DialogTitle>Internal Reservation Form</DialogTitle></DialogHeader>
               <div className="grid grid-cols-2 gap-x-4 gap-y-2 py-2">
                 <div className="space-y-1">
                   <Label className="text-xs">Guest Name</Label>
                   <Input className="h-8" value={newGuest.name} onChange={e => setNewGuest({...newGuest, name: e.target.value})} />
                 </div>
                 <div className="space-y-1 relative">
                   <Label className="text-xs">City</Label>
                   <Input className="h-8" value={newGuest.city} onChange={e => setNewGuest({...newGuest, city: e.target.value})} list="city-options" />
                   <datalist id="city-options">
                    {citySuggestions.map(city => <option key={city} value={city} />)}
                   </datalist>
                 </div>
                 <div className="space-y-1">
                   <Label className="text-xs">CNIC Number</Label>
                   <Input className="h-8" value={newGuest.cnic} onChange={e => setNewGuest({...newGuest, cnic: e.target.value})} placeholder="71101-XXXXXXX-X" />
                 </div>
                 <div className="space-y-1">
                   <Label className="text-xs">Advance Payment</Label>
                   <Input className="h-8" type="number" step="500" value={newGuest.advance} onChange={e => setNewGuest({...newGuest, advance: e.target.value})} />
                 </div>
                 <div className="space-y-1">
                   <Label className="text-xs">Check-in</Label>
                   <Input className="h-8" type="date" value={newGuest.checkIn} onChange={e => setNewGuest({...newGuest, checkIn: e.target.value})} />
                 </div>
                 <div className="space-y-1">
                   <Label className="text-xs">Check-out</Label>
                   <Input className="h-8" type="date" value={newGuest.checkOut} onChange={e => setNewGuest({...newGuest, checkOut: e.target.value})} />
                 </div>
                 <div className="space-y-1">
                   <Label className="text-xs">Floor Selection</Label>
                   <Select onValueChange={v => setNewGuest({...newGuest, floorSelection: v, assignedRoom: ""})}>
                     <SelectTrigger className="h-8"><SelectValue placeholder="Select Floor" /></SelectTrigger>
                     <SelectContent>
                       <SelectItem value="1st Floor">1st Floor</SelectItem>
                       <SelectItem value="2nd Floor">2nd Floor</SelectItem>
                       <SelectItem value="Top Floor">Top Floor</SelectItem>
                     </SelectContent>
                   </Select>
                 </div>
                 <div className="space-y-1">
                   <Label className="text-xs">Room Assignment</Label>
                   <Select disabled={!newGuest.floorSelection} onValueChange={v => setNewGuest({...newGuest, assignedRoom: v})} value={newGuest.assignedRoom}>
                     <SelectTrigger className="h-8"><SelectValue placeholder={newGuest.floorSelection ? "Select Room" : "Select Floor First"} /></SelectTrigger>
                     <SelectContent className="max-h-[300px] overflow-y-auto">
                        {newGuest.floorSelection && roomsByFloor[newGuest.floorSelection as keyof typeof roomsByFloor]?.map((r: any) => {
                          const available = isRoomAvailable(r.number, newGuest.checkIn, newGuest.checkOut);
                          return <SelectItem key={r.id} value={r.number} disabled={!available}>{r.number} - ${r.type} ${!available ? '(Booked)' : ''}</SelectItem>
                        })}
                     </SelectContent>
                   </Select>
                 </div>
                 <div className="col-span-2 space-y-1">
                   <Label className="text-xs">Rack Rate (Multiple of 500)</Label>
                   <div className="grid grid-cols-5 gap-1">
                     {rateOptions.map(rate => <Button key={rate} variant={newGuest.rackRate === rate.toString() ? "default" : "outline"} size="sm" className="h-7 text-[9px]" onClick={() => setNewGuest({...newGuest, rackRate: rate.toString()})}>{rate}</Button>)}
                   </div>
                 </div>
               </div>
               <DialogFooter><Button className="w-full" onClick={handleManualBooking}>Confirm & Print Token</Button></DialogFooter>
             </DialogContent>
           </Dialog>
        </div>
      </div>

      <Dialog open={isWifiOpen} onOpenChange={setIsWifiOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Wi-Fi Configuration</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            {Object.entries(wifiSettings).map(([floor, pass]) => (
              <div key={floor} className="space-y-1">
                <Label className="capitalize">{floor} Password</Label>
                <Input value={pass} onChange={e => setWifiSettings({...wifiSettings, [floor]: e.target.value})} />
              </div>
            ))}
          </div>
          <Button className="w-full" onClick={() => { localStorage.setItem("mv_wifi_settings", JSON.stringify(wifiSettings)); setIsWifiOpen(false); toast({title: "Saved"}); }}>Save</Button>
        </DialogContent>
      </Dialog>

      <Dialog open={isInvoiceOpen} onOpenChange={setIsInvoiceOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Generate Invoice - Room {selectedRoomForInvoice?.number}</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-1"><Label className="text-xs">Room Charges</Label><Input type="number" value={invoiceForm.roomCharges} onChange={e => setInvoiceForm({...invoiceForm, roomCharges: parseInt(e.target.value) || 0})} /></div>
            <div className="space-y-1"><Label className="text-xs">Food & Bev</Label><Input type="number" value={invoiceForm.foodCharges} onChange={e => setInvoiceForm({...invoiceForm, foodCharges: parseInt(e.target.value) || 0})} /></div>
            <div className="space-y-1"><Label className="text-xs">Laundry</Label><Input type="number" value={invoiceForm.laundryCharges} onChange={e => setInvoiceForm({...invoiceForm, laundryCharges: parseInt(e.target.value) || 0})} /></div>
            <div className="space-y-1"><Label className="text-xs">Mineral Water</Label><Input type="number" value={invoiceForm.mineralWater} onChange={e => setInvoiceForm({...invoiceForm, mineralWater: parseInt(e.target.value) || 0})} /></div>
            <div className="space-y-1"><Label className="text-xs">Discount</Label><Input type="number" value={invoiceForm.discount} onChange={e => setInvoiceForm({...invoiceForm, discount: parseInt(e.target.value) || 0})} /></div>
            <div className="space-y-1"><Label className="text-xs">Advance</Label><Input type="number" value={invoiceForm.advance} onChange={e => setInvoiceForm({...invoiceForm, advance: parseInt(e.target.value) || 0})} /></div>
            <div className="space-y-1"><Label className="text-xs">Sales Tax</Label><Input type="number" value={invoiceForm.tax} onChange={e => setInvoiceForm({...invoiceForm, tax: parseInt(e.target.value) || 0})} /></div>
          </div>
          <Button className="w-full" onClick={() => { generateInvoice(selectedRoomForInvoice, invoiceForm); setIsInvoiceOpen(false); }}>Print Invoice</Button>
        </DialogContent>
      </Dialog>

      <Tabs defaultValue="rooms" className="w-full">
        <TabsList className="bg-slate-100">
          <TabsTrigger value="rooms" className="px-8">Room Map</TabsTrigger>
          <TabsTrigger value="bookings" className="px-8">Pending</TabsTrigger>
          <TabsTrigger value="history" className="px-8">History</TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="mt-6">
          <Card><CardContent className="p-0">
            <table className="w-full text-sm">
              <thead className="bg-slate-50"><tr><th className="text-left p-4">Name</th><th className="text-left p-4">Room</th><th className="text-left p-4">Dates</th><th className="text-right p-4">Action</th></tr></thead>
              <tbody>
                {guestHistory.map((g: any) => (
                  <tr key={g.id} className="border-t hover:bg-slate-50">
                    <td className="p-4 font-bold">{g.name}</td><td className="p-4">{g.assignedRoom}</td><td className="p-4">{g.checkIn} - {g.checkOut}</td>
                    <td className="p-4 text-right"><Button variant="ghost" size="sm" onClick={() => deleteFromHistory(g.id)}><XCircle className="h-4 w-4 text-red-500" /></Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="rooms" className="space-y-8 mt-6">
          {Object.entries(roomsByFloor).map(([floor, floorRooms]) => (
            <div key={floor} className="space-y-4">
              <h2 className="text-lg font-bold border-b pb-2">{floor}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {floorRooms.map((room: any) => (
                  <Card key={room.id} className={cn("border-l-4", room.status === "Available" ? "border-l-green-500" : room.status === "Occupied" ? "border-l-red-500" : "border-l-blue-500")}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-1"><span className="font-bold text-lg">{room.number}</span><Badge variant="outline" className="text-[9px]">{room.status}</Badge></div>
                      <div className="text-[9px] text-slate-500 uppercase font-bold">{room.type}</div>
                      {room.status !== "Available" && <div className="text-[10px] bg-slate-100 p-1.5 rounded mt-2">{getRoomBookingInfo(room.number)}</div>}
                      {room.status === "Occupied" ? (
                        <div className="space-y-1 mt-2">
                          <Button variant="outline" size="sm" className="w-full h-7 text-[9px]" onClick={() => openInvoiceDialog(room)}>Invoice</Button>
                          <Button variant="ghost" size="sm" className="w-full h-7 text-[9px]" onClick={() => { saveRoomsState(rooms.map(r => r.id === room.id ? {...r, status: "Available"} : r)); toast({title: "Checked out"}); }}>Checkout</Button>
                        </div>
                      ) : room.status === "Booked" ? (
                        <Button size="sm" className="w-full h-7 text-[9px] mt-2 bg-blue-600" onClick={() => saveRoomsState(rooms.map(r => r.id === room.id ? {...r, status: "Occupied"} : r))}>Check-in</Button>
                      ) : <div className="text-[9px] text-green-600 font-bold mt-2">Ready</div>}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="bookings" className="mt-6">
          <div className="grid gap-4">
            {bookings.filter(b => b.status === "Pending").map((b: any) => (
              <Card key={b.id} className="p-5 border-l-4 border-l-blue-500 flex justify-between items-center">
                <div><div className="font-bold text-lg">{b.name}</div><div className="text-sm text-slate-500">{b.roomType} | In: {b.checkIn}</div></div>
                <Dialog>
                  <DialogTrigger asChild><Button size="sm">Approve</Button></DialogTrigger>
                  <DialogContent>
                    <DialogHeader><DialogTitle>Approve Booking</DialogTitle></DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-1"><Label>CNIC (Required)</Label><Input id={`cnic-${b.id}`} defaultValue={b.cnic} placeholder="71101-XXXXXXX-X" /></div>
                      <div className="space-y-1"><Label>Select Floor</Label>
                        <Select onValueChange={v => setBookings(bookings.map(book => book.id === b.id ? {...book, tempFloor: v} : book))}>
                          <SelectTrigger><SelectValue placeholder="Floor" /></SelectTrigger>
                          <SelectContent><SelectItem value="1st Floor">1st Floor</SelectItem><SelectItem value="2nd Floor">2nd Floor</SelectItem><SelectItem value="Top Floor">Top Floor</SelectItem></SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1"><Label>Select Room</Label>
                        <Select disabled={!b.tempFloor} onValueChange={r => {
                          const cnic = (document.getElementById(`cnic-${b.id}`) as HTMLInputElement)?.value;
                          if (!cnic) { toast({title: "CNIC Required", variant: "destructive"}); return; }
                          updateBookingStatus(b.id, "Approved", r, cnic);
                          printToken({...b, assignedRoom: r, cnic});
                        }}>
                          <SelectTrigger><SelectValue placeholder="Room" /></SelectTrigger>
                          <SelectContent className="max-h-[300px] overflow-y-auto">
                            {b.tempFloor && rooms.filter(r => r.floor === b.tempFloor).map(r => <SelectItem key={r.id} value={r.number} disabled={!isRoomAvailable(r.number, b.checkIn, b.checkOut)}>{r.number}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </Card>
            ))}
            {bookings.filter(b => b.status === "Pending").length === 0 && <div className="text-center p-12 text-slate-400">No pending requests</div>}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
