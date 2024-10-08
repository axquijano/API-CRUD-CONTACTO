import { getAll, getAllWithPhones, getById, createContact, deleteContact, updateContact} from "../models/contact.models.js";
import { createPhone, deletePhone, getByContactId, update } from "../models/phone.models.js";

export const getAllContactos = async (req, res)  => {
    try {
        const rows  = await getAll();
        res.json(rows);
    } catch (error) {
        console.log(error.message)
    }
};

export const getAllContactsWithTelephone = async (req, res) => {
    try {
        const rows  = await  getAllWithPhones(req.user.id);
        res.json(rows);
    } catch (error) {
        console.log(error.message)
    }
}
export const getContacto = async (req, res)  =>  {
    try {
        const { id } = req.params;
        const rows  = await getById(id);
        // Obtener los teléfonos del contacto
        const phones = await getByContactId(id);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.json({... rows[0], phones});
    } catch (error) {
        console.log(error.message);
    }

};

export const createContacto = async (req, res)  =>  {
    try {
        const data = { ...req.body, user_id : req.user.id};
        console.log(data);
        const  {rows, rowCount} =  await createContact(data);

        if (rowCount === 0) {    
            return res.statusv(404).json({ message: "Contact not post" });
        }
        console.log(data);
     
        let newTelefono = {
            contact_id : "",
            type: "",
            phone_number : ""
        }
        console.log("****************************************");
        console.log(typeof(data.phones));
        let arrayTelefonos;
        if (typeof(data.phones) === "object"){
            arrayTelefonos = data.phones;
            console.log("tipo de dato object");
        }else{
            arrayTelefonos = JSON.parse(data.phones)
            console.log("tipo string");
        }
   
        console.log("****************************************");

        if (arrayTelefonos && arrayTelefonos.length > 0) {
            for (const telefono of arrayTelefonos) {
                if(telefono.phone_number!=""){
                    newTelefono = { contact_id : rows[0].id , ...telefono};
                    await createPhone(newTelefono);
                }
            }
        }
        return res.json(rows[0]);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal server error" });
      
    }
};

export const deleteContacto = async (req, res)  =>  {
    try {
        const { id } = req.params;
        const { rows, rowCount } = await deleteContact(id);
        if (rowCount === 0) {
            return res.status(404).json({ message: "Contacto not found" });
        }
        // es otra forma de decir que se ejecuto correctamente 
        return res.sendStatus(204);
        // return res.json(rows);
    } catch (error) {
        console.log(error.message);
    }

};

export const  updateContacto = async (req, res)  => {
    try {
        const { id } = req.params;
        const data = req.body;

        const result = await updateContact(id, data);

        let  existingPhones = await getByContactId(id);
    
        let  newPhones;
        if (typeof(data.phones) === "object"){
            newPhones = data.phones;
            console.log("tipo de dato object");
        }else{
            newPhones = JSON.parse(data.phones)
            console.log("tipo string");
        }

        updatePhones(existingPhones, newPhones, id);

        if(result.rowCount === 0){
            return res.status(404).json({message: "Contact not found"});
        }
        return res.json(result.rows[0]);
    } catch (error) {
        console.log(error.message);
    }

};

const updatePhones = async (existingPhones, newPhones, id_contact) => {
   
    const existingPhoneIds = existingPhones.map(row => row.id);
    const newPhonesId = newPhones.map(phone => phone.id);

    //Eliminar teléfonos que ya no existen en la solicitud
    const phonesToDelete = existingPhoneIds.filter(phoneId => !newPhonesId.includes(phoneId));
    if (phonesToDelete.length > 0) {
        phonesToDelete.forEach(id => {
            deletePhone(id);
        });
    }

    //Insertar o actualizar teléfonos nuevos
    for (const phone of newPhones) {
        if (phone.id) {
            update(phone.id, phone);
        } else {
            createPhone({ contact_id : id_contact , ...phone})
        }
    }
}