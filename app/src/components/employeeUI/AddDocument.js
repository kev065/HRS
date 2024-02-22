import React, { useState } from 'react';
import { retrieve } from "../Encryption";
import { useNavigate } from 'react-router-dom';

const AddDocument = ({documents,setDocuments,onClose}) => {
  const [newDocument, setNewDocument] = useState(null);
  const [documentName, setDocumentName] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [showAddButton, setShowAddButton] = useState(true);
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
    <div >
        <div className="ui centered card" style={{ marginTop:'20px' ,width:"700px"}}>
            <div className='card_container'>
      <h2>Add Document</h2>
      <form onSubmit={handleSubmit} className='form_container'>
        <div className='form-details-container'>
       
        <label className='label_css'>
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
        <input type="file" onChange={handleDocumentChange} required />
        <br />
        <button type="submit" className="mini ui teal button" style={{ marginBottom:'20px', marginTop:'20px'}}>Submit</button>
        </div>
      </form>
      <div>
      <button onClick={handleExit} className="mini ui teal button">Exit</button>
      </div>
      </div>
    </div>
    </div>
  );
};

export default AddDocument;
