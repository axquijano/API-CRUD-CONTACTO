import { pool } from '../db.js';

export const getAll = async () => {
    const { rows } = await pool.query("SELECT * FROM phone;");
    return rows;
} 

export const getByContactId = async (contacto_id)=> {
    const { rows } = await pool.query("SELECT * FROM phone WHERE contact_id = $1", [contacto_id]);
    return rows;
}

export const createPhone = async ( data )=> {
    const { rows, rowCount } = await pool.query("INSERT INTO phone (contact_id, type, phone_number) VALUES ($1, $2, $3) RETURNING *", [data.contact_id, data.type, data.phone_number]);
    return { rows : rows,  rowCount : rowCount };
}

export const deletePhone = async (id)=> {
    const { rows, rowCount } = await pool.query("DELETE FROM phone WHERE id = $1 RETURNING *", [id]);
    return { rows : rows,  rowCount : rowCount };
}

export const update = async ( id, data)=> {
    const result = await pool.query("UPDATE phone SET  contact_id= $1, type = $2, phone_number= $3 WHERE id = $4 RETURNING *", [data.contact_id,data.type, data.phone_number ,id] );
    return result;
}