import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PendingLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get('http://localhost:5555/leaves');
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
      const response = await axios.patch(`http://localhost:5555/leave/approval/${leaveId}`, { hr_approval: true });
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
      const response = await axios.patch(`http://localhost:5555/leave/approval/${leaveId}`, { hr_approval: false });
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
    <div>
      {error && <p>{error}</p>}
      {leaves.map((leave) => (
        <div key={leave.id}>
          <p>Employee ID: {leave.employee_id}</p>
          <p>Start Date: {new Date(leave.start_date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          <p>End Date: {new Date(leave.end_date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          <p>Description: {leave.description}</p>
          <button onClick={() => handleApprove(leave.id)}>Approve</button>
          <button onClick={() => handleDecline(leave.id)}>Decline</button>
        </div>
      ))}
    </div>
  );
};

export default PendingLeaves;


