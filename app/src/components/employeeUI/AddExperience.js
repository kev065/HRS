import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { retrieve } from "../Encryption";
import './Experience.css';

// formats the date
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const formatDateForBackend = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
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
    const [message, setMessage] = useState(''); 

    // fetch experiences
    useEffect(() => {
        axios.get('/experiences', {
            headers: {
                'Authorization': `Bearer ${retrieve().access_token}`
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
        // Make a POST request flask backend for the new experience
        const newExperience = experiences[experiences.length - 1];
        // format the dates
        newExperience.start_date = formatDateForBackend(newExperience.start_date);
        newExperience.end_date = formatDateForBackend(newExperience.end_date);
        axios.post('/experiences', newExperience, {
            headers: {
                'Authorization': `Bearer ${retrieve().access_token}`
            }
        })
        .then(res => {
            console.log(res.data);
            // Add the new experience to the state
            setExperiences(prevExperiences => [...prevExperiences, res.data]);
            // Add a new empty experience to the state for the form
            setExperiences(prevExperiences => [...prevExperiences, {
                name: '',
                job_title: '',
                description: '',
                start_date: '',
                end_date: ''
            }]);
            setMessage('Experience added successfully!'); 
        })
        .catch(err => {
            console.error(err);
            setMessage('Error adding experience.'); 
        });
    };
    

    const handleUpdate = (event, id, updatedExperience) => {
        event.preventDefault();
        axios.put(`/experiences/${id}`, updatedExperience, {
            headers: {
                'Authorization': `Bearer ${retrieve().access_token}`
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
    
    const handleDelete = (event, id) => {
        event.preventDefault();
        axios.delete(`/experiences/${id}`, {
            headers: {
                'Authorization': `Bearer ${retrieve().access_token}`
            }
        })
        .then(res => {
            // Remove the deleted experience 
            setExperiences(experiences.filter(exp => exp.id !== id));
            setMessage('Experience deleted successfully!');
        })
        .catch(err => {
            console.error(err);
            setMessage('Error deleting experience.'); 
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


    return (
        <div style={{ marginLeft: "280px", backgroundColor:"white", marginTop:"20px"}}>
            <form onSubmit={handleSubmit}>
                {experiences.map((experience, index) => (
                    <div key={index} className="experience">
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
                        <button type="button" className="update-button" onClick={(event) => handleUpdate(event, experience.id, experience)}>Update</button>
                        <button type="button" className="delete-button" onClick={(event) => handleDelete(event, experience.id)}>Delete</button>
                    </div>
                ))}
                <button type="button" className="add-button" onClick={addExperience}>Add Another Experience</button>
                <button type="submit" className="submit-button">Submit</button>
            </form>
            {message && <p>{message}</p>} 
        </div>
    );
};

export default Experience;

