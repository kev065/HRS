import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { retrieve } from "../Encryption";
import './updateSession.css'

const UpdateSession = () => {
    const { id } = useParams();
    const [session, setSession] = useState(null);
    const [name, setName] = useState('');
    const [start_date, setStartDate] = useState('');
    const [end_date, setEndDate] = useState('');

    const navigate = useNavigate();
   
    useEffect(() => {
      fetch(`/sessions/${id}`, {
          headers: {
              'Content-Type': 'application/json',
              "Authorization": "Bearer " + retrieve().access_token,
          },
      })
          .then((resp) => {
              if (!resp.ok) {
                  throw new Error('Failed to update session');
              }
              return resp.json();
          })
          .then((data) => {
              // Format the dates received from the server
              const formattedStartDate = data.start_date.split('T')[0];
              const formattedEndDate = data.end_date.split('T')[0];
              setSession(data);
              setName(data.name);
              setStartDate(formattedStartDate);
              setEndDate(formattedEndDate);
          })
          .catch((error) => {
              console.error('Error updating session:', error);
          });

  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedSession = {
        id: id,
        name: name,
        start_date: start_date,
        end_date: end_date,
    };

    fetch(`/sessions/${session.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + retrieve().access_token,
        },
        body: JSON.stringify(updatedSession),
    })
        .then((resp) => {
            if (!resp.ok) {
                throw new Error('Failed to update session');
            }
            return resp.json();
        })
        .then((updatedData) => {
            console.log('Updated Session:', updatedData);
            navigate('/hr/session_page');
        })
        .catch((error) => {
            console.error('Error updating session:', error);
        });
};

    
  return (
    <div className='content-wrapper' style={{ marginLeft: "280px", backgroundColor:"white", marginTop:"20px"}}>
            <h3>Update Session</h3>
            {session && <form onSubmit={handleSubmit}>
                <label>
                    Session:
                    <input id="session" type="text" value={session} onChange={(e) => setSession(e.target.value)} required />
                </label>
                <br />
                <label>
                    Start Date:
                    <input type="date" value={start_date} onChange={(e) => setStartDate(e.target.value)} required />
                </label>
                <br />
                <label>
                    End Date:
                    <input type="date" value={end_date} onChange={(e) => setEndDate(e.target.value)} required />
                </label>
                <br />
                <button type="submit">Update Session</button>
            </form>}
        </div>
  )
}

export default UpdateSession