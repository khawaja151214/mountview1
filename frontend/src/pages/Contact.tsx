import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-primary py-20 text-center text-white">
        <h1 className="font-serif text-4xl md:text-5xl font-bold">Contact Us</h1>
        <p className="mt-4 text-white/80">We are here to help you plan your stay</p>
      </div>

      <div className="container mt-12 grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <h2 className="font-serif text-3xl font-bold text-primary mb-6">Get in Touch</h2>
            <p className="text-muted-foreground">
              Have questions about booking, amenities, or Skardu? Our team is ready to assist you 24/7.
            </p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardContent className="p-6 flex items-start gap-4">
                <MapPin className="w-6 h-6 text-accent mt-1" />
                <div>
                  <h3 className="font-bold text-primary">Location</h3>
                  <p className="text-sm text-muted-foreground">Main Road, Skardu City, Gilgit-Baltistan, Pakistan</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex items-start gap-4">
                <Phone className="w-6 h-6 text-accent mt-1" />
                <div>
                  <h3 className="font-bold text-primary">Phone</h3>
                  <p className="text-sm text-muted-foreground">+92 300 1234567</p>
                  <p className="text-sm text-muted-foreground">+92 5815 123456</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-start gap-4">
                <Mail className="w-6 h-6 text-accent mt-1" />
                <div>
                  <h3 className="font-bold text-primary">Email</h3>
                  <p className="text-sm text-muted-foreground">reservations@mountviewskardu.com</p>
                  <p className="text-sm text-muted-foreground">info@mountviewskardu.com</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="bg-muted/30 p-8 rounded-xl border">
          <h3 className="font-serif text-2xl font-bold text-primary mb-6">Send us a Message</h3>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">First Name</label>
                <Input placeholder="John" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Last Name</label>
                <Input placeholder="Doe" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input placeholder="john@example.com" type="email" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <Input placeholder="Booking Inquiry" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <Textarea placeholder="How can we help you?" className="min-h-[150px]" />
            </div>

            <Button className="w-full bg-primary text-white">Send Message</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
