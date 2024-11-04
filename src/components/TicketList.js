import React, { useState } from 'react';
import axios from 'axios';

function TicketApp() {
  const [ticket, setTicket] = useState(null);
  const [ticketId, setTicketId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const getTicket = () => {
    const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:7071/api';
    const url = `${baseUrl}/tickets/${ticketId}`;

    axios.get(url)
      .then((response) => {
        console.log(response);
        console.log('API URL:', process.env.REACT_APP_API_URL);
        console.log('Request URL:', url);
        if (response.data) {
          setTicket(response.data);
          setErrorMessage(''); // Clear any previous error message
        } else {
          setErrorMessage('No data found for the given Ticket ID.');
        }
      })
      .catch((error) => {
        console.error('Error fetching ticket:', error);
        setErrorMessage('Error fetching ticket. Please try again.');
      });
  };

  const clearTicket = () => {
    setTicket(null);
    setTicketId('');
    setErrorMessage('');
  };

  return (
    <div>
      <h2>Ticket Information</h2>
      <input
        type="text"
        placeholder="Enter Ticket ID: "
        value={ticketId}
        onChange={(e) => setTicketId(e.target.value)}
      />
      <button onClick={getTicket}>Get Ticket Information</button>
      <button onClick={clearTicket} style={{ marginLeft: '10px' }}>Clear</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {ticket ? (
        <div>
          <p><strong>Ticket ID:</strong> {ticket.ticketID || 'N/A'}</p>
          <p><strong>Description:</strong> {ticket.description || 'No Description'}</p>
          <p><strong>Status:</strong> {ticket.status || 'No Status'}</p>
          <p><strong>Priority:</strong> {ticket.priority || 'No Priority'}</p>
          <p>
            <strong>Date Created:</strong>{' '}
            {ticket.dateCreated ? new Date(ticket.dateCreated).toLocaleString() : new Date().toLocaleString()}
          </p>
          <p>
            <strong>Last Updated:</strong>{' '}
            {ticket.lastUpdated ? new Date(ticket.lastUpdated).toLocaleString() : new Date().toLocaleString()}
          </p>
          <p><strong>Created By:</strong> {ticket.createdByUserId || 'Unknown'}</p>
          <p><strong>Assigned To:</strong> {ticket.assignedToUserId || 'Unassigned'}</p>
          <strong>Comments:</strong>
          {ticket.comments && ticket.comments.length > 0 ? (
            <ul>
              {ticket.comments.map((comment) => (
                <li key={comment.commentID}>
                  {comment.commentText} (By User {comment.userID} on {new Date(comment.dateCreated).toLocaleString()})
                </li>
              ))}
            </ul>
          ) : (
            <p>No comments available.</p>
          )}
        </div>
      ) : (
        <p>Enter a Ticket ID and click the button to see ticket details.</p>
      )}
    </div>
  );
}

export default TicketApp;
