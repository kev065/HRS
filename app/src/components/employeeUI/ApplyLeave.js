import React, { useState } from 'react';
import { retrieve } from "../Encryption";

const ApplyLeave = ({ onClose ,leaves,setLeaves}) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [description, setDescription] = useState('');
    const employeeId=retrieve().employee.id

    const handleSubmit = (e) => {
        e.preventDefault();

        const newLeave = {
            start_date: startDate,
            end_date: endDate,
            description: description
  
        };

        fetch('/leaves', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + retrieve().access_token,
            },
            body: JSON.stringify(newLeave),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log('New Leave Application:', data);
                setLeaves([...leaves,data])
                setEndDate("")
                setStartDate("")
                setDescription("")
                onClose()

               
            })
            .catch((error) => {
                console.error('Error applying for leave:', error);
            });
    };

    const handleExit = () => {
        onClose(); 
    };

    return (
        <div className='content-wrapper' style={{ marginLeft: "10px", backgroundColor:"white", marginTop:"40px"}}>
            <h2>Apply for Leave</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Start Date:
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                </label>
                <br />
                <label>
                    End Date:
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                </label>
                <br />
                <label>
                    Description:
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                </label>
                <br />
                <button type="submit">Apply</button>
            </form>
            <button onClick={handleExit}>Exit</button>
        </div>
    );
};

export default ApplyLeave;
