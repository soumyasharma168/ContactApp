import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import ContactForm from './Contact/ContactForm';
import Button from './utils/Button';
import { ContactDTO } from './Contact/contact.model';
import ContactsList from './Contact/ContactList';
import ListOfContact from './Contact/ListOfContact';
import axios from 'axios';
import Contact from './Contact/Contact';

function App() {

  const [selectedContact, setSelectedContact] = useState<ContactDTO | undefined>(undefined);

  const handleContactSubmit = (contact: ContactDTO) => {
    if (selectedContact?.id) {
      // Update existing contact
      axios.put(`http://localhost:5000/api/contact/${selectedContact.id}`, contact)
        .then(() => {
          setSelectedContact(undefined);
          alert('Contact updated');
        })
        .catch(error => console.error('Error updating contact', error));
    } else {
      // Create new contact
      axios.post('http://localhost:5000/api/contact', contact)
        .then(() => {
          alert('Contact created');
        })
        .catch(error => console.error('Error creating contact', error));
    }
  };

  const handleEdit = (contact: ContactDTO) => {
    setSelectedContact(contact);
  };

  const handleDelete = (id: number) => {
    axios.delete(`http://localhost:5000/api/contact/${id}`)
      .then(() => {
        alert('Contact deleted');
      })
      .catch(error => console.error('Error deleting contact', error));
  };

  return (
   <>
   <ContactsList/>
   
   </>
  );
}

export default App;
