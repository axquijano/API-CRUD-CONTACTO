import React, { useState } from 'react';
import PhoneItem from './PhoneItem.jsx'; // Componente hijo que crearemos después

const PhoneList = ({phones, setPhones}) => {

    // Función para agregar un nuevo teléfono a la lista
    const handleAddPhone = () => {
        setPhones([...phones, { type: 'movil', phone_number: '' }]);
        console.log(phones);
    }

    // Función para actualizar el valor de un teléfono específico
    const handlePhoneChange = (index, newPhone) => {
            const updatedPhones = phones.map((phone, i) => (i === index ? newPhone : phone));
            setPhones(updatedPhones);
    }

    // Función para eliminar un teléfono
    const handleDeletePhone = (index) => {
        if (phones.length > 1) {
            const updatedPhones = phones.filter((_, i) => i !== index);
            setPhones(updatedPhones);
        } else {
            console.log("No se puede eliminar el último teléfono");
        }
    }

    return (
        <div>
            <h3 className="text-1xl font-bold my-2" >List Phones</h3>
            <button 
                type="button" 
                onClick={handleAddPhone}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow-md"
            >
                Add Phone
            </button>
            {phones.map((phone, index) => (
                <PhoneItem
                    key={`phone-${index}`}
                    index={index}
                    phone={phone}
                    onPhoneChange={handlePhoneChange}
                    onDeletePhone={handleDeletePhone}
                />
            ))}
            
        </div>
    );
}

export default PhoneList;
