import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, RotateCcw, Crown } from "lucide-react";

type Player = 'X' | 'O' | null;
type Board = Player[];

interface GameBoardProps {
  onBackToLobby: () => void;
}

export const GameBoard = ({ onBackToLobby }: GameBoardProps) => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<Player | 'tie'>(null);
  const [winningLine, setWinningLine] = useState<number[]>([]);
  const [gameStarted, setGameStarted] = useState(false);

  // Start game animation
  useEffect(() => {
    const timer = setTimeout(() => setGameStarted(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const winningPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  const checkWinner = (board: Board): { winner: Player | 'tie', line: number[] } => {
    for (const pattern of winningPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], line: pattern };
      }
    }
    
    if (board.every(cell => cell !== null)) {
      return { winner: 'tie', line: [] };
    }
    
    return { winner: null, line: [] };
  };

  const handleCellClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result.winner) {
      setWinner(result.winner);
      setWinningLine(result.line);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setWinningLine([]);
  };

  const getCellContent = (player: Player) => {
    if (!player) return '';
    return player === 'X' ? '✗' : '○';
  };

  const getCellStyles = (index: number, player: Player) => {
    const baseStyles = "w-20 h-20 text-3xl font-bold rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center border-2";
    
    if (!player) {
      return `${baseStyles} border-game-grid bg-card hover:bg-muted cursor-pointer`;
    }
    
    const isWinning = winningLine.includes(index);
    const playerColor = player === 'X' ? 'text-game-player-x' : 'text-game-player-o';
    const winningStyle = isWinning ? 'animate-winner-flash shadow-glow-winner border-game-winner' : '';
    
    return `${baseStyles} ${playerColor} border-current bg-card/80 ${winningStyle}`;
  };

  return (
    <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4">
      <div className="max-w-lg w-full space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={onBackToLobby}
            className="hover:bg-muted"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <Badge variant="outline" className="px-4 py-2">
            Game in Progress
          </Badge>
        </div>

        {/* Game Status */}
        <Card className="bg-gradient-card border-border/50">
          <CardHeader className="text-center pb-4">
            <CardTitle className="flex items-center justify-center gap-2">
              {winner ? (
                winner === 'tie' ? (
                  <>🤝 It's a Tie!</>
                ) : (
                  <>
                    <Crown className="w-5 h-5 text-game-winner" />
                    Player {winner} Wins!
                  </>
                )
              ) : (
                <>Current Turn: Player {currentPlayer}</>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-game-player-x text-xl">✗</span>
                <span>Player X</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-game-player-o text-xl">○</span>
                <span>Player O</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Game Board */}
        <div className={`transition-all duration-1000 ${gameStarted ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
          <Card className="bg-gradient-card border-border/50 p-6">
            <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
              {board.map((player, index) => (
                <button
                  key={index}
                  onClick={() => handleCellClick(index)}
                  className={getCellStyles(index, player)}
                  disabled={!!player || !!winner}
                >
                  <span className={`animate-scale-in ${player ? 'opacity-100' : 'opacity-0'}`}>
                    {getCellContent(player)}
                  </span>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Game Controls */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={resetGame}
            className="flex-1"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            New Game
          </Button>
          
          {winner && (
            <Button
              variant="gaming"
              onClick={resetGame}
              className="flex-1"
            >
              Play Again
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};