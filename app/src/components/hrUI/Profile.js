import React, {useState, useEffect} from 'react'
import './profile.css'
import profile from "../../assets/profile.png";
import { Link, useNavigate} from "react-router-dom"
import { retrieve } from '../Encryption';

const Profile = () => {
  const [ hr, setHr] = useState(null);
  const { id } = retrieve().hr;
  const navigate = useNavigate();


  useEffect(() => {
    fetch(`/hr_personnels/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + retrieve().access_token,
      },
    })
      
      .then((res) => {
        if(!res.ok){
          throw new Error(`HTTP error! Status: ${res.status}`)
        }
        return res.json();
      })
      .then((data) => setHr(data))
      .catch((err) => {
        console.error("Error loading HR data:", err)
      });
  }, []); 


  if (!hr) return <div>Loading...</div>;
  console.log(hr);
  if (!hr || !hr.hr_profiles || hr.hr_profiles.length === 0)
    return navigate(`/create_profile/${id}`);
  const hrProfileData = hr.hr_profiles[0];

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
                  <h3>{hr.email}</h3>
                  <p>{hrProfileData.mantra}</p>
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
                    {hrProfileData.first_name}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <h5>Last Name</h5>
                  </div>
                  <div className="col-md-9 text-secondary">
                    {hrProfileData.last_name}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <h5>Contact</h5>
                  </div>
                  <div className="col-md-9 text-secondary">
                    {hrProfileData.phone_contact}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <h5>Date of Birth</h5>
                  </div>
                  <div className="col-md-9 text-secondary">
                    {hrProfileData.date_of_birth}
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

export default Profile