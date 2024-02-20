import { Routes, Route } from 'react-router-dom';
import './App.css';
import MainPage from './components/MainPage';
import Login from './components/Login';
import DashBoardHr from './components/hrUI/DashBoardHr';
import DashBoardEmployee from './components/employeeUI/DashBoardEmployee';

function App() {

  return (
    
      <div className="App">
               
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login/>} />    
          <Route path="/hr_dashboard" element={<DashBoardHr/>}/>
          <Route path='/employee_dashboard' element ={<DashBoardEmployee />} />

        </Routes>
      </div>
  
  );
}

export default App;