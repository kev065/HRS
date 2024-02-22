import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import VerifyDocuments from './VerifyDocuments';
import { retrieve } from "../Encryption";

const ViewEmployees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch('/employeeProfiles', {
      headers: {
        "Authorization": "Bearer " + retrieve().access_token,
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch employee profiles');
        }
        return response.json();
      })
      .then(data => {
        setEmployees(data); 
      })
      .catch(error => {
        console.error('Error fetching employee profiles:', error);
      });
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Documents</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(employee => (
          <tr key={employee.id}>
            <td>{employee.id}</td>
            <td>{employee.first_name} {employee.last_name}</td>
            <td>
              <Link to={`/verify_documents/${employee.id}`}>Verify documents</Link> 
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ViewEmployees;
