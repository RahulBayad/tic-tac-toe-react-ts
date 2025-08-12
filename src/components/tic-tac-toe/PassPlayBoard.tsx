import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, RotateCcw, User, Sun, Moon, Crown, Target, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/themeContext";

type Player = "X" | "O" | null;
type Board = Player[];

export const PassPlayBoard = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<Player>(null);
  const [isDraw, setIsDraw] = useState(false);
  const [lastMoveIndex, setLastMoveIndex] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  const checkWinner = (newBoard: Board): Player => {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        return newBoard[a];
      }
    }
    return null;
  };

  const handleCellClick = (index: number) => {
    if (board[index] || winner || isDraw) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setLastMoveIndex(index);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    } else if (newBoard.every(cell => cell !== null)) {
      setIsDraw(true);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
    setIsDraw(false);
    setLastMoveIndex(null);
  };

  const renderCell = (index: number) => {
    const cellValue = board[index];
    const isLastMove = lastMoveIndex === index;
    const isWinningCell = winner && winningCombinations.some(combo => 
      combo.includes(index) && combo.every(pos => board[pos] === winner)
    );

    return (
      <button
        key={index}
        className={`aspect-square bg-gradient-to-br from-card to-card/80 hover:from-muted/30 hover:to-muted/20 
        border-2 border-border/50 rounded-2xl flex items-center justify-center text-5xl font-black 
        transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed relative overflow-hidden
        ${isLastMove ? 'animate-cell-pop glow-primary' : ''}
        ${isWinningCell ? 'glow-destructive animate-pulse' : ''}
        ${cellValue ? 'shadow-lg' : 'hover:shadow-xl'}`}
        onClick={() => handleCellClick(index)}
        disabled={!!cellValue || !!winner || isDraw}
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
              onClick={() => navigate("/")}
              className="group bg-background/80 backdrop-blur-sm border-2 hover:border-primary/50 transition-all duration-300 shadow-lg"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Menu
            </Button>
            <Button 
              variant="outline" 
              onClick={resetGame}
              className="group bg-background/80 backdrop-blur-sm border-2 hover:border-primary/50 transition-all duration-300 shadow-lg"
            >
              <RotateCcw className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
              New Game
            </Button>
          </div>

          <div className="flex-1 grid lg:grid-cols-3 gap-8">
            {/* Players Info */}
            <Card className={`bg-background/80 backdrop-blur-sm border-2 shadow-xl transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-3">
                  <Target className="w-6 h-6 text-primary" />
                  Players
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground font-bold">X</span>
                    </div>
                    <span className="font-semibold">Player X</span>
                  </div>
                  <Badge variant={currentPlayer === "X" ? "default" : "secondary"} className="animate-pulse">
                    {currentPlayer === "X" ? "Your Turn" : "Waiting"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-destructive/10 to-destructive/5 border border-destructive/20">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-destructive rounded-full flex items-center justify-center">
                      <span className="text-destructive-foreground font-bold">O</span>
                    </div>
                    <span className="font-semibold">Player O</span>
                  </div>
                  <Badge variant={currentPlayer === "O" ? "default" : "secondary"} className="animate-pulse">
                    {currentPlayer === "O" ? "Your Turn" : "Waiting"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Game Board */}
            <Card className={`lg:col-span-2 bg-background/80 backdrop-blur-sm border-2 shadow-xl transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <CardHeader>
                <CardTitle className="text-center text-2xl">
                  {winner ? (
                    <div className="flex items-center justify-center gap-3">
                      <Crown className="w-8 h-8 text-yellow-500 animate-bounce" />
                      <span className="bg-gradient-to-r from-primary to-destructive bg-clip-text text-transparent font-black">
                        Player {winner} Wins!
                      </span>
                      <Crown className="w-8 h-8 text-yellow-500 animate-bounce delay-300" />
                    </div>
                  ) : isDraw ? (
                    <div className="flex items-center justify-center gap-3">
                      <Zap className="w-6 h-6 text-muted-foreground" />
                      <span className="text-muted-foreground font-bold">It's a Draw!</span>
                      <Zap className="w-6 h-6 text-muted-foreground" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${currentPlayer === "X" ? "bg-primary" : "bg-destructive"} animate-pulse`} />
                      <span className="font-bold">Current Turn: Player {currentPlayer}</span>
                      <div className={`w-3 h-3 rounded-full ${currentPlayer === "X" ? "bg-primary" : "bg-destructive"} animate-pulse delay-500`} />
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto p-4">
                  {Array.from({ length: 9 }, (_, index) => renderCell(index))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Game Status */}
          {(winner || isDraw) && (
            <Card className={`text-center bg-background/80 backdrop-blur-sm border-2 shadow-xl transition-all duration-1000 delay-600 mt-8 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <CardContent className="p-8">
                <p className="text-xl text-muted-foreground mb-6">
                  {winner ? `🎉 Congratulations! Player ${winner} wins! 🎉` : "🤝 Great game! It's a draw! 🤝"}
                </p>
                <Button 
                  onClick={resetGame} 
                  size="lg"
                  className="group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 hover:scale-105"
                >
                  <RotateCcw className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                  Play Again
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};