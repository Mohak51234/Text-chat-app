import React, { useCallback, useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider';

export default function OpenConversation() {

    const [text, setText]=useState('');
    const {sendMessage,selectedConversation}=useConversations();
    const setRef=useCallback(node=>{
        console.log('Ref called with:', node);
        if(node) {
            node.scrollIntoView({smooth:true});
        }
    },[])

    function handleSubmit(e) {
        e.preventDefault();

        sendMessage(selectedConversation.recipients.map(r=>r.id),text)

        setText('');
    }
  return (
    <div className='d-flex flex-column flex-grow-1'>
        <div className='flex-grow-1 overflow-auto'>
            <div className=' d-flex flex-column align-items-start justify-content-end px-3'>
                {selectedConversation.messages.map((message,index)=>{
                    const lastMessage=selectedConversation.messages.length-1===index
                    return (
                        <div 
                            ref={lastMessage?setRef:null}
                            key={index}
                            className={`my-1 d-flex flex-column ${message.fromMe?'align-self-end':''}`}
                        >
                            <div className={`rounded px-2 py-1 ${message.fromMe?'bg-primary text-white':'border'}`}>
                                {message.text}
                            </div>
                            <div className={`text-muted small ${message.fromMe?'text-end':''}`}>
                                {message.fromMe?'You':message.senderName}
                            </div>
                        </div>

                    )
                })}
            </div>
        </div>
        <Form onSubmit={handleSubmit}>
            <Form.Group className='m-2'>
                <InputGroup>
                    <Form.Control
                    as="textarea"
                    required
                    value={text}
                    onChange={e=>setText(e.target.value)}
                    style={{height:'75px',resize:'none'}}
                    onKeyDown={(e)=>{
                        if(e.key==='Enter'&&!e.shiftKey) {
                            e.preventDefault(); // prevent newline
                            handleSubmit(e);
                        }
                    }}
                    />
                </InputGroup>
                <Button className='m-2' type='submit'>Send</Button>
            </Form.Group>
        </Form>
    </div>

  )
}
