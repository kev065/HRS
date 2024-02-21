import React, {useState, useEffect} from 'react'


const UpdateProfile = () => {

  const [userProfile, setUserProfile] = useState({
    dateOfBirth: '',
    firstName: '',
    lastName: '',
    mantra: '',
    phoneContact: '',
    profileImage: '',
    dateJoined: '',
    title: '',
  });

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5555/hrProfiles', {
        method: 'GET',
        // You may need to include headers or authentication token based on your backend requirements
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("jwt")
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setUserProfile(userData);
      } else {
        console.error('Failed to fetch user profile');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const updateProfile = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5555/hrProfiles/<string:id>', {
        method: 'PATCH',
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify(userProfile),
      });

      if (response.ok) {
        console.log('User profile updated successfully');
      } else {
        console.error('Failed to update user profile');
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  const handleChange = (field, value) => {
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [field]: value,
    }));
  };

  useEffect(() => {
    fetchUserProfile();
  }, []); // Fetch user profile data when the component mounts

  return (
    <div>
      <h1>User Profile</h1>
      <div>
        <label>Date of Birth:</label>
        <input
          type="date"
          value={userProfile.dateOfBirth}
          onChange={(e) => handleChange('dateOfBirth', e.target.value)}
        />
      </div>

      <div>
        <label>First Name:</label>
        <input
          type="text"
          value={userProfile.firstName}
          onChange={(e) => handleChange('firstName', e.target.value)}
        />
      </div>

      <div>
        <label>Last Name:</label>
        <input
          type="text"
          value={userProfile.lastName}
          onChange={(e) => handleChange('lastName', e.target.value)}
        />
      </div>

      <div>
        <label>Mantra:</label>
        <textarea
          value={userProfile.mantra}
          onChange={(e) => handleChange('mantra', e.target.value)}
        />
      </div>

      <div>
        <label>Phone Contact:</label>
        <input
          type="text"
          value={userProfile.phoneContact}
          onChange={(e) => handleChange('phoneContact', e.target.value)}
        />
      </div>

      <div>
        <label>Profile Image URL:</label>
        <input
          type="text"
          value={userProfile.profileImage}
          onChange={(e) => handleChange('profileImage', e.target.value)}
        />
        <img
          src={userProfile.profileImage}
          alt="Profile"
          style={{ width: '150px', height: '150px' }}
        />
      </div>

      <div>
        <label>Date Joined:</label>
        <input
          type="date"
          value={userProfile.dateJoined}
          onChange={(e) => handleChange('dateJoined', e.target.value)}
        />
      </div>

      <div>
        <label>Title:</label>
        <input
          type="text"
          value={userProfile.title}
          onChange={(e) => handleChange('title', e.target.value)}
        />
      </div>
      <button onClick={updateProfile}>Update Profile</button>
    </div>
  )
}

export default UpdateProfile