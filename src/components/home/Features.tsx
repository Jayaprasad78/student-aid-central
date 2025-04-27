
import { FileText, MessageSquare, Users, BookOpen } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: FileText,
      title: "Study Materials",
      description: "Access course notes, presentations, and resources uploaded by instructors and peers."
    },
    {
      icon: MessageSquare,
      title: "Ask Questions",
      description: "Post academic questions and get answers from instructors and knowledgeable peers."
    },
    {
      icon: Users,
      title: "Real-time Chat",
      description: "Communicate with classmates and instructors through our integrated chat system."
    },
    {
      icon: BookOpen,
      title: "Organized Content",
      description: "Find what you need quickly with our categorized and searchable resource library."
    }
  ];

  return (
    <section className="py-16 px-6 bg-edu-light">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-edu-dark mb-4">Everything You Need to Succeed</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Student Aid Central provides all the tools and resources needed for academic excellence in one convenient platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="edu-card flex flex-col items-center text-center">
              <div className="bg-edu-primary/10 p-4 rounded-full mb-4">
                <feature.icon size={32} className="text-edu-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
