import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Lock, AlertCircle } from "lucide-react";
import { masterAccount, isUserApproved } from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      // Check if user is master account
      if (username === masterAccount.username && password === masterAccount.password) {
        setLoading(false);
        localStorage.setItem("adminSession", username);
        localStorage.setItem("adminLoginTime", Date.now().toString());
        toast({
          title: "Welcome Shehzad",
          description: "Master account access granted.",
        });
        // Navigate after a tiny delay to ensure state update
        setTimeout(() => setLocation("/admin/front-desk"), 100);
        return;
      }

      // Check if user is approved staff member
      if (isUserApproved(username)) {
        setLoading(false);
        localStorage.setItem("adminSession", username);
        localStorage.setItem("adminLoginTime", Date.now().toString());
        toast({
          title: "Login Successful",
          description: "Welcome to Mount View Hotel.",
        });
        // Navigate after a tiny delay to ensure state update
        setTimeout(() => setLocation("/admin/front-desk"), 100);
        return;
      }

      // User not found or not approved
      setLoading(false);
      setError("Invalid credentials or account not approved yet.");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-slate-800 bg-slate-950 text-slate-100">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto bg-slate-900 p-3 rounded-full w-fit border border-slate-800">
            <Lock className="w-6 h-6 text-slate-400" />
          </div>
          <CardTitle className="text-2xl font-serif">Employee Portal</CardTitle>
          <p className="text-sm text-slate-400">Mount View Hotel Internal System</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-900/30 border border-red-700 rounded-md p-3 flex items-start gap-2 text-sm text-red-200">
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                placeholder="shehzad" 
                className="bg-slate-900 border-slate-800 text-white" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                className="bg-slate-900 border-slate-800 text-white" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button className="w-full bg-slate-100 text-slate-900 hover:bg-white mt-4" disabled={loading}>
              {loading ? "Accessing..." : "Login"}
            </Button>

            <div className="text-center text-xs text-slate-500 mt-4">
              <p>Restricted Access. Authorized Personnel Only.</p>
              <div className="text-slate-400 pt-3 border-t border-slate-700 mt-3">
                <a href="/signup" className="text-slate-300 hover:text-white hover:underline font-medium text-sm">
                  Request New Account
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
