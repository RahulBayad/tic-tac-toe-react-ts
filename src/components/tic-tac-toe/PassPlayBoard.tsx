import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, RotateCcw, User } from "lucide-react";

interface GameBoardProps {
  onBackToLanding: () => void;
}

type Player = "X" | "O" | null;
type Board = Player[];

export const PassPlayBoard = () => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<Player>(null);
  const [isDraw, setIsDraw] = useState(false);

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
  };

  const renderCell = (index: number) => {
    const cellValue = board[index];
    return (
      <button
        key={index}
        className="aspect-square bg-card hover:bg-muted/50 border-2 border-border rounded-lg flex items-center justify-center text-4xl font-bold transition-all duration-200 hover:scale-105 disabled:cursor-not-allowed"
        onClick={() => handleCellClick(index)}
        disabled={!!cellValue || !!winner || isDraw}
      >
        {cellValue && (
          <span className={cellValue === "X" ? "text-primary" : "text-destructive"}>
            {cellValue}
          </span>
        )}
      </button>
    );
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-background to-muted/20">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={onBackToLanding}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Menu
          </Button>
          <Button variant="outline" onClick={resetGame}>
            <RotateCcw className="w-4 h-4 mr-2" />
            New Game
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Players Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="w-5 h-5" />
                Players
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">You (X)</span>
                <Badge variant={currentPlayer === "X" ? "default" : "secondary"}>
                  {currentPlayer === "X" ? "Your Turn" : "Waiting"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Opponent (O)</span>
                <Badge variant={currentPlayer === "O" ? "default" : "secondary"}>
                  {currentPlayer === "O" ? "Their Turn" : "Waiting"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Game Board */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-center">
                {winner ? (
                  <span className="text-2xl">
                    🎉 Player {winner} Wins! 🎉
                  </span>
                ) : isDraw ? (
                  <span className="text-2xl">🤝 It's a Draw! 🤝</span>
                ) : (
                  <span>Current Turn: Player {currentPlayer}</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
                {Array.from({ length: 9 }, (_, index) => renderCell(index))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Game Status */}
        {(winner || isDraw) && (
          <Card className="text-center">
            <CardContent className="p-6">
              <p className="text-lg text-muted-foreground mb-4">
                {winner ? `Congratulations! Player ${winner} wins!` : "Great game! It's a draw!"}
              </p>
              <Button onClick={resetGame} size="lg">
                <RotateCcw className="w-4 h-4 mr-2" />
                Play Again
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};