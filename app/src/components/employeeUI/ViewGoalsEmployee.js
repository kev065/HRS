import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { retrieve } from "../Encryption";

const Goals = () => {
    const [goals, setGoals] = useState([]);

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

    return (
        <div>
            <h1>My Goals</h1>
            <div>
                {goals.map((goal, index) => (
                    <div key={index}>
                        <h2>{index + 1}. {goal.name}</h2>
                        <p>{goal.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Goals;
