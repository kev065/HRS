import React, { useState } from 'react';
import { retrieve } from "../Encryption";

const EducationDocumentUpload = ({onClose}) => {
  const [educationDetails, setEducationDetails] = useState({
    institution: '',
    course: '',
    qualification: '',
    start_date: '',
    end_date: ''
  });

  const [document, setDocument] = useState(null);
  const [documentName, setDocumentName] = useState('');
  const [documentType, setDocumentType] = useState('official');


  const handleEducationChange = (e) => {
    const { name, value } = e.target;
    setEducationDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDocumentChange = (e) => {
    setDocument(e.target.files[0]);
    setDocumentName(e.target.files[0].name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    fetch('/education', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + retrieve().access_token,
      },
      body: JSON.stringify(educationDetails)
    })
    .then(response => response.json())
    .then(educationData => {
      // Upload document
      const formData = new FormData();
      formData.append('document', document);
      formData.append('name', documentName);
      formData.append('type', documentType);

      return fetch(`/upload/${educationData.id}`, {
        method: 'POST',
        headers: {           
            "Authorization": "Bearer " + retrieve().access_token,
          },
        body: formData
      });
    })
    .then(documentResponse => documentResponse.json())
    .then(documentData => {
      console.log('Document upload response:', documentData);

    
      setEducationDetails({
        institution: '',
        course: '',
        qualification: '',
        start_date: '',
        end_date: ''
      });
      setDocument(null);
      setDocumentName('');
      setDocumentType('official');

    })
    .catch(error => {
      console.error('Error:', error);
     
    });
  };
  const handleExit = () => {
    onClose();
};


  return (
    <div>
      <h2>Add Education</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Institution:
          <input type="text" name="institution" value={educationDetails.institution} onChange={handleEducationChange} required />
        </label>
        <br />
        <label>
          Course:
          <input type="text" name="course" value={educationDetails.course} onChange={handleEducationChange} required />
        </label>
        <br />
        <label>
          Qualification:
          <input type="text" name="qualification" value={educationDetails.qualification} onChange={handleEducationChange} required />
        </label>
        <br />
        <label>
          Start Date:
          <input type="date" name="start_date" value={educationDetails.start_date} onChange={handleEducationChange} required />
        </label>
        <br />
        <label>
          End Date:
          <input type="date" name="end_date" value={educationDetails.end_date} onChange={handleEducationChange} required />
        </label>
        <br />
        <input type="file" onChange={handleDocumentChange} required />
        <br />
        <select value={documentType} onChange={(e) => setDocumentType(e.target.value)}>
          <option value="official">Official</option>
          <option value="institution">Institution</option>
          <option value="other">Other</option>
        </select>
        <br />
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleExit}>Exit</button>
    </div>
  );
};

export default EducationDocumentUpload;
