
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // For demo purposes, simulate login
    setTimeout(() => {
      setIsLoading(false);
      // Demo credentials: user@example.com / password
      if (email === 'user@example.com' && password === 'password') {
        toast({
          title: "Login successful",
          description: "You've been logged in successfully.",
        });
        navigate('/');
      } else {
        toast({
          title: "Login failed",
          description: "Please check your credentials and try again.",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="animate-fade-in">
          <div className="glass-card p-8 rounded-2xl backdrop-blur-lg">
            <div className="flex flex-col items-center space-y-2 mb-8">
              <div className="text-center">
                <Link to="/" className="text-2xl font-medium tracking-tight transition-all duration-300 hover:text-primary">
                  <span className="text-primary">Minimal</span>CMS
                </Link>
                <p className="text-sm text-muted-foreground mt-2">Sign in to your account</p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="glass-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="password">
                    Password
                  </label>
                  <Link to="/forgot-password" className="text-xs text-primary hover:text-primary/90">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  className="glass-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full py-5 transition-all duration-200 hover:bg-primary/90 scale-hover"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
              
              <div className="text-center text-sm">
                <span className="text-muted-foreground">Don't have an account?</span>{' '}
                <Link to="/signup" className="text-primary hover:text-primary/90 font-medium">
                  Sign up
                </Link>
              </div>
              
              <div className="mt-6 text-center text-xs text-muted-foreground">
                <p>
                  Demo credentials: user@example.com / password
                </p>
              </div>
            </form>
          </div>
          
          <div className="mt-4 text-center text-xs text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} MinimalCMS. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
