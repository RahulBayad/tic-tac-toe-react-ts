import { SocketContext, type SocketContextType } from "@/contexts/socketContext";
import { useContext } from "react";

export const useSocket = () => useContext<SocketContextType>(SocketContext);