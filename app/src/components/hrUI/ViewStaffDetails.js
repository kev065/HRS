import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import VerifyDocuments from './VerifyDocuments';
import { retrieve } from "../Encryption";

const ViewStaffDetails = () => {
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
          last_name: employee.profile ? employee.profile.last_name : null,
          phone_contact: employee.profile ? employee.profile.phone_contact : null,
          email: employee.profile ? employee.profile.email : null,
          mantra: employee.profile ? employee.profile.mantra : null
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

        <h1 style={{ marginLeft:"500px", marginBottom:"50px"}}>Staff Details</h1>
      <table className='ui striped table' style={{ width: "1200px", marginLeft:"60px",marginBottom:"20px"}}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone Contact</th>
            <th>Email</th>
            <th>Mantra</th>
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
              <td>{employee.phone_contact || 'N/A'}</td>
              <td>{employee.email || 'N/A'}</td>
              <td>{employee.mantra || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewStaffDetails;
