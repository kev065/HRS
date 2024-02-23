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

function App() {
  const [trainings, setTrainings] = useState([]);

  return (
    
      <div className="App">
               
        <Routes>
          <Route path="/" element={<MainPage />} />   
          <Route path="/employee_dashboard/:employeeId" element={<DashBoardEmployee/>} />
          <Route path="/hr_dashboard" element={<DashBoardHr />}/>
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
      
       
          

     

          
        </Routes>
      </div>
  
  );
}

export default App;