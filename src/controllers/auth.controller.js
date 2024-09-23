import {create, getUserByEmail, getUserById} from "../models/user.models.js";
import bcrypt from 'bcryptjs';
import { createAccessToken } from "../libs/jwt.js";
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from "../config.js";

export const register = async (req, res) => {
    try {
        const data = req.body;
        //encriptando password
        const userFound = await getUserByEmail(data.email);

        if(userFound){
            return res.status(400).json({message: ["The email already exists"]});
        }
        const passwordHash = await bcrypt.hash(data.password, 10);
        //creando al user
        const {user, rowCount} = await create(data, passwordHash);
        //Generando token, expira en 1 dia
       const token = await createAccessToken({id: user.id});
        //Responde con la cookie y que la guarde 
        res.cookie('token', token);

        res.json({
            id : user.id , 
            username: user.username, 
            email : user.email
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const data = req.body;
        const userFound = await getUserByEmail(data.email);
        if (!userFound) return res.status(400).json({ message: ["User not found"] });
        //comparando password
        const isMatch = await bcrypt.compare(data.password, userFound.password);
        if (!isMatch) return res.status(400).json({ message: ["Incorrect password" ]});

        //Generando token, expira en 1 dia
       const token = await createAccessToken({id: userFound.id});
        //Responde
        res.cookie('token', token);
        res.json({
            id : userFound.id , 
            username: userFound.username, 
            email : userFound.email
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: [error.message] });
    }
}

export const logout = (req, res) => {
    res.cookie("token", "", {expires: new Date(0)});
    return res.sendStatus(200);
}

export const profile = async (req, res) => {
    const userFound = await getUserById(req.user.id);
    if(!userFound) return res.status(400).json({message : "user not found"});
    return res.json({
        id : userFound.id,
        username : userFound.username, 
        email : userFound.email
    })
    
}

export const verifyToken = async (req, res) => {
    const {token} = req.cookies
    if(!token) return res.status(401).json({message: 'Unauthorized'});
    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if(err) return res.status(401).json({message: 'Unauthorized'});
        const userFound = await getUserById(user.id);
        if(!userFound) return res.status(401).json({message: 'Unauthorized'});

        return res.json({
            id : userFound.id,
            username : userFound.username, 
            email : userFound.email
        });
    })

}