import React from 'react';

const PhoneItem = ({ index, phone, onPhoneChange, onDeletePhone }) => {
    const handleTypeChange = (e) => {
        const newPhone = { ...phone, type: e.target.value };
        onPhoneChange(index, newPhone);
    }

    const handleNumberChange = (e) => {
        const newPhone = { ...phone, phone_number: e.target.value };
        onPhoneChange(index, newPhone);
    }

    const handleDelete = () => {
        onDeletePhone(index);
    }

    return (
        <div className='flex items-center space-x-4 py-2'>
            <select 
                value={phone.type} 
                onChange={handleTypeChange}
                className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            >
                <option value="movil">Móvil</option>
                <option value="fijo">Fijo</option>
            </select>

            <input
                type="text"
                value={phone.phone_number}
                placeholder="Phone"
                onChange={handleNumberChange}
                className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            />

            {/* <button type="button" onClick={handleDelete}>
                Eliminar
            </button> */}

            <button
                type="button" onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow-md flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path  d="M9 2a1 1 0 00-.894.553L7 4H4a1 1 0 100 2h12a1 1 0 100-2h-3l-1.106-1.447A1 1 0 0011 2H9zM5 7a1 1 0 00-1 1v7a3 3 0 003 3h6a3 3 0 003-3V8a1 1 0 00-1-1H5z"  />
                    </svg>
            </button>
        </div>
    );
}

export default PhoneItem;
