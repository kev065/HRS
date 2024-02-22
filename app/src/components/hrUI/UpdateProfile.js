import React, {useState, useEffect} from 'react'
import './update_profile.css'

const UpdateProfile = () => {

  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    // Fetch user profile data and populate state variables
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('hrProfiles', {
        method: 'GET',
        // Include headers or authentication token based on your backend requirements
      });

      if (response.ok) {
        const userData = await response.json();
        // Populate state variables with user data
        setfirstName(userData.firstName);
        setlastName(userData.lastName);
        setEmail(userData.email);
        setPhone(userData.phone);
      } else {
        console.error('Failed to fetch user profile');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handlefirstNameChange = (event) => {
    setfirstName(event.target.value);
  };

  const handlelastNameChange = (event) => {
    setfirstName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await fetch('/hrProfiles', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          email,
          phone,
          // Include other fields as needed
        }),
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


  return (
    <div>
      <div className="container">
      <div className="main-body">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="main-breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/hr_dashboard">Dashboard</a></li>
            <li className="breadcrumb-item"><a href="javascript:void(0)">User</a></li>
            
          </ol>
        </nav>
        {/* /Breadcrumb */}

        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" />
                  <div className="mt-3">
                    <h4>John Doe</h4>
                    <p className="text-secondary mb-1">Full Stack Developer</p>
                    <p className="text-muted font-size-sm">Bay Area, San Francisco, CA</p>
                    <button className="btn btn-outline-primary">Message</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mt-3">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-globe mr-2 icon-inline"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>Website</h6>
                  <span className="text-secondary">https://bootdey.com</span>
                </li>
                {/* Add more list items as needed */}
              </ul>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card mb-3">
              <div className="card-body">
                {/* User details */}
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">First Name</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                  <input type="text" placeholder='John' value={firstName} onChange={handlefirstNameChange} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Last Name</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                  <input type="text" placeholder='Doe' value={lastName} onChange={handlelastNameChange} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Email</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                  <input type="text" placeholder='John' value={email} onChange={handleEmailChange} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">First Name</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                  <input type="text" placeholder='John' value={firstName} onChange={handlefirstNameChange} />
                  </div>
                </div>
      
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Birthday</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                  <input type="text" placeholder='Birthday' value={firstName} onChange={handlefirstNameChange} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Mantra</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                  <input type="text" placeholder='John' value={firstName} onChange={handlefirstNameChange} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Phone contacts</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                  <input type="text" placeholder='John' value={firstName} onChange={handlefirstNameChange} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">profileImage</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                  <input type="text" placeholder='John' value={firstName} onChange={handlefirstNameChange} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Title</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                  <input type="text" placeholder='John' value={firstName} onChange={handlefirstNameChange} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">dateJoined</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                  <input type="text" placeholder='John' value={firstName} onChange={handlefirstNameChange} />
                  </div>
                </div>
                <hr />
                {/* Add more user details as needed */}
                <div className="row">
                  <div className="col-sm-12">
                  <button className="btn btn-info" onClick={handleUpdateProfile}>
            Update Profile
          </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="row gutters-sm">
              {/* Project status cards */}
              <div className="col-sm-6 mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">assignment</i>Project Status</h6>
                    <small>Web Design</small>
                    {/* Add progress bar */}
                    <div className="progress mb-3" style={{ height: '5px' }}>
                      <div className="progress-bar bg-primary" role="progressbar" style={{ width: '80%' }} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    {/* Add more project statuses as needed */}
                    <small>Website Markup</small>
                    <div className="progress mb-3" style={{ height: '5px' }}>
                      <div className="progress-bar bg-primary" role="progressbar" style={{ width: '72%' }} aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>

                    <small>One Page</small>
                    <div className="progress mb-3" style={{ height: '5px' }}>
                      <div className="progress-bar bg-primary" role="progressbar" style={{ width: '89%' }} aria-valuenow="89" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>

                    <small>Mobile Template</small>
                    <div className="progress mb-3" style={{ height: '5px' }}>
                      <div className="progress-bar bg-primary" role="progressbar" style={{ width: '55%' }} aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>

                  <small>Backend API</small>
                  <div className="progress mb-3" style={{ height: '5px' }}>
                    <div className="progress-bar bg-primary" role="progressbar" style={{ width: '66%' }} aria-valuenow="66" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  </div>
                </div>
              </div>
              {/* Add more project status cards as needed */}
              <div className="col-sm-6 mb-3">
  <div className="card h-100">
    <div className="card-body">
      <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">assignment</i>Project Status</h6>

      <small>Web Design</small>
      <div className="progress mb-3" style={{ height: '5px' }}>
        <div className="progress-bar bg-primary" role="progressbar" style={{ width: '80%' }} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
      </div>

      <small>Website Markup</small>
      <div className="progress mb-3" style={{ height: '5px' }}>
        <div className="progress-bar bg-primary" role="progressbar" style={{ width: '72%' }} aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
      </div>

      <small>One Page</small>
      <div className="progress mb-3" style={{ height: '5px' }}>
        <div className="progress-bar bg-primary" role="progressbar" style={{ width: '89%' }} aria-valuenow="89" aria-valuemin="0" aria-valuemax="100"></div>
      </div>

      <small>Mobile Template</small>
      <div className="progress mb-3" style={{ height: '5px' }}>
        <div className="progress-bar bg-primary" role="progressbar" style={{ width: '55%' }} aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
      </div>

      <small>Backend API</small>
      <div className="progress mb-3" style={{ height: '5px' }}>
        <div className="progress-bar bg-primary" role="progressbar" style={{ width: '66%' }} aria-valuenow="66" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
    </div>
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

export default UpdateProfile