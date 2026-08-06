import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Products from "./components/Products"
import About from "./components/About"
import Contact from "./components/Contact"
import Cart from "./components/Cart"
import Login from "./components/Login"
import Register from "./components/Register"
import Monitors from "./components/Monitors"
import Motherboards from "./components/Motherboards"
import Audio from "./components/Audio"
import Accessories from "./components/Accessories"
import MobilePhones from "./components/MobilePhones"
import Camera from "./components/Camera"
import GFXCards from "./components/GFXCards"
import Gadget from "./components/Gadget"


import { createBrowserRouter, RouterProvider } from "react-router-dom"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Navbar /> <Home /></>
    },
    {
      path: "/Products",
      element: <><Navbar /><Products /></>
    },
    {
      path: "/About",
      element: <><Navbar /><About /></>
    },
    {
      path: "/Contact",
      element: <><Navbar /><Contact /></>
    },
    {
      path: "/Cart",
      element: <><Navbar /><Cart /></>
    },
    {
      path: "/Login",
      element: <><Navbar /><Login /></>
    },
    {
      path: "/monitors",
      element: <Monitors />
    },
    {
      path: "/motherboards",
      element: <Motherboards />
    },
    {
      path:"/audio",
      element:<Audio/>
    },
    {
      path:"/accessories",
      element:<Accessories/>
    },
    {
      path:"/phones",
      element:<MobilePhones/>
    },
    {
      path:"/camera",
      element:<Camera/>
    },
    {
      path:"/gfxcards",
      element:<GFXCards/>
    },
    {
      path:"/gadgets",
      element:<Gadget/>
    },
    {
      path:"/register",
      element:<Register/>
    }
  ])

  return (
    <>

      <RouterProvider router={router} />
    </>
  )
}

export default App
