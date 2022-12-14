import { nanoid } from "nanoid";
import React, { Component } from "react";
import Section from './Section/Section'
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

export class App extends Component  {

  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  }
  
  // handleSubmit = contact => {
  //   const { contacts } = this.state;
  //   if (contacts.map(
  //     el => el.name === contact.name)
  //     .includes(contacts.name)) { 
  //       alert(`${contacts.name} is already in contacts!`);
  //   }
    // else {
    //     this.setState(prevState => ({
    //     contacts: [...prevState.contacts, contact],
    //   }))
    // }
    
    // event.preventDefault();
    // const { name, number } = this.state;
    // this.setState({name: event.target.name, number: event.target.number})
    // const contact = {
    //   id: nanoid(),
    //   name: '',
    //   number: '',
    // }
    // console.log(this.state);
    // resetForm()
  // }

  addContact = data => {
    const contact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    }
    const { contacts } = this.state;
    // if (contacts.map(
    //   ({ name }) => name === contact.name).includes(!contact.name))
    // if(contacts.map(item => item.name === contact.name))
    // {
    //     alert(`${contact.name} is already in contacts!`);
    // } else
    if (contacts.filter(item =>
      item.name.toLowerCase() === contact.name.toLowerCase()).length !== 0) {
      
      alert(`${contact.name} is already in contacts!`);
      return;
    }
    else {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, contact],
        }))
      console.log(data)
    }
    
  }

  onChangeFilter = (event) => {
    this.setState({filter: event.currentTarget.value})
  }

  onDeleteContact = (contactId) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  }

  render() {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter));
    return (
      <div>
        <Section title="Phonebook">
          <ContactForm
            onSubmit={this.addContact}
            // contactNames={contacts}
          />
        </Section>
        
        <Section title="Contacts">
          <Filter value={filter} onChange={this.onChangeFilter}/>
          <ContactList contacts={filteredContacts}
            onDeleteContact={this.onDeleteContact} />
        </Section>
      </div>
    );
  }
  
};
