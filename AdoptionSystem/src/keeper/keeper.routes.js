import express from "express";
import { registerKeeper } from "./keeper.controller.js";

const api = express.Router();


api.post('/registerKeeper', registerKeeper);

export default api;