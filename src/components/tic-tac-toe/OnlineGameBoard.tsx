import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, RotateCcw, User, Sun, Moon, Crown, Target, Zap, Wifi, WifiOff } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useSocket } from "@/hooks/useSocket";
import { OnlineGameLoading } from "./OnlineGameLoading";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { SocketProvider, type SocketResponse } from "@/contexts/socketContext";
import { useTheme } from "@/contexts/themeContext";

type Player = "X" | "O" | null;
type Board = Player[];

export const OnlineGameBoard = () => {
  const tl = gsap.timeline();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [countDown, setCountDown] = useState(60);
  const [game, setGame] = useState<SocketResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const socketContext = useSocket();
  const socket = socketContext?.socket;
  const disconnectSocket = socketContext?.disconnectSocket;
  
  console.log("socket", socket)
  console.log("loading", loading)

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleCellClick = (index: number) => {
    // Only allow move if it's the current user's turn
    if (game?.playerTurn !== socket?.id) {
      return; // Not user's turn, ignore the click
    }
    
    socket?.emit("make-move", {
      roomId: game?.roomId,
      position: index,
    });
  }

  const backToMainMenu = useCallback(() => {
    navigate("/");
    disconnectSocket?.();
  }, [navigate, disconnectSocket]);

  useEffect(() => {
    socket?.on("gameCreated", (res: SocketResponse) => {
      console.log("game created");
      setGame({
        roomId: res?.roomId,
        currentMove: res?.currentMove,
        gameState: res?.gameState || [],
        playerTurn: res?.playerTurn,
        winner: res?.winner,
      });
      setLoading(false);
    });

    socket?.on("get-move", (res: SocketResponse) => {
      setGame(res);
      console.log("get move", res);
    });

    socket?.on("won", (res: { gameState: string[]; winner: string }) => {
      setGame((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          gameState: res.gameState,
          winner: res.winner,
        };
      });
      console.log("won", res);
    });

    return () => {
      socket?.off("gameCreated");
      socket?.off("won");
      socket?.off("get-move");
    };
  }, [socket]);

  if (loading) {
    return <OnlineGameLoading />;
  }

  const renderCell = (index: number) => {
    const cellValue = game?.gameState[index];
    const isWinningCell = game?.winner && winningCombinations.some(combo => 
      combo.includes(index) && combo.every(pos => game.gameState[pos] === game.winner)
    );

    return (
      <button
        key={index}
        className={`aspect-square bg-gradient-to-br from-card to-card/80 hover:from-muted/30 hover:to-muted/20 
        border-2 border-border/50 rounded-2xl flex items-center justify-center text-5xl font-black 
        transition-all duration-300 hover:scale-105 relative overflow-hidden
        ${isWinningCell ? 'glow-destructive animate-pulse' : ''}
        ${!!cellValue || !!game?.winner || game?.playerTurn !== socket?.id
          ? "cursor-not-allowed opacity-60" 
          : "cursor-pointer hover:shadow-xl"
        }
        ${cellValue ? 'shadow-lg' : ''}`}
        onClick={() => handleCellClick(index)}
        disabled={!!cellValue || !!game?.winner || game?.playerTurn !== socket?.id}
      >
        {/* Background glow effect */}
        {cellValue && (
          <div className={`absolute inset-0 rounded-2xl opacity-20 ${
            cellValue === "X" ? 'bg-primary' : 'bg-destructive'
          }`} />
        )}
        
        {cellValue && (
          <span className={`relative z-10 ${
            cellValue === "X" 
              ? "text-primary drop-shadow-lg" 
              : "text-destructive drop-shadow-lg"
          }`}>
            {cellValue}
          </span>
        )}
        
        {/* Hover effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
      </button>
    );
  };

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  return (
    <div className="h-screen w-screen relative overflow-hidden bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-destructive/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
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

      <div className="relative z-10 h-full w-full p-6">
        <div className="h-full max-w-6xl mx-auto flex flex-col">
          {/* Header */}
          <div className={`flex items-center justify-between mb-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            <Button 
              variant="outline" 
              onClick={backToMainMenu}
              className="group bg-background/80 backdrop-blur-sm border-2 hover:border-primary/50 transition-all duration-300 shadow-lg"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Menu
            </Button>
            
            {/* Connection Status */}
            <div className="flex items-center gap-2">
              {socket?.connected ? (
                <div className="flex items-center gap-2 text-green-500 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                  <Wifi className="w-4 h-4" />
                  <span className="text-sm font-medium">Connected</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-500 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
                  <WifiOff className="w-4 h-4" />
                  <span className="text-sm font-medium">Disconnected</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 space-y-8">
            {/* Players Info */}
            <div className={`flex justify-center transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex items-center gap-6 p-4 bg-background/80 backdrop-blur-sm border-2 rounded-2xl shadow-xl">
                <div className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                  game?.playerTurn === socket?.id 
                    ? "bg-gradient-to-r from-primary/20 to-primary/10 border-2 border-primary/50 shadow-lg" 
                    : "bg-gradient-to-r from-muted/20 to-muted/10 border-2 border-border/50"
                }`}>
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-lg">X</span>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">You</div>
                    <div className="text-xs text-muted-foreground">Player X</div>
                  </div>
                  {game?.playerTurn === socket?.id && (
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                  )}
                </div>

                <div className="text-2xl font-bold text-muted-foreground">VS</div>

                <div className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                  game?.playerTurn !== socket?.id 
                    ? "bg-gradient-to-r from-destructive/20 to-destructive/10 border-2 border-destructive/50 shadow-lg" 
                    : "bg-gradient-to-r from-muted/20 to-muted/10 border-2 border-border/50"
                }`}>
                  {game?.playerTurn !== socket?.id && (
                    <div className="w-3 h-3 bg-destructive rounded-full animate-pulse" />
                  )}
                  <div className="w-10 h-10 bg-destructive rounded-full flex items-center justify-center">
                    <span className="text-destructive-foreground font-bold text-lg">O</span>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">Opponent</div>
                    <div className="text-xs text-muted-foreground">Player O</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Game Board */}
            <Card className={`bg-transparent border-none transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <CardHeader>
                <CardTitle className="text-center text-2xl">
                  {game?.winner ? (
                    <div className="flex items-center justify-center gap-3">
                      <Crown className="w-8 h-8 text-yellow-500 animate-bounce" />
                      <span className="bg-gradient-to-r from-primary to-destructive bg-clip-text text-transparent font-black">
                        {game?.winner === socket?.id ? "You Win!" : "You Lost!"}
                      </span>
                      <Crown className="w-8 h-8 text-yellow-500 animate-bounce delay-300" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${game?.playerTurn === socket?.id ? "bg-primary" : "bg-destructive"} animate-pulse`} />
                      <span className="font-bold">
                        {game?.playerTurn === socket?.id ? "Your Turn" : "Opponent's Turn"}
                      </span>
                      <div className={`w-3 h-3 rounded-full ${game?.playerTurn === socket?.id ? "bg-primary" : "bg-destructive"} animate-pulse delay-500`} />
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3  gap-4 max-w-sm mx-auto p-4">
                  {Array.from({ length: 9 }, (_, index) => renderCell(index))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
