import React, {  useState } from 'react'
import { NavLink, useNavigate} from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
        <div className="container mt-5">
                        <div className='row'>

                            <div className="col-sm-6 offset-md-3 offset-sm-1 ">
                                <form method="POST">

                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" className="form-control" id="email" name="email" value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your Email" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" className="form-control" id="password" name="password" value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                           
                                            placeholder="Enter your Password" />
                                    </div>

                                    <NavLink to='/register'>Didn't Register, then register here!</NavLink><br /><br />
                                    <button type="submit" className="btn btn-primary" id='login' name='login' onClick={SetData} >Login</button>

                                </form>
                            </div>

                        </div>

                    </div>
    )
}

export default Login