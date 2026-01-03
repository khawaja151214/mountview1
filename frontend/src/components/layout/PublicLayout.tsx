import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X, Phone, LogIn } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/rooms", label: "Rooms & Rates" },
    { href: "/restaurant", label: "Restaurant" },
    { href: "/explore", label: "Explore Skardu" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/">
          <span className="font-serif text-2xl font-bold tracking-tight text-primary cursor-pointer">
            Mount View<span className="text-accent">.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary cursor-pointer",
                  location === link.href
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </span>
            </Link>
          ))}
          <div className="flex items-center gap-3 pl-4 border-l">
            <Link href="/book">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-6">
                Book Now
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary">
                <LogIn className="h-4 w-4" /> Staff
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-t bg-background p-4 animate-in slide-in-from-top-5">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className="text-base font-medium py-2 block border-b border-border/50 cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </span>
              </Link>
            ))}
            <Link href="/book">
              <Button className="w-full mt-2" onClick={() => setIsOpen(false)}>
                Book Your Stay
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" className="w-full gap-2" onClick={() => setIsOpen(false)}>
                <LogIn className="h-4 w-4" /> Employee Portal
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container grid md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <h3 className="font-serif text-2xl font-bold mb-4">
            Mount View Hotel<span className="text-accent">.</span>
          </h3>
          <p className="text-primary-foreground/80 max-w-sm">
            Experience luxury and comfort in the heart of Skardu. Your gateway to the mountains.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-accent">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/rooms"><span className="hover:underline cursor-pointer">Rooms</span></Link></li>
            <li><Link href="/restaurant"><span className="hover:underline cursor-pointer">Restaurant</span></Link></li>
            <li><Link href="/explore"><span className="hover:underline cursor-pointer">Destinations</span></Link></li>
            <li><Link href="/contact"><span className="hover:underline cursor-pointer">Contact</span></Link></li>
            <li><Link href="/login"><span className="hover:underline cursor-pointer">Staff Login</span></Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-accent">Contact Us</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4" /> +92 346 8484849
            </li>
            <li>Main Road, Skardu City</li>
            <li>Gilgit-Baltistan, Pakistan</li>
          </ul>
        </div>
      </div>
      <div className="container border-t border-primary-foreground/10 mt-12 pt-8 text-center text-xs text-primary-foreground/50">
        © 2025 Mount View Hotel Skardu. All rights reserved.
      </div>
    </footer>
  );
}
