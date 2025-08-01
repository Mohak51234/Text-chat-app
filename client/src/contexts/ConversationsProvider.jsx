import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import UseLocalStorage from '../hooks/UseLocalStorage';
import {useContacts} from './ContactsProvider';
import { useSocket } from './SocketProvider';

const ConversationsContext=createContext();

export function ConversationsProvider({id,children}) {

    const [conversations,setConversations]=UseLocalStorage('conversations',[]);
    const [selectedConversationIndex,setSelectedConversationIndex]=useState(0);
    const {contacts}=useContacts();
    const socket=useSocket();

    function createConversation(recipients) {
        setConversations(prevConversations=>{
            return [...prevConversations,{recipients,messages:[]}];
        });
    }

    const addMessageToConversation=useCallback(({recipients,text,sender})=> {
        setConversations(prevConversations=>{
            let madeChange=false;
            const newMessage={sender,text};
            const newConversation=prevConversations.map
            (conversation=>{
                if(arrayEquality(conversation.recipients,recipients)) {
                    madeChange=true;
                    return {
                        ...conversation,
                        messages:[...conversation.messages,newMessage]
                    }
                }
                return conversation;
            })

            if(madeChange) {
                return newConversation;
            } else {
                return [...prevConversations,
                    {recipients,messages:[newMessage]}
                ]
            }
        })
    },[setConversations]);

    useEffect(()=>{
        if(socket==null) {
            return;
        }
        socket.on('recieve-message',addMessageToConversation)
        return ()=>{socket.off('recieve-message')}
    },[socket,addMessageToConversation])

    function sendMessage(recipients,text) {
        socket.emit('send-message',{recipients,text})
        addMessageToConversation({recipients,text,sender:id});
    }

    const formattedConversations=conversations.map((conversation,index)=> {
        const recipients=conversation.recipients.map(recipient=>{
            const contact=contacts.find(contact=>{
                return contact.id===recipient;
            });
            const name=(contact&&contact.name)||recipient;
            return {id:recipient,name}
        })
        const selected=index===selectedConversationIndex

        const messages=conversation.messages.map(message=>{
            const contact=contacts.find(contact=>{
                return contact.id===message.sender
            });
            const name=(contact&&contact.name)||message.sender
            const fromMe=id===message.sender
            return {...message,senderName:name,fromMe}
        })

        return {...conversation,messages,recipients,selected}
    })

    const value={
        conversations:formattedConversations,
        selectedConversation:formattedConversations[selectedConversationIndex],
        sendMessage,
        selectConversationIndex:setSelectedConversationIndex,
        createConversation
    }

  return (
    <ConversationsContext.Provider value={value}>
        {children}
    </ConversationsContext.Provider>
  )
}

export function useConversations() {
    return useContext(ConversationsContext);
}

function arrayEquality(a,b) {
    if(a.length!==b.length) {
        return false;
    }
    a.sort();
    b.sort();
    return a.every((element,index)=> {
        return element===b[index];
    })
}