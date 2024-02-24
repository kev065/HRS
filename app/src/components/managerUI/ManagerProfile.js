import React, {useState, useEffect} from 'react'
import './managerProfile.css'
import profile from "../../assets/profile.png";
import { Link, useNavigate, useParams} from "react-router-dom"
import { retrieve } from '../Encryption';

const ManagerProfile = () => {
  const [ manager, setManager] = useState(null);
  const { id } = retrieve().manager;
  const navigate = useNavigate();
  const { managerId } = useParams


  useEffect(() => {
    fetch(`/managers/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + retrieve().access_token,
      },
    })
      .then((res) => {
        if(!res.ok){
          throw new Error(`HTTP error! Status: ${res.status}`)
        }
        return res.json();
      })
      .then((data) => setManager(data))
      .catch((err) => {
        console.error("Error loading manager data:", err)
      });
  }, [managerId]); 


  if (!manager) return <div>Loading...</div>;
  console.log(manager);
  if (!manager || !manager.manager_profiles || manager.manager_profiles.length === 0)
    return navigate(`/manager/create_profile`);
  const managerProfileData = manager.manager_profiles[0];

  function handleLogout(e) {
    fetch("/logout", {
      method: "GET",
      headers: {
        
        'Authorization': "Bearer " + retrieve().access_token,
        
      },
    }).then((resp) => {
      if (resp.ok) {
        localStorage.clear();
        navigate("/login");
      }
    });
  }

  return (
    <div className="profile-container">
      <div className="main">
        <div className="topbar">
          <Link onClick={handleLogout}>Logout</Link>
          <a manageref="">Dashboard</a>
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
                  <h3>{manager.email}</h3>
                  <p>{managerProfileData.mantra}</p>
                </div>
                <div className="mt-3">
                  <button className="sidebar-btn">Edit Profile</button>
                </div>
                <div className="mt-3">
                  <button className="sidebar-btn del">Delete Profile</button>
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
                    {managerProfileData.first_name}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <h5>Last Name</h5>
                  </div>
                  <div className="col-md-9 text-secondary">
                    {managerProfileData.last_name}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <h5>Contact</h5>
                  </div>
                  <div className="col-md-9 text-secondary">
                    {managerProfileData.phone_contact}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <h5>Date of Birth</h5>
                  </div>
                  <div className="col-md-9 text-secondary">
                    {managerProfileData.date_of_birth}
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default ManagerProfile