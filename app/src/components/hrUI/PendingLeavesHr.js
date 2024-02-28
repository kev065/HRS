import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PendingLeavesHr.css';
import { retrieve } from "../Encryption";

const PendingLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get('/leave_approvals', {
          headers: {
            'Authorization': `Bearer ${retrieve().access_token}`
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
      const response = await axios.patch(`/leave_approvals/${leaveId}`, { hr_approval: true }, {
        headers: {
          'Authorization': `Bearer ${retrieve().access_token}`
        }
      });
      console.log('Leave approved:', response.data);
      setSuccess('Leave approved'); 
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
      const response = await axios.patch(`/leave/approval/${leaveId}`, { hr_approval: false }, {
        headers: {
          'Authorization': `Bearer ${retrieve().access_token}`
        }
      });
      console.log('Leave declined:', response.data);
      setSuccess('Leave declined');
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
      {success && <p className="success">{success}</p>} 
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

export default PendingLeaves;
