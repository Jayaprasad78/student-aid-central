
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-edu-primary to-edu-secondary text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join Student Aid Central?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
          Register today to access study materials, get answers to your questions, and connect with peers and instructors.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/register">
            <Button size="lg" className="bg-white text-edu-primary hover:bg-gray-100 font-medium">
              Register Now
            </Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
