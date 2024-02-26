import React, { useState, useEffect } from "react";
import "./profile.css";
import profile from "../../assets/profile.png";
import { Link, useNavigate } from "react-router-dom";
import { retrieve } from "../Encryption";

const Profile = () => {
  const [hr, setHr] = useState(null);
  const { id } = retrieve().hr;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/hr_personnels/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched HR data:", data);
        setHr(data);
        if (!data.hr_profiles || data.hr_profiles.length === 0) {
          // Only navigate if no HR profiles are present
          navigate(`/hr/create_profile`);
        }
      })
      .catch((err) => console.log("Error fetching HR data:", err));
    setLoading(false); // Set loading to false in case of an error
  }, [id]);

  if (!hr) return <div className="loader"></div>;

  const hrProfileData = hr.hr_profiles[0];

  return (
    <div className="profile-container">
      <div className="main">
        <div className="row">
          <div className="col-md-4 mt-1">
            <div className="card text-center profile-sidebar">
              <div className="card-body">
                <img
                  src={hrProfileData.profile_photo || profile}
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
  );
};

export default Profile;
