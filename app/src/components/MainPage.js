import React from 'react'
import Footer from "./Footer"
import Header from "./Header"
import Login from './Login'


const MainPage = () => {
  return (
    <div>
        <Header/>
        <div> Welcome to HRS  </div>
        <Login />

        <Footer/>
      
    </div>
  )
}

export default MainPage
