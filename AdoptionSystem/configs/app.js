//levantar el servidor HTTP (express)
//ESModules
'use strict'

//importaciones
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { config } from 'dotenv';
import userRoutes from './../src/user/user.routes.js';
import keeperRoutes from './../src/keeper/keeper.routes.js';
import petRoutes from './../src/pet/pet.routes.js';
import appointmentRoutes from './../src/appointment/appointment.routes.js';

//configuracion
const app = express();
config();
const port = process.env.PORT || 3056;

//configuracion del servidor
app.use(express.urlencoded({extended:'false'}));
app.use(express.json());
app.use(cors());//Aceptar o denegar solicitudes de diferentes origenes (local, remoto) / politicas de acceso
app.use(helmet());//Aplica capa de seguridad basica al servidor
app.use(morgan('dev'))//logs de solicitudes al servidor


//Declaracion de rutas
app.use(userRoutes);
app.use('/keeper', keeperRoutes);
app.use('/pet', petRoutes);
app.use('/appointment', appointmentRoutes);

export const initServer = ()=>{
    app.listen(port);
    console.log(`Server HTTP runing in port ${port}`);
}