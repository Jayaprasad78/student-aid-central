
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  MessageSquare, 
  FileText, 
  LogIn, 
  Menu, 
  X,
  User
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth, useNavigate, useToast } from "@/hooks";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: 'Success',
        description: 'Logged out successfully',
      });
      navigate('/login');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to log out',
        variant: 'destructive',
      });
    }
  };

  const navLinks = [
    { name: "Home", path: "/", icon: BookOpen },
    { name: "Materials", path: "/materials", icon: FileText },
    { name: "Questions", path: "/questions", icon: MessageSquare },
  ];

  return (
    <nav className="bg-edu-primary py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-2xl flex items-center gap-2">
          <BookOpen size={24} />
          <span>Student Aid Central</span>
        </Link>
        
        {isMobile ? (
          <>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white" 
              onClick={toggleMenu}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
            
            {isOpen && (
              <div className="fixed inset-0 top-16 z-50 bg-white p-4 animate-fade-in">
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.name}
                      to={link.path}
                      className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md"
                      onClick={() => setIsOpen(false)}
                    >
                      <link.icon size={20} className="text-edu-primary" />
                      <span>{link.name}</span>
                    </Link>
                  ))}
                  <hr className="my-2" />
                  <Link 
                    to="/login"
                    className="flex items-center justify-center gap-2 bg-edu-secondary text-white p-2 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    <LogIn size={20} />
                    <span>Login</span>
                  </Link>
                  <Link 
                    to="/register"
                    className="flex items-center justify-center gap-2 bg-white border border-edu-secondary text-edu-secondary p-2 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    <User size={20} />
                    <span>Register</span>
                  </Link>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path}
                className="text-white flex items-center gap-1 hover:text-edu-accent transition-colors"
              >
                <link.icon size={18} />
                <span>{link.name}</span>
              </Link>
            ))}
            <div className="ml-6 flex items-center gap-2">
              {user ? (
                <Button variant="secondary" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <Link to="/login">
                  <Button variant="secondary" size="sm" className="bg-white text-edu-primary hover:bg-gray-100">
                    <LogIn size={16} className="mr-1" />
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
