import React from 'react'
import './App.css'
import Login from './components/Login'
import UseLocalStorage from './hooks/UseLocalStorage';
import Dashboard from './components/Dashboard';
import { ContactsProvider } from './contexts/ContactsProvider';
import { ConversationsProvider } from './contexts/ConversationsProvider';
import SocketProvider from './contexts/SocketProvider';

function App() {
    const [id,setId]=UseLocalStorage('id');

    const dashboard=(
        <SocketProvider>
            <ContactsProvider>
                <ConversationsProvider id={id}>
                    <Dashboard id={id}/>
                </ConversationsProvider>
            </ContactsProvider>
        </SocketProvider>
    )
  return (
    <>
      {id?dashboard:<Login onIdSubmit={setId} />}
      
    </>
  )
}

export default App
