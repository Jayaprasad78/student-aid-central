
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, User, Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface AuthFormProps {
  type: "login" | "register";
  onSubmit: (data: any) => void;
}

const AuthForm = ({ type, onSubmit }: AuthFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };
    
    // Validate name for registration
    if (type === "register" && !formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }
    
    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }
    
    // Validate confirm password for registration
    if (type === "register" && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      
      // Show success toast
      if (type === "login") {
        toast({
          title: "Login Successful",
          description: "Welcome back to Student Aid Central!",
        });
      } else {
        toast({
          title: "Registration Submitted",
          description: "Your registration will be reviewed by an administrator.",
        });
      }
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-center mb-4">
          <div className="bg-edu-primary/10 p-3 rounded-full">
            {type === "login" ? (
              <LogIn size={28} className="text-edu-primary" />
            ) : (
              <User size={28} className="text-edu-primary" />
            )}
          </div>
        </div>
        <CardTitle className="text-center text-2xl">
          {type === "login" ? "Welcome Back" : "Create Account"}
        </CardTitle>
        <CardDescription className="text-center">
          {type === "login" 
            ? "Enter your credentials to access your account" 
            : "Register for a new account to get started"
          }
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {type === "register" && (
            <div className="space-y-1">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`pl-10 ${errors.name ? 'border-red-500' : ''}`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
          )}
          
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <Input 
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <Input 
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className={`pl-10 ${errors.password ? 'border-red-500' : ''}`}
                placeholder="Enter your password"
              />
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          
          {type === "register" && (
            <div className="space-y-1">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input 
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`pl-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  placeholder="Confirm your password"
                />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>
          )}
          
          {type === "login" && (
            <div className="text-right">
              <Link to="/forgot-password" className="text-sm text-edu-primary hover:underline">
                Forgot password?
              </Link>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex-col space-y-4">
          <Button type="submit" className="w-full bg-edu-primary hover:bg-edu-secondary">
            {type === "login" ? "Login" : "Register"}
          </Button>
          
          <div className="text-center text-sm">
            {type === "login" ? (
              <>
                Don't have an account?{" "}
                <Link to="/register" className="text-edu-primary hover:underline font-medium">
                  Register
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link to="/login" className="text-edu-primary hover:underline font-medium">
                  Login
                </Link>
              </>
            )}
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AuthForm;
