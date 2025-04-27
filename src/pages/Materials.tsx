
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Search, Calendar, Download } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Mock data for materials
const mockMaterials = [
  {
    id: 1,
    title: "Introduction to Computer Science",
    description: "Foundational concepts in computing and programming",
    type: "PDF",
    category: "Computer Science",
    date: "Apr 20, 2025",
    size: "2.4 MB",
    downloads: 128
  },
  {
    id: 2,
    title: "Calculus I Study Guide",
    description: "Comprehensive review of limits, derivatives and integrals",
    type: "PDF",
    category: "Mathematics",
    date: "Apr 18, 2025",
    size: "3.1 MB",
    downloads: 94
  },
  {
    id: 3,
    title: "Organic Chemistry Lab Notes",
    description: "Detailed notes for the semester's lab experiments",
    type: "Document",
    category: "Chemistry",
    date: "Apr 15, 2025",
    size: "1.8 MB",
    downloads: 56
  },
  {
    id: 4,
    title: "World History Timeline",
    description: "Visual timeline of major historical events",
    type: "Presentation",
    category: "History",
    date: "Apr 12, 2025",
    size: "5.2 MB",
    downloads: 43
  },
  {
    id: 5,
    title: "Physics Formulas Cheat Sheet",
    description: "Quick reference guide for common physics equations",
    type: "PDF",
    category: "Physics",
    date: "Apr 10, 2025",
    size: "1.2 MB",
    downloads: 187
  },
  {
    id: 6,
    title: "Literary Analysis Methods",
    description: "Guide to analyzing and interpreting literature",
    type: "Document",
    category: "Literature",
    date: "Apr 8, 2025",
    size: "2.7 MB",
    downloads: 36
  },
  {
    id: 7,
    title: "Introduction to Psychology",
    description: "Overview of basic psychology concepts and theories",
    type: "Presentation",
    category: "Psychology",
    date: "Apr 5, 2025",
    size: "4.5 MB",
    downloads: 72
  },
  {
    id: 8,
    title: "Spanish Verb Conjugations",
    description: "Comprehensive guide to Spanish verb forms",
    type: "PDF",
    category: "Languages",
    date: "Apr 3, 2025",
    size: "1.9 MB",
    downloads: 63
  }
];

// Categories for filtering
const categories = [
  "All Categories",
  "Computer Science",
  "Mathematics",
  "Chemistry",
  "History",
  "Physics",
  "Literature",
  "Psychology",
  "Languages"
];

// File types for filtering
const fileTypes = [
  "All Types",
  "PDF",
  "Document",
  "Presentation",
  "Spreadsheet",
  "Image"
];

const Materials = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedType, setSelectedType] = useState("All Types");
  
  // Filter materials based on search, category, and type
  const filteredMaterials = mockMaterials.filter((material) => {
    const matchesSearch = 
      material.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      material.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === "All Categories" || 
      material.category === selectedCategory;
    
    const matchesType = 
      selectedType === "All Types" || 
      material.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="bg-edu-primary py-12 px-6">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-white mb-4">Study Materials</h1>
            <p className="text-white/90 max-w-2xl">
              Access course materials, lecture notes, and study resources uploaded by instructors and peers.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto py-8 px-6">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input 
                  placeholder="Search materials..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select file type" />
                </SelectTrigger>
                <SelectContent>
                  {fileTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Tabs defaultValue="grid" className="w-full">
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-gray-500">
                  {filteredMaterials.length} materials found
                </div>
                <TabsList>
                  <TabsTrigger value="grid">Grid View</TabsTrigger>
                  <TabsTrigger value="list">List View</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="grid" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredMaterials.map((material) => (
                    <Card key={material.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <Badge 
                            className={`mb-2 ${
                              material.type === "PDF" ? "bg-edu-primary" : 
                              material.type === "Document" ? "bg-edu-secondary" : 
                              "bg-edu-accent"
                            } text-white`}
                          >
                            {material.type}
                          </Badge>
                          <Badge variant="outline" className="text-xs">{material.category}</Badge>
                        </div>
                        <CardTitle className="text-lg">{material.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{material.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
                          <div className="flex items-center">
                            <Calendar size={14} className="mr-1" />
                            <span>{material.date}</span>
                          </div>
                          <div>{material.size}</div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="ghost" className="w-full text-edu-primary hover:bg-edu-primary/10 flex items-center justify-center gap-2">
                          <Download size={16} />
                          <span>Download</span>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="list" className="mt-0">
                <div className="space-y-4">
                  {filteredMaterials.map((material) => (
                    <div key={material.id} className="bg-white border rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition-shadow">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge 
                            className={`${
                              material.type === "PDF" ? "bg-edu-primary" : 
                              material.type === "Document" ? "bg-edu-secondary" : 
                              "bg-edu-accent"
                            } text-white`}
                          >
                            {material.type}
                          </Badge>
                          <Badge variant="outline">{material.category}</Badge>
                        </div>
                        <h3 className="font-medium">{material.title}</h3>
                        <p className="text-sm text-gray-500">{material.description}</p>
                      </div>
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto">
                        <div className="flex flex-col md:items-end text-sm text-gray-500 w-full md:w-auto">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{material.date}</span>
                          </div>
                          <div>{material.size} • {material.downloads} downloads</div>
                        </div>
                        <Button variant="outline" className="flex items-center gap-2 w-full md:w-auto">
                          <Download size={16} />
                          <span>Download</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Materials;
