import express, { json } from "express";
import Prisma from '@prisma/client'
import cors from 'cors'
import routeUpload from './controller/routeUpload.js';

const conexion = new Prisma.PrismaClient();
const servidor = express()

servidor.use(cors());

servidor.use(express.json())
servidor.use("/api/users" , routeUpload);
servidor
  .route("/registro")
  .post(async (req, res) => {
    const { body: data } = req;
    try {
      const resultado = await conexion.usuarios.create({
        data
        //  {
        //   nombreNumerico: body.nombreNumerico,
        //   nombreTexto: body.nombreTexto,
        // },
      });
      console.log(resultado);
      res.json({
        message: "Usuario creado exitosamente",
      });
    } catch (error) {
      res.json({
        message: "Error al crear el usuario",
      });
    }
  })
  .get(async (req, res) => {
    const resultado = await conexion.usuarios.findMany();
    res.json({
      content: resultado,
    });
  });

  servidor
  .route("/canciones")
  .post(async (req, res) => {
    const { body: data } = req;
    try {
      const resultado = await conexion.canciones.create({
        data
      });
      console.log(resultado);
      res.json({
        message: "Canción creado exitosamente",
      });
    } catch (error) {
      res.json({
        message: "Error al crear la canción",
      });
    }
  }).get(async (req,res)=> {
    const resultado = await conexion.canciones.findMany();
    res.json({
      content: resultado,
    });
  })

  servidor.listen(3001, () => {
    console.log(`Servidor corriendo exitosamente en el puerto 3001`);
  });

