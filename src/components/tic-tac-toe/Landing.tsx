import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Users, Trophy, Sun, Moon, Sparkles, Zap, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/themeContext";
import { useEffect, useState } from "react";

export const Landing = () => {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen w-screen pt-6 relative overflow-x-hidden bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-destructive/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
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
        <div className="w-full max-w-6xl mx-auto text-center space-y-12">
          {/* Hero Section with Enhanced Animation */}
          <div className={`space-y-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative">
              {/* Glowing Effect Behind Title */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-destructive/20 blur-3xl rounded-full"></div>
              
              <h1 className="relative text-7xl md:text-9xl font-black bg-gradient-to-r from-primary via-primary/80 to-destructive bg-clip-text text-transparent animate-pulse">
                TIC TAC TOE
              </h1>
              
              {/* Animated Icons Stars */}
              <div className="absolute -top-6 -right-6 text-5xl animate-bounce">
                <Sparkles className="text-primary" />
              </div>
              <div className="absolute -bottom-6 left-2 text-5xl animate-bounce delay-500">
                <Zap className="text-destructive" />
              </div>
            </div>
            
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Experience the ultimate <span className="text-primary font-semibold">battle of wits</span> in this modern take on the classic game. 
              Challenge players worldwide or test your skills locally!
            </p>
          </div>

          {/* Enhanced Features Grid */}
          <div className={`grid md:grid-cols-3 gap-8 max-w-4xl mx-auto transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Card className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-500 hover:scale-105 bg-background/80 backdrop-blur-sm shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="space-y-4 relative">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold">Global Multiplayer</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Connect with players from around the world in real-time battles
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-500 hover:scale-105 bg-background/80 backdrop-blur-sm shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="space-y-4 relative">
                <div className="w-16 h-16 bg-gradient-to-br from-destructive/20 to-destructive/10 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Trophy className="w-8 h-8 text-destructive" />
                </div>
                <CardTitle className="text-xl font-bold">Competitive</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Climb the leaderboards and prove your strategic dominance
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-500 hover:scale-105 bg-background/80 backdrop-blur-sm shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="space-y-4 relative">
                <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-8 h-8 text-accent-foreground" />
                </div>
                <CardTitle className="text-xl font-bold">Instant Play</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Lightning-fast matchmaking gets you into action immediately
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced CTA Section */}
          <div className={`space-y-6 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="group relative text-xl px-10 py-8 rounded-2xl shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 overflow-hidden"
                onClick={()=> navigate("/play/online")}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center gap-3">
                  <Play className="w-6 h-6" />
                  Find Opponent
                </span>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="group relative text-xl px-10 py-8 rounded-2xl shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105 border-2 hover:border-primary/50 overflow-hidden bg-background/80 backdrop-blur-sm"
                onClick={()=> navigate("/play/pass-play")}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center gap-3">
                  <Users className="w-6 h-6" />
                  Pass & Play
                </span>
              </Button>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span>Free to play • No registration required</span>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-500"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}