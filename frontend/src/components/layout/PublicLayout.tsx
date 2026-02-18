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
    <nav className="sticky top-0 z-50 w-full border-b border-[#C4A24C]/10 bg-[#0E2F2F]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0E2F2F]/80">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/">
          <span className="font-serif text-2xl font-bold tracking-tight text-white cursor-pointer">
            Mount View Hotel<span className="text-[#C4A24C]">.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                className={cn(
                  "text-sm font-medium transition-colors hover:text-[#C4A24C] cursor-pointer",
                  location === link.href
                    ? "text-[#C4A24C] font-semibold"
                    : "text-white/80"
                )}
              >
                {link.label}
              </span>
            </Link>
          ))}
          <div className="flex items-center gap-3 pl-4 border-l border-white/20">
            <Link href="/book">
              <Button className="bg-[#C4A24C] hover:bg-[#d4b65e] text-white font-medium px-6">
                Book Now
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" size="sm" className="gap-2 text-white/60 hover:text-[#C4A24C]">
                <LogIn className="h-4 w-4" /> Staff
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0E2F2F] p-4 animate-in slide-in-from-top-5">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className="text-base font-medium py-2 block border-b border-white/10 cursor-pointer text-white/80"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </span>
              </Link>
            ))}
            <Link href="/book">
              <Button className="w-full mt-2 bg-[#C4A24C] hover:bg-[#d4b65e] text-white" onClick={() => setIsOpen(false)}>
                Book Your Stay
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" className="w-full gap-2 border-white/20 text-white/80" onClick={() => setIsOpen(false)}>
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
    <footer className="bg-[#0E2F2F] text-white py-12">
      <div className="container grid md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <h3 className="font-serif text-2xl font-bold mb-4">
            Mount View Hotel<span className="text-[#C4A24C]">.</span>
          </h3>
          <p className="text-white/70 max-w-sm">
            The best hotel in Skardu offering luxury 3 star &amp; 5 star comfort near Skardu Airport, Deosai, and all major tourist destinations.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-[#C4A24C]">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/rooms"><span className="hover:text-[#C4A24C] transition-colors cursor-pointer text-white/70">Rooms &amp; Rates</span></Link></li>
            <li><Link href="/restaurant"><span className="hover:text-[#C4A24C] transition-colors cursor-pointer text-white/70">Restaurant</span></Link></li>
            <li><Link href="/explore"><span className="hover:text-[#C4A24C] transition-colors cursor-pointer text-white/70">Explore Skardu</span></Link></li>
            <li><Link href="/contact"><span className="hover:text-[#C4A24C] transition-colors cursor-pointer text-white/70">Contact</span></Link></li>
            <li><Link href="/login"><span className="hover:text-[#C4A24C] transition-colors cursor-pointer text-white/70">Staff Login</span></Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-[#C4A24C]">Contact Us</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-[#C4A24C]" /> +92 346 8484849
            </li>
            <li>College Road, Skardu City</li>
            <li>Gilgit-Baltistan, Pakistan</li>
          </ul>
        </div>
      </div>
      <div className="container border-t border-white/10 mt-12 pt-8 text-center text-xs text-white/40">
        &copy; 2025 Mount View Hotel Skardu — Best Hotel in Skardu. All rights reserved.
      </div>
    </footer>
  );
}
