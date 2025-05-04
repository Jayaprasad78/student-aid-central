
import { useState } from "react";
import AuthForm from "@/components/auth/AuthForm";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Register = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRegister = (data: any) => {
    // Handle registration logic here - in a real app, this would make an API call
    console.log("Registration attempt with:", data);
    
    // Show success message
    toast({
      title: "Registration submitted",
      description: "Your registration request has been submitted for admin approval.",
    });
    
    // Set submitted state to show the waiting message
    setIsSubmitted(true);
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
