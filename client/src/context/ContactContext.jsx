import { createContext, useContext, useState} from "react";
import { createContactRequest } from "../api/contact";

const ContactContext = createContext();

//Hook
export const useContact = () => {
    const context = useContext(ContactContext);

    if(!context){
        throw new Error("useContact must be used within a ContactProvider");
    }
    return  context;
}
export function ContactProvider({children}){
    const [contacts, setContacts] = useState([]);

    const createContact = async (contact) => {
        
        const res = await createContactRequest(contact);
        console.log(res);
    }
    return (
        <ContactContext.Provider 
            value={{
                contacts, 
                createContact
            }}
        >
            {children}
        </ContactContext.Provider>
    );
}