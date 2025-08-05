import { SocketContext } from "@/contexts/socketContext";
import { useContext } from "react";

export const useSocket = () => useContext(SocketContext);