import { useState, useEffect } from "react";
import { GameLanding } from "@/components/GameLanding";
import { GameLoading } from "@/components/GameLoading";
import { GameBoard } from "@/components/GameBoard";

type GameState = 'landing' | 'loading' | 'playing';

const Index = () => {
  const [gameState, setGameState] = useState<GameState>('landing');
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Simulate matchmaking process
  useEffect(() => {
    if (gameState === 'loading') {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          const newProgress = prev + Math.random() * 15;
          if (newProgress >= 100) {
            setGameState('playing');
            return 100;
          }
          return newProgress;
        });
      }, 800);

      return () => clearInterval(interval);
    }
  }, [gameState]);

  const handlePlayClick = () => {
    setGameState('loading');
    setLoadingProgress(0);
  };

  const handleCancelSearch = () => {
    setGameState('landing');
    setLoadingProgress(0);
  };

  const handleBackToLobby = () => {
    setGameState('landing');
    setLoadingProgress(0);
  };

  if (gameState === 'landing') {
    return <GameLanding onPlayClick={handlePlayClick} />;
  }

  if (gameState === 'loading') {
    return <GameLoading onCancel={handleCancelSearch} />;
  }

  return <GameBoard onBackToLobby={handleBackToLobby} />;
};

export default Index;
