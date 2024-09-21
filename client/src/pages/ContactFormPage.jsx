import { useState } from 'react';
import {useForm} from 'react-hook-form';
import PhoneList from '../components/PhoneList';
import { useContact } from '../context/ContactContext';

let schemaTelephone = {
    tipo : "movil",
    numero_telefono : ""
}

const ContactFormPage = () => {
    const {register, handleSubmit, formState: {errors},} = useForm();
    const {contacts, createContact } = useContact();
    // const { data, isLoading, error, createContacts} = useContactData();
    const [telephones, setTelephones] = useState([schemaTelephone]);

    const onSubmit = handleSubmit((data) => {   
        const jsonData = { 
            first_name: data.first_name, 
            last_name: data.last_name, 
            email: data.email, 
            address : data.address,
            "phones" : JSON.stringify(telephones)
        };

        createContact(jsonData);
        console.log(jsonData);
    });
   

    // const renderResponse = () => {
    //     if(isLoading){
    //         <div>Cargando ...</div>
    //     }

    //     if( error){
    //         <div>Ocurrio un error</div>
    //     }

    //     return (
    //         <p>{data.id}</p>
    //     )
    // }           
           
    return (
        <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
            <form onSubmit={onSubmit}> 
                
                <input 
                    type="text" 
                    placeholder='First name'
                    {...register('first_name', {required: true})}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    />
                {errors.first_name && <span>{errors.first_name.message}</span>}

                <input 
                    type="text"   
                    placeholder='Last Name' 
                    {...register('last_name', {required: true})}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                />
                {errors.last_name && <span>{errors.last_name.message}</span>}

                <input 
                    type="email" 
                    placeholder='Email'
                    {...register('email', {required: true})}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                />
                
                <input 
                    type="text" 
                    placeholder='Address'
                    {...register('address', {required: true})}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                />
                <br />
                <PhoneList phones={telephones} setPhones={setTelephones}></PhoneList>
                <button type='submit'>Save</button>
            </form>
            {/* {renderResponse()} */}
        </div>
    );
}

export default ContactFormPage;
