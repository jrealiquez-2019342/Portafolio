'use strict'

import Keeper from "./keeper.model.js";
import {encrypt, checkPassword, checkUpdate} from './../utils/validator.js';

export const registerKeeper = async(req, res)=>{
    try{

        let data = req.body;

        data.password = await encrypt(data.password);

        data.role = 'EMPLOYED';

        //Guardar la informacion en la BD
        let keeper = new Keeper(data);
        await keeper.save();
        //Responder al usuario
        return res.send({message:`Registered successfully, can be logged with username use ${keeper.username}`})
    }catch(err){
        console.error(err);
        return res.status(500).send({message:'Error registering user', err: err.errors});
    }
}