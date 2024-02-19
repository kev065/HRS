import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
// import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes> 
          <Route path="/login" element={<Login />} />
        </Routes>
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
          
          
        
      </div>
    </Router>
  );
}

export default App;
