import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Home, AlertTriangle } from "lucide-react";
import { useTheme } from "@/contexts/themeContext";

const NotFound = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="h-screen w-screen relative overflow-hidden bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-destructive/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Theme Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-6 right-6 rounded-full w-12 h-12 bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-background/90 transition-all duration-300 z-50 shadow-lg"
        onClick={toggleTheme}
      >
        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </Button>

      <div className="relative z-10 h-full w-full flex items-center justify-center p-4">
        <div className={`text-center space-y-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* 404 Icon */}
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-destructive/20 to-destructive/10 rounded-3xl flex items-center justify-center mx-auto relative overflow-hidden border-2 border-destructive/30 shadow-xl">
              <AlertTriangle className="w-16 h-16 text-destructive relative z-10" />
              
              {/* Rotating ring effect */}
              <div className="absolute inset-0 border-2 border-destructive/30 rounded-3xl animate-spin" style={{ animationDuration: '4s' }}></div>
              <div className="absolute inset-2 border-2 border-destructive/20 rounded-2xl animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }}></div>
            </div>
          </div>

          {/* 404 Text */}
          <div className="space-y-4">
            <h1 className="text-8xl md:text-9xl font-black bg-gradient-to-r from-destructive via-destructive/80 to-primary bg-clip-text text-transparent animate-pulse">
              404
            </h1>
            <p className="text-2xl text-muted-foreground font-medium">
              Oops! Page not found
            </p>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              The page you're looking for seems to have wandered off into the digital void.
            </p>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <a href="/">
              <Button 
                size="lg"
                className="group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 hover:scale-105 text-lg px-8 py-6 shadow-xl"
              >
                <Home className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Return to Home
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;