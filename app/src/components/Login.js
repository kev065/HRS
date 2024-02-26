import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { store, retrieve } from "./Encryption";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState(""); 
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRoleChange = (e) => {
    console.log("Selected Role:", e.target.value);
    setSelectedRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = {
      email: email,
      password: password,
      role: selectedRole
    };

    console.log("Login request data:", credentials);

    fetch("http://127.0.0.1:5555/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => {
        console.log("Server response status:", response.status);
        if (response.ok) {
          return response.json();
        } else {
          console.error("Login failed");
          throw new Error("Login failed");
        }
      })
      .then((result) => {
        // Check the role and access token from the response
        store(result);
        const { role } = result;
        console.log(result)

        localStorage.setItem(
          "accessToken",
          JSON.stringify(result.access_token)
        );
        // Redirect the user based on their role
        switch (selectedRole) {
          case "manager":
            navigate(`/manager/manager_profile`);
            break;
          case "employee":
            navigate("/employee/profile");

            break;
          case "hr":
            navigate(`/hr/hr_profile`);
            break;
          default:
            console.error("Unknown role:", role);
        }

        console.log("Login successful!");
        console.log()
      })
      .catch((error) => {
       
        console.error("Error during login:", error);
      });
  };

  
  return (
    <div className="main_container_login" style={{ marginRight:"20px" }} >
      <div className="ui column">
      <h1 style={{ textAlign: "center" , marginBottom:"30px"}}>Login Form</h1>    
      <div className="ui centered card " style={{ width: "400px" }}>
      
      <div className="loginForm_container" style={{ margin: "20px", textAlign: "center" }}>
             
                  <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="exampleInputEmail1"
                          placeholder="Enter email"
                          value={email}
                          onChange={handleEmailChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="exampleInputPassword1"
                          placeholder="Password"
                          value={password}
                          onChange={handlePasswordChange}
                        />
                      </div>

  
              <div className="form-group">
                <label htmlFor="roleDropdown">Role</label>
                <select
                  className="form-control"
                  id="roleDropdown"
                  onChange={handleRoleChange}
                >
                  <option value={"manager"}>Manager</option>
                  <option value={"employee"}>Employee</option>
                  <option value={"hr"}>HR</option>
                </select>
              </div>

                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="exampleCheck1"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="exampleCheck1"
                        >
                          Remember Me
                        </label>
                      </div>
                
                    <div className="">
                      <button type="submit" className="ui teal button" style={{ marginTop: "20px", textAlign: "center" }}>
                        Submit
                      </button>
                    </div>
                  </form>
                
              </div>
          
              </div>
     </div>
  
    </div>
    
  );
};

export default Login;
