import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { approveRequest, rejectRequest } from "@/lib/mock-data";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface ApprovalRequest {
  id: string;
  username: string;
  email: string;
  status: "pending" | "approved" | "rejected";
  requestedAt: string;
}

export default function Approvals() {
  const [approvals, setApprovals] = useState<ApprovalRequest[]>(() => {
    try {
      const stored = localStorage.getItem("pendingApprovals");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const { toast } = useToast();

  useEffect(() => {
    // Refresh approvals whenever component mounts to get latest from storage
    try {
      const stored = localStorage.getItem("pendingApprovals");
      const latest = stored ? JSON.parse(stored) : [];
      setApprovals(latest);
    } catch {
      setApprovals([]);
    }
  }, []);

  const handleApprove = (requestId: string) => {
    approveRequest(requestId);
    setApprovals(approvals.map((a: ApprovalRequest) => 
      a.id === requestId ? { ...a, status: "approved" as const } : a
    ));
    toast({
      title: "Account Approved",
      description: "Employee can now log in to the portal.",
    });
  };

  const handleReject = (requestId: string) => {
    rejectRequest(requestId);
    setApprovals(approvals.map((a: ApprovalRequest) => 
      a.id === requestId ? { ...a, status: "rejected" as const } : a
    ));
    toast({
      title: "Request Rejected",
      description: "Employee will be notified of rejection.",
      variant: "destructive",
    });
  };

  const pending = approvals.filter((a: ApprovalRequest) => a.status === "pending");
  const approved = approvals.filter((a: ApprovalRequest) => a.status === "approved");
  const rejected = approvals.filter((a: ApprovalRequest) => a.status === "rejected");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Account Approvals</h1>
        <p className="text-slate-500">Review and approve pending employee account requests</p>
      </div>

      {/* Pending Requests */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-yellow-600" />
          <h2 className="text-lg font-bold text-slate-900">Pending Approval ({pending.length})</h2>
        </div>
        {pending.length === 0 ? (
          <Card className="bg-slate-50">
            <CardContent className="p-6 text-center text-slate-500">
              No pending requests
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {pending.map((request: ApprovalRequest) => (
              <Card key={request.id} className="border-l-4 border-l-yellow-500">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-slate-900">{request.username}</h3>
                      <p className="text-sm text-slate-600">{request.email}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        Requested: {new Date(request.requestedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="outline" className="border-yellow-200 bg-yellow-50 text-yellow-700">
                      Pending
                    </Badge>
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      className="bg-green-600 hover:bg-green-700 gap-2"
                      onClick={() => handleApprove(request.id)}
                    >
                      <CheckCircle className="h-4 w-4" /> Approve
                    </Button>
                    <Button 
                      variant="destructive"
                      className="gap-2"
                      onClick={() => handleReject(request.id)}
                    >
                      <XCircle className="h-4 w-4" /> Reject
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Approved Requests */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <h2 className="text-lg font-bold text-slate-900">Approved ({approved.length})</h2>
        </div>
        {approved.length === 0 ? (
          <Card className="bg-slate-50">
            <CardContent className="p-6 text-center text-slate-500">
              No approved requests yet
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {approved.map((request: ApprovalRequest) => (
              <Card key={request.id} className="border-l-4 border-l-green-500">
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-slate-900">{request.username}</p>
                    <p className="text-xs text-slate-600">{request.email}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700">Approved</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Rejected Requests */}
      {rejected.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-600" />
            <h2 className="text-lg font-bold text-slate-900">Rejected ({rejected.length})</h2>
          </div>
          <div className="space-y-2">
            {rejected.map((request: ApprovalRequest) => (
              <Card key={request.id} className="border-l-4 border-l-red-500">
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-slate-900">{request.username}</p>
                    <p className="text-xs text-slate-600">{request.email}</p>
                  </div>
                  <Badge variant="destructive">Rejected</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
