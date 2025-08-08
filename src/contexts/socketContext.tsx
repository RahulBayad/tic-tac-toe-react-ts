import { createContext, useCallback, useEffect, useState, type ReactNode } from "react";
import { io, Socket } from "socket.io-client";

export type SocketContextType = {
  socket: Socket | null;
  setSocket: React.Dispatch<React.SetStateAction<Socket | null>>;
  disconnectSocket: () => void;
} | null;

export type SocketResponse = {
  roomId: string;
  gameState: string[];
  playerTurn: string;
  currentMove: "X" | "Y";
  winner: null | string;
};

export const SocketContext = createContext<SocketContextType>({
  socket: null,
  setSocket: () => {},
  disconnectSocket: () => {}
});

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  
  const disconnectSocket = useCallback(() => {
    console.log("disconnect")
    socket?.disconnect();
    setSocket(null);
  },[])

  useEffect(() => {
    const socketInstance = io("http://localhost:3000");

    socketInstance?.emit("findopponent");

    socketInstance.on("connect", () => {
      setSocket(socketInstance);
      console.log("socket connected:", socketInstance.id);
    });

    socketInstance.on("disconnect", () => {
      setSocket(null);
      console.log("socket disconnected");
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, setSocket, disconnectSocket }}>
      {children}
    </SocketContext.Provider>
  );
};
