import Joi from "joi";

export const CancionDto = Joi.object({
  nombreCancion: Joi.string().required(),
  nombreArtista: Joi.string().required(),
  usuarioId: Joi.number().required()
});