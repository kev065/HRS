import React, { useState, useEffect } from "react";
import { retrieve } from "../Encryption";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HRViewLeaves = () => {
  const [unapprovedLeaves, setUnapprovedLeaves] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get("/leaves", {
          headers: {
            Authorization: `Bearer ${retrieve().access_token}`,
          },
        });
        const filteredLeaves = response.data.filter(
          (leave) => leave.leave_approval.length === 0
        );
        setUnapprovedLeaves(filteredLeaves);
      } catch (error) {
        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError("An error occurred while fetching leaves");
        }
      }
    };

    fetchLeaves();
  }, []);

  const handleCreateLeaveApproval = (leave_id, employee_id, index) => {
    const values = {
      leave_id: leave_id,
      employee_id: employee_id,
      hr_id: retrieve().hr.id,
    };

    fetch("/leave_approvals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + retrieve().access_token,
      },
      body: JSON.stringify(values),
    })
      .then((resp) => {
        if (resp.ok) {
          resp
            .json()
            .then((data) => setSuccess("Laeve approval created successfully!"));
          //update state
          const updatedUnapprovedLeaves = [...unapprovedLeaves];
          updatedUnapprovedLeaves.splice(index, 1);
          setUnapprovedLeaves(updatedUnapprovedLeaves);
        } else {
          resp.json().then((error) => setError(error.error));
        }
      })
      .catch((err) => console.log("err", err));
  };

  return (
    <div className="container w-50 bg-white text-dark m-auto pt-4">
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      {unapprovedLeaves?.map((leave, index) => (
        <div key={leave.id} className="leave">
          <p className="fs-6">
            <span className="text-muted">Employee ID:</span>
            {leave.employee_id}
          </p>
          <p className="fs-6">
            <span className="text-muted">Start Date:</span>
            {new Date(leave.start_date).toDateString()}
          </p>
          <p className="fs-6">
            <span className="text-muted">End Date:</span>
            <span>{new Date(leave.end_date).toDateString()}</span>
          </p>
          <p className="fs-6">
            <span className="text-muted">Description:</span>
            {leave.description}
          </p>
          <button
            className="button approve"
            onClick={() =>
              handleCreateLeaveApproval(leave.id, leave.employee_id, index)
            }
          >
            Create Approval
          </button>
        </div>
      ))}
    </div>
  );
};

export default HRViewLeaves;
