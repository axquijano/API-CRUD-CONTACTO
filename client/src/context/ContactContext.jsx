import { createContext, useContext, useState} from "react";
import { createContactRequest , getContactsRequest} from "../api/contact";

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
            setContacts(res.data);
        } catch (error) {
            console.log(error);
        }
        
    }
    const createContact = async (contact) => {
        const res = await createContactRequest(contact);
        console.log(res);
    }
    return (
        <ContactContext.Provider 
            value={{
                contacts, 
                createContact,
                getContacts
            }}
        >
            {children}
        </ContactContext.Provider>
    );
}