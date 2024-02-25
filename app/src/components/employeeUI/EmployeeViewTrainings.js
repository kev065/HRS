import React, { useState, useEffect } from 'react';
import { retrieve } from '../Encryption';

const EmployeeViewTrainings = () => {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);

  const employeeId=retrieve().employee.id

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
    <div className='content-wrapper' style={{ marginLeft: "280px", backgroundColor:"white", marginTop:"20px"}}>

      {loading && <div>Loading...</div>}
      {!loading && trainings.length === 0 && <h3>No trainings found for you.</h3>}
      {trainings.length > 0 && (
        <div>
          <h2>Trainings for Employee ID: {employeeId}</h2>
          <ul>
            {trainings.map((training, index) => (
              <li key={index}>
                <h3>{training.title}</h3>
                <p><strong>Description:</strong> {training.description}</p>
                <p><strong>Start Date:</strong> {training.start_date}</p>
                <p><strong>Start Time:</strong> {training.start_time}</p>
                <p><strong>End Date:</strong> {training.end_date}</p>
                <p><strong>End Time:</strong> {training.end_time}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EmployeeViewTrainings;
