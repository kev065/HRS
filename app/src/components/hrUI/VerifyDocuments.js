import { useState, useEffect } from "react";

const VerifyDocuments = ({ employeeId }) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetch(`/documents/${employeeId}`, {
      headers: {
        "Authorization": "Bearer " + retrieve().access_token,
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch documents');
        }
        return response.json();
      })
      .then(data => {
        setDocuments(data);
      })
      .catch(error => {
        console.error('Error fetching documents:', error);
      });
  }, [employeeId]);

  return (
    <ul>
      {documents.map(document => (
        <li key={document.id}>
          <a href={document.link_url} target="_blank" rel="noopener noreferrer">{document.name}</a>
        </li>
      ))}
    </ul>
  );
};

export default VerifyDocuments;
