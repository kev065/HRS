import React, { useState } from 'react';
import { retrieve } from "../Encryption";
import { useNavigate } from 'react-router-dom';

const AddDocument = ({documents,setDocuments,onClose}) => {
  const [newDocument, setNewDocument] = useState(null);
  const [documentName, setDocumentName] = useState('');
  const [documentType, setDocumentType] = useState('');
  const navigate = useNavigate();

  const handleDocumentChange = (e) => {
    setNewDocument(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newDocument) {
      console.error('No document selected');
      return;
    }

    const formData = new FormData();
    formData.append('document', newDocument);
    formData.append('name', documentName);
    formData.append('type', documentType);

    fetch(`/upload`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + retrieve().access_token,
      },
      body: formData,
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('Failed to add document');
        }
        return resp.json();
      })
      .then((data) => {
      

      
        setDocumentName('');
        setDocumentType('');
      
     
       
         setDocuments([...documents,data])
      })
      .catch((error) => {
        console.error('Error adding document:', error);
      });
  };
  const handleExit = () => {
    onClose();
};

  return (
    <div>
      <h2>Add Document</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleDocumentChange} required />
        <br />
        <label>
          Document Name:
          <input type="text" value={documentName} onChange={(e) => setDocumentName(e.target.value)} required />
        </label>
        <br />
        <label>
          Document Type:
          <select value={documentType} onChange={(e) => setDocumentType(e.target.value)} required>
            <option value="">Select Type</option>
            <option value="official">Official</option>
            <option value="institution">Institution</option>
            <option value="other">Other</option>
          </select>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleExit}>Exit</button>
    </div>
  );
};

export default AddDocument;
