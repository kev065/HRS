import React, { useState } from 'react';
import axios from 'axios';

// Experience
const Experience = () => {
    const [experiences, setExperiences] = useState([{
        name: '',
        job_title: '',
        description: '',
        start_date: '',
        end_date: ''
    }]);

    const handleChange = (e, index) => {
        const updatedExperiences = [...experiences];
        updatedExperiences[index][e.target.name] = e.target.value;
        setExperiences(updatedExperiences);
    };

    const handleSubmit = e => {
        e.preventDefault();
        // POST request to Flask backend for each experience
        experiences.forEach(experience => {
            axios.post('http://localhost:5555/experiences', experience)
                .then(res => {
                    console.log(res.data);
                })
                .catch(err => {
                    console.error(err);
                });
        });
        // Clear the form
        setExperiences([{
            name: '',
            job_title: '',
            description: '',
            start_date: '',
            end_date: ''
        }]);
    };

    const addExperience = () => {
        setExperiences([...experiences, {
            name: '',
            job_title: '',
            description: '',
            start_date: '',
            end_date: ''
        }]);
    };

    return (
        <form onSubmit={handleSubmit}>
            {experiences.map((experience, index) => (
                <div key={index}>
                    <input type="text" name="name" value={experience.name} onChange={e => handleChange(e, index)} placeholder="Name" required />
                    <input type="text" name="job_title" value={experience.job_title} onChange={e => handleChange(e, index)} placeholder="Job Title" required />
                    <textarea name="description" value={experience.description} onChange={e => handleChange(e, index)} placeholder="Description" required />
                    <label>
                        Start Date:
                        <input type="date" name="start_date" value={experience.start_date} onChange={e => handleChange(e, index)} required />
                    </label>
                    <label>
                        End Date:
                        <input type="date" name="end_date" value={experience.end_date} onChange={e => handleChange(e, index)} required />
                    </label>
                </div>
            ))}
            <button type="button" onClick={addExperience}>Add Another Experience</button>
            <button type="submit">Submit</button>
        </form>
    );

};

// Goals
const Goals = () => {
    const [goal, setGoal] = useState({
        name: '',
        description: '',
        session_id: ''
    });

    const handleChange = e => {
        setGoal({ ...goal, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        // request to flask
        axios.post('http://localhost:5555/goals', goal)
            .then(res => {
                console.log(res.data);
                // Clear the form
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
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={goal.name} onChange={handleChange} placeholder="Name" required />
            <textarea name="description" value={goal.description} onChange={handleChange} placeholder="Description" required />
            <input type="text" name="session_id" value={goal.session_id} onChange={handleChange} placeholder="Session ID" required />
            <button type="submit">Add Goal</button>
        </form>
    );
};

export { Experience, Goals };
