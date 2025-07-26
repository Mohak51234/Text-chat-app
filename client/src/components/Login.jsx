import React,{useRef} from 'react'
import {Button, Container,Form} from 'react-bootstrap'
import {v4 as uuidV4} from 'uuid'

export default function Login({onIdSubmit}) {
    const idRef = useRef()
    const handleSubmit = (e) => {
        e.preventDefault()
        onIdSubmit(idRef.current.value)
    }
    const createNewId = () => {
        onIdSubmit(uuidV4())
    }
  return (
    <Container className='d-flex align-items-center justify-content-center ' style={{height:"100vh"}}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Enter your id</Form.Label>
          <Form.Control type="text" ref={idRef}/>
        </Form.Group>
        <Button type="submit" className='me-2'>Login</Button>
        <Button onClick={createNewId} variant="secondary">Create a new id</Button>
      </Form>
      
    </Container>
  )
}