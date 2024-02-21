import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManagerApprovedLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/leave/approvals?date=${date}`);
        const approvedLeaves = response.data.leave_approvals.filter(leave => leave.approved_by_manager);
        setLeaves(approvedLeaves);
      } catch (error) {
        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError('An error occurred while fetching leaves');
        }
      }
    };

    fetchLeaves();
  }, [date]);

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  return (
    <div>
      <label>
        Date:
        <input type="date" value={date} onChange={handleDateChange} />
      </label>
      {error && <p>{error}</p>}
      {leaves.map((leave) => (
        <div key={leave.leave_id}>
          <p>Employee ID: {leave.employee_id}</p>
          <p>Manager Approval Date: {new Date(leave.manager_app_date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          <p>Status: Approved by Manager</p>
        </div>
      ))}
    </div>
  );
};

export default ManagerApprovedLeaves;
