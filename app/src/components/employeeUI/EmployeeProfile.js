import React, { useEffect, useState } from "react";
import "./employeeProfile.css";
import { retrieve } from "../Encryption";
import profile from "../../assets/profile.png";

const EmployeeProfile = () => {
  const [employee, setEemployee] = useState(null);
  const { id } = retrieve().employee;

  useEffect(() => {
    fetch(`/employees/${id}`)
      .then((response) => response.json())
      .then((data) => setEemployee(data))
      .catch((err) => console.log(err));
  }, []);

  if (!employee) return <div>Loading...</div>;
  return (
    <div className="profile-container">
      <div className="main">
        <div className="topbar">
          <a href="">Logout</a>
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
                  <h3>Allan Njoroge</h3>
                  <a href="">Edit Profile</a>
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
                    employee name Here
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <h5>Email</h5>
                  </div>
                  <div className="col-md-9 text-secondary">
                    email@example.com
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <h5>Contact</h5>
                  </div>
                  <div className="col-md-9 text-secondary">0110200474840</div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <h5>Mantra</h5>
                  </div>
                  <div className="col-md-9 text-secondary">I am Here.</div>
                </div>
              </div>
            </div>
            <div className="card mb-3 content">
              <h1 className="m-3 pt-3">Session Goals</h1>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3">
                    <h5>Goal name here</h5>
                  </div>
                  <div className="col-md-9 text-secondary">
                    Goal Description
                  </div>
                </div>
              </div>
            </div>
            <div className="card mb-3 content">
              <h1 className="m-3 pt-3">Recent Payslip</h1>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3">
                    <h5>Payslip name here</h5>
                  </div>
                  <div className="col-md-9 text-secondary">
                    Payslip Description
                  </div>
                </div>
              </div>
            </div>
            <div className="card mb-3 content">
              <h1 className="m-3 pt-3">Approved Leaves</h1>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3">
                    <h5>start</h5>
                  </div>
                  <div className="col-md-9 text-secondary">start date</div>
                  <div className="col-md-3">
                    <h5>end</h5>
                  </div>
                  <div className="col-md-9 text-secondary">end date</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
