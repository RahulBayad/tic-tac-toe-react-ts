import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { io, Socket } from "socket.io-client";

type SocketContextType = Socket | null;

export const SocketContext = createContext<SocketContextType>(null);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Create socket connection only once
    const connection = io("http://localhost:3000");
    if (!socket) {
      
      
      setSocket(connection || null)
      console.log("current", socket)

      // Set up event listeners
      connection?.on("connect", () => {
        console.log("socket connected");
      });

      connection?.on("disconnect", () => {
        console.log("socket disconnected");
      });
    }

    // Cleanup function
    return () => {
      if (socket) {
        connection.disconnect();
        console.log("disonnect")
      }
    };
  }, []); // Empty dependency array - run only once

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};