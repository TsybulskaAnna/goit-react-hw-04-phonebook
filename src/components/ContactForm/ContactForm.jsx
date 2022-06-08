import { useState } from 'react';
import PropTypes from 'prop-types';

const FormContact = ({ addContact }) => {
  const [formState, setName] = useState({
    name: '',
    number: '',
  });
  const { name, number } = formState;

  const leverArmChange = e => {
    setName(prevState => {
      return { ...prevState, [e.target.name]: e.target.value };
    });

    /*   const { name, value } = e.target;

    if (name === 'name') {
      setName(value);
    }
    if (name === 'number') {
      setName(value);
    } */
  };

  const resetForm = () => {
    setName({
      name: '',
      number: '',
    });
  };

  const leverArmSubmit = e => {
    const name = e.target.name.value;
    const number = e.target.number.value;
    e.preventDefault();
    addContact( {name, number} );
    resetForm();
  };

  return (
    <form onSubmit={leverArmSubmit}>
      <label>
        Name
        <input
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={leverArmChange}
        />
      </label>
      <label>
        Phone
        <input
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={leverArmChange}
        />
      </label>
      <button type="submit">Add contact</button>
    </form>
  );
};

export default FormContact;

FormContact.propTypes = {
  addContact: PropTypes.func.isRequired,
};