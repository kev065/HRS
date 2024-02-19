import React, {  useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './common.css'

const Login = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginFormActive, setIsLoginFormActive] = useState(true);

    useEffect(() => {
        
        
        const loginBtn = document.getElementById('login');
    
        console.log('loginBtn:', loginBtn);

        const handleClick = () => {
          setIsLoginFormActive(true);
        };
        
        if (loginBtn){
          loginBtn.addEventListener('click', handleClick);
    
        // Cleanup event listeners when the component is unmounted
        return () => {
          loginBtn.removeEventListener('click', handleClick);
        };
      } 
    }, []);

      console.log('isLoginFormActive:', isLoginFormActive);

    const SetData = (e) => {
        e.preventDefault()
    
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
            
            navigate('/dashboard')
        })
    }



    return (
        <div className={`container ${isLoginFormActive ? 'active' : ''}`} id="container">
          
          <div className="form-container sign-in">
            <form onSubmit={SetData}>
              <h1>Sign In</h1>
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
              <span>or use your email password</span>
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              {/* <a href="#">Forget Your Password?</a> */}
              <button type="submit" onClick={SetData}>Sign In</button>
            </form>
          </div>
          <div className="toggle-container">
            <div className="toggle">
              <div className="toggle-panel toggle-right">
                <h1>Hello, Friend!</h1>
                <p>Register with your personal details to use all of site features</p>
                <button className="hidden" id="login" name='login'>
                  Sign Up
                </button>
              </div>
            </div>
            </div>
          </div>

      );
}

export default Login