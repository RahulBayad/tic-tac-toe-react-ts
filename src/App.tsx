import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Index from './pages'
import NotFound from './pages/NotFound'
import { SocketProvider } from './contexts/socketContext'
import { OnlineGameLoading } from './components/tic-tac-toe/OnlineGameLoading'
import { PassPlayLoading } from './components/tic-tac-toe/PassPlayLoading'
import { PassPlayBoard } from './components/tic-tac-toe/PassPlayBoard'
import { OnlineGameBoard } from './components/tic-tac-toe/OnlineGameBoard'

function App() {

  const router = createBrowserRouter([
    { path: "/", element: <Index /> },
    { path: "/loading/online", element: <OnlineGameLoading /> },
    { path: "/loading/pass-play", element: <PassPlayLoading /> },
    { path: "/play/pass-play", element: <PassPlayBoard /> },
    { path: "/play/online", element: <OnlineGameBoard /> },
    { path: "*", element: <NotFound /> },
  ])

  return (
    <SocketProvider>
      <RouterProvider router={router} />
    </SocketProvider>
  )
}

export default App
