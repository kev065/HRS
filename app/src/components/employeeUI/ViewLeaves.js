import React, { useState, useEffect } from 'react';
import { retrieve } from "../Encryption";
import { useNavigate } from 'react-router-dom';
import ApplyLeave from './ApplyLeave';

const ViewLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [showAddLeave, setShowAddLeave] = useState(false);
  const navigate = useNavigate();
  const today = new Date();
  const employee_id=retrieve().employee.id

  useEffect(() => {
    const fetchLeaves = () => {
      fetch(`/employee_leaves/${employee_id}`, {
        headers: {
          "Authorization": "Bearer " + retrieve().access_token
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch Leaves');
          }
          return response.json();
        })
        .then(data => {
          setLeaves(data);
        })
        .catch(error => {
          console.error('Error fetching leaves:', error);
        });
    };

    fetchLeaves();
  }, []);

  const handleUpdateLeave = (leave) => {
    navigate(`/update_leave/${leave.id}`);
  };

  const handleDeleteLeave = (leaveId) => {
    fetch(`/leaves/${leaveId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + retrieve().access_token,
      },
    })
      .then((res) => {
        console.log("RES: ", res);

        setLeaves(leaves.filter(leave => leave.id !== leaveId));
      })
      .catch((err) => {
        console.log(err);
        throw new Error(err);
      });
  };

  const handleViewLeave = (leave) => {
    navigate(`/leave/${leave.id}`);
  };

  const showButtons = (leave) => {
    return !leave.approved;
  };

  const handleAddLeaveClose = () => {
    setShowAddLeave(false);
  };

  return (
    <div className='content-wrapper' style={{ marginLeft: "280px", backgroundColor:"white", marginTop:"20px"}}>
      <h2>Leave Applications</h2>
      <table>
        <thead>
          <tr>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Description</th>
            <th>Approved</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map(leave => (
            <tr key={leave.id}>
             <td>{new Date(leave.start_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
             <td>{new Date(leave.end_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
              <td>{leave.description}</td>
              <td>{leave.approved ? 'Yes' : 'No'}</td>
              <td>
                {showButtons(leave) && (
                  <>
                    <button onClick={() => handleUpdateLeave(leave)}>Update</button>
                    <button onClick={() => handleDeleteLeave(leave.id)}>Delete</button>
                  </>
                )}
                {/* <button onClick={() => handleViewLeave(leave)} disabled={!showButtons(leave)}>View</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showAddLeave && <ApplyLeave onClose={handleAddLeaveClose} leaves={leaves} setLeaves={setLeaves} />}
      <button onClick={() => setShowAddLeave(true)}>Apply for Leave</button>
    </div>
  );
};

export default ViewLeaves;