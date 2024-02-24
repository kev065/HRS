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
import ViewEmployees from "./components/hrUI/ViewEmployees";
import VerifyDocuments from "./components/hrUI/VerifyDocuments";
import EducationDocumentUpload from "./components/employeeUI/EducationDocumentUpload";
import ViewEducation from "./components/employeeUI/ViewEducation";
import UpdateEducation from "./components/employeeUI/UpdateEducation";
import ViewDocuments from "./components/employeeUI/ViewDocuments";
import UpdateDocuments from "./components/employeeUI/UpdateDocuments";
import ViewLeaves from "./components/employeeUI/ViewLeaves";
import UpdateLeave from "./components/employeeUI/UpdateLeave";
import EmployeeProfileForm from "./components/employeeUI/EmployeeProfileForm";
import EmployeeProfile from "./components/employeeUI/EmployeeProfile";
import EditProfileForm from "./components/employeeUI/EditProfileForm";
import EmployeeViewTrainings from "./components/employeeUI/EmployeeViewTrainings";
import Session from './components/hrUI/Session';
import Profile from './components/hrUI/Profile'
import CreateProfile from './components/hrUI/CreateProfile';
import EditProfile from './components/hrUI/EditProfile'
import LeaveApprovalForm from './components/hrUI/PendingLeavesHr';
import ManagerPendingLeaves from './components/managerUI/LeaveApproval_Manager';
import DashBoardManager from './components/managerUI/DashBoardManager';
import ManagerApprovedLeaves from './components/managerUI/ManagerApprovedLeaves';
import Experience from './components/employeeUI/AddExperience';
import Goals from './components/employeeUI/ViewGoalsEmployee';


function App() {
  const [trainings, setTrainings] = useState([]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/session" element={<Session />}/>
        <Route path="/employee" element={<DashBoardEmployee />}>
       <Route path="/employee/view_education/:employeeId" element={<ViewEducation />} />
       <Route path="/employee/add_education" element={<EducationDocumentUpload />}/>
       <Route path="/employee/update_document/:id" element={<UpdateDocuments />} />
       <Route path="/employee/view_leaves/:id" element={<ViewLeaves />} />
       <Route path="/employee/update_leave/:id" element={<UpdateLeave />} />
       <Route path="/employee/profile" element={<EmployeeProfile/>} />
        <Route path="/employee/profile/create" element={<EmployeeProfileForm />} />
        <Route path="/employee/profile/edit" element={<EditProfileForm />} />
        <Route path="/employee/view_documents/:id" element={<ViewDocuments />} />
        <Route path="/employee/view_education/:id" element={<ViewEducation />} />
        <Route path="/employee/view_trainings/:id" element={<EmployeeViewTrainings/>} />
        <Route path="/employee/update_education/:id" element={<UpdateEducation />} />
        <Route path="/employee/goals" element={<Goals />}/>
        <Route path="/employee/experience" element={<Experience />}/>

       </Route>
        <Route path="/hr" element={<DashBoardHr />} >
        <Route path="/hr/training_page" element={<Trainings trainings={trainings} setTrainings={setTrainings} />  } />
        <Route path="/hr/add_employee" element={<AddEmployeeForm />} />      
        <Route path="/hr/update_trainings/:id" element={<UpdateTrainings />} />
        <Route path="/hr/view_employees" element={<ViewEmployees />} />
        <Route path="/hr/verify_documents/:employeeId"  element={<VerifyDocuments />} />
        <Route path="/hr/hr_pending_leaves" element={<LeaveApprovalForm />}/>
        <Route path="hr/hr_dashboard/:hrId" element={<DashBoardHr/>}/>
          <Route path="/hr/hr_profile/:hrId" element={<Profile/>}/>
          <Route path="/hr/create_profile/:hrId" element={<CreateProfile/>}/>
          <Route path="/hr/edit_profile/:hrId" element={<EditProfile/>}/>
        </Route>   

        <Route path="/manager" element={<DashBoardManager />} >
        <Route path="/manager/manager_pending_leaves" element={<ManagerPendingLeaves />}/>
        <Route path="/manager/manager_approved_leaves" element={<ManagerApprovedLeaves />}/>
        <Route path="/manager/manager_profile/:managerId" element={<ManagerProfile/>}/>
        <Route path="manager/manager_create_profile/:managerId" element={<ManagerCreateProfile/>}/>
          <Route path="/manager/manager_update_profile/:managerId" element={<ManagerEditProfile/>}/>
        </Route>
             
        </Routes>
      </div>
  );
}

export default App;
