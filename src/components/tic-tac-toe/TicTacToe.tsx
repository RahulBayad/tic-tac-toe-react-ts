import { useSocket } from "@/hooks/useSocket";
import { Landing } from "./Landing";

export type GameType = "PassAndPlay" | "Online"

export const TicTacToe = () => {

  return (
    <div className="min-h-screen bg-background">
      <Landing />
    </div>
  );
};