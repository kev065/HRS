import React, { useState, useEffect } from 'react';
import CreateTraining from './CreateTraining';

const ViewTrainings = ({ trainings, setTrainings }) => {
    const [showCreateTraining, setShowCreateTraining] = useState(false);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    useEffect(() => {
        const fetchTrainings = () => {
            fetch('/trainings', {
                headers: {
                    'Authorization': "Bearer " + localStorage.getItem("jwt")
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch trainings');
                    }
                    return response.json();
                })
                .then(data => setTrainings(data))
                .catch(error => console.error('Error fetching trainings:', error));
        };

        fetchTrainings();
    }, [setTrainings]);

    const handleCreateTrainingClose = () => {
        setShowCreateTraining(false);
    };

  
    const filteredTrainings = trainings.filter(training => {
        const startDate = new Date(training.start_date);
        const endDate = new Date(training.end_date);
        const from = fromDate ? new Date(fromDate) : null;
        const to = toDate ? new Date(toDate) : null;

        if (from && startDate < from) return false;
        if (to && endDate > to) return false;

        return true;
    });

    return (
        <div>
            <h2>Trainings</h2>
            <div>
                <label htmlFor="fromDate">From: </label>
                <input type="date" id="fromDate" value={fromDate} onChange={e => setFromDate(e.target.value)} />
                <label htmlFor="toDate">To: </label>
                <input type="date" id="toDate" value={toDate} onChange={e => setToDate(e.target.value)} />
            </div>
            <button onClick={() => setShowCreateTraining(true)}>Add Training</button>
            <ul>
                {filteredTrainings.map(training => (
                    <li key={training.id}>
                        {training.title} - {training.start_date} {training.start_time} to {training.end_date} {training.end_time}
                    </li>
                ))}
            </ul>
            {showCreateTraining && <CreateTraining onClose={handleCreateTrainingClose} trainings={trainings} setTrainings={setTrainings} />}
        </div>
    );
};

export default ViewTrainings;
