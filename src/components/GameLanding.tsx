import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Zap, Trophy } from "lucide-react";

interface GameLandingProps {
  onPlayClick: () => void;
}

export const GameLanding = ({ onPlayClick }: GameLandingProps) => {
  return (
    <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 animate-fade-in">
        {/* Title */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Zap className="w-8 h-8 text-accent animate-pulse" />
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              TIC TAC TOE
            </h1>
            <Zap className="w-8 h-8 text-accent animate-pulse" />
          </div>
          <p className="text-muted-foreground text-lg">
            Challenge players worldwide in the ultimate strategy game
          </p>
        </div>

        {/* Game Info Card */}
        <Card className="bg-gradient-card border-border/50 backdrop-blur-sm">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Trophy className="w-5 h-5 text-accent" />
              <span className="font-medium">Online Multiplayer</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Get matched with players of similar skill level for competitive gameplay
            </div>
          </CardContent>
        </Card>

        {/* Play Button */}
        <div className="space-y-4">
          <Button
            variant="gaming"
            size="xl"
            onClick={onPlayClick}
            className="w-full group relative overflow-hidden"
          >
            <Play className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform" />
            FIND MATCH
            <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-20 transition-opacity" />
          </Button>
          
          <p className="text-xs text-center text-muted-foreground">
            Click to start matchmaking
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="text-center space-y-2">
            <div className="w-8 h-8 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-primary">⚡</span>
            </div>
            <p className="text-xs text-muted-foreground">Fast Matches</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-8 h-8 mx-auto bg-accent/20 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-accent">🏆</span>
            </div>
            <p className="text-xs text-muted-foreground">Ranked Play</p>
          </div>
        </div>
      </div>
    </div>
  );
};