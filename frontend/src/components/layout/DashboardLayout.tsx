import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { LayoutDashboard, BedDouble, Utensils, ShoppingCart, LogOut, Settings, CheckCircle, Menu, X } from "lucide-react";
import { useState } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  isMasterAccount?: boolean;
}

export function DashboardLayout({ children, isMasterAccount = false }: DashboardLayoutProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/admin/front-desk", label: "Front Desk", icon: BedDouble },
    { href: "/admin/restaurant-pos", label: "Restaurant POS", icon: Utensils },
    { href: "/admin/inventory", label: "Inventory", icon: ShoppingCart },
    ...(isMasterAccount ? [{ href: "/admin/approvals", label: "Account Approvals", icon: CheckCircle }] : []),
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-slate-900 text-white p-4 flex items-center justify-between">
        <span className="font-serif font-bold text-lg">Mount View Admin</span>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 hover:bg-slate-800 rounded-md transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 text-slate-300 border-b border-slate-800">
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = location === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <button
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive 
                        ? "bg-slate-800 text-white shadow-sm" 
                        : "hover:bg-slate-800/50 hover:text-white"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </button>
                </Link>
              );
            })}
            <div className="pt-2 border-t border-slate-800">
              <Link href="/login">
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-red-400 hover:bg-slate-800/50 transition-colors">
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </Link>
            </div>
          </nav>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex-shrink-0 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <span className="font-serif font-bold text-white text-lg">Mount View Admin</span>
          {isMasterAccount && <span className="text-xs bg-slate-800 text-yellow-400 px-2 py-1 rounded ml-auto">MASTER</span>}
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <button
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-slate-800 text-white shadow-sm" 
                      : "hover:bg-slate-800/50 hover:text-white"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </button>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <Link href="/login">
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-red-400 hover:bg-slate-800/50 transition-colors">
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex-1 overflow-auto p-4 md:p-8">
           {children}
        </div>
      </main>
    </div>
  );
}
