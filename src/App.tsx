import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Index from './pages'
import NotFound from './pages/NotFound'
import { SocketProvider } from './contexts/socketContext'

function App() {

  const router = createBrowserRouter([
    { path: "/", element: <Index /> },
    { path: "*", element: <NotFound /> },
  ])

  return (
    <SocketProvider>
      <RouterProvider router={router} />
    </SocketProvider>
  )
}

export default App
