//import { Component } from 'react';
import React from 'react';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import FormContact from './ContactForm/ContactForm';
import Section from './Section';
import ContactsList from './ContactsList/ContactsList';
import Notification from './Notification/Notification';
import SearchContact from './SearchContact/SearchContact';

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-0', name: 'wer', number: '232459-12-56' },
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  /* componentDidMount() {
    const localContacts = JSON.parse(localStorage.getItem('contacts'));
    if (localContacts?.length) {
      this.setState({ contacts: localContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const prevContacts = prevState.contacts;
    const contacts = this.state.contacts;
    if (prevContacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  } */

  const addContact = ({ name, number }) => {
  
    if (
      contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())
    ) {
      alert(`This contact ${name} already exists!`);
      return;
    }

    setContacts(prev => (
       [
       ...prev,
        {
          name,
          number,
          id: nanoid(),
        },
      ]
    ));
  };

  const filterContacts = () => {
    if (filter)
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      );

    return contacts;
  };

  const removeContact = id => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  const handleChange = e => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    const localContacts = JSON.parse(localStorage.getItem('contacts'));
    if (localContacts) {
      setContacts(localContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <>
      <Section title={'Phonebook'}>
        <FormContact contacts={contacts} addContact={addContact} />
      </Section>
      <Section title={'Contacts'}>
        {contacts.length ? (
          <>
            <SearchContact searchValue={filter} handleChange={handleChange} />
            <ContactsList
              contacts={filterContacts()}
              removeContact={removeContact}
            />
          </>
        ) : (
          <Notification mess={'Phonebook is empty, add someone'} />
        )}
      </Section>
    </>
  );
};

export default App;
