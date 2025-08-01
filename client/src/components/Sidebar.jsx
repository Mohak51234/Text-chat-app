import React, { useState } from 'react'
import { Tab,Nav, Button, Modal } from 'react-bootstrap'
import Conversations from './Conversations';
import Contacts from './Contacts';
import NewConversationModal from './NewConversationModal';
import NewContactModal from './NewContactModal';

const CONVERSATIONS_KEY="conversations";
const CONTACTS_KEY="contacts";

export default function Sidebar({id}) {

    const [activeKey,setActiveKey]=useState(CONVERSATIONS_KEY);
    const conversationOpen=(activeKey===CONVERSATIONS_KEY);
    const [modalOpen,setModalOpen]=useState(false);

    const closeModal = () => setModalOpen(false);

  return (
    <div style={{width:"250px"}} className='d-flex flex-column'>
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant='tabs' className='justify-content-center'>
            <Nav.Item>
                <Nav.Link eventKey={CONVERSATIONS_KEY}>
                    Conversations
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey={CONTACTS_KEY}>
                    Contacts
                </Nav.Link>
            </Nav.Item>
        </Nav>

        <Tab.Content className='border-end overflow-auto flex-grow-1'>
            <Tab.Pane eventKey={CONVERSATIONS_KEY}>
                <Conversations/>
            </Tab.Pane>
            <Tab.Pane eventKey={CONTACTS_KEY}>
                <Contacts/>
            </Tab.Pane>
        </Tab.Content>

        <div className='p-2 border-top border-end small'>
            Your id : <span className='text-muted'>{id}</span>
        </div>

        <Button className='rounded-0' onClick={()=>setModalOpen(true)}>
            New {conversationOpen?"Conversation":"Contact"}
        </Button>
      </Tab.Container>

      <Modal show={modalOpen} onHide={closeModal}>
        {conversationOpen?
            <NewConversationModal closeModal={closeModal}/>:
            <NewContactModal closeModal={closeModal}/>
        }
      </Modal>
    </div>
  )
}
