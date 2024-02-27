'use strict'

import User from './user.model.js';
import {encrypt, checkPassword, checkUpdate} from './../utils/validator.js';
import { generateJwt } from '../utils/jwt.js';


export const test = (req, res)=>{
    console.log('test is running');
    return res.send({message:'Test is running'});
}

//Asincrona porque va a buscar en base de datos
export const register = async(req, res)=>{
    try{
        //Capturar el formulario
        let data = req.body;
        //Encriptar la contrasenia
        data.password = await encrypt(data.password);
        //Asignar rol por defecto
        data.role = 'CLIENT';
        //Guardar la informacion en la BD
        let user = new User(data);
        await user.save();
        //Responder al usuario
        return res.send({message:`Registered successfully, can be logged with username ${user.username}`})
    }catch(err){
        console.error(err);
        return res.status(500).send({message:'Error registering user', err: err.errors});
    }
}


export const login = async(req, res) =>{
    try{

        //Capturar los datos (body)
        let {username, password} = req.body;
        //Validar que el usuario exista
        let user = await User.findOne({username});//Buscar un solo registro. username:'jmolina'
        //Verificar que la contrasenia coincida
        if(user && await checkPassword(password, user.password)){
            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name,
                role: user.role
            }
            //Generar el Token
            let token = await generateJwt(loggedUser);
            //responder al usuario
            return res.send(
                {
                    message: `Welcome ${user.name}`,
                    loggedUser,
                    token
                },
            );
        }
        console.log(req.body);
        return res.status(404).send({message:'Invalid credentials'})
        
    }catch(err){
        console.error(err);
        return res.status(500).send({message:`Error to login`});
    }
}

export const update = async(req, res)=>{//Datos generales (No password)
    try{
        //Obtener el id del usuario a actualizar
        let {id} = req.params;
        //Obtener los datos a actualizar
        let data = req.body;

        //validar si data trae datos
        if(!checkUpdate(data, id)) return res.status(400).send({message:`Have submitted some data that cannot be updated or missing data`})
        //Validar si tiene permisos (tokenizacion) X Hoy no lo vemos X

        //Actualizar (BD)
        let updatedUser = await User.findOneAndUpdate(
            {_id: id},//ObjectsId <- hexadecimales (Hora sistema, Version Mongo, Llave privada...)
            data,
            {new: true} //los datos que se van a actualizar
        )
        //Validar la actualizacion
        if(!updatedUser) return res.status(401).send({message:`User not found and not updated`});
        //Responder al usuario
        return res.send({message:`Update user`, updatedUser});
    }catch(errr){
        console.error(errr);
        if(errr.keyValue.username) return res.status(400).send({message:`Username @${errr.keyValue.username} is al ready token.`})
        return res.status(500).send({message:`Error updating account`});
    }
}

export const deleteUser = async(req, res)=>{
    try {
        //obtener id de la URI
        let {id} = req.params;
        //validar si esta logeado y es el mismo X no lo vemos hoy X
        
        //Eliminar (deleteOne(Solo elimina, no devuelve el documento) / findOneAndDelete(Elimina y devuelve el elemento))
        let deleteU = await User.findOneAndDelete({_id: id});

        //verificar que se elimino
        if(!deleteU) return res.status(400).send({message:`Account not found and not deleted.`})
        //Responder
       
        return res.send({message:`Account with username ${deleteU.username} deleted successfully`});
    } catch (err) {
        console.error(err);
        return res.status(500).send({message:`Error deleting account`})
    }
}