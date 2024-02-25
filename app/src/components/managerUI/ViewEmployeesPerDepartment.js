import React, { useState, useEffect } from 'react';
import { retrieve } from '../Encryption';

const ViewEmployeesPerDepartment = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const managerId=retrieve().manager.id

  useEffect(() => {
   
    fetch(`/employees_department/${managerId}`, {
        headers: {
          "Authorization": "Bearer " + retrieve().access_token,
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => {
        setEmployees(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='content-wrapper' style={{ marginLeft: "280px", backgroundColor:"white", marginTop:"20px"}}>
      <h2>Employees in my Department</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
          
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Contact</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              
              <td>{employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.email}</td>
              <td>{employee.phone_contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewEmployeesPerDepartment;
