import { useState } from "react";
import { Landing } from "./Landing";
import { PassPlayLoading } from "./PassPlayLoading";
import { PassPlayBoard } from "./PassPlayBoard";
import { OnlineGameBoard } from "./OnlineGameBoard";
import { OnlineGameLoading } from "./OnlineGameLoading";

type GameState = "home" | "loading" | "playing";
export type GameType = "PassAndPlay" | "Online"

export const TicTacToe = () => {
  const [gameState, setGameState] = useState<GameState>("home");
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
    setGameState("home");
  };

  return (
    <div className="min-h-screen bg-background">
      {gameState === "home" && <Landing onStartGame={handleStartGame} />}
      {gameState === "loading" && gameType === "Online" && <OnlineGameLoading onCancel={handleBackToLanding} />}
      {gameState === "loading" && gameType === "PassAndPlay" && <PassPlayLoading onCancel={handleBackToLanding} />}
      {gameState === "playing" && gameType === "PassAndPlay" && <PassPlayBoard onBackToLanding={handleBackToLanding} />}
      {gameState === "playing" && gameType === "Online" && <OnlineGameBoard  />}
      {/* <PassPlayLoading onCancel={handleBackToLanding} /> */}
    </div>
  );
};