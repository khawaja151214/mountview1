import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { requestApproval } from "@/lib/mock-data";

export default function Signup() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    requestApproval(formData.username, formData.email, formData.password);
    setSubmitted(true);
    toast({
      title: "Request Submitted",
      description: "Your account creation request has been sent to the admin.",
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-slate-800 bg-slate-950 text-slate-100 text-center p-8">
           <div className="mx-auto bg-blue-900/50 p-4 rounded-full w-fit mb-4">
             <AlertCircle className="w-8 h-8 text-blue-400" />
           </div>
           <h2 className="text-2xl font-serif font-bold mb-2">Request Sent</h2>
           <p className="text-slate-400 mb-6">
             Your account creation request has been submitted. The admin will review and approve your request. You'll receive confirmation via email.
           </p>
           <Link href="/login">
             <Button variant="outline" className="text-slate-900">Back to Login</Button>
           </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-slate-800 bg-slate-950 text-slate-100">
        <CardHeader className="text-center space-y-4">
          <CardTitle className="text-2xl font-serif">Request Employee Account</CardTitle>
          <p className="text-sm text-slate-400">Submit your details for admin approval</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Desired Username</Label>
              <Input 
                id="username" 
                placeholder="username" 
                className="bg-slate-900 border-slate-800 text-white" 
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="your@email.com" 
                className="bg-slate-900 border-slate-800 text-white" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                className="bg-slate-900 border-slate-800 text-white" 
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
            <Button className="w-full bg-slate-100 text-slate-900 hover:bg-white mt-4">
              Submit Request
            </Button>
            <div className="text-center text-xs text-slate-500 mt-4">
              Already have an account? <Link href="/login"><a className="text-slate-300 hover:underline">Login</a></Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
