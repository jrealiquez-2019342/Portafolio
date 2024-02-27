'use strict'

import jwt from 'jsonwebtoken';
import User from './../user/user.model.js';


export const validateJwt = async (req, res, next) => {
    try {
        //Obtener la llave de acceso al token
        let secretKey = process.env.SECRET_KEY;
        //obtener el token de los headers
        let {authorization} = req.headers;
        //Verificar si viene el token.
        console.log(authorization);
        if (!authorization) return res.status(401).send({ message: `Unauthorized.` });
        //obtener el uid del usuario que envio el token
        let { uid } = jwt.verify(authorization, secretKey);
        //validar si aun existe en la base de datos
        let user = await User.findOne({ _id: uid });
        if (!user) return res.status(404).send({ message: `User not found - Unauthorized.` });
        req.user = user;//inyectar al req.
        next();
    } catch (err) {
        console.error(err);
        res.status(401).send({ message: `Invalid token.` })
    }
}

export const isAdmin = async(req, res, next)=>{
    try{
        let {user} = req
        if(!user || user.role !== 'ADMIN') return res.status(403).send({message: `You dont have access. | username: ${user.username}`})
        next();
    }catch(err){
        console.error(err);
        return res.status(403).send({message:`Unauthorized role`})
    }
}

/*
req = request (solicitud);
res = response(respuesta);
next();

//Ejemplo de un middleware
//intermediario validador
//si en el middleware sale bien, le damos un next
api.post('/login', validateJwt(),login);*/