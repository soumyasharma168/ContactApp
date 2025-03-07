import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import ContactForm from './Contact/ContactForm';
import Button from './utils/Button';
import { ContactDTO } from './Contact/contact.model';
import ContactsList from './Contact/ContactList';
import axios from 'axios';

function App() {


  return (
   <ContactsList/>
  );
}

export default App;
