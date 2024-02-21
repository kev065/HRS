import React, { useState } from 'react';

const UpdateTrainings = ({ training, trainings, setTrainings }) => {
    const [title, setTitle] = useState(training.title);
    const [description, setDescription] = useState(training.description);
    const [startDate, setStartDate] = useState(training.start_date);
    const [startTime, setStartTime] = useState(training.start_time);
    const [endDate, setEndDate] = useState(training.end_date);
    const [endTime, setEndTime] = useState(training.end_time);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedTraining = {
            id: training.id,
            title,
            description,
            start_date: startDate,
            start_time: startTime,
            end_date: endDate,
            end_time: endTime,
        };

        fetch(`/trainings/${training.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify(updatedTraining),
        })
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error('Failed to update training');
                }
                return resp.json();
            })
            .then((updatedData) => {
                console.log('Updated Training:', updatedData);
              
                const updatedTrainings = trainings.map((trainingItem) => {
                    if (trainingItem.id === updatedData.id) {
                        return updatedData;
                    }
                    return trainingItem;
                });
                setTrainings(updatedTrainings);
            })
            .catch((error) => {
                console.error('Error updating training:', error);
            });
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
                <button type="submit">Update Training</button>
            </form>

        </div>
    );
};

export default UpdateTrainings;
