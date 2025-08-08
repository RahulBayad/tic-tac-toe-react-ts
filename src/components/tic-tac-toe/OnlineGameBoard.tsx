import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, RotateCcw, User } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useSocket } from "@/hooks/useSocket";
import { OnlineGameLoading } from "./OnlineGameLoading";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { SocketProvider, type SocketResponse } from "@/contexts/socketContext";

type Player = "X" | "O" | null;
type Board = Player[];

export const OnlineGameBoard = () => {
  const tl = gsap.timeline();
  const navigate = useNavigate();
  const [countDown, setCountDown] = useState(60);
  const [game, setGame] = useState<SocketResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { socket, setSocket, disconnectSocket } = useSocket();
  console.log("socket", socket)
  console.log("loading", loading)

  const handleCellClick = (index: number) => {
    socket?.emit("make-move", {
      roomId: game?.roomId,
      position: index,
    });
  }

  const backToMainMenu = useCallback(() => {
    navigate("/");
    disconnectSocket();
  }, []);

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

    socket?.on("won", (res) => {
      setGame((prev) => {
        return {
          ...prev,
          gameState: res.gameState,
          winner: res.winner as string,
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

  // useGSAP(() => {
  //   tl.to(".timer-th1", { width: 24, duration: 7.5 });
  //   tl.to(".timer-r", { height: 48, duration: 15 });
  //   tl.to(".timer-b", { width: 48, duration: 15 });
  //   tl.to(".timer-l", { height: 48, duration: 15 });
  //   tl.to(".timer-th2", { width: 24, duration: 7.5 });
  // }, []);

  // useEffect(() => {
  //   const timerInterval = setInterval(() => {
  //     setCountDown((prev) => {
  //       if (prev > 0) {
  //         return prev - 1;
  //       }
  //       clearInterval(timerInterval);
  //       return 0;
  //     });
  //   }, 1000);

  //   return () => {
  //     clearInterval(timerInterval);
  //   };
  // }, []);

  if (loading) {
    return <OnlineGameLoading />;
  }

  return (
      <div className="min-h-screen p-4 bg-gradient-to-br from-background to-muted/20">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={backToMainMenu}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Menu
            </Button>
            {/* <Button variant="outline" onClick={resetGame}>
            <RotateCcw className="w-4 h-4 mr-2" />
            New Game
          </Button> */}
          </div>

          <div className=" gap-6">
            {/* Players Info */}
            <div className="flex justify-center mb-3">
              <div className="flex items-center gap-4">
                <div
                  className={`border-3 h-12 flex items-center p-2 px-4 rounded-sm
                  ${game?.playerTurn === socket?.id && "border-green-500"}
                `}
                >
                  <span className="text-nowrap">You (X)</span>
                </div>

                {/* <div className="timer h-12 w-12 border rounded-xs relative overflow-hidden flex items-center justify-center">
                <span className="">{countDown}</span>
                <span className="timer-th1 border-t-3 left-1/2 top-0 border-green-600 absolute h-6 w-0"></span>
                <span className="timer-r border-r-3 border-green-600 right-0 top-0 absolute h-0 w-0"></span>
                <span className="timer-b border-b-3 border-green-600 right-0 bottom-0 absolute h-12 w-0"></span>
                <span className="timer-l border-l-3 border-green-600 left-0 bottom-0 absolute h-0 w-0"></span>
                <span className="timer-th2 border-t-3 border-green-600 left-0 top-0 absolute h-6 w-0"></span>
              </div> */}
                <div
                  className={`border-3 border-gra-50 h-12 flex items-center p-2 px-4 rounded-sm
                  ${game?.playerTurn !== socket?.id && "border-green-500"}
                `}
                >
                  <span className="text-nowrap">Opponent (O)</span>
                </div>
              </div>
            </div>

            {/* Game Board */}
            <Card className="">
              <CardHeader>
                <CardTitle className="text-center">
                  {
                    game?.winner ? (
                      game?.winner === socket?.id ? (
                        <span className="text-2xl">🎉 You Win! 🎉</span>
                      ) : (
                        <span className="text-2xl">🤡 You Lost 🤡</span>
                      )
                    ) : (
                      ""
                    )
                    //  : isDraw ? (
                    //   <span className="text-2xl">🤝 It's a Draw! 🤝</span>
                    // )
                  
                  }
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
                  {Array.from({ length: 9 }, (_, index) => (
                    <button
                      key={index}
                      className={`aspect-square bg-card hover:bg-muted/50 border-2 border-border rounded-lg 
                    flex items-center justify-center text-4xl font-bold transition-all duration-200 
                    hover:scale-105 ${
                      !!game?.gameState[index] || !!game?.winner
                        ? "cursor-not-allowed "
                        : "cursor-pointer"
                    }`}
                      onClick={() => handleCellClick(index)}
                      disabled={!!game?.gameState[index] || !!game?.winner}
                    >
                      {game?.gameState[index] && (
                        <span
                          className={
                            game?.gameState[index] === "X"
                              ? "text-primary"
                              : "text-destructive"
                          }
                        >
                          {game?.gameState[index]}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Game Status */}
          {/* {(winner || isDraw) && (
          <Card className="text-center">
            <CardContent className="p-6">
              <p className="text-lg text-muted-foreground mb-4">
                {winner
                  ? `Congratulations! Player ${winner} wins!`
                  : "Great game! It's a draw!"}
              </p>
              <Button onClick={resetGame} size="lg">
                <RotateCcw className="w-4 h-4 mr-2" />
                Play Again
              </Button>
            </CardContent>
          </Card>
        )} */}
        </div>
      </div>
  );
};
