import { useState } from "react";
import { Landing } from "./tic-tac-toe/Landing";
import { Loading } from "./tic-tac-toe/Loading";
import { PassPlayBoard } from "./tic-tac-toe/PassPlayBoard";
import OnlineGameBoard from "./tic-tac-toe/OnlineGameBoard";

type GameState = "landing" | "loading" | "playing";
export type GameType = "PassAndPlay" | "Online"

export const TicTacToe = () => {
  const [gameState, setGameState] = useState<GameState>("landing");
  const [gameType, setGameType] = useState<GameType>("PassAndPlay");

  const handleStartGame = (gameType:GameType) => {
    setGameType(gameType)
    setGameState("loading");
    
    // Simulate finding opponent
    setTimeout(() => {
      setGameState("playing");
    }, 3000);
  };

  const handleBackToLanding = () => {
    setGameState("landing");
  };

  return (
    <div className="min-h-screen bg-background">
      {gameState === "landing" && <Landing onStartGame={handleStartGame} />}
      {gameState === "loading" && <Loading onCancel={handleBackToLanding} />}
      {gameState === "playing" && gameType === "PassAndPlay" && <PassPlayBoard onBackToLanding={handleBackToLanding} />}
      {gameState === "playing" && gameType === "Online" && <OnlineGameBoard onBackToLanding={handleBackToLanding} />}
    </div>
  );
};