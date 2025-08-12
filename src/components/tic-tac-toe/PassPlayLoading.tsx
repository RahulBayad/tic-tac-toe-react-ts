import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { X, Sun, Moon, Play, Zap, Target } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "@/contexts/themeContext";

export const PassPlayLoading = () => {
  const { theme, toggleTheme } = useTheme();
  const [progress, setProgress] = useState(0);
  const [searchText, setSearchText] = useState("Initializing...");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 60);

    const textInterval = setInterval(() => {
      setSearchText((prev) => {
        if (prev === "Initializing...") return "Loading assets...";
        if (prev === "Loading assets...") return "Almost there...";
        return "Finalizing...";
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, []);

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
        {[...Array(12)].map((_, i) => (
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
        <Card className={`w-full max-w-md shadow-2xl border-2 bg-background/80 backdrop-blur-sm transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <CardContent className="p-8 space-y-8">
            {/* Header */}
            <div className="text-center space-y-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl flex items-center justify-center mx-auto relative overflow-hidden">
                  <Play className="w-10 h-10 text-accent-foreground relative z-10" />
                  
                  {/* Rotating ring effect */}
                  <div className="absolute inset-0 border-2 border-accent/30 rounded-2xl animate-spin" style={{ animationDuration: '3s' }}></div>
                  <div className="absolute inset-1 border-2 border-accent/20 rounded-xl animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}></div>
                </div>
                
                {/* Floating icons */}
                <div className="absolute -top-2 -right-2 text-2xl animate-bounce">
                  <Target className="text-accent/60" />
                </div>
                <div className="absolute -bottom-2 -left-2 text-2xl animate-bounce delay-500">
                  <Zap className="text-primary/60" />
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-2">
                  Preparing Match
                </h2>
                <p className="text-muted-foreground text-lg">{searchText}</p>
              </div>
            </div>

            {/* Progress */}
            <div className="space-y-4">
              <div className="relative">
                <Progress value={progress} className="h-3 bg-muted/50" />
                <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full blur-sm"></div>
              </div>
              <p className="text-sm text-center text-muted-foreground font-medium">
                {progress}% complete
              </p>
            </div>

            {/* Enhanced Animation dots */}
            <div className="flex justify-center space-x-3">
              <div className="w-4 h-4 bg-accent rounded-full animate-bounce"></div>
              <div className="w-4 h-4 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-4 h-4 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-4 h-4 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
              <div className="w-4 h-4 bg-destructive rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>

            {/* Cancel button */}
            <Button 
              variant="outline" 
              className="w-full group bg-background/80 backdrop-blur-sm border-2 hover:border-accent/50 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <X className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
              Cancel
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};