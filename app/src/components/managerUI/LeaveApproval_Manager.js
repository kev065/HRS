import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { retrieve } from "../Encryption";
import './ManagerPendingLeaves.css';

const ManagerPendingLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); 

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get('http://localhost:5555/leaves', {
            headers: {
                "Authorization": "Bearer " + retrieve().access_token
            }
        });
        setLeaves(response.data);
      } catch (error) {
        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError('An error occurred while fetching leaves');
        }
      }
    };

    fetchLeaves();
  }, []);

  const handleApprove = async (leaveId) => {
    try {
      const response = await axios.patch(`http://localhost:5555/leave_approvals/${leaveId}`, { manager_approval: true }, {
            headers: {
                "Authorization": "Bearer " + retrieve().access_token
            }
        });
      setSuccess('Leave approved successfully'); // Set success message
      console.log('Leave approved:', response.data);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred while approving leave');
      }
    }
  };

  const handleDecline = async (leaveId) => {
    try {
      const response = await axios.patch(`http://localhost:5555/leave_approvals/${leaveId}`, { manager_approval: false }, {
            headers: {
                "Authorization": "Bearer " + retrieve().access_token
            }
        });
      setSuccess('Leave declined successfully'); 
      console.log('Leave declined:', response.data);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred while declining leave');
      }
    }
  };

  return (
    <div className="container">
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>} {/* Display success message */}
      {leaves.map((leave) => (
        <div key={leave.id} className="leave">
          <p>Employee ID: {leave.employee_id}</p>
          <p>Start Date: {new Date(leave.start_date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          <p>End Date: {new Date(leave.end_date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          <p>Description: {leave.description}</p>
          <button className="button approve" onClick={() => handleApprove(leave.id)}>Approve</button>
          <button className="button decline" onClick={() => handleDecline(leave.id)}>Decline</button>
        </div>
      ))}
    </div>
  );
};

export default ManagerPendingLeaves;


