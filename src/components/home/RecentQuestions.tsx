
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, User, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data for recent questions
const recentQuestions = [
  {
    id: 1,
    title: "How do I implement a binary search tree in Python?",
    preview: "I'm trying to create a binary search tree implementation in Python but I'm having trouble with the insertion method...",
    category: "Computer Science",
    date: "2 hours ago",
    author: "Alex Johnson",
    initials: "AJ",
    replies: 3,
  },
  {
    id: 2,
    title: "Explanation of the Second Law of Thermodynamics",
    preview: "Can someone explain in simple terms what the Second Law of Thermodynamics means and how it applies to...",
    category: "Physics",
    date: "5 hours ago",
    author: "Maria Rodriguez",
    initials: "MR",
    replies: 2,
  },
  {
    id: 3,
    title: "Solving this calculus problem",
    preview: "I'm stuck on this integration problem: ∫(x²+3x+2)/(x+1) dx. Can anyone help me solve this step by step?",
    category: "Mathematics",
    date: "Yesterday",
    author: "David Chen",
    initials: "DC",
    replies: 5,
  }
];

const RecentQuestions = () => {
  return (
    <section className="py-16 px-6 bg-edu-light">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-edu-dark">Recent Questions</h2>
          <Link to="/questions">
            <Button variant="outline" className="border-edu-primary text-edu-primary hover:bg-edu-primary hover:text-white">
              View All Questions
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentQuestions.map((question) => (
            <Card key={question.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge className="bg-edu-secondary text-white mb-2">{question.category}</Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <MessageSquare size={14} className="mr-1" />
                    <span>{question.replies} replies</span>
                  </div>
                </div>
                <CardTitle className="text-lg">{question.title}</CardTitle>
                <CardDescription className="line-clamp-2">{question.preview}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-sm mt-4">
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
              <CardFooter className="pt-0">
                <Button variant="ghost" className="w-full text-edu-primary hover:bg-edu-primary/10">
                  View Question
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentQuestions;
