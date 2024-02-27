'use strict'

import Pet from './../pet/pet.model.js';
import Appointment from './../appointment/appointment.model.js';

export const test = async (req, res) => {
    console.log('appointment test is running...');
    return res.send({ message: `Function test is running | appointment.` });
}

export const save = async (req, res) => {
    try {
        //capturar la data
        let data = req.body;
        console.log(data)
        data.user = req.user._id;//jalar el id del usuario logeado //req.user lo encuentro en el validate.jwt
        //req.user lo inyectamos desde el jwt.
        console.log(data.user);
        //verificar que exista el animal
        let animal = await Pet.findOne({ _id: data.animal });
        if (!animal) return res.status(404).send({ message: `Animal not found` });
        //validar que la mascota no tenga una cita activa con esa persona
        let existAppointment = await Appointment.findOne({
            //querys complejos es como un if anidado
            $or: [
                {
                    user: data.user,
                    animal: data.animal

                },
                {
                    user: data.user,
                    date: { "$eq": new Date(data.date) }
                }
            ]
        })
        if (existAppointment) return res.send({ message: `Appointment already exists.` })

        //EJERCICIO: que el usuario solo pueda tener una cita por dia

        //Guardar
        let appointment = new Appointment(data);
        await appointment.save();
        return res.send({ message: `Appointment saved successfully in date ${appointment.date}` });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: `Error creating appointment`, err: err.errors });
    }
}