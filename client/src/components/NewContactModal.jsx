import React, { useRef } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import {useContacts} from '../contexts/ContactsProvider';

export default function NewContactModal({closeModal}) {

    const idRef=useRef();

    const nameRef=useRef();

    const {createContact}=useContacts();

    const handleSubmit=(e)=>{
        e.preventDefault();

        createContact(idRef.current.value,nameRef.current.value);

        closeModal();
    }

  return (
    <>
      <Modal.Header closeButton>
        Create contact
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>
                    Id
                </Form.Label>
                <Form.Control type="text" ref={idRef} required/>
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    Name
                </Form.Label>
                <Form.Control type="text" ref={nameRef} required/>
            </Form.Group>
            <Button className='m-2' type='submit'>
                Create
            </Button>
        </Form>
      </Modal.Body>
    </>
  )
}
