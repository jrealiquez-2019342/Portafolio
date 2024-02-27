'use strict'
/*Meter en una linea de texto la informacion del usuario.
La informacion que mas nos interesa es cuando se creo el token
y si ya expiro*/
//si cierro el token me elimina la sesion

import jwt from 'jsonwebtoken'
const secretKey = '@LlaveSuperSecretaDeIN6AM@'


export const generateJwt = async(payload)=>{
    try {
        //conjunto de datos para identificar al usuario.
        //los datos no pueden ser sensibles.

        return jwt.sign(payload, secretKey, {
            expiresIn: '1h',
            algorithm: 'HS256'
        });
    } catch (err) {
        console.error(err);
        return err;
    }
}