import { useContacts } from "../context/ContactContext";
import { Link } from "react-router-dom";
const ContactCard = ({contact}) => {
    const {deleteContact} = useContacts();

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <header className="flex justify-between">
                <h1 className="text-2x1 font-bold">{contact.first_name} </h1>
                <div className="flex gap-x-2 items-center">
                    <button 
                        onClick={() => {deleteContact(contact.id)}}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                    >Delete</button>
                    <button
                        className="bg-blue-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                    > 
                        <Link to={`/contact/${contact.id}`}>Edit</Link>
                    </button>
                </div>
            </header>
            
            <p className="text-slate-300">{contact.email}</p>
            <p className="text-slate-300">{contact.address}</p>
          
        </div>
    );
}

export default ContactCard;
