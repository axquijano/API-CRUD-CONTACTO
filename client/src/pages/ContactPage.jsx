import  { useEffect } from 'react';
import { useContacts } from '../context/ContactContext';
import ContactCard from "../components/ContactCard";

const ContactPage = () => {
    const {getContacts, contacts } = useContacts();
    useEffect(()=> {
            getContacts();
        }, []);
 
    if(contacts.length === 0) return (<h1>No contacts</h1>);
    return (
        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-2'>
            { 
                contacts.map(currentContact => (
                    <ContactCard  key={`cardContact-${currentContact.id}`} contact={currentContact}/>
                ))
            }
        </div>
    );
}

export default ContactPage;
