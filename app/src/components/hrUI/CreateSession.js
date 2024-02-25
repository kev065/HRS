import React, { useState, useEffect } from 'react';
import {retrieve} from "../Encryption"
import './createSession.css'

const CreateSession = ({sessions, setSessions, onClose}) => {
    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedGoal, setSelectedGoal] = useState('');
    const [goals, setGoals] = useState([]);
    useEffect(() => {
        fetch('/goals', {
          headers: {
            'Authorization': 'Bearer ' + retrieve().access_token,
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            // Assuming data is an array of goals with 'id' and 'name' properties
            // Update this based on your actual data structure
            setGoals(data);
          })
          .catch((error) => {
            console.error('Error fetching goals:', error);
          });
      }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newSession = {
            name: name,
            start_date: startDate,
            end_date: endDate,
            goals: selectedGoal,

        };

        fetch('/sessions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + retrieve().access_token,
            },
            body: JSON.stringify(newSession),
        })
        .then((resp) => {
            if (!resp.ok) {
                throw new Error(`HTTP error! Status: ${resp.status}`);
            }
            return resp.json();
        })
        .then((data) => {
            console.log('New Session:', data);
            setSessions([...sessions, data]);
            setName('');
            setStartDate('');
            setEndDate('');
            setSelectedGoal('');
            onClose();
        })
        .catch((error) => {
            console.error('Error creating session:', error);
        });

    }

    const handleExit = () => {
        onClose();
    };

  return (
    <div className="create-session-container">
        <h3>Add Sesion</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <br />
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
                Goal:
                <select value={selectedGoal} onChange={(e) => setSelectedGoal(e.target.value)} required>
                    <option value="">Select a Goal</option>
                    {goals.map((goal) => (
                    <option key={goal.id} value={goal.id}>
                        {goal.name}
                    </option>
                    ))}
                </select>
                </label>
                <button type="submit">Create Session</button>
            </form>
            <button className="exit-button" onClick={handleExit}>Exit</button>
    </div>
  )
}

export default CreateSession