import React, { useState } from "react";

export default function ListOfContact(){

    const [contacts, setContacts] = useState([
        { id: 1, name: 'John Doe', email: 'johndoe@example.com', phone: '+123456789' },
        { id: 2, name: 'Jane Smith', email: 'janesmith@example.com', phone: '+987654321' }
      ]);
    
      const handleEdit = (id: number) => {
        const newName = prompt('Edit Name');
        const newEmail = prompt('Edit Email');
        const newPhone = prompt('Edit Phone');
        
        if (newName && newEmail && newPhone) {
          setContacts(contacts.map(contact => 
            contact.id === id ? { ...contact, name: newName, email: newEmail, phone: newPhone } : contact
          ));
        }
      };
    
      const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this contact?')) {
          setContacts(contacts.filter(contact => contact.id !== id));
        }
      };
    
      return (
        <div>
          <h2>Contact List</h2>
          <table border={1} style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(contact => (
                <tr key={contact.id}>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                  <td>
                    <button onClick={() => handleEdit(contact.id)} style={{ marginRight: '10px' }}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(contact.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
}

