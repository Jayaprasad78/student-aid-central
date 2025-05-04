
import { useState } from "react";
import AuthForm from "@/components/auth/AuthForm";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";

const Register = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (data: any) => {
    try {
      setError(null);
      
      // Create a new user in Supabase
      const { error: signupError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            role: 'student' // Default role for new users
          }
        }
      });
      
      if (signupError) throw signupError;
      
      // Show success message
      toast({
        title: "Registration submitted",
        description: "Your registration request has been submitted for admin approval.",
      });
      
      // Set submitted state to show the waiting message
      setIsSubmitted(true);
    } catch (error: any) {
      console.error("Registration error:", error);
      setError(error.message || "An error occurred during registration");
      toast({
        title: "Registration failed",
        description: error.message || "An error occurred during registration",
        variant: "destructive",
      });
    }
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
          {isSubmitted ? (
            <div className="w-full max-w-md">
              <Alert className="mb-6 bg-yellow-50 border-yellow-200">
                <AlertTitle className="text-yellow-800">Registration Pending Approval</AlertTitle>
                <AlertDescription className="text-yellow-700">
                  Your registration is being reviewed by an administrator. 
                  You will be able to log in once your account is approved.
                </AlertDescription>
              </Alert>
              <div className="text-center">
                <Link to="/login" className="text-edu-primary hover:underline">
                  Return to Login
                </Link>
              </div>
            </div>
          ) : (
            <>
              <AuthForm type="register" onSubmit={handleRegister} />
              {error && (
                <div className="mt-4 text-sm bg-red-50 p-4 rounded-md border border-red-200 max-w-md">
                  <p className="text-red-800 font-medium mb-1">Registration Error:</p>
                  <p className="text-red-700">{error}</p>
                </div>
              )}
              <div className="mt-4 text-sm bg-blue-50 p-4 rounded-md border border-blue-200 max-w-md">
                <p className="text-blue-800 font-medium mb-1">Important Note:</p>
                <p className="text-blue-700">
                  After registration, your account will need to be approved by an administrator before you can log in.
                </p>
              </div>
            </>
          )}
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>By registering, you agree to our <Link to="/terms" className="text-edu-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-edu-primary hover:underline">Privacy Policy</Link>.</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
