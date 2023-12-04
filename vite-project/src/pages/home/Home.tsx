import React, { useEffect } from 'react'
import {useNavigate, useLocation} from "react-router-dom"
const Home = () => {

    const navigate = useNavigate()

    const {pathname} = useLocation()
    useEffect(()=>{

  if(pathname == "/")
  {
    navigate("/login",{replace:true})
  }else{
    navigate("/dashboard",{replace:true})
  } 
    })
  
  

  return (
    <div>Home</div>
  )
}

export default Home 