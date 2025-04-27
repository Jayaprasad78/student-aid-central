
import AuthForm from "@/components/auth/AuthForm";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

const Login = () => {
  const handleLogin = (data: any) => {
    // Handle login logic here - in a real app, this would make an API call
    console.log("Login attempt with:", data);
  };

  return (
    <div className="min-h-screen flex flex-col bg-edu-light">
      <div className="container mx-auto py-8 px-6 flex-1 flex flex-col">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-2xl font-bold text-edu-primary">
            <BookOpen size={32} />
            <span>Student Aid Central</span>
          </Link>
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <AuthForm type="login" onSubmit={handleLogin} />
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>By logging in, you agree to our <Link to="/terms" className="text-edu-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-edu-primary hover:underline">Privacy Policy</Link>.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
