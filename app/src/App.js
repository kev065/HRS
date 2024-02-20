import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
// import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';

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
          <Route 
            path="/login"
            element={<Login toggleForm={toggleForm} isRegisterFormActive={isRegisterFormActive} />}
          />
        </Routes>
        <Routes>
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
