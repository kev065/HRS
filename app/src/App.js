import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './components/Home';
import SideNav from './components/SideNav';
function App() {
  const [isRegisterFormActive, setIsRegisterFormActive] = useState(true);
  

  const toggleForm = () => {
    setIsRegisterFormActive(!isRegisterFormActive);
  };

  const redirectToLogin = () => {
    console.log("Redirecting to login")
    
  };
  return (
    <Router>
      <div className="App">
        <Routes>
          <Header/>
          <SideNav/>
          <Footer/>
          <Route path="/home" element={<Home />} />

          <Route 
            path="/login"
            element={<Login toggleForm={toggleForm} isRegisterFormActive={isRegisterFormActive} />}
          />
          <Route
            path="/register"
            element={<Register redirectToLogin={redirectToLogin} isRegisterFormActive={isRegisterFormActive} toggleForm={toggleForm} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
