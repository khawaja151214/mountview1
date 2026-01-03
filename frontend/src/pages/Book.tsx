import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  city: z.string().min(1, { message: "City is required." }),
  phone: z.string().regex(/^(\+92|0|0092)[0-9]{10}$/, { message: "Please enter a valid Pakistani mobile number." }),
  cnic: z.string().optional(),
  roomType: z.string({ required_error: "Please select a room type." }),
  guests: z.string().min(1, { message: "Number of guests is required." }),
  checkIn: z.string().min(1, { message: "Check-in date is required." }),
  checkOut: z.string().min(1, { message: "Check-out date is required." }),
  requests: z.string().optional(),
  whatsappConsent: z.boolean().default(false),
});

export default function Book() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      city: "",
      phone: "",
      cnic: "",
      guests: "2",
      requests: "",
      whatsappConsent: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const checkIn = new Date(values.checkIn);
    const checkOut = new Date(values.checkOut);
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24));

    if (nights <= 0) {
      toast({
        title: "Invalid Dates",
        description: "Check-out date must be after check-in date.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Booking Request Sent!",
      description: "We have received your reservation request. It has been sent to the pending queue for approval.",
    });

    const newBooking = {
      id: Date.now().toString(),
      ...values,
      nights,
      status: "Pending",
      createdAt: new Date().toISOString()
    };
    
    const existingBookings = JSON.parse(localStorage.getItem("mv_bookings") || "[]");
    localStorage.setItem("mv_bookings", JSON.stringify([...existingBookings, newBooking]));

    setTimeout(() => {
       setLocation("/");
    }, 2000);
  }

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container max-w-xl">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl font-bold text-primary">Book Your Stay</h1>
          <p className="text-muted-foreground mt-2">Reserve your room at Mount View Hotel</p>
        </div>

        <div className="bg-card border shadow-lg rounded-xl p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Skardu" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <Input placeholder="03468484849" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="cnic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CNIC Number (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="71101-XXXXXXX-X" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                 <FormField
                  control={form.control}
                  name="roomType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Room" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Standard">Standard Room</SelectItem>
                          <SelectItem value="Deluxe">Deluxe Room</SelectItem>
                          <SelectItem value="Executive">Executive Room</SelectItem>
                          <SelectItem value="Family Suite">Family Suite</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="guests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Guests</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="checkIn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Check-in Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                <FormField
                    control={form.control}
                    name="checkOut"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Check-out Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              </div>

              <FormField
                control={form.control}
                name="whatsappConsent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I agree to receive my booking updates on WhatsApp from Mount view hotel.
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="requests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Requests</FormLabel>
                    <div className="grid grid-cols-1 gap-2 mb-2">
                      {[
                        "I Need Airport Pick and Drop",
                        "I need transport during my whole visit",
                        "Extra Bed Required",
                        "Late Check-in (after 6 PM)"
                      ].map((opt) => (
                        <Button
                          key={opt}
                          type="button"
                          variant="outline"
                          size="sm"
                          className="justify-start text-xs h-8"
                          onClick={() => {
                            const current = form.getValues("requests") || "";
                            form.setValue("requests", current ? `${current}\n${opt}` : opt);
                          }}
                        >
                          + {opt}
                        </Button>
                      ))}
                    </div>
                    <FormControl>
                      <Textarea placeholder="Type your special requests here..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 space-y-4">
                <h3 className="font-bold text-blue-800 text-sm flex items-center gap-2">
                  <span className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></span>
                  Advance Payment Requirement
                </h3>
                <p className="text-xs text-blue-700 leading-relaxed">
                  To confirm your reservation, a minimum advance payment of 20% is required. Please bring your CNIC at the time of booking.
                </p>
              </div>

              <Button type="submit" className="w-full bg-primary text-white text-lg py-6">Confirm Reservation</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
