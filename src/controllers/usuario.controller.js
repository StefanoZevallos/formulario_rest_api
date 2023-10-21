import { conexion } from "../conexion.js";
import { registroUsuarioDto, loginDto } from "../dtos/usuario.dto.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registroController = async (req, res) => {
  const { error, value } = registroUsuarioDto.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "error al crear el usuario",
      content: error.details,
    });
  }

  // genera el hash a raiz de la password y el numero de vueltas para generar el salt
  const hashPassword = await bcrypt.hash(value.password, 8);

  const usuarioCreado = await conexion.usuarios.create({
    data: {
      ...value,
      password: hashPassword, // remplazamos la contrasena por el hash creado de esa contrasena
    },
  });

  return res.status(201).json({
    message: "usuario creado exitosamente",
    content: usuarioCreado,
  });
};

export const loginController = async (req, res) => {
  const { error, value } = loginDto.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "Error al hacer el login",
      content: error.details,
    });
  }

  // primero buscar el usuario con ese correo
  const usuarioEncontrado = await conexion.usuarios.findUnique({
    where: { correo: value.correo },
  });

  if (!usuarioEncontrado) {
    return res.status(400).json({
      message: "El usuario no existe en la bd",
    });
  }

  const resultado = bcrypt.compareSync(
    value.password,
    usuarioEncontrado.password
  );

  if (resultado===false) {
    return res.status(400).json({
      message: "Contraseña invalida",
    });
  }

  const token = jwt.sign(
    {
      sub: usuarioEncontrado.id,
      nombre: usuarioEncontrado.nombre,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );
  return res.json({
    token,
  });
};

export const perfilController = async (req,res) => {
  const token = req.headers.authorization;

  // Verifica si se proporcionó un token en el encabezado
  if (!token) {
    return res.status(401).json({
      message: 'Token de autorización no proporcionado.',
    });
  }


  try {
    // Verifica y decodifica el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded); // Reemplaza 'tu_clave_secreta' con tu clave secreta real

    // El token es válido, y `decoded` contendrá la información del usuario (por ejemplo, el ID del usuario).
    const userId = decoded.sub;

    // Ahora puedes usar `userId` para buscar al usuario en la base de datos y devolver sus datos.
    const usuarioEncontrado = await conexion.usuarios.findUnique({
      where: { id: userId },
    });
    if (!usuarioEncontrado) {
      return res.status(404).json({
        message: 'Usuario no encontrado.',
      });
    }

    return res.status(200).json({
      message: 'Datos del usuario recuperados exitosamente.',
      content: usuarioEncontrado,
    });
  } catch (error) {
    return res.status(401).json({
      message: 'Token de autorización inválido o vencido.',
    });
  }
}