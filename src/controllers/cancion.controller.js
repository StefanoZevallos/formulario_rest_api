import { conexion } from "../conexion.js";
import { CancionDto } from "../dtos/cancion.dto.js";


export const crearCancion = async (req, res) => {
  const { error, value } = CancionDto.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "error al crear la canción",
      content: error.details,
    });
  }
  console.log(value);
  try {
    const crearCancion = await conexion.canciones.create({
      data: {
        nombreArtista: value.nombreArtista,
        nombreCancion: value.nombreCancion,
        usuarioId: value.usuarioId
      }
    });
    res.json({
      message: "Canción creado exitosamente",
    })}
    catch(error){
      return res.status(400).json({
        message: "Error al crear la canción"
      })
    }
}
export const devolverCancion = async (req, res) => {
  const categorias = await conexion.canciones.findMany()

  res.json({
    content: categorias,
  })
}