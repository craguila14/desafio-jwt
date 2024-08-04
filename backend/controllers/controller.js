import { model } from "../models/model.js"
import jwt from "jsonwebtoken"
import "dotenv/config"

const { JWT_SECRET } = process.env;

const register = async (req, res) => {

    try {
        const { email, password, rol, lenguage } = req.body;
        const result = await model.addUser({ email, password, rol, lenguage });
        res.status(201).send("User creado");
    } catch (error) {
        console.error('Error en el registro de usuario:', error.message);
        res.status(500).send('Error al crear el usuario');
    }
};


const login = async (req, res) => {
    try {
     const { email, password } = req.body
 
     const user = await model.loginModel(email, password)
     if(!user){
         res.send('User not found')
     } else {
 
         const token = jwt.sign(
            { id: user.id, email: user.email, rol: user.rol },
             JWT_SECRET
         )
         res.send({token})
     }
    } catch (error) {
     console.log(error)
    }
 }

 const profile = async (req, res) => {
    try {
        const {email} = req.user
        const user = await model.getUser(email)
        if (user) {
            return res.send(user)
        } else {
            return res.status(401).send("Invalid token")
        }
    } catch (error) {
        return res.status(401).send("Invalid token")
    }
}

export const controller = {
    register,
    login,
    profile
}