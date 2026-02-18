import { Switch, Route, useLocation } from "wouter";
import { MessageSquare } from "lucide-react";
import { Navbar, Footer } from "@/components/layout/PublicLayout";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useEffect, useState } from "react";
import Home from "@/pages/Home";
import Rooms from "@/pages/Rooms";
import Restaurant from "@/pages/Restaurant";
import Explore from "@/pages/Explore";
import Book from "@/pages/Book";
import Contact from "@/pages/Contact";
import Login from "@/pages/admin/Login";
import Signup from "@/pages/admin/Signup";
import FrontDesk from "@/pages/admin/FrontDesk";
import RestaurantPOS from "@/pages/admin/RestaurantPOS";
import Approvals from "@/pages/admin/Approvals";
import NotFound from "@/pages/not-found";
import { Toaster } from "@/components/ui/toaster";
import ChatBot from "@/components/ChatBot";

function AdminRoute({ component: Component, isMasterOnly = false }: { component: React.ComponentType, isMasterOnly?: boolean }) {
  const [location, setLocation] = useLocation();
  const [session, setSession] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check session immediately
    const adminSession = localStorage.getItem("adminSession");
    setSession(adminSession);
    setLoading(false);

    // If no session, redirect to login
    if (!adminSession) {
      setLocation("/login");
    }
  }, [setLocation]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <Login />;
  }

  if (isMasterOnly && session !== "shehzad") {
    return (
      <DashboardLayout isMasterAccount={false}>
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Access Denied</h1>
          <p className="text-slate-600">Only the master account can access this page.</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout isMasterAccount={session === "shehzad"}>
      <Component />
    </DashboardLayout>
  );
}

function App() {
  return (
    <>
      <Switch>
        {/* Admin Routes */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/admin/front-desk">
          <AdminRoute component={FrontDesk} />
        </Route>
        <Route path="/admin/restaurant-pos">
          <AdminRoute component={RestaurantPOS} />
        </Route>
        <Route path="/admin/inventory">
          <AdminRoute component={() => <div className="p-6"><h1 className="text-2xl font-bold">Inventory Management</h1><p className="text-slate-600 mt-2">Coming Soon...</p></div>} />
        </Route>
        <Route path="/admin/approvals">
          <AdminRoute component={Approvals} isMasterOnly={true} />
        </Route>
        <Route path="/admin/settings">
          <AdminRoute component={() => <div className="p-6"><h1 className="text-2xl font-bold">Settings</h1><p className="text-slate-600 mt-2">Coming Soon...</p></div>} />
        </Route>

        {/* Public Routes */}
        <Route path="/">
           <Navbar />
           <Home />
           <Footer />
        </Route>
        <Route path="/rooms">
           <Navbar />
           <Rooms />
           <Footer />
        </Route>
        <Route path="/restaurant">
           <Navbar />
           <Restaurant />
           <Footer />
        </Route>
        <Route path="/explore">
           <Navbar />
           <Explore />
           <Footer />
        </Route>
        <Route path="/book">
           <Navbar />
           <Book />
           <Footer />
        </Route>
        <Route path="/contact">
           <Navbar />
           <Contact />
           <Footer />
        </Route>
        
        {/* Fallback */}
        <Route component={NotFound} />
      </Switch>
      <Toaster />
      
      {/* AI Chatbot - Bottom Left */}
      <ChatBot />

      {/* WhatsApp Floating Button - Draggable */}
      <DraggableWhatsApp />
    </>
  );
}

function DraggableWhatsApp() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [moved, setMoved] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const offset = useRef({ x: 0, y: 0 });

  const onPointerDown = (e: React.PointerEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    offset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    setDragging(true);
    setMoved(false);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    setMoved(true);
    const newX = window.innerWidth - e.clientX + offset.current.x - 28;
    const newY = window.innerHeight - e.clientY + offset.current.y - 28;
    setPos({
      x: Math.max(0, Math.min(newX, window.innerWidth - 56)),
      y: Math.max(0, Math.min(newY, window.innerHeight - 56)),
    });
  };

  const onPointerUp = () => setDragging(false);

  const handleClick = (e: React.MouseEvent) => {
    if (moved) e.preventDefault();
  };

  return (
    <div
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      className="fixed z-50 touch-none select-none"
      style={{ bottom: `${pos.y + 12}px`, right: `${pos.x + 12}px`, cursor: dragging ? "grabbing" : "grab" }}
      data-testid="whatsapp-draggable"
    >
      <a
        href="https://wa.me/923468484849"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        aria-label="Chat on WhatsApp"
        data-testid="link-whatsapp-float"
      >
        <div className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white flex items-center justify-center shadow-2xl transition-colors duration-200">
          <MessageSquare className="h-6 w-6 pointer-events-none" />
        </div>
      </a>
    </div>
  );
}

export default App;
