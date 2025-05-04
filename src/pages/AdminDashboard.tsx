
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for demonstration purposes
const mockRequests = [
  { id: 1, user: "john.doe@example.com", type: "Material Upload", status: "pending", date: "2025-05-01" },
  { id: 2, user: "jane.smith@example.com", type: "Question Submission", status: "pending", date: "2025-05-02" },
  { id: 3, user: "robert.johnson@example.com", type: "Answer Approval", status: "pending", date: "2025-05-03" },
  { id: 4, user: "susan.williams@example.com", type: "Material Upload", status: "pending", date: "2025-05-04" },
];

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [requests, setRequests] = useState(mockRequests);
  
  useEffect(() => {
    // Check if user is logged in and is admin
    if (!user) {
      navigate("/login");
      return;
    }
    
    const isAdmin = user.role === "admin";
    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page",
        variant: "destructive",
      });
      navigate("/");
    }
    
    // In a real app, you'd fetch actual requests data here
    // For now, we're using mock data
  }, [user, navigate, toast]);

  const handleApprove = (id: number) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: "approved" } : req
    ));
    
    toast({
      title: "Request Approved",
      description: `Request #${id} has been approved.`,
    });
  };

  const handleReject = (id: number) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: "rejected" } : req
    ));
    
    toast({
      title: "Request Rejected",
      description: `Request #${id} has been rejected.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Admin Dashboard</CardTitle>
            <CardDescription>Manage user requests and submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Pending Requests</h2>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.id}</TableCell>
                    <TableCell>{request.user}</TableCell>
                    <TableCell>{request.type}</TableCell>
                    <TableCell>{request.date}</TableCell>
                    <TableCell>
                      <Badge 
                        className={
                          request.status === "approved" 
                            ? "bg-green-500" 
                            : request.status === "rejected" 
                            ? "bg-red-500" 
                            : "bg-yellow-500"
                        }
                      >
                        {request.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="flex space-x-2">
                      {request.status === "pending" && (
                        <>
                          <Button 
                            size="sm" 
                            variant="default" 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleApprove(request.id)}
                          >
                            <Check className="h-4 w-4 mr-1" /> Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive" 
                            onClick={() => handleReject(request.id)}
                          >
                            <X className="h-4 w-4 mr-1" /> Reject
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
