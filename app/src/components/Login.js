import React, { useState } from 'react'
import 'admin-lte/plugins/fontawesome-free/css/all.min.css';
import 'admin-lte/dist/css/adminlte.min.css';
import { useNavigate} from 'react-router-dom';


const Login = () => {

  const navigate = useNavigate()  

  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Implement your login logic here
    fetch('/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email, password
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        // Redirect to the dashboard or perform other actions on successful login
        navigate('/')
    })
    
  };

  return (
    <div className="login-box" >
      <div className="login-logo">
        {/* <a href="#"><b>Your</b>App</a> */}
      </div>
      <div className="card">
        <div className="card-body login-card-body">
          <p className="login-box-msg">Sign in here</p>

          <form onSubmit={handleLogin}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-user"></span>
                </div>
              </div>
            </div>
            <div className="input-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock"></span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-8">
                <div className="icheck-primary">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Remember Me</label>
                </div>
              </div>
              <div className="col-4">
                <button type="submit" className="btn btn-primary btn-block">Sign In</button>
              </div>
            </div>
          </form>

          <p className="mb-1">
            {/* <a href="#">Forgot password</a> */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;