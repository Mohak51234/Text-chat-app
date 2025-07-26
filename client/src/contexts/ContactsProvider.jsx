import React, { createContext, useContext, useState } from 'react'
import UseLocalStorage from '../hooks/UseLocalStorage';
import {v4 as uuidV4} from 'uuid'

const ContactsContext=createContext();

export function ContactsProvider({children}) {

    const [contacts,setContacts]=UseLocalStorage('contacts',[]);

    function createContact(id,name) {
        setContacts(prevContacts=>{
            return [...prevContacts,{id,name}];
        });
    }

  return (
    <ContactsContext.Provider value={{contacts,createContact}}>
        {children}
    </ContactsContext.Provider>
  )
}

export function useContacts() {
    return useContext(ContactsContext);
}
