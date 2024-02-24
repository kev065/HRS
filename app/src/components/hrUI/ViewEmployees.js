import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import VerifyDocuments from './VerifyDocuments';
import { retrieve } from "../Encryption";

const ViewEmployees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch('/employees_details', {
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
        console.log(data); 
     
        const extractedEmployees = data.map(employee => ({
          id: employee.id,
          first_name: employee.profile ? employee.profile.first_name : null,
          last_name: employee.profile ? employee.profile.last_name : null
        }));
        setEmployees(extractedEmployees);
        console.log(extractedEmployees);
      })
      .catch(error => {
        console.error('Error fetching employee profiles:', error);
      });
  }, []);

  return (
    <div className='content-wrapper' style={{ marginLeft: "280px", backgroundColor:"white", marginTop:"20px"}}>
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
              <td>
                {employee.first_name && employee.last_name ? 
                  `${employee.first_name} ${employee.last_name}` : 
                  'N/A'
                }
              </td>
              <td>
                <Link to={`/hr/verify_documents/${employee.id}`}>Verify documents</Link> 
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewEmployees;
