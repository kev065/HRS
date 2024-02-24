import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { retrieve } from "../Encryption";
import './ViewGoalsEmployee.css';

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
        <div className="container">
          <div className="title-container">
            <h1 className="title-animation">My Goals<span></span></h1>
          </div>
          <div>
            {goals.map((goal, index) => (
              <div key={index} className="goal">
                <h2>{index + 1}. {goal.name}</h2>
                <p>{goal.description}</p>
              </div>
            ))}
          </div>
        </div>
      );
    };
    
export default Goals;
