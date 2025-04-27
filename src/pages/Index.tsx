
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import RecentUploads from "@/components/home/RecentUploads";
import RecentQuestions from "@/components/home/RecentQuestions";
import CallToAction from "@/components/home/CallToAction";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        <Features />
        <RecentUploads />
        <RecentQuestions />
        <CallToAction />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
