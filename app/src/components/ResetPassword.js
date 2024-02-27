import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { retrieve } from "./Encryption";


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
    console.log("Access Token:", accessToken);
    console.log("Email:", email);
    console.log("Access Token:", accessToken);
    // Make a POST request to your backend API
    try {
      const response = await fetch("/reset_password/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,

        },
        body: JSON.stringify(resetData),
      });

      if (response.ok) {
        // Password reset successfully
        console.log("Password reset successfully");
        navigate("/login"); // Redirect to login page or a success page
      } else {
        // Handle error response from the server
        const errorData = await response.json();
        console.error("Password reset failed:", errorData.message);
      }
    } catch (error) {
      console.error("Error during password reset:", error);
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} required />
        </div>
        <div>
          <label>New Password:</label>
          <input type="password" value={newPassword} onChange={handleNewPasswordChange} required />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} required />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;