import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ContactDTO } from './contact.model';
import ContactForm from './ContactForm';
import { urlContact } from '../endpoint';
import './ContactList.css';  // Importing the CSS file for styling

export default function ContactList() {

  const [contacts, setContacts] = useState<ContactDTO[]>([]);
  const [editingContact, setEditingContact] = useState<ContactDTO>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch contacts from backend API
  const fetchContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(urlContact);
      setContacts(response.data);
    } catch (error) {
      setError('Error fetching contacts. Please try again later.');
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);


  //Handle the edit task when edit button clicked
  const handleEdit = (contact: ContactDTO) => {
    setEditingContact(contact);
  };

  //Handle delete taskes
  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await axios.delete(`${urlContact}/${id}`);
        fetchContacts(); // Refresh the contacts list
      } catch (error) {
        setError('Error deleting contact. Please try again later.');
        console.error('Error deleting contact:', error);
      }
    }
  };
  
  const handleSave = (contact: ContactDTO) => {
    fetchContacts(); // Refresh the contact list after saving
  };

  return (
    <div className="contacts-list">
      <h1 className="title">Contacts</h1>

      {/* Show form for creating/editing contact */}
      <ContactForm model={editingContact} onSubmit={handleSave} />

      {/* Display Loading State */}
      {loading && <div className="loading-spinner">Loading...</div>}

      {/* Display Error Message */}
      {error && <div className="error-message">{error}</div>}

      <h2>Contact List</h2>
<table className="contact-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Phone</th>
      <th>Email</th>
      <th>Address</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {contacts.map((contact) => (
      <tr key={contact.id}>
        <td>{contact.firstName} {contact.lastName}</td>
        <td>{contact.phone}</td>
        <td>{contact.email}</td>
        <td>{contact.address}</td>
        <td className='d-flex gap-1'>
          <button className="btn-edit" onClick={() => handleEdit(contact)}>Edit</button>
          <button className="btn-delete" onClick={() => handleDelete(contact.id)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
};


