import React, { useState } from 'react';
import {retrieve} from "../Encryption"

const CreateTraining = ({ trainings, setTrainings, onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endDate, setEndDate] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTraining = {
            title,
            description,
            start_date: startDate,
            start_time: startTime + ":00",
            end_date: endDate,
            end_time: endTime + ":00",
        };

        fetch('/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                 "Authorization": "Bearer " + retrieve().access_token,
            },
            body: JSON.stringify(newTraining),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log('New Training:', data);
                setTrainings([...trainings, data]);

                setTitle('');
                setDescription('');
                setStartDate('');
                setStartTime('');
                setEndDate('');
                setEndTime('');
            })
            .catch((error) => {
                console.error('Error creating training:', error);
            });
    };

    const handleExit = () => {
        onClose();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </label>
                <br />
                <label>
                    Description:
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                </label>
                <br />
                <label>
                    Start Date:
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                </label>
                <br />
                <label>
                    Start Time:
                    <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
                </label>
                <br />
                <label>
                    End Date:
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                </label>
                <br />
                <label>
                    End Time:
                    <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
                </label>
                <br />
                <button type="submit">Create Training</button>
            </form>
            <button onClick={handleExit}>Exit</button>
        </div>
    );
};

export default CreateTraining;
