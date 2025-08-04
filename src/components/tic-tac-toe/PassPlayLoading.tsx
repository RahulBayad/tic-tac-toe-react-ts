import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { X, Loader2, Search } from "lucide-react";
import { useState, useEffect } from "react";

interface LoadingProps {
  onCancel: () => void;
}

export const PassPlayLoading = ({ onCancel }: LoadingProps) => {
  const [progress, setProgress] = useState(0);
  const [searchText, setSearchText] = useState("Initializing...");

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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted/20">
      <Card className="w-full max-w-md shadow-2xl border-2">
        <CardContent className="p-8 space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            
            <h2 className="text-2xl font-bold">Preparing Match</h2>
            <p className="text-muted-foreground">{searchText}</p>
          </div>

          {/* Progress */}
          <div className="space-y-3">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-center text-muted-foreground">
              {progress}% complete
            </p>
          </div>

          {/* Animation dots */}
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>

          {/* Cancel button */}
          <Button 
            variant="outline" 
            className="w-full"
            onClick={onCancel}
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};