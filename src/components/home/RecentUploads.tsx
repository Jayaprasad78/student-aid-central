
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Mock data for recent uploads
const recentMaterials = [
  {
    id: 1,
    title: "Introduction to Computer Science",
    description: "Foundational concepts in computing and programming",
    type: "PDF",
    category: "Computer Science",
    date: "Apr 20, 2025",
  },
  {
    id: 2,
    title: "Calculus I Study Guide",
    description: "Comprehensive review of limits, derivatives and integrals",
    type: "PDF",
    category: "Mathematics",
    date: "Apr 18, 2025",
  },
  {
    id: 3,
    title: "Organic Chemistry Lab Notes",
    description: "Detailed notes for the semester's lab experiments",
    type: "Document",
    category: "Chemistry",
    date: "Apr 15, 2025",
  },
  {
    id: 4,
    title: "World History Timeline",
    description: "Visual timeline of major historical events",
    type: "Presentation",
    category: "History",
    date: "Apr 12, 2025",
  },
];

const RecentUploads = () => {
  return (
    <section className="py-16 px-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-edu-dark">Recently Added Materials</h2>
          <Link to="/materials">
            <Button variant="outline" className="border-edu-primary text-edu-primary hover:bg-edu-primary hover:text-white">
              View All Materials
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentMaterials.map((material) => (
            <Card key={material.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge className="bg-edu-accent text-edu-dark mb-2">{material.type}</Badge>
                  <Badge variant="outline" className="text-xs">{material.category}</Badge>
                </div>
                <CardTitle className="text-lg">{material.title}</CardTitle>
                <CardDescription className="line-clamp-2">{material.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center text-sm text-gray-500 mt-2">
                  <Calendar size={14} className="mr-1" />
                  <span>{material.date}</span>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="ghost" className="w-full text-edu-primary hover:bg-edu-primary/10 flex items-center justify-center gap-2">
                  <FileText size={16} />
                  <span>View Material</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentUploads;
