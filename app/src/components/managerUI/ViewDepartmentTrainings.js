import React, { useState, useEffect } from 'react';
import { retrieve } from '../Encryption';
import { useNavigate } from 'react-router-dom';

function ViewDepartmentTrainings() {
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState(null);
    const managerId = retrieve().manager.id;
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/manager/employees/${managerId}`, {
            headers: {
                Authorization: "Bearer " + retrieve().access_token,
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            return response.json();
        })
        .then(data => {
            setEmployees(data); 
        })
        .catch(error => {
            setError(error.message);
        });
    }, [managerId]); 

    const handleRecommend = (employeeId) => {
        navigate(`/manager/recommend_training/${employeeId}`);
        console.log(`Employee ${employeeId} recommended for training`);
    };

    

    return (
        <div className='content-wrapper' style={{ marginLeft: "280px", backgroundColor:"white", marginTop:"20px"}}>
            <h1>Training for my Department Staff </h1>
            {error && <p>{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Assigned Trainings</th>
                        <th>Recommend for Training</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.first_name}</td>
                            <td>{employee.last_name}</td>
                            <td>{employee.email}</td>
                            <td>
                                <ul>
                                    {employee.assigned_trainings.map(training => (
                                      
                                        <li key={training.id}>
                                            {training.id} {training.title} - {training.start_date} to {training.end_date}, {training.start_time} to {training.end_time}
                                         
                                           
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td>
                                <button onClick={() => handleRecommend(employee.id)}>Recommend More Training</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewDepartmentTrainings;
