import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { retrieve } from "../Encryption";

const Goals = () => {
    const [goals, setGoals] = useState([]);
    const [goal, setGoal] = useState({
        name: '',
        description: '',
        session_id: ''
    });

    useEffect(() => {
        axios.get('http://localhost:5555/goals', {
            headers: {
                "Authorization": "Bearer " + retrieve().access_token
            }
        })
        .then(res => {
            setGoals(res.data);
        })
        .catch(err => {
            console.error(err);
        });
    }, []);

    const handleChange = e => {
        setGoal({ ...goal, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios.post('http://localhost:5555/goals', goal, {
            headers: {
                "Authorization": "Bearer " + retrieve().access_token
            }
        })
        .then(res => {
            setGoals([...goals, res.data]);
            setGoal({
                name: '',
                description: '',
                session_id: ''
            });
        })
        .catch(err => {
            console.error(err);
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={goal.name} onChange={handleChange} placeholder="Name" required />
                <textarea name="description" value={goal.description} onChange={handleChange} placeholder="Description" required />
                <input type="text" name="session_id" value={goal.session_id} onChange={handleChange} placeholder="Session ID" required />
                <button type="submit">Add Goal</button>
            </form>
            <div>
                {goals.map((goal, index) => (
                    <div key={index}>
                        <h2>{goal.name}</h2>
                        <p>{goal.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Goals;
