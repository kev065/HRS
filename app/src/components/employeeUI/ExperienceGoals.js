import React, { useState, useEffect } from 'react';
import axios from 'axios';

// formats the date
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed in JavaScript
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};


const formatDateForBackend = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed in JavaScript
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
};



// Experience
const Experience = () => {
    const [experiences, setExperiences] = useState([{
        name: '',
        job_title: '',
        description: '',
        start_date: '',
        end_date: ''
    }]);

    // token
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwODU5NjcyMywianRpIjoiN2RlZWNlY2YtZDJmNy00YzkzLWFiOGQtYjhiYjZhZDIxZGEzIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjNlMjFiOTVjLTQ5MzgtNDE1Mi1iNTIxLTAwYzU1ZTYwOThkNCIsIm5iZiI6MTcwODU5NjcyMywiY3NyZiI6IjIzNmFmOWFkLTMyNjYtNDA5My05Mjg3LWMyZWYxNDdhOTVkYiIsImV4cCI6MTcwODY4MzEyMywiaXNfZW1wbG95ZWUiOnRydWUsInJvbGUiOiJlbXBsb3llZSJ9.rND706TWSYOZ1Cz3I3PwiARiIKia9G8JxflZQmMkYQg";

    // fetch experiences
    useEffect(() => {
        axios.get('http://localhost:5555/experiences', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            // Format the dates
            const formattedExperiences = res.data.map(exp => ({
                ...exp,
                start_date: formatDate(exp.start_date),
                end_date: formatDate(exp.end_date)
            }));
            setExperiences(formattedExperiences);
        })
        .catch(err => {
            console.error(err);
        });
    }, []);
    

    const handleChange = (e, index) => {
        const updatedExperiences = [...experiences];
        updatedExperiences[index][e.target.name] = e.target.value;
        setExperiences(updatedExperiences);
    };
    

    const handleSubmit = e => {
        e.preventDefault();
        // Make a POST request flask backend for each experience
        experiences.forEach(experience => {
            // format the dates
            experience.start_date = formatDateForBackend(experience.start_date);
            experience.end_date = formatDateForBackend(experience.end_date);
            axios.post('http://localhost:5555/experiences', experience, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
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
        // Fetch experiences from the database
        axios.get('http://localhost:5555/experiences', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            // Format the dates
            const formattedExperiences = res.data.map(exp => ({
                ...exp,
                start_date: formatDate(exp.start_date),
                end_date: formatDate(exp.end_date)
            }));
            setExperiences(formattedExperiences);
        })
        .catch(err => {
            console.error(err);
        });
    };
    


    const handleUpdate = (id, updatedExperience) => {
        axios.put(`http://localhost:5555/experiences/${id}`, updatedExperience, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            // Update the experiences state with the updated experience
            setExperiences(experiences.map(exp => exp.id === id ? res.data : exp));
        })
        .catch(err => {
            console.error(err);
        });
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5555/experiences/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            // Remove the deleted experience 
            setExperiences(experiences.filter(exp => exp.id !== id));
        })
        .catch(err => {
            console.error(err);
        });
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

    // Experience
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
                    <button onClick={() => handleUpdate(experience.id, experience)}>Update</button>
                    <button onClick={() => handleDelete(experience.id)}>Delete</button>
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
