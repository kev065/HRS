import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { retrieve } from "../Encryption";

const UpdateTrainings = () => {
    const { id } = useParams();
    const [training, setTraining] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [start_date, setStartDate] = useState('');
    const [end_date, setEndDate] = useState('');
    const [start_time, setStartTime] = useState('');
    const [end_time, setEndTime] = useState('');
    
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/trainings/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + retrieve().access_token,
            },
        })
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error('Failed to update training');
                }
                return resp.json();
            })
            .then((data) => {
                // Format the dates received from the server
                const formattedStartDate = data.start_date.split('T')[0];
                const formattedEndDate = data.end_date.split('T')[0];
                setTraining(data);
                setTitle(data.title);
                setDescription(data.description);
                setStartDate(formattedStartDate);
                setEndDate(formattedEndDate);
                setStartTime(data.start_time.substring(0, 5));
                setEndTime(data.end_time.substring(0, 5));
            })
            .catch((error) => {
                console.error('Error updating training:', error);
            });

    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedTraining = {
            id: id,
            title: title,
            description: description,
            start_date: start_date,
            start_time: start_time + ":00",
            end_date: end_date,
            end_time: end_time + ":00",
        };

        fetch(`/trainings/${training.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + retrieve().access_token,
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
                navigate('/hr/training_page');
            })
            .catch((error) => {
                console.error('Error updating training:', error);
            });
    };

    return (
        <div className='content-wrapper' style={{ marginLeft: "280px", backgroundColor:"white", marginTop:"20px"}}>
            <h3>Update Training</h3>
            {training && <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </label>
                <br />
                <label>
                    Description:
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                </label>
                <br />
                <label>
                    Start Date:
                    <input type="date" value={start_date} onChange={(e) => setStartDate(e.target.value)} required />
                </label>
                <br />
                <label>
                    Start Time:
                    <input type="time" value={start_time} onChange={(e) => setStartTime(e.target.value)} required />
                </label>
                <br />
                <label>
                    End Date:
                    <input type="date" value={end_date} onChange={(e) => setEndDate(e.target.value)} required />
                </label>
                <br />
                <label>
                    End Time:
                    <input type="time" value={end_time} onChange={(e) => setEndTime(e.target.value)} required />
                </label>
                <br />
                <button type="submit">Update Training</button>
            </form>}
        </div>
    );
};

export default UpdateTrainings;
