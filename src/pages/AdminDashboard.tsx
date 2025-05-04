
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, FileText, MessageSquare, Filter, Search, CheckCircle, XCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface UserRequest {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  created_at: string;
  status: 'pending' | 'approved' | 'rejected';
}

const AdminDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("registrations");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [userRequests, setUserRequests] = useState<UserRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserRequests();
  }, []);
  
  const fetchUserRequests = async () => {
    setLoading(true);
    try {
      // Get all users from auth.users table (requires admin privileges in Supabase)
      // For now, we'll use mock data
      const mockUsers: UserRequest[] = [
        {
          id: "1",
          email: "john.doe@example.com",
          first_name: "John",
          last_name: "Doe",
          created_at: "2025-05-01T12:00:00Z",
          status: "pending"
        },
        {
          id: "2",
          email: "sarah.smith@example.com",
          first_name: "Sarah",
          last_name: "Smith",
          created_at: "2025-05-02T14:30:00Z",
          status: "pending"
        },
        {
          id: "3",
          email: "mike.johnson@example.com",
          first_name: "Mike",
          last_name: "Johnson",
          created_at: "2025-05-03T09:15:00Z",
          status: "approved"
        }
      ];
      setUserRequests(mockUsers);
    } catch (error) {
      console.error("Error fetching user requests:", error);
      toast({
        title: "Error",
        description: "Failed to load user registration requests",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleApproveUser = async (userId: string) => {
    try {
      // In a real application, this would update the user's role in Supabase
      // For demo purposes, we'll just update the local state
      setUserRequests(prevRequests =>
        prevRequests.map(request =>
          request.id === userId ? { ...request, status: 'approved' } : request
        )
      );
      
      toast({
        title: "Success",
        description: "User has been approved",
      });
    } catch (error) {
      console.error("Error approving user:", error);
      toast({
        title: "Error",
        description: "Failed to approve user",
        variant: "destructive",
      });
    }
  };
  
  const handleRejectUser = async (userId: string) => {
    try {
      // In a real application, this would delete the user or mark them as rejected
      // For demo purposes, we'll just update the local state
      setUserRequests(prevRequests =>
        prevRequests.map(request =>
          request.id === userId ? { ...request, status: 'rejected' } : request
        )
      );
      
      toast({
        title: "Success",
        description: "User has been rejected",
      });
    } catch (error) {
      console.error("Error rejecting user:", error);
      toast({
        title: "Error",
        description: "Failed to reject user",
        variant: "destructive",
      });
    }
  };

  // Filter user requests based on search term and status filter
  const filteredRequests = userRequests.filter(request => {
    const matchesSearch = 
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
      `${request.first_name} ${request.last_name}`.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === "all" || 
      request.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="bg-edu-primary py-12 px-6">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-white/90">
              Manage user requests, materials, and system settings
            </p>
          </div>
        </div>
        
        <div className="container mx-auto py-8 px-6">
          <Tabs defaultValue="registrations" value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList>
              <TabsTrigger value="registrations" className="flex items-center">
                <User size={16} className="mr-2" />
                <span>Registration Requests</span>
              </TabsTrigger>
              <TabsTrigger value="materials" className="flex items-center">
                <FileText size={16} className="mr-2" />
                <span>Materials</span>
              </TabsTrigger>
              <TabsTrigger value="questions" className="flex items-center">
                <MessageSquare size={16} className="mr-2" />
                <span>Questions</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Registration Requests Tab */}
            <TabsContent value="registrations">
              <Card>
                <CardHeader>
                  <CardTitle>User Registration Requests</CardTitle>
                  <CardDescription>
                    Review and approve or reject user registration requests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                      <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      <Input 
                        placeholder="Search by name or email..." 
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full md:w-48">
                        <div className="flex items-center">
                          <Filter size={16} className="mr-2" />
                          <SelectValue placeholder="Filter by status" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {loading ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">Loading registration requests...</p>
                    </div>
                  ) : filteredRequests.length === 0 ? (
                    <div className="text-center py-8">
                      <User size={48} className="mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium mb-1">No registration requests found</h3>
                      <p className="text-gray-500">
                        There are no user registration requests matching your filters.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredRequests.map((request) => (
                        <div key={request.id} className="bg-white border rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Badge className={
                                request.status === "pending" ? "bg-yellow-500" :
                                request.status === "approved" ? "bg-green-500" :
                                "bg-red-500"
                              }>
                                {request.status === "pending" ? "Pending" :
                                 request.status === "approved" ? "Approved" :
                                 "Rejected"
                                }
                              </Badge>
                              <span className="text-sm text-gray-500">
                                Requested on {new Date(request.created_at).toLocaleDateString()}
                              </span>
                            </div>
                            <h3 className="font-medium">{request.first_name} {request.last_name}</h3>
                            <p className="text-sm text-gray-500">{request.email}</p>
                          </div>
                          
                          {request.status === "pending" && (
                            <div className="flex gap-2 w-full md:w-auto">
                              <Button 
                                className="flex-1 md:flex-none bg-green-600 hover:bg-green-700 flex items-center gap-1"
                                onClick={() => handleApproveUser(request.id)}
                              >
                                <CheckCircle size={16} />
                                <span>Approve</span>
                              </Button>
                              <Button 
                                variant="outline" 
                                className="flex-1 md:flex-none border-red-300 text-red-600 hover:bg-red-50 flex items-center gap-1"
                                onClick={() => handleRejectUser(request.id)}
                              >
                                <XCircle size={16} />
                                <span>Reject</span>
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Materials Tab */}
            <TabsContent value="materials">
              <Card>
                <CardHeader>
                  <CardTitle>Manage Materials</CardTitle>
                  <CardDescription>
                    Review and moderate uploaded materials
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <FileText size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-1">Coming Soon</h3>
                    <p className="text-gray-500">
                      The materials management interface is currently being developed.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Questions Tab */}
            <TabsContent value="questions">
              <Card>
                <CardHeader>
                  <CardTitle>Manage Questions</CardTitle>
                  <CardDescription>
                    Review and moderate questions posted by users
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-1">Coming Soon</h3>
                    <p className="text-gray-500">
                      The questions management interface is currently being developed.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
