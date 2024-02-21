
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create an object with the user's credentials
    const credentials = {
      email: email,
      password: password,
    };
  
    try {
      // Make a POST request to your backend API endpoint
      const response = await fetch('http://127.0.0.1:5555/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
  
      // Check if the request was successful
      if (response.ok) {
        // Parse the JSON response
        const result = await response.json();
  
        // Check the role from the response
        const { role } = result;
  
        // Redirect the user based on their role
        switch (role) {
          case 'manager':
            navigate('/manager-dashboard');
            break;
          case 'employee':
            navigate('/employee-dashboard');
            break;
          case 'hr':
            navigate('/hr-dashboard');
            break;
          default:
            console.error('Unknown role:', role);
        }
  
        console.log('Login successful!');
      } else {
        // Handle failed login, e.g., show an error message
        console.error('Login failed');
      }
    } catch (error) {
      // Handle any network or unexpected errors
      console.error('Error during login:', error);
    }
  };
  return (
    <div>
   {/* Content Wrapper. Contains page content */}
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>LOGIN Form</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="#">Home</a></li>
                  <li className="breadcrumb-item active">General Form</li>
                </ol>
              </div>
            </div>
          </div>{/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              {/* left column */}
              <div className="col-md-6">
                {/* general form elements */}
                <div className="card card-primary">
                  <div className="card-header">
                    <h3 className="card-title"></h3>
                  </div>
                  {/* /.card-header */}
                  {/* form start */}
                  <form onSubmit={handleSubmit}>
                    <div className="card-body">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" value={email} onChange={handleEmailChange}/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={handlePasswordChange} />
                      </div>
                    
                      <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Remember</label>
                      </div>
                    </div>
                    {/* /.card-body */}
                    <div className="card-footer">
                      <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                  </form>
                </div>
                {/* /.card */}
                {/* general form elements */}
              
                
                
              
              </div>
              
            </div>
        
          </div>
        </section>
      
      </div>

      
    </div>
  )
}

export default Login