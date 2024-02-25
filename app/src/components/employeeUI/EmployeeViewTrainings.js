import React, { useState, useEffect } from 'react';
import { retrieve } from '../Encryption';

const EmployeeViewTrainings = () => {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);

  const employeeId = retrieve().employee.id;

  useEffect(() => {
    const fetchTrainings = () => {
      fetch(`/single_employee_trainings/${employeeId}`, {
        headers: {
          "Authorization": "Bearer " + retrieve().access_token
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch trainings');
          }
          return response.json();
        })
        .then(data => {
          setTrainings(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching trainings:', error);
          setLoading(false);
        });
    };

    fetchTrainings();
  }, [employeeId]);

  return (
    <div className='content-wrapper' style={{ marginLeft: "280px", backgroundColor: "white", marginTop: "20px" }}>
      {loading && <div>Loading...</div>}
      {!loading && trainings.length === 0 && <h3>No trainings found for you.</h3>}
      {trainings.length > 0 && (
        <div>
          <h2>Trainings for Employee ID: {employeeId}</h2>
          <table  className="ui striped table" style={{ width: "1200px",marginBottom:"20px"}}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Start Date</th>
                <th>Start Time</th>
                <th>End Date</th>
                <th>End Time</th>
              </tr>
            </thead>
            <tbody>
              {trainings.map((training, index) => (
                <tr key={index}>
                  <td>{training.title}</td>
                  <td>{training.description}</td>
                  <td>{training.start_date}</td>
                  <td>{training.start_time}</td>
                  <td>{training.end_date}</td>
                  <td>{training.end_time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeeViewTrainings;
