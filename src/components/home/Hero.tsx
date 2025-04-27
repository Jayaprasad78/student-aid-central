
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-edu-primary to-edu-secondary text-white py-20 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="order-2 md:order-1">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your Academic Success Starts Here
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white/90">
            Access course materials, get answers to your questions, and connect with peers and instructors in one centralized platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/register">
              <Button size="lg" className="bg-white text-edu-primary hover:bg-gray-100 font-medium">
                Get Started
              </Button>
            </Link>
            <Link to="/materials">
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                Browse Materials
              </Button>
            </Link>
          </div>
        </div>
        <div className="order-1 md:order-2 flex justify-center md:justify-end">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&h=500" 
            alt="Students collaborating" 
            className="rounded-lg shadow-xl max-w-full md:max-w-md h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
