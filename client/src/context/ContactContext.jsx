import { createContext, useContext, useState} from "react";
import { createContactRequest , deleteContactRequest, getContactsRequest, getContactRequest, updateContactRequest} from "../api/contact";

const ContactContext = createContext();

//Hook
export const useContacts = () => {
    const context = useContext(ContactContext);

    if(!context){
        throw new Error("useContact must be used within a ContactProvider");
    }
    return  context;
};

export function ContactProvider({children}){
    const [contacts, setContacts] = useState([]);

    const getContacts = async () => {
        try {
            const res = await getContactsRequest();
            await setContacts(res.data);
        } catch (error) {
            console.log(error);
        }
        
    }
    const deleteContact = async (id) => {
        try {
            const res = await deleteContactRequest(id);
            if(res.status === 204) setContacts(contacts.filter(contact => contact.id != id));
        } catch (error) {
            console.log(error);
        }
    }
    
    const getContact = async (id) => {
        try {
            const res = await getContactRequest(id);
            return res.data;
        } catch (error) {
            console.log(error);
            return null;   
        }
        
    }

    const createContact = async (contact) => {
        const res = await createContactRequest(contact);
        console.log(res);
    }

    const updateContact = async (id, contact) => {
        try{
            const res = await updateContactRequest(id, contact);
            console.log(res);
        }catch(error){
            console.log(error);
        }
    }
    return (
        <ContactContext.Provider 
            value={{
                contacts, 
                createContact,
                getContacts,
                deleteContact,
                getContact, 
                updateContact
            }}
        >
            {children}
        </ContactContext.Provider>
    );
}