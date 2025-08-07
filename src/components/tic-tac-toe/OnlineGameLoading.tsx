import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useSocket } from "@/hooks/useSocket";
import { X, Loader2, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const OnlineGameLoading = () => {
  const [progress, setProgress] = useState(0);
  const socket = useSocket()
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 60);

    socket?.emit("findopponent")

    socket?.on("gameCreated",(res)=>{
      navigate("/play/online", {state : res})
    })

    return () => {
      clearInterval(interval);
    };
  }, []);

  

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted/20">
      <Card className="w-full max-w-md shadow-2xl border-2">
        <CardContent className="p-8 space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto relative">
              <Search className="w-8 h-8 text-primary" />
              <Loader2 className="w-6 h-6 text-primary absolute animate-spin" />
            </div>
            <h2 className="text-2xl font-bold">Finding Opponent</h2>
            <p className="text-muted-foreground">Searching for opponents...</p>
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
          >
            <X className="w-4 h-4 mr-2" />
            Cancel Search
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};