import React, { useState } from 'react';
import axios from 'axios';

const TicketForm = ({ onTicketCreated }) => {
  const [ticket, setTicket] = useState({
    TicketID: '',
    Description: '',
    Status: '',
    Priority: '',
    CreatedByUserId: '',
    AssignedToUserId: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (
      !ticket.TicketID ||
      !ticket.Description ||
      !ticket.Status ||
      !ticket.Priority ||
      !ticket.CreatedByUserId ||
      !ticket.AssignedToUserId
    ) {
      setErrorMessage('All fields are required.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/tickets`, ticket);
      alert('Ticket created successfully!');
      setTicket({
        TicketID: '',
        Description: '',
        Status: '',
        Priority: '',
        CreatedByUserId: '',
        AssignedToUserId: '',
      });
      onTicketCreated(); // Notify parent to refresh ticket list
    } catch (error) {
      setErrorMessage('Error creating ticket. Please try again.');
      console.error("Error creating ticket:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="TicketID" placeholder="Ticket ID" value={ticket.TicketID} onChange={handleChange} required />
      <input type="text" name="Description" placeholder="Description" value={ticket.Description} onChange={handleChange} required />
      <input type="text" name="Status" placeholder="Status" value={ticket.Status} onChange={handleChange} required />
      <input type="text" name="Priority" placeholder="Priority" value={ticket.Priority} onChange={handleChange} required />
      <input type="text" name="CreatedByUserId" placeholder="Created By User ID" value={ticket.CreatedByUserId} onChange={handleChange} required />
      <input type="text" name="AssignedToUserId" placeholder="Assigned To User ID" value={ticket.AssignedToUserId} onChange={handleChange} required />

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create Ticket'}
      </button>
    </form>
  );
};

export default TicketForm;

