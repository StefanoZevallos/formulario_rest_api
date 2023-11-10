import express from "express";
import {
   crearCancion, devolverCancion,borrarCancion,actualizarCancion,devolverCancionId
} from "../controllers/cancion.controller.js";

export const cancionRouter = express.Router();

cancionRouter.post("/canciones", crearCancion);
cancionRouter.get("/canciones", devolverCancion);
cancionRouter.get("/cancion/:id", devolverCancionId);
cancionRouter.delete("/cancion/:id", borrarCancion);
cancionRouter.put("/cancion/:id", actualizarCancion);
