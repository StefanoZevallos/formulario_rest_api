import express from "express";
import {
  registroController,
  loginController,perfilController
} from "../controllers/usuario.controller.js";

export const usuarioRouter = express.Router();

usuarioRouter.post("/registro", registroController);
usuarioRouter.post("/login", loginController);
usuarioRouter.get("/perfil", perfilController);