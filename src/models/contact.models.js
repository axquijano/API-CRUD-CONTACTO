import { pool } from '../db.js';

export const  getAll = async () => {
    const { rows } = await pool.query("SELECT * FROM contact;");
    return rows;
}   

export const  getAllWithPhones = async (user_id) => {
    const {rows} = await pool.query(`SELECT contact.id, contact.first_name, contact.last_name, contact.email, contact.address,  ARRAY_AGG(  json_build_object('id', phone.id, 'phone_number', phone_number, 'type', type) order by phone_number desc )
         AS phones FROM contact INNER JOIN phone ON contact.id = phone.contact_id where contact.user_id = $1 GROUP BY contact.id;`, [user_id])
    return rows;
}

export const  getById= async (id) => {
    const { rows } = await pool.query("SELECT * FROM contact WHERE id = $1", [id]);
    return rows;
}

export const  createContact= async ( data ) => {
    const { rows, rowCount } = await pool.query("INSERT INTO contact (first_name, last_name, email, address, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *", [data.first_name, data.last_name, data.email, data.address, data.user_id]);
    return { rows : rows,  rowCount : rowCount };
}

export const  deleteContact = async (id) => {
    const { rows, rowCount } = await pool.query("DELETE FROM contact WHERE id = $1 RETURNING *", [id]);
    return { rows : rows,  rowCount : rowCount };
}

export const  updateContact= async ( id, data) => {
    const result = await pool.query("UPDATE contact SET first_name = $1, last_name = $2, email = $3, address = $4 WHERE id = $5 RETURNING *", [data.first_name,data.last_name, data.email , data.address, id] );
    return result;
}
