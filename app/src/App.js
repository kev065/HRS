import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import MainPage from './components/MainPage';
import Login from './components/Login';
import DashBoardHr from './components/hrUI/DashBoardHr';
import DashBoardEmployee from './components/employeeUI/DashBoardEmployee';
import Trainings from './components/hrUI/Trainings';
import AddEmployeeForm from './components/hrUI/AddEmployee';
import UpdateTrainings from './components/hrUI/UpdateTrainings';
import ViewEmployees from './components/hrUI/ViewEmployees';
import VerifyDocuments from './components/hrUI/VerifyDocuments';

function App() {
  const [trainings, setTrainings] = useState([]);

  return (
    
      <div className="App">
               
        <Routes>
          <Route path="/" element={<MainPage />} />   
          <Route path="/hr_dashboard" element={<DashBoardHr/>}/>
          <Route path="/employee_dashboard" element={<DashBoardEmployee/>} />
          <Route path="/hr_dashboard" element={<DashBoardHr />}/>
          <Route path="/training_page" element={<Trainings trainings={trainings} setTrainings={setTrainings}/>}/>
          <Route path="/add_employee" element={<AddEmployeeForm />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/update_trainings/:id" element={<UpdateTrainings  />} />
          <Route path="/view_employees" element={<ViewEmployees  />} />
          <Route path="/verify_documents/:employeeId" element={<VerifyDocuments />} />

     

          
        </Routes>
      </div>
  
  );
}

export default App;