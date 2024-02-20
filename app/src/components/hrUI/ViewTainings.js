import React, { useState, useEffect } from 'react';
import CreateTraining from './CreateTraining';

const ViewTrainings = ({ trainings, setTrainings }) => {
    const [showCreateTraining, setShowCreateTraining] = useState(false);

    useEffect(() => {
        const fetchTrainings = () => {
            fetch('/trainings', {
                headers: {
                    Authorization: "Bearer " + "jwt"
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

    return (
        <div>
            <h2>Trainings</h2>
            <button onClick={() => setShowCreateTraining(true)}>Add Training</button>
            <ul>
                {trainings.map(training => (
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
