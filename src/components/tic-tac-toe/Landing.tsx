import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Users, Trophy } from "lucide-react";
import type { GameType } from "./TicTacToe";
import { useSocket } from "@/hooks/useSocket";
import React, { useEffect } from "react";

interface LandingProps {
  onStartGame: (gameType:GameType) => void;
}

export const Landing = React.memo(({ onStartGame }: LandingProps) => {

  const socket = useSocket()
  console.log("landing", socket)

  useEffect(()=>{
    socket?.emit("hello", "Hii! Server, How are you?")
  },[socket])

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted/20">
      <div className="w-full max-w-4xl mx-auto text-center space-y-8">
        {/* Hero Section */}
        <div className="space-y-6">
          <div className="relative">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Tic Tac Toe
            </h1>
            <div className="absolute -top-4 -right-4 text-4xl hidden sm:block">⚡</div>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Challenge players from around the world in the classic game of strategy and skill
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader className="space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Online Multiplayer</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Play against real opponents from anywhere in the world
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader className="space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Competitive</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Track your wins and climb the leaderboards
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader className="space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Play className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Instant Play</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Quick matchmaking gets you into games fast
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="space-y-4 space-x-2">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            onClick={() => onStartGame("Online")}
          >
            {/* <Play className="w-5 h-5 mr-2" /> */}
            Find Opponent
          </Button>
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            onClick={() => onStartGame("PassAndPlay")}
          >
            Pass & Play
          </Button>
          <p className="text-sm text-muted-foreground">
            Free to play • No registration required
          </p>
        </div>
      </div>
    </div>
  );
})