import { pool } from '../db.js';

export const  create = async( data , passwordHash) => {
    const { rows, rowCount } = await pool.query("INSERT INTO Users (username, email, password) VALUES ($1, $2, $3) RETURNING *", [data.username, data.email, passwordHash]);
    return { user : rows[0],  rowCount : rowCount };
}

export const getUserByEmail = async (email) => {
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return rows[0];
}


export const getUserById = async (id) => {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return rows[0];
}