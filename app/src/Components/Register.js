import React, {  useState, useEffect } from 'react'
import {  useNavigate} from 'react-router-dom';
import './register.css'
const Register = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegisterFormActive, setIsRegisterFormActive] = useState(true);

    useEffect(() => {
      const registerBtn = document.getElementById('register');
  
      const handleRegisterButtonClick = () => {
        setIsRegisterFormActive(false);
      };
  
      registerBtn.addEventListener('click', handleRegisterButtonClick);
  
  
      // Cleanup event listeners when the component is unmounted
      return () => {
        registerBtn.removeEventListener('click', () => setIsRegisterFormActive(false));
      
      };
    }, []);

    const SetData = (e) => {
        e.preventDefault()
    
        fetch('/register', {
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
            
            navigate('/dashboard')
        })
    }


    return (
        <div className={`container ${isRegisterFormActive ? 'active' : ''}`} id="container">
          <div className="form-container sign-up">
            <form onSubmit={SetData}>
              <h1>Create Account</h1>
              <div className="social-icons">
            <button type="button" className="icon">
              <i className="fa-brands fa-google-plus-g"></i>
            </button>
            <button type="button" className="icon">
              <i className="fa-brands fa-facebook-f"></i>
            </button>
            <button type="button" className="icon">
              <i className="fa-brands fa-github"></i>
            </button>
            <button type="button" className="icon">
              <i className="fa-brands fa-linkedin-in"></i>
            </button>
          </div>
              <span>or use your email for registration</span>
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="submit">Sign Up</button>
            </form>
          </div>
          <div className="toggle-container">
            <div className="toggle">
              <div className="toggle-panel toggle-left">
                <h1>Welcome Back!</h1>
                <p>Enter your personal details to use all of site features</p>
                <button className="hidden" id="login">
                  Sign In
                </button>
              </div>
              </div>
             </div>
            </div>
      );
};

export default Register