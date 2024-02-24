import React, { useState } from 'react';
import axios from 'axios';
import { retrieve } from "../Encryption";

const DeleteEmployeeForm = () => {
    const [employeeId, setEmployeeId] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.delete(`http://localhost:5555/employees/${employeeId}`, {
                headers: {
                    'Authorization': `Bearer ${retrieve().access_token}`
                }
            });
            setMessage('Employee successfully deleted');
        } catch (error) {
            console.error('Error deleting employee:', error);
            setMessage('Error deleting employee.');
        }
    };

    return (
        <div style={{ marginLeft: "280px", backgroundColor:"white", marginTop:"20px"}}>
            <form onSubmit={handleSubmit}>
                <label>
                    Employee ID:
                    <input type="text" value={employeeId} onChange={e => setEmployeeId(e.target.value)} required />
                </label>
                <button type="submit">Delete Employee</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default DeleteEmployeeForm;

