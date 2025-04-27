
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Search, Calendar, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Mock data for questions
const mockQuestions = [
  {
    id: 1,
    title: "How do I implement a binary search tree in Python?",
    content: "I'm trying to create a binary search tree implementation in Python but I'm having trouble with the insertion method. Can someone explain the logic step by step?",
    category: "Computer Science",
    date: "2 hours ago",
    author: "Alex Johnson",
    initials: "AJ",
    replies: 3,
    views: 24,
    solved: false
  },
  {
    id: 2,
    title: "Explanation of the Second Law of Thermodynamics",
    content: "Can someone explain in simple terms what the Second Law of Thermodynamics means and how it applies to everyday scenarios? I'm struggling to understand the concept.",
    category: "Physics",
    date: "5 hours ago",
    author: "Maria Rodriguez",
    initials: "MR",
    replies: 2,
    views: 18,
    solved: true
  },
  {
    id: 3,
    title: "Solving this calculus problem",
    content: "I'm stuck on this integration problem: ∫(x²+3x+2)/(x+1) dx. Can anyone help me solve this step by step?",
    category: "Mathematics",
    date: "Yesterday",
    author: "David Chen",
    initials: "DC",
    replies: 5,
    views: 42,
    solved: true
  },
  {
    id: 4,
    title: "Shakespeare's use of symbolism in Hamlet",
    content: "I need help identifying and analyzing the major symbols in Shakespeare's Hamlet for my literature assignment. Particularly interested in how they relate to the themes of mortality and madness.",
    category: "Literature",
    date: "2 days ago",
    author: "Emily Wilson",
    initials: "EW",
    replies: 4,
    views: 31,
    solved: false
  },
  {
    id: 5,
    title: "Help understanding RNA transcription",
    content: "I'm confused about the process of RNA transcription, particularly how the RNA polymerase knows where to start and stop. Could someone clarify this biological mechanism?",
    category: "Biology",
    date: "3 days ago",
    author: "Michael Park",
    initials: "MP",
    replies: 6,
    views: 37,
    solved: true
  },
  {
    id: 6,
    title: "Using React Hooks effectively",
    content: "I'm new to React and trying to understand when to use useState vs useEffect. Can someone provide examples of proper use cases for each?",
    category: "Computer Science",
    date: "4 days ago",
    author: "Sophia Garcia",
    initials: "SG",
    replies: 8,
    views: 56,
    solved: true
  }
];

// Categories for filtering
const categories = [
  "All Categories",
  "Computer Science",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Literature",
  "History",
  "Languages"
];

const Questions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [showSolved, setShowSolved] = useState("all");
  
  // Filter questions based on search, category, and solved status
  const filteredQuestions = mockQuestions.filter((question) => {
    const matchesSearch = 
      question.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      question.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === "All Categories" || 
      question.category === selectedCategory;
    
    const matchesSolved = 
      showSolved === "all" || 
      (showSolved === "solved" && question.solved) ||
      (showSolved === "unsolved" && !question.solved);
    
    return matchesSearch && matchesCategory && matchesSolved;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="bg-edu-secondary py-12 px-6">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-white mb-4">Academic Questions</h1>
            <p className="text-white/90 max-w-2xl">
              Browse questions asked by students or ask your own academic questions to get help from instructors and peers.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto py-8 px-6">
          <div className="flex justify-end mb-6">
            <Button className="bg-edu-primary hover:bg-edu-secondary">
              <MessageSquare size={16} className="mr-2" />
              Ask a Question
            </Button>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input 
                  placeholder="Search questions..." 
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
              <Select value={showSolved} onValueChange={setShowSolved}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Questions</SelectItem>
                  <SelectItem value="solved">Solved Only</SelectItem>
                  <SelectItem value="unsolved">Unsolved Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Tabs defaultValue="recent" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="recent">Most Recent</TabsTrigger>
                <TabsTrigger value="popular">Most Popular</TabsTrigger>
              </TabsList>
              
              <TabsContent value="recent" className="mt-0 space-y-4">
                {filteredQuestions.map((question) => (
                  <Card key={question.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-edu-secondary text-white">{question.category}</Badge>
                          {question.solved && (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              Solved
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <MessageSquare size={14} />
                            <span>{question.replies}</span>
                          </div>
                          <div>
                            <span>{question.views} views</span>
                          </div>
                        </div>
                      </div>
                      <CardTitle className="text-xl mt-2">{question.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="py-0">
                      <CardDescription className="line-clamp-2 mb-4">{question.content}</CardDescription>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${question.initials}`} />
                            <AvatarFallback>{question.initials}</AvatarFallback>
                          </Avatar>
                          <span className="text-gray-600">{question.author}</span>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <Calendar size={14} className="mr-1" />
                          <span>{question.date}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-4">
                      <Button variant="ghost" className="w-full text-edu-secondary hover:bg-edu-secondary/10">
                        View Question
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
                
                {filteredQuestions.length === 0 && (
                  <div className="text-center py-12">
                    <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-medium mb-2">No questions found</h3>
                    <p className="text-gray-500">
                      Try adjusting your filters or search term to find what you're looking for.
                    </p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="popular" className="mt-0 space-y-4">
                {[...filteredQuestions]
                  .sort((a, b) => b.views - a.views)
                  .map((question) => (
                    <Card key={question.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-edu-secondary text-white">{question.category}</Badge>
                            {question.solved && (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                Solved
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <MessageSquare size={14} />
                              <span>{question.replies}</span>
                            </div>
                            <div>
                              <span>{question.views} views</span>
                            </div>
                          </div>
                        </div>
                        <CardTitle className="text-xl mt-2">{question.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="py-0">
                        <CardDescription className="line-clamp-2 mb-4">{question.content}</CardDescription>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${question.initials}`} />
                              <AvatarFallback>{question.initials}</AvatarFallback>
                            </Avatar>
                            <span className="text-gray-600">{question.author}</span>
                          </div>
                          <div className="flex items-center text-gray-500">
                            <Calendar size={14} className="mr-1" />
                            <span>{question.date}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-4">
                        <Button variant="ghost" className="w-full text-edu-secondary hover:bg-edu-secondary/10">
                          View Question
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                  
                {filteredQuestions.length === 0 && (
                  <div className="text-center py-12">
                    <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-medium mb-2">No questions found</h3>
                    <p className="text-gray-500">
                      Try adjusting your filters or search term to find what you're looking for.
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Questions;
