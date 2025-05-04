import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Search, Calendar, User, Loader } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { supabase } from "@/integrations/supabase/client";

interface Question {
  id: string;
  title: string;
  content: string;
  category: string;
  created_at: string;
  author: {
    id: string;
    first_name: string | null;
    last_name: string | null;
    email: string;
  };
  replies: number;
  views: number;
  solved: boolean;
}

// Mock data for questions
const mockQuestions = [
  {
    id: 1,
    title: "How do I implement a binary search tree in Python?",
    content: "I'm trying to create a binary search tree implementation in Python but I'm having trouble with the insertion method. Can someone explain the logic step by step?",
    category: "Computer Science",
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    author: {
      id: "a1",
      first_name: "Alex",
      last_name: "Johnson",
      email: "alex.j@example.com"
    },
    replies: 3,
    views: 24,
    solved: false
  },
  {
    id: 2,
    title: "Explanation of the Second Law of Thermodynamics",
    content: "Can someone explain in simple terms what the Second Law of Thermodynamics means and how it applies to everyday scenarios? I'm struggling to understand the concept.",
    category: "Physics",
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    author: {
      id: "a2",
      first_name: "Maria",
      last_name: "Rodriguez",
      email: "maria.r@example.com"
    },
    replies: 2,
    views: 18,
    solved: true
  },
  {
    id: 3,
    title: "Solving this calculus problem",
    content: "I'm stuck on this integration problem: ∫(x²+3x+2)/(x+1) dx. Can anyone help me solve this step by step?",
    category: "Mathematics",
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    author: {
      id: "a3",
      first_name: "David",
      last_name: "Chen",
      email: "david.c@example.com"
    },
    replies: 5,
    views: 42,
    solved: true
  },
  {
    id: 4,
    title: "Shakespeare's use of symbolism in Hamlet",
    content: "I need help identifying and analyzing the major symbols in Shakespeare's Hamlet for my literature assignment. Particularly interested in how they relate to the themes of mortality and madness.",
    category: "Literature",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    author: {
      id: "a4",
      first_name: "Emily",
      last_name: "Wilson",
      email: "emily.w@example.com"
    },
    replies: 4,
    views: 31,
    solved: false
  },
  {
    id: 5,
    title: "Help understanding RNA transcription",
    content: "I'm confused about the process of RNA transcription, particularly how the RNA polymerase knows where to start and stop. Could someone clarify this biological mechanism?",
    category: "Biology",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    author: {
      id: "a5",
      first_name: "Michael",
      last_name: "Park",
      email: "michael.p@example.com"
    },
    replies: 6,
    views: 37,
    solved: true
  },
  {
    id: 6,
    title: "Using React Hooks effectively",
    content: "I'm new to React and trying to understand when to use useState vs useEffect. Can someone provide examples of proper use cases for each?",
    category: "Computer Science",
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    author: {
      id: "a6",
      first_name: "Sophia",
      last_name: "Garcia",
      email: "sophia.g@example.com"
    },
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
  const { user } = useRequireAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [showSolved, setShowSolved] = useState("all");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (user) {
      fetchQuestions();
    }
  }, [user]);
  
  const fetchQuestions = async () => {
    try {
      // In a real app, this would fetch questions from Supabase
      // For now, we'll use mock data
      const mockQuestions = [
        {
          id: "1",
          title: "How do I implement a binary search tree in Python?",
          content: "I'm trying to create a binary search tree implementation in Python but I'm having trouble with the insertion method. Can someone explain the logic step by step?",
          category: "Computer Science",
          created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
          author: {
            id: "a1",
            first_name: "Alex",
            last_name: "Johnson",
            email: "alex.j@example.com"
          },
          replies: 3,
          views: 24,
          solved: false
        },
        {
          id: "2",
          title: "Explanation of the Second Law of Thermodynamics",
          content: "Can someone explain in simple terms what the Second Law of Thermodynamics means and how it applies to everyday scenarios? I'm struggling to understand the concept.",
          category: "Physics",
          created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
          author: {
            id: "a2",
            first_name: "Maria",
            last_name: "Rodriguez",
            email: "maria.r@example.com"
          },
          replies: 2,
          views: 18,
          solved: true
        },
        // ... keep existing mock questions
      ];
      
      setQuestions(mockQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error);
      toast({
        title: "Error",
        description: "Failed to load questions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Filter questions based on search, category, and solved status
  const filteredQuestions = questions.filter((question) => {
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
            <Link to="/questions/create">
              <Button className="bg-edu-primary hover:bg-edu-secondary">
                <MessageSquare size={16} className="mr-2" />
                Ask a Question
              </Button>
            </Link>
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
              
              {loading ? (
                <div className="text-center py-12">
                  <Loader size={48} className="mx-auto text-gray-300 mb-4 animate-spin" />
                  <h3 className="text-lg font-medium">Loading questions...</h3>
                </div>
              ) : (
                <>
                  <TabsContent value="recent" className="mt-0 space-y-4">
                    {filteredQuestions.length > 0 ? (
                      filteredQuestions.map((question) => (
                        <QuestionCard key={question.id} question={question} />
                      ))
                    ) : (
                      <EmptyState />
                    )}
                  </TabsContent>
                  
                  <TabsContent value="popular" className="mt-0 space-y-4">
                    {filteredQuestions.length > 0 ? (
                      [...filteredQuestions]
                        .sort((a, b) => b.views - a.views)
                        .map((question) => (
                          <QuestionCard key={question.id} question={question} />
                        ))
                    ) : (
                      <EmptyState />
                    )}
                  </TabsContent>
                </>
              )}
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

const QuestionCard = ({ question }: { question: Question }) => {
  const initials = `${question.author.first_name?.[0] || ''}${question.author.last_name?.[0] || ''}`;
  
  return (
    <Card className="hover:shadow-md transition-shadow">
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
              <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${initials}`} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <span className="text-gray-600">{question.author.first_name} {question.author.last_name}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <Calendar size={14} className="mr-1" />
            <span>{new Date(question.created_at).toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-4">
        <Button variant="ghost" className="w-full text-edu-secondary hover:bg-edu-secondary/10">
          View Question
        </Button>
      </CardFooter>
    </Card>
  );
};

const EmptyState = () => (
  <div className="text-center py-12">
    <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
    <h3 className="text-xl font-medium mb-2">No questions found</h3>
    <p className="text-gray-500">
      Try adjusting your filters or search term to find what you're looking for.
    </p>
  </div>
);

export default Questions;
