import { useState, useEffect } from "react";
import {retrieve} from "../Encryption"
import { useParams } from "react-router-dom";
const VerifyDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const{employeeId}=useParams()

  useEffect(() => {
    fetch(`/documents/employee/${employeeId}`, {
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
