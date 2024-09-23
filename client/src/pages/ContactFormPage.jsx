import { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';
import PhoneList from '../components/PhoneList';
import { useContacts } from '../context/ContactContext';
import { useNavigate, useParams } from 'react-router-dom';

const schemaTelephone = {
    type : "movil",
    phone_number : ""
}

const ContactFormPage = () => {
    
    const {register, handleSubmit, formState: {errors}, setValue} = useForm();
    const { createContact, getContact, updateContact  } = useContacts();
    const [telephones, setTelephones] = useState([schemaTelephone]);
    const navigate = useNavigate();
    const params = useParams();

    useEffect (() => {
        async function loadContact() {
            if(params.id){
                const contact = await getContact(params.id);
                setValue("first_name", contact.first_name); 
                setValue("last_name", contact.last_name); 
                setValue("email", contact.email); 
                setValue("address", contact.address);
                setTelephones(contact.phones);
                console.log(contact);
            }
        }

        loadContact();
        
    },[]);

    const onSubmit = handleSubmit((data) => {  

        // Verificar si al menos un número de teléfono está ingresado
        const hasPhone = telephones.some(phone => phone.phone_number.trim() !== '');
        
        if (!hasPhone) {
            alert("Debes ingresar al menos un número de teléfono.");
            return; // Salir de la función sin enviar el formulario
        }
        const jsonData = { 
            first_name: data.first_name, 
            last_name: data.last_name, 
            email: data.email, 
            address : data.address,
            "phones" : JSON.stringify(telephones)
        };
        if(params.id){
            updateContact(params.id, jsonData);
        } else {
            createContact(jsonData);
           
        }
        navigate("/contacts");
    });
          
    return (
        <div className="flex   justify-center">
            <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
                <form onSubmit={onSubmit}> 
                    <label htmlFor='firs_name'>First name</label>
                    <input 
                        type="text" 
                        placeholder='First name'
                        {...register('first_name', {required: true})}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        />
                    {errors.first_name  && <p className="text-red-500">First Name is requered</p>}

                    <label htmlFor='last_name'>Last name</label>
                    <input 
                        type="text"   
                        placeholder='Last Name' 
                        {...register('last_name', {required: true})}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    />
                    {errors.last_name  && <p className="text-red-500">Last Name is requered</p>}

                    <label htmlFor='email'>Email</label>
                    <input 
                        type="email" 
                        placeholder='Email'
                        {...register('email', {required: true})}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    />
                    {errors.email  && <p className="text-red-500">Email is requered</p>}
                    <label htmlFor='address'>Address</label>
                    <input 
                        type="text" 
                        placeholder='Address'
                        {...register('address', {required: true})}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    />
                    {errors.address  && <p className="text-red-500">Address is requered</p>}
                    <PhoneList phones={telephones} setPhones={setTelephones}></PhoneList>
                    <button type='submit' className='bg-indigo-500 px-3 py-2 rounded-md'>Save</button>
                </form>

            </div>
        </div>
    );
}

export default ContactFormPage;
