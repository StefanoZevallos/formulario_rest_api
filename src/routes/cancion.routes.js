import express from "express";
import {
   crearCancion, devolverCancion
} from "../controllers/cancion.controller.js";

export const cancionRouter = express.Router();

cancionRouter.post("/canciones", crearCancion);
cancionRouter.get("/canciones", devolverCancion);
