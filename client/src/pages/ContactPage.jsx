import  { useEffect } from 'react';
import { useContacts } from '../context/ContactContext';

const ContactPage = () => {
    const {getContacts, contacts } = useContacts();
    useEffect(()=> {
            getContacts();
        }, []);
 
    if(contacts.length === 0) return (<h1>No contacts</h1>);
    return (
        <div>
             <h1>ContactPage</h1>
            { 
                contacts.map(currentContact => (
                    <div key={currentContact.id }>
                        <h1>{currentContact.first_name} </h1>
                        <p>{currentContact.email}</p>
                        <p>{currentContact.address}</p>
                    </div>
                ))
            }
        </div>
    );
}

export default ContactPage;
