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
import EducationDocumentUpload from './components/employeeUI/EducationDocumentUpload';
import ViewEducation from './components/employeeUI/ViewEducation';
import UpdateEducation from './components/employeeUI/UpdateEducation';
import ViewDocuments from './components/employeeUI/ViewDocuments';
import UpdateDocuments from './components/employeeUI/UpdateDocuments';
import ViewLeaves from './components/employeeUI/ViewLeaves';
import UpdateLeave from './components/employeeUI/UpdateLeave';
import Profile from './components/hrUI/Profile';
import CreateProfile from './components/hrUI/CreateProfile'
import DashBoardManager from './components/managerUI/DashBoardManager'
import ManagerProfile from './components/managerUI/ManagerProfile';
import ManagerCreateProfile from './components/managerUI/ManagerCreateProfile';
import ManagerEditProfile from './components/managerUI/ManagerEditProfile'
function App() {
  const [trainings, setTrainings] = useState([]);

  return (
    
      <div className="App">
               
        <Routes>
          <Route path="/" element={<MainPage />} />   
          <Route path="/hr_dashboard/:hrId" element={<DashBoardHr/>}/>
          <Route path="/hr_profile/:hrId" element={<Profile/>}/>
          <Route path="/create_profile/:hrId" element={<CreateProfile/>}/>
          <Route path="/employee_dashboard/:employeeId" element={<DashBoardEmployee/>} />
          <Route path="/training_page" element={<Trainings trainings={trainings} setTrainings={setTrainings}/>}/>
          <Route path="/add_employee" element={<AddEmployeeForm />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/update_trainings/:id" element={<UpdateTrainings  />} />
          <Route path="/view_employees" element={<ViewEmployees  />} />
          <Route path="/verify_documents/:employeeId" element={<VerifyDocuments />} />
          <Route path="/education/document/upload" element={<EducationDocumentUpload/>}/>
          <Route path="/view_education/:employeeId" element={<ViewEducation/>}/>
          <Route path="/update_education/:id" element={<UpdateEducation/>}/>
          <Route path="/view_documents/:id" element={<ViewDocuments/>}/>
          <Route path="/update_document/:id" element={<UpdateDocuments/>}/>
          <Route path="/view_leaves/:id" element={<ViewLeaves/>}/>
          <Route path="/update_leave/:id" element={<UpdateLeave/>}/>
          <Route path="/manager_dashboard/:managerId" element={<DashBoardManager/>}/>
          <Route path="/manager_profile/:managerId" element={<ManagerProfile/>}/>
          <Route path="/manager_create_profile/:managerId" element={<ManagerCreateProfile/>}/>
          <Route path="/manager_update_profile/:managerId" element={<ManagerEditProfile/>}/>
      
       
          

     

          
        </Routes>
      </div>
  
  );
}

export default App;
