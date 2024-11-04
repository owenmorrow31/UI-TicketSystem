import React, { useState } from 'react';
import TicketForm from './TicketForm';
import TicketList from './TicketList';

const TicketManagementSystem = () => {
  const [refreshList, setRefreshList] = useState(false);

  // Toggle refreshList to trigger re-fetch in TicketList
  const handleTicketCreated = () => {
    setRefreshList(!refreshList);
  };

  return (
    <div>
      <h1>Ticket Management System</h1>
      <TicketForm onTicketCreated={handleTicketCreated} />
      <TicketList refresh={refreshList} />
    </div>
  );
};

export default TicketManagementSystem;
