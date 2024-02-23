import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import MainPage from "./components/MainPage";
import Login from "./components/Login";
import DashBoardHr from "./components/hrUI/DashBoardHr";
import DashBoardEmployee from "./components/employeeUI/DashBoardEmployee";
import Trainings from "./components/hrUI/Trainings";
import AddEmployeeForm from "./components/hrUI/AddEmployee";
import UpdateTrainings from "./components/hrUI/UpdateTrainings";
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

function App() {
  const [trainings, setTrainings] = useState([]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />

        <Route path="/employee" element={<DashBoardEmployee />}>

       <Route path="/employee/view_education/:employeeId" element={<ViewEducation />} />
       <Route path="/employee/education/document/upload" element={<EducationDocumentUpload />}/>
       <Route path="/employee/update_document/:id" element={<UpdateDocuments />} />
       <Route path="/employee/view_leaves/:id" element={<ViewLeaves />} />
       <Route path="/employee/update_leave/:id" element={<UpdateLeave />} />
       <Route path="/employee/profile" element={<EmployeeProfile/>} />
        <Route path="/employee/profile/create" element={<EmployeeProfileForm />} />
        <Route path="/employee/profile/edit" element={<EditProfileForm />} />
        <Route path="/employee/view_documents/:id" element={<ViewDocuments />} />

       </Route>


        <Route path="/hr" element={<DashBoardHr />} >

        <Route path="/hr/training_page" element={<Trainings trainings={trainings} setTrainings={setTrainings} />  } />
        <Route path="/hr/add_employee" element={<AddEmployeeForm />} />      
        <Route path="/hr/update_trainings/:id" element={<UpdateTrainings />} />
        <Route path="/hr/view_employees" element={<ViewEmployees />} />
        <Route path="/hr/verify_documents/:employeeId"  element={<VerifyDocuments />} />

        </Route>   
      
      
       
       
       
       
      </Routes>
    </div>
  );
}

export default App;
