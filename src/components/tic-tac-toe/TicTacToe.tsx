import { useSocket } from "@/hooks/useSocket";
import { Landing } from "./Landing";

export type GameType = "PassAndPlay" | "Online"

export const TicTacToe = () => {

  const socket = useSocket()

  const handleStartGame = () => {

    socket?.emit("findopponent")
    socket?.on("findingOpponent",(msg)=>{
      console.log(msg)
    })

    socket?.on("gameCreated",(msg)=>{
      console.log(msg)
    })
  };

  return (
    <div className="min-h-screen bg-background">
      <Landing />
    </div>
  );
};