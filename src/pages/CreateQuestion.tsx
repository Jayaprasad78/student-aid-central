
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const CreateQuestion = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validation
    if (!title || !content || !category) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    
    // In a real app, this would make an API call to submit the question
    setTimeout(() => {
      console.log("Submitting question:", { title, content, category, attachment });
      toast({
        title: "Question posted successfully",
        description: "Your question has been posted and is now visible to others.",
      });
      setIsSubmitting(false);
      navigate("/questions");
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="bg-edu-secondary py-12 px-6">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-white mb-4">Post a Question</h1>
            <p className="text-white/90 max-w-2xl">
              Ask academic questions to get help from instructors and peers.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto py-8 px-6">
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Create New Question</CardTitle>
              <CardDescription>
                Be specific and provide details to help others give you better answers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Question Title</Label>
                  <Input 
                    id="title" 
                    placeholder="e.g., How do I solve this calculus problem?" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="physics">Physics</SelectItem>
                      <SelectItem value="chemistry">Chemistry</SelectItem>
                      <SelectItem value="biology">Biology</SelectItem>
                      <SelectItem value="computer-science">Computer Science</SelectItem>
                      <SelectItem value="literature">Literature</SelectItem>
                      <SelectItem value="history">History</SelectItem>
                      <SelectItem value="languages">Languages</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content">Question Details</Label>
                  <Textarea 
                    id="content" 
                    placeholder="Describe your question in detail..." 
                    className="min-h-[200px]"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="attachment">Attachment (optional)</Label>
                  <Input 
                    id="attachment" 
                    type="file" 
                    onChange={handleFileChange}
                  />
                  <p className="text-sm text-gray-500">
                    You can attach images, PDFs, or other documents to help explain your question.
                  </p>
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="mr-2"
                    onClick={() => navigate("/questions")}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-edu-secondary hover:bg-edu-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Posting..." : "Post Question"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateQuestion;
