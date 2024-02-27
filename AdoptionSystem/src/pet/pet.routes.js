import {Router} from "express";
import { callPets ,updatePet, deletePet, savePet, searchPet, update} from "./pet.controller.js";

const api = Router();

api.get('/showPets', callPets);
api.post('/savePet', savePet);
api.put('/updatePet/:id', updatePet);
api.delete('/deletePet/:id', deletePet);
api.get('/searchPet/:name', searchPet);
api.put('/update/:id', update)

export default api;