import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { retrieve } from "../Encryption";

const UpdateEducation = () => {
    const { id } = useParams();
    const [education, setEducation] = useState(null);
    const [institution, setInstitution] = useState('');
    const [course, setCourse] = useState('');
    const [qualification, setQualification] = useState('');
    const [start_date, setStartDate] = useState('');
    const [end_date, setEndDate] = useState('');
    
    const navigate = useNavigate();
   

    useEffect(() => {
        fetch(`/education/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + retrieve().access_token,
            },
        })
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error('Failed to update education');
                }
                return resp.json();
            })
            .then((data) => {
               
                const formattedStartDate = data.start_date.split('T')[0];
                const formattedEndDate = data.end_date.split('T')[0];
                setEducation(data);
                setInstitution(data.institution);
                setCourse(data.course);
                setQualification(data.qualification);
                setStartDate(formattedStartDate);
                setEndDate(formattedEndDate);
            })
            .catch((error) => {
                console.error('Error updating education:', error);
            });

    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedEducation = {
            id: id,
            institution: institution,
            course: course,
            qualification: qualification,
            start_date: start_date,
            end_date: end_date,
        };

        fetch(`/education/${education.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + retrieve().access_token,
            },
            body: JSON.stringify(updatedEducation),
        })
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error('Failed to update education');
                }
                return resp.json();
            })
            .then((updatedData) => {
                const employeeId=retrieve().employee.id
                console.log('Updated Education:', updatedData);
                navigate(`/view_education/${employeeId}`);
               
            })
            .catch((error) => {
                console.error('Error updating education:', error);
            });
    };

    return (
        <div className='content-wrapper' style={{ marginLeft: "280px", backgroundColor:"white", marginTop:"20px"}}>
            {education && <form onSubmit={handleSubmit}>
                <label>
                    Institution:
                    <input type="text" value={institution} onChange={(e) => setInstitution(e.target.value)} required />
                </label>
                <br />
                <label>
                    Course:
                    <input type="text" value={course} onChange={(e) => setCourse(e.target.value)} required />
                </label>
                <br />
                <label>
                    Qualification:
                    <input type="text" value={qualification} onChange={(e) => setQualification(e.target.value)} required />
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
                <button type="submit">Update Education</button>
            </form>}
        </div>
    );
};

export default UpdateEducation;
