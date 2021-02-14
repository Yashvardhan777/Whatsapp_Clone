import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../context/contactsProvider'
import { useConversations } from '../context/conversationsProvider';

export default function NewConversationModal({ closeModal }){

    const [selectedContactIds, setSelectedContactIds] = useState([])
    const { contacts } = useContacts()
    const { createConversation } = useConversations()

    function handleSubmit(e){
        e.preventDefault()

        createConversation(selectedContactIds)
        closeModal()
    }

    function handleCheckboxChange(ContactId){
        setSelectedContactIds(prevSelectedContactIds => {
            if(prevSelectedContactIds.includes(ContactId)){
                return prevSelectedContactIds.filter(prevId => {
                    return ContactId !== prevId
                })
            }else{
                return [...prevSelectedContactIds, ContactId]
            }
        })
    }

    return(
        <>
            <Modal.Header closeButton>
                Create Contact
            </Modal.Header>  
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {contacts.map(contact => (
                        <Form.Group controlId={contact.id} key={contact.id}>
                            <Form.Check
                                type="checkbox"
                                value={selectedContactIds.includes(contact.id)}
                                label={contact.name}
                                onChange={() => handleCheckboxChange(contact.id)}
                            />
                        </Form.Group>
                    ))}
                    <Button type="submit">
                        Create
                    </Button>
                </Form>
            </Modal.Body>
        </>
    )
}