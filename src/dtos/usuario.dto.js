import Joi from "joi";

export const registroUsuarioDto = Joi.object({
  nombre: Joi.string().required(),
  correo: Joi.string().required(),
  telefono: Joi.string().required(),
  // ^ > como debe empezar la cadena
  // (?...) > tiene que hacer match con el siguiente afirmacion
  // . > haga match con cualquier caracter menos con el salto de linea
  // * > pueden venir 1 o n caracteres antes de el patron
  // ? > hace que el previo cuantificador no sea tomado en consideracion
  // (?=.*?[A-Z]) al menos tiene que tener una mayuscula
  // (?=.*?[a-z]) al menos una minuscula
  // (?=.*?[0-9]) al menos un numero
  // (?=.*?[#?!@$%-*]) al menos un caracter especial
  // {} > cuantificador (longitud de la cadena de texto)
  // $ > cierra la expresion regular

  // password: Joi.string()
  //   .regex(
  //     new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$")
  //   )
  //   .messages({
  //     "string.pattern.base":
  //       "El password debe contener al menos una mayuscula, una minuscula, un numero, un caracter especial y no ser menor a 6 caracteres",
  //   })
  //   .required(),
});

// la password no es necesario usar el patron porque si el usuario ya esta creado, y su contrasena no utilizo el patron no le podemos obligar ahora a que utilice una contrasena segura ya que ya tiene contrasena
export const loginDto = Joi.object({
  correo: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const editarUsuarioDto = Joi.object({
  nombre: Joi.string(),
  correo: Joi.string(),
  telefono: Joi.string()
  // ^ > como debe empezar la cadena
  // (?...) > tiene que hacer match con el siguiente afirmacion
  // . > haga match con cualquier caracter menos con el salto de linea
  // * > pueden venir 1 o n caracteres antes de el patron
  // ? > hace que el previo cuantificador no sea tomado en consideracion
  // (?=.*?[A-Z]) al menos tiene que tener una mayuscula
  // (?=.*?[a-z]) al menos una minuscula
  // (?=.*?[0-9]) al menos un numero
  // (?=.*?[#?!@$%-*]) al menos un caracter especial
  // {} > cuantificador (longitud de la cadena de texto)
  // $ > cierra la expresion regular

  // password: Joi.string()
  //   .regex(
  //     new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$")
  //   )
  //   .messages({
  //     "string.pattern.base":
  //       "El password debe contener al menos una mayuscula, una minuscula, un numero, un caracter especial y no ser menor a 6 caracteres",
  //   })
  //   .required(),
});