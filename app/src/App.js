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
import Session from './components/hrUI/Session';
import Profile from './components/hrUI/Profile'
import UpdateProfile from './components/hrUI/UpdateProfile';
import LeaveApprovalForm from './components/hrUI/LeaveApproval';
import ManagerPendingLeaves from './components/managerUI/LeaveApproval_Manager';
import DashBoardManager from './components/managerUI/DashBoardManager';
import ManagerApprovedLeaves from './components/managerUI/ManagerApprovedLeaves';
import Experience from './components/employeeUI/AddExperience';


import Goals from './components/employeeUI/AddGoalsEmployee';

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
          <Route path="/session" element={<Session />}/>
          <Route path="/hr_profile" element={<Profile />}/>
          <Route path="/hr_update_profile" element={<UpdateProfile />}/>
          <Route path="/leave_approval" element={<LeaveApprovalForm />}/>
          <Route path="/manager_pending_leaves" element={<ManagerPendingLeaves />}/>
          <Route path="/manager_dashboard" element={<DashBoardManager />}/>
          <Route path="/manager_approved_leaves" element={<ManagerApprovedLeaves />}/>
          <Route path="/experience" element={<Experience />}/>
          <Route path="/goals" element={<Goals />}/>
        </Routes>
      </div>
  
  );
}

export default App;