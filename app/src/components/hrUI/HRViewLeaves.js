import React, { useState, useEffect } from "react";
import { retrieve } from "../Encryption";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const HRViewLeaves = () => {
    const navigate = useNavigate();
    const [leaves, setLeaves] = useState([]);
    const [managers, setManagers] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [selected_Manager, setSelected_Manager] = useState("");
    const [message, setMessage] = useState(null);

    const handleCreateLeaveApproval = async (leave_id, employee_id) => {
        const values = {
            leave_id: leave_id,
            employee_id: employee_id,
            manager_id: selected_Manager,
            hr_id: retrieve().hr.id
        }

        try {
            const response = await axios.post('/leave_approvals', values, {
              headers: {
                "Authorization": "Bearer " + retrieve().access_token
              }
            });
            console.log('New Goal:', response.data);
            setMessage('Goal added successfully!'); 
          } catch (error) {
            console.error('Error adding goal:', error);
            setMessage('Error adding goal.'); 
          }
    };

    useEffect(() => {
        const fetchLeaves = async () => {
            try {
                const response = await axios.get('/leaves', {
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

        axios.get('/managers_with_names', {
            headers: {
              "Authorization": "Bearer " + retrieve().access_token
            }
          })
          .then(res => {
            setManagers(res.data);
          })
          .catch(err => {
            console.error(err);
          });
    }, []);

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
          <select
              id="employee_id"
              className="form-control"
              name="employee_id"
              value={managers.id}
              onChange={e=>setSelected_Manager(e.target.value)}
              required={!managers.id} 
              // placeholder="Choose employee"
            >
              <option value="">Choose Manager</option>
              {managers.map((manager) => (
                <option key={manager.id} value={manager.id}>
                  {manager.name}
                </option>
              ))}
            </select>
            <label class="form-label" for="month">
              Manager
            </label>
          <button className="button approve" onClick={() => handleCreateLeaveApproval(leave.id, leave.employee_id)}>Create Approval</button>
        </div>
      ))}
    </div>
    );
};

export default HRViewLeaves;
