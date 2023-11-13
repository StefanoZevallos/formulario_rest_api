import express from "express";
import {
  registroController,
  loginController,perfilController,editController, eliminarUsuarioController, getUsuariosController,
  getUsuarioController
} from "../controllers/usuario.controller.js";

export const usuarioRouter = express.Router();

usuarioRouter.post("/registro", registroController);
usuarioRouter.post("/login", loginController);
usuarioRouter.get("/perfil", perfilController);
usuarioRouter.get("/usuarios", getUsuariosController);
usuarioRouter.get("/usuario/:id", getUsuarioController);
usuarioRouter.put("/usuario/:id", editController);
usuarioRouter.delete("/usuario/:id", eliminarUsuarioController);