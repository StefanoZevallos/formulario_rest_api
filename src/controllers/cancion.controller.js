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
  const canciones = await conexion.canciones.findMany()

  res.json({
    content: canciones,
  })
}
export const devolverCancionId = async (req, res) => {
  const { id } = req.params;
  const canciones = await conexion.canciones.findMany(
   {where : { id:parseInt(id)}}
  )

  res.json({
    content: canciones,
  })
}

export const borrarCancion = async (req, res) => {
  const { id } = req.params;
  const canciones = await conexion.canciones.delete({
    where: { id: parseInt(id) }}
  )

  res.json({
    content: "Cancion eliminada exitosamente"
  })
}

export const actualizarCancion = async (req, res) => {
  const { error, value } = CancionDto.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "Error al crear la canción",
      content: error.details,
    });
  }

  const { id } = req.params;

  try {
    // Corrige la estructura del objeto dentro de data
    const canciones = await conexion.canciones.update({
      data: {
        nombreCancion: value.nombreCancion,
        nombreArtista: value.nombreArtista,
        usuarioId: value.usuarioId
      },
      where: { id: parseInt(id) },
    });

    res.json({
      content: "Canción actualizada exitosamente",
    });
  } catch (error) {
    console.error("Error al actualizar la canción:", error);
    res.status(500).json({
      message: "Error interno del servidor al actualizar la canción",
    });
  }
};