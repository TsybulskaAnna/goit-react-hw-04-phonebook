//import { Component } from 'react';
import React from 'react';
import { useState, useEffect, useRef } from 'react';
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
  const firstRender = useRef(true);

  const addContact = ({ name, number }) => {
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`This contact ${name} already exists!`);
      return;
    }

    setContacts(prevState => {
      return [...prevState, { name, number, id: nanoid() }];
    });
  };

  const filterContacts = () => {
    if (filter) {
      const filtered = contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      );
      return filtered;
    }
    return contacts;
  };

  const removeContact = id => {
    setContacts(prevState => {
      return [...prevState.filter(contact => contact.id !== id)];
    });
  };

  const handleChange = e => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    if (firstRender.current) {
      const data = localStorage.getItem('contacts');
      const contacts = JSON.parse(data);
      if (contacts?.length) {
        setContacts(contacts);
      }
      firstRender.current = false;
    }
  }, []);
  useEffect(() => {
    if (!firstRender.current) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
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
