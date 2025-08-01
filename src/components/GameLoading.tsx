import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Users, ArrowLeft } from "lucide-react";

interface GameLoadingProps {
  onCancel: () => void;
}

export const GameLoading = ({ onCancel }: GameLoadingProps) => {
  return (
    <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center">
            <Loader2 className="w-12 h-12 text-primary animate-spin-slow" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Finding Opponent</h2>
          <p className="text-muted-foreground">
            Searching for a worthy challenger...
          </p>
        </div>

        {/* Matchmaking Status */}
        <Card className="bg-gradient-card border-border/50 backdrop-blur-sm">
          <CardContent className="p-6 space-y-6">
            {/* Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-accent" />
                <span className="font-medium">Matchmaking Status</span>
              </div>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="text-accent font-medium">Searching...</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div className="h-full bg-gradient-accent animate-pulse" style={{ width: '60%' }} />
              </div>
            </div>

            {/* Tips */}
            <div className="bg-muted/30 rounded-lg p-4 space-y-2">
              <h4 className="font-medium text-sm">💡 Pro Tip</h4>
              <p className="text-xs text-muted-foreground">
                Control the center square early to maximize your winning chances!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Cancel Button */}
        <Button
          variant="outline"
          onClick={onCancel}
          className="w-full group hover:border-destructive/50 hover:text-destructive"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Cancel Search
        </Button>

        {/* Estimated Time */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Average wait time: <span className="text-accent font-medium">~30 seconds</span>
          </p>
        </div>
      </div>
    </div>
  );
};