import userImg from '../assets/user.svg'
import { useContacts } from "../context/ContactContext";
import { Link } from "react-router-dom";
import { useNavigate,  } from 'react-router-dom';
const ContactCard = ({contact}) => {
    const {deleteContact} = useContacts();
    const navigate = useNavigate();
    return (
      <div className="max-w-sm bg-zinc-800 text-white border border-zinc-700 rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
        {/* Avatar e información del contacto */}
        <div className="flex items-center p-4">
          <img
            className="w-16 h-16 rounded-full border-2 border-blue-500"
            src={userImg} // Ruta a un avatar genérico
            alt="Avatar"
          />
          <div className="ml-4">
            <h2 className="text-2xl font-bold">{contact.first_name} </h2>
            <p className="text-sm text-zinc-400">{contact.email}</p>
          </div>
        </div>

        {/* Detalles del contacto */}
        <div className="p-4 flex-grow">
          <div className="mb-2">
            <h3 className="text-sm font-medium text-zinc-400">Address</h3>
            <p className="text-white">{contact.address}</p>
          </div>
        <div>
          <h3 className="text-sm font-medium text-zinc-400">Phones</h3>
          <ul className="mt-2 space-y-1">
              { contact.phones.map((currenPhone) => (
              <li key={`phone-${currenPhone.id}`} className="text-white text-sm">{currenPhone.type=="movil"? "📱 Movil:" : "☎️ Fijo"} {currenPhone.phone_number}</li>
              ))}
          </ul>
        </div>
      </div>

      {/* Botones de acciones */}
      <div className="flex justify-around p-4 bg-zinc-700 border-t border-zinc-600">
        <button 
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          onClick={()=>{navigate(`/contact/${contact.id}`)}}
        >
          Edit
        </button>
        <button className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
           onClick={() => {deleteContact(contact.id)}}
        >
          <span>Delete</span>
      </button>
    </div>
  </div>
        
    );
}

export default ContactCard;
