import pool from "../config/db.js";
import bcrypt from "bcryptjs"

const addUser = async ({email, password, rol, lenguage}) => {
    try {
        const passwordEncriptada = bcrypt.hashSync(password);
        password = passwordEncriptada;

        const sql = 'INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [email, passwordEncriptada, rol, lenguage];

        const result = await pool.query(sql, values);

        if(result.rowCount > 0) {
            return result.rows
        } else {
            return false
        }
    } catch (error) {
        console.error('Error', error.message);
        throw error;
    }
}


const loginModel = async (email, password) => {
    try {
        const sql = 'SELECT * FROM usuarios WHERE email = $1';
        const values = [email];
        const { rows: [usuario], rowCount } = await pool.query(sql, values);

        if (rowCount === 0) return null;

        const passwordEsCorrecta = bcrypt.compareSync(password, usuario.password);

        if (!passwordEsCorrecta) return null;

        return usuario;
    } catch (error) {
        console.error('Error en el inicio de sesión:', error.message);
        throw error;
    }
};

const getUser = async (email) => {
    try {
        const sql = 'SELECT * FROM usuarios WHERE email = $1';
        const values = [email];
        const { rows: [user], rowCount } = await pool.query(sql, values);

        return rowCount > 0 ? user : null; 
    } catch (error) {
        console.error('Error retrieving user:', error.message);
        throw error;
    }
};



export const model = {
    addUser,
    loginModel,
    getUser
}