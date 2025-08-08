import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Index from "./pages";
import NotFound from "./pages/NotFound";
import { OnlineGameLoading } from "./components/tic-tac-toe/OnlineGameLoading";
import { PassPlayLoading } from "./components/tic-tac-toe/PassPlayLoading";
import { PassPlayBoard } from "./components/tic-tac-toe/PassPlayBoard";
import { OnlineGameBoard } from "./components/tic-tac-toe/OnlineGameBoard";
import { SocketProvider } from "./contexts/socketContext";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Index /> },
    { path: "/loading/online", element: <OnlineGameLoading /> },
    { path: "/loading/pass-play", element: <PassPlayLoading /> },
    { path: "/play/pass-play", element: <PassPlayBoard /> },
    { path: "/play/online", element: <SocketProvider><OnlineGameBoard /></SocketProvider> },
    { path: "*", element: <NotFound /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
