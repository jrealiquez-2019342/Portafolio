'use strict'

import Pet from './pet.model.js'
import Keeper from './../keeper/keeper.model.js'
import { checkPetUpdate } from './../utils/validator.js';

export const callPets = async (req, res) => {
    try {
        let results = await Pet.find();
        if (!results) return res.status(400).send({ message: `Empty collection.` })
        return res.send({ message: `Pets list > ${results}` });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: `Error when querying pets` })
    }
}

export const savePet = async (req, res) => {
    try {
        //capturo la data
        let dataPet = req.body;

        //validar que el keeper exista
        let user = await Keeper.findOne({ _id: dataPet.keeperId })
        if (!user) return res.status(404).send({ message: 'Keeper not foud' });

        //Crear la instancia del animal
        let pet = new Pet(dataPet);
        //Guardar el animal
        await pet.save();
        //responder si todo sale bien
        return res.send({ message: `${pet.name} correctly registered` })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: `Error registering user `, err: err.errors });
    }
}

export const updatePet = async (req, res) => {
    try {
        let { id } = req.params;
        let dataPet = req.body;


        let update = checkPetUpdate(dataPet, false);
        if (!update) return res.status(400).send({ message: `Se ha enviado algunos datos que no se pueden actualizar o faltan datos` });

        let updatedPet = await Pet.findOneAndUpdate(
            { _id: id },
            dataPet,
            { new: true }
        ).populate('keeperId', ['name', 'phone']);

        if (!updatedPet) return res.status(401).send({ message: `Mascota no encontrada y no actualizada` });
        return res.send({ message: `Mascota actualizada`, updatePet: updatedPet });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: `Error actualizando mascota` });
    }
}

export const deletePet = async (req, res) => {
    try {
        let { id } = req.params;
        let deleteP = await Pet.findOneAndDelete({ _id: id });
        if (!deleteP) return res.status(400).send({ message: `Pet not found and not deleted.` })
        return res.send({ message: `Pet with name ${deleteP.name} deleted successfully.` })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: `Error deleting pet.` })
    }
}

export const searchPet = async (req, res) => {
    try {
        let { name } = req.params;
        let searchP = await Pet.find({ name }).populate('keeperId', ['name', 'phone'])
        if (!searchP) return res.status(400).send({ message: `Pet with name ${name} not found.` })
        return res.send({ message: `Showing pets with the name ${name}`, searchP })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: `Error searching pet` })
    }
}

export const update = async (req, res) => {
    try {
        //Capturar la data
        let data = req.body;
        //Capturar el id del animal a actualizar
        let { id } = req.params;
        //Validar que vengan datos
        let update = checkPetUpdate(data, false);
        if (!update) return res.status(400).send({ message: `Have submmitted some data that cannot be updated or missing data ` })
        //Actualizar
        let updatedAnimal = await Pet.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        ).populate('keeperId')//va poblar la informacion de keeper (trae los datos del keeper) es como un join

        //Validar la actualizacion
        if (!updatedAnimal) return res.status(404).send({ message: `Animal not found and not updated` });

        //Eliminar la informacion sensible
        //Responder si todo sale bien
        return res.send({ message: `Animal updated successfully`, updatedAnimal });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: `Error updating animal` })
    }
}