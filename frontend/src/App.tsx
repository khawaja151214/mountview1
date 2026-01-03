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
      
      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/923468484849"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
        aria-label="Chat on WhatsApp"
        data-testid="link-whatsapp-float"
      >
        <MessageSquare className="h-6 w-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 ease-in-out whitespace-nowrap font-medium">
          Chat with us
        </span>
      </a>
    </>
  );
}

export default App;
