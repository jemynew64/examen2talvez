"use strict";

const { User } = require("../models"); // Importa el modelo User
const { z } = require("zod"); // Importa Zod

// Definir un esquema de validación para crear un usuario
const userSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio."),
  lastname: z.string().min(1, "El apellido es obligatorio."),
  email: z.string().email("El email no es válido."),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres."),
  isAdmin: z.boolean().optional().default(false), // Opcional y por defecto false
});

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
  try {
    // Validar los datos del usuario
    const validatedData = userSchema.parse(req.body); // Validación de datos con Zod
    const user = await User.create(validatedData); // Crear usuario solo si los datos son válidos
    return res.status(201).json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Si hay un error de validación, retorna un 400 con los errores
      return res.status(400).json({ errors: error.errors });
    }
    return res.status(500).json({ error: error.message });
  }
};

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Actualizar un usuario
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Validar los datos del usuario
    const validatedData = userSchema.partial().parse(req.body); // Permitir campos opcionales
    await user.update(validatedData); // Actualiza solo si los datos son válidos
    return res.status(200).json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Si hay un error de validación, retorna un 400 con los errores
      return res.status(400).json({ errors: error.errors });
    }
    return res.status(500).json({ error: error.message });
  }
};

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    await user.destroy();
    return res.status(204).send(); // No devuelve contenido
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Función para el logi
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Busca al usuario por email
    const user = await User.findOne({ where: { email } }); // Asegúrate de usar 'where' aquí
    if (!user) {
      return res.status(401).json({ success: false }); // Credenciales incorrectas
    }

    // Compara la contraseña directamente (sin encriptación)
    if (user.password !== password) {
      return res.status(401).json({ success: false }); // Credenciales incorrectas
    }

    // Si el login es exitoso, envía la respuesta
    return res.json({
      success: true,
      user: {
        isAdmin: user.isAdmin, // Enviar el rol del usuario
      },
    });
  } catch (err) {
    console.error(err); // Para depuración
    res.status(500).json({ message: "Error en el servidor" });
  }
};
