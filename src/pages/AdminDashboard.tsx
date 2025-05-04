
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Check, X, FileText, Upload, MessageSquare, FolderPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for demonstration purposes
const mockRequests = [
  { id: 1, user: "john.doe@example.com", type: "Registration Request", status: "pending", date: "2025-05-01" },
  { id: 2, user: "jane.smith@example.com", type: "Registration Request", status: "pending", date: "2025-05-02" },
  { id: 3, user: "robert.johnson@example.com", type: "Registration Request", status: "pending", date: "2025-05-03" },
];

const mockMaterials = [
  { id: 1, title: "Calculus I Notes", type: "PDF", category: "Mathematics", uploadedBy: "Admin", date: "2025-05-01" },
  { id: 2, user: "Introduction to Physics", type: "Presentation", category: "Physics", uploadedBy: "Admin", date: "2025-05-02" },
];

const mockQuestions = [
  { id: 1, title: "How to solve quadratic equations?", user: "student1@example.com", status: "unanswered", date: "2025-05-01" },
  { id: 2, title: "Explain Newton's laws", user: "student2@example.com", status: "answered", date: "2025-05-02" },
];

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [registrationRequests, setRegistrationRequests] = useState(mockRequests);
  const [uploadedMaterials, setUploadedMaterials] = useState(mockMaterials);
  const [studentQuestions, setStudentQuestions] = useState(mockQuestions);
  
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
    
    // In a real app, you'd fetch actual data here
  }, [user, navigate, toast]);

  const handleApproveRegistration = (id: number) => {
    setRegistrationRequests(registrationRequests.map(req => 
      req.id === id ? { ...req, status: "approved" } : req
    ));
    
    toast({
      title: "Registration Approved",
      description: `User registration #${id} has been approved.`,
    });
  };

  const handleRejectRegistration = (id: number) => {
    setRegistrationRequests(registrationRequests.map(req => 
      req.id === id ? { ...req, status: "rejected" } : req
    ));
    
    toast({
      title: "Registration Rejected",
      description: `User registration #${id} has been rejected.`,
    });
  };

  const handleDeleteMaterial = (id: number) => {
    setUploadedMaterials(uploadedMaterials.filter(material => material.id !== id));
    
    toast({
      title: "Material Deleted",
      description: `Material #${id} has been deleted.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        <Tabs defaultValue="registrations" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="registrations" className="flex items-center gap-2">
              <Check size={16} />
              <span>Registration Requests</span>
            </TabsTrigger>
            <TabsTrigger value="materials" className="flex items-center gap-2">
              <FileText size={16} />
              <span>Manage Materials</span>
            </TabsTrigger>
            <TabsTrigger value="questions" className="flex items-center gap-2">
              <MessageSquare size={16} />
              <span>Student Questions</span>
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <FolderPlus size={16} />
              <span>Categories</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Registration Requests Tab */}
          <TabsContent value="registrations">
            <Card>
              <CardHeader>
                <CardTitle>User Registration Requests</CardTitle>
                <CardDescription>Approve or reject user registration requests</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {registrationRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>{request.id}</TableCell>
                        <TableCell>{request.user}</TableCell>
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
                                onClick={() => handleApproveRegistration(request.id)}
                              >
                                <Check className="h-4 w-4 mr-1" /> Approve
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive" 
                                onClick={() => handleRejectRegistration(request.id)}
                              >
                                <X className="h-4 w-4 mr-1" /> Reject
                              </Button>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                    {registrationRequests.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4">
                          No pending registration requests
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Manage Materials Tab */}
          <TabsContent value="materials">
            <Card>
              <CardHeader>
                <CardTitle>Manage Learning Materials</CardTitle>
                <CardDescription>Upload, update, and delete course materials</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end mb-6">
                  <Button className="bg-edu-primary hover:bg-edu-secondary">
                    <Upload size={16} className="mr-2" />
                    Upload New Material
                  </Button>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Uploaded By</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {uploadedMaterials.map((material) => (
                      <TableRow key={material.id}>
                        <TableCell>{material.title}</TableCell>
                        <TableCell>{material.type}</TableCell>
                        <TableCell>{material.category}</TableCell>
                        <TableCell>{material.uploadedBy}</TableCell>
                        <TableCell>{material.date}</TableCell>
                        <TableCell className="flex space-x-2">
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button 
                            size="sm" 
                            variant="destructive" 
                            onClick={() => handleDeleteMaterial(material.id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {uploadedMaterials.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
                          No materials uploaded yet
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Student Questions Tab */}
          <TabsContent value="questions">
            <Card>
              <CardHeader>
                <CardTitle>Student Questions</CardTitle>
                <CardDescription>Monitor and moderate student questions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Question</TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentQuestions.map((question) => (
                      <TableRow key={question.id}>
                        <TableCell>{question.id}</TableCell>
                        <TableCell>{question.title}</TableCell>
                        <TableCell>{question.user}</TableCell>
                        <TableCell>
                          <Badge 
                            className={
                              question.status === "answered" 
                                ? "bg-green-500" 
                                : "bg-yellow-500"
                            }
                          >
                            {question.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{question.date}</TableCell>
                        <TableCell className="flex space-x-2">
                          <Button size="sm" variant="outline">View</Button>
                          {question.status === "unanswered" && (
                            <Button size="sm" variant="default">Answer</Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                    {studentQuestions.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
                          No questions have been posted yet
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Categories Tab */}
          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <CardTitle>Content Categories</CardTitle>
                <CardDescription>Organize materials by course, topic, or type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end mb-6">
                  <Button className="bg-edu-primary hover:bg-edu-secondary">
                    <FolderPlus size={16} className="mr-2" />
                    Add New Category
                  </Button>
                </div>
                
                <div className="grid gap-4 md:grid-cols-3">
                  {["Mathematics", "Physics", "Chemistry", "Computer Science", "Literature", "History"].map((category) => (
                    <Card key={category}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{category}</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex justify-end space-x-2">
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button size="sm" variant="destructive">Delete</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
