import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Index from './pages'
import NotFound from './pages/NotFound'

function App() {

  const router = createBrowserRouter([
    { path: "/", element: <Index /> },
    { path: "*", element: <NotFound /> },
  ])

  return (
    <RouterProvider router={router}>

    </RouterProvider>
  )
}

export default App
