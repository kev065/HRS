import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import MainPage from './components/MainPage';
import Login from './components/Login';
import DashBoardHr from './components/hrUI/DashBoardHr';
import DashBoardEmployee from './components/employeeUI/DashBoardEmployee';
import Training from './components/hrUI/Training';
import AddEmployeeForm from './components/hrUI/AddEmployee';
import Session from './components/hrUI/Session';
import Profile from './components/hrUI/Profile'
import UpdateProfile from './components/hrUI/UpdateProfile';
import LeaveApprovalForm from './components/hrUI/LeaveApproval';

function App() {
  const [trainings, setTrainings] = useState([]);

  return (
    
      <div className="App">
               
        <Routes>
          <Route path="/" element={<MainPage />} />   
          <Route path="/hr_dashboard" element={<DashBoardHr/>}/>
          <Route path="/employee_dashboard" element={<DashBoardEmployee />} />
          <Route path="/login" element={<Login />} />
          <Route path="/hr_dashboard" element={<DashBoardHr />}/>
          <Route path="/training_page" element={<Training trainings={trainings} setTrainings={setTrainings}/>}/>
          <Route path="/add_employee" element={<AddEmployeeForm />}/>
          <Route path="/session" element={<Session />}/>
          <Route path="/hr_profile" element={<Profile />}/>
          <Route path="/hr_update_profile" element={<UpdateProfile />}/>
          <Route path="/leave_approval" element={<LeaveApprovalForm />}/>
        </Routes>
      </div>
  
  );
}

export default App;