import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { retrieve } from "./Encryption";
import './resetPassword.css'



const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    const resetData = {
      email,
      new_password: newPassword,
    };

    const accessToken = retrieve().access_token
    
    
    try {
        const requestResponse = await fetch("/reset_password/request", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
  
        if (!requestResponse.ok) {
          const errorData = await requestResponse.json();
          console.error("Password reset request failed:", errorData.message);
          return;
        }
      } catch (error) {
        console.error("Error during password reset request:", error);
        return;
      }

      try {
        const verifyResponse = await fetch("/reset_password/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, new_password: newPassword }),
        });
  
        if (verifyResponse.ok) {
          console.log("Password reset successfully");
          navigate("/login"); // Redirect to login page or a success page
        } else {
          const errorData = await verifyResponse.json();
          console.error("Password reset failed:", errorData.message);
        }
      } catch (error) {
        console.error("Error during password reset:", error);
      }
    };
    

    

  return (
    <div className="Reset-Passowrd"> 
        <div className="Reset-password-Content">
            <h1>Reset Password</h1>
            <form onSubmit={handleSubmit} className="Reset-Passowrd-Form">
                <div className="Email-Card">
                <label>Email:</label>
                <input type="email" value={email} onChange={handleEmailChange} required />
                </div>
                <div className="New-Password-Card">
                <label>New Password:</label>
                <input type="password" value={newPassword} onChange={handleNewPasswordChange} required />
                </div>
                <div className="Confirm-Password-Card">
                <label>Confirm Password:</label>
                <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} required />
                </div>
                <button className="Reset-Password" type="submit">Reset Password</button>
            </form>
         </div>
    </div>
    
  );
};

export default ResetPassword;