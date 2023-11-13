import express, { json } from "express";
import Prisma from '@prisma/client'
import cors from 'cors'
import { usuarioRouter } from "./routes/usuario.routes.js";
import { cancionRouter } from "./routes/cancion.routes.js";

const conexion = new Prisma.PrismaClient();
const servidor = express()

servidor.use(cors());

servidor.use(express.json())
servidor.use(usuarioRouter);
servidor.use(cancionRouter);

servidor.listen(3000, () => {
  console.log(`Servidor corriendo exitosamente en el puerto 3000`);
});

