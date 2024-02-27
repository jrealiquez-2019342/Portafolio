'use strict'

import { Router } from 'express';
import { test, save } from './appointment.controller.js';
import {validateJwt} from './../middlewares/validate-jwt.js';

const api = Router();

//rutas publicas
api.get('/test', test);

//rutas privadas - CLIENT
api.post('/save', [validateJwt], save);

export default api;