import React, { useEffect, useState } from "react";
import "./employeeProfile.css";
import { retrieve } from "../Encryption";
import profile from "../../assets/profile.png";
import { Link, useNavigate } from "react-router-dom";

const EmployeeProfile = () => {
  const [employee, setEemployee] = useState(null);
  const { id } = retrieve().employee;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/employees/${id}`)
      .then((response) => response.json())
      .then((data) => setEemployee(data))
      .catch((err) => console.log(err));
  }, []);

  if (!employee) return <div>Loading...</div>;
  console.log(employee);
  if (employee.employee_profiles.length === 0)
    return navigate("/profile/create");
  const employeeProfileData = employee.employee_profiles[0];

  function handleLogout(e) {
    fetch("/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + retrieve().access_token,
        Accept: "application/json",
      },
    }).then((resp) => {
      if (resp.ok) {
        navigate("/login");
      }
    });
  }

  return (
    <div className="profile-container">
      <div className="main">
        <div className="topbar">
          <Link onClick={handleLogout}>Logout</Link>
          <a href="">Edit Profile</a>
          <a href="">Dashboard</a>
        </div>
        <div className="row">
          <div className="col-md-4 mt-1">
            <div className="card text-center profile-sidebar">
              <div className="card-body">
                <img
                  src={profile}
                  alt=""
                  className="rounded-circle"
                  width={150}
                />
                <div className="mt-3">
                  <h3>{employee.email}</h3>
                  <p>{employeeProfileData.mantra}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col md-8 mt-1">
            <div className="card mb-3 content">
              <h1 className="m-3 pt-3">About</h1>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3">
                    <h5>Full Name</h5>
                  </div>
                  <div className="col-md-9 text-secondary">
                    {employeeProfileData.first_name}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <h5>Last Name</h5>
                  </div>
                  <div className="col-md-9 text-secondary">
                    {employeeProfileData.last_name}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <h5>Contact</h5>
                  </div>
                  <div className="col-md-9 text-secondary">
                    {employeeProfileData.phone_contact}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <h5>Date of Birth</h5>
                  </div>
                  <div className="col-md-9 text-secondary">
                    {employeeProfileData.date_of_birth}
                  </div>
                </div>
              </div>
            </div>
            <div className="card mb-3 content">
              <h1 className="m-3 pt-3">Session Goals</h1>
              {employee.goals.length !== 0 ? (
                employee.goals.map((goal) => (
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-3">
                        <h5>{goal.name}</h5>
                      </div>
                      <div className="col-md-9 text-secondary">
                        {goal.description}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h5 className="text-secondary">No goals have been set</h5>
              )}
            </div>
            <div className="card mb-3 content">
              <h1 className="m-3 pt-3">Recent Payslip</h1>
              {employee.remunerations.length !== 0 ? (
                employee.remunerations.map((payslip) => (
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-3">
                        <h5>{payslip.name}</h5>
                      </div>
                      <div className="col-md-9 text-secondary">
                        {payslip.description}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h5 className="text-secondary">No recent payslips</h5>
              )}
            </div>
            <div className="card mb-3 content">
              <h1 className="m-3 pt-3">Approved Leaves</h1>
              {employee.goals.length !== 0 ? (
                employeeProfileData.goals.map((leave) => (
                  <div className="card-body">
                    <div className="col-md-3">
                      <h5>start</h5>
                    </div>
                    <div className="col-md-9 text-secondary">
                      {leave.start_date}
                    </div>
                    <div className="col-md-3">
                      <h5>end</h5>
                    </div>
                    <div className="col-md-9 text-secondary">
                      {leave.end_date}
                    </div>
                  </div>
                ))
              ) : (
                <h5 className="text-secondary">No approved leaves</h5>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
