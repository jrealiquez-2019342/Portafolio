import express from "express";
import { validateJwt, isAdmin } from "../middlewares/validate-jwt.js";
import { test, register, login, update, deleteUser } from "./user.controller.js";

const api = express.Router();

//RUTAS PUBLICAS
api.post('/register', register);
api.post('/login', login);

//RUTAS PRIVADAS --(solo usuarios logeados)
api.get('/test', [validateJwt, isAdmin], test);
api.put('/update/:id', [validateJwt], update);//Middleware -> Funciones intermedias que sirven para validad.
api.delete('/delete/:id', [validateJwt], deleteUser);


export default api;