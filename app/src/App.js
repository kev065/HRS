import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import MainPage from './components/MainPage';
import Login from './components/Login';
import DashBoardHr from './components/hrUI/DashBoardHr';
import DashBoardEmployee from './components/employeeUI/DashBoardEmployee';
import Training from './components/hrUI/Trainings';
import AddEmployeeForm from './components/hrUI/AddEmployee';

function App() {
  const [trainings, setTrainings] = useState([]);

  return (
    
      <div className="App">
               
        <Routes>
          <Route path="/" element={<MainPage />} />   
          <Route path="/hr_dashboard" element={<DashBoardHr/>}/>
<<<<<<< HEAD
          <Route path="/employee_dashboard" element={<DashBoardEmployee/>} />
=======
         
          <Route path="/login" element={<Login />} />
>>>>>>> 96a1c37fe772061b3daddd4c97f2e75192d7cb2d
          <Route path="/hr_dashboard" element={<DashBoardHr />}/>
          <Route path="/training_page" element={<Trainings trainings={trainings} setTrainings={setTrainings}/>}/>
          <Route path="/add_employee" element={<AddEmployeeForm />}/>
          <Route path="/update_trainings" element={<UpdateTrainings />}/>
        </Routes>
      </div>
  
  );
}

export default App;