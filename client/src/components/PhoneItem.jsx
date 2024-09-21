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
        <div>
            <select value={phone.type} onChange={handleTypeChange}>
                <option value="movil">Móvil</option>
                <option value="fijo">Fijo</option>
            </select>

            <input
                type="text"
                value={phone.phone_number}
                placeholder="Número de teléfono"
                onChange={handleNumberChange}
            />

            <button type="button" onClick={handleDelete}>
                Eliminar
            </button>
        </div>
    );
}

export default PhoneItem;
