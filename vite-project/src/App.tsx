import Dashboard from "./pages/dashboard/Dashboard"
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Products from "./pages/products/Products";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/Login";
import "./styles/global.scss" 
import { useContext,useEffect } from "react";
import { Context } from "./main";
import axios from "axios";

import { useLocation } from "react-router-dom";


import Reddit from "./pages/reddit/reddit";
import Home from "./pages/home/Home";


function App() {

  const {isAuthenticated,setIsAuthenticated,setUser,setLoading} = useContext(Context)

  /*useEffect( () =>{
    setLoading(true)

    if(isAuthenticated)
    {    axios.get(`users/me`,{
      withCredentials: true
    })
    .then((res)=>{
      console.log(res)
      setUser(res.data.user)
      //setIsAuthenticated(true)
      setLoading(false)
    }).catch((error)=>{
      setUser({})
      setIsAuthenticated(false)
      setLoading(false)
    })}
  },[isAuthenticated])*/

  const Layout = () => {
    return(
      <div className="main">
        <Navbar/>
        <div className="container">
          <div className="menuContainer">
            <Menu/>
          </div>
          <div className="contentContainer">
            <Outlet/>
          </div>
        </div>
      <Footer/>
      </div>
    )
  }
  /*const hasAccessToken = Cookies.get('access_token');*/
  console.log(isAuthenticated)
  const router = createBrowserRouter([
    {
      path:"/",
      element:<Layout/>,
      children:[
        {
          path:"/",
          element:<Home/>,
        },
        {
          path:"/dashboard",
          element:<Dashboard/>,
        },
        {
          path:"/reddit",
          element:<Reddit/>
        },
        {
          path:"/products",
          element:<Products/>
        }
      ]
    },
    {
      path:"/login",
      element: <Login/>
    }
  ]);

return <RouterProvider router={router}/>

}

export default App
